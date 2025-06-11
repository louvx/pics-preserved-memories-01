
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  try {
    logStep("Webhook received");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    if (!webhookSecret) throw new Error("STRIPE_WEBHOOK_SECRET is not set");
    
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    
    if (!signature) {
      throw new Error("No Stripe signature found");
    }
    
    let event: Stripe.Event;
    
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      logStep("Webhook signature verified", { eventType: event.type });
    } catch (err) {
      logStep("Webhook signature verification failed", { error: err.message });
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }
    
    // Handle successful checkout sessions
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      logStep("Processing checkout session", { sessionId: session.id });
      
      const userId = session.metadata?.user_id;
      const credits = parseInt(session.metadata?.credits || '0');
      
      if (!userId || !credits) {
        logStep("Missing required metadata", { userId, credits });
        return new Response("Missing user_id or credits in metadata", { status: 400 });
      }
      
      // Create Supabase client with service role key to bypass RLS
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );
      
      // Get current user credits
      const { data: currentCredits, error: fetchError } = await supabase
        .from('user_credits')
        .select('remaining_restorations')
        .eq('user_id', userId)
        .single();
      
      if (fetchError) {
        logStep("Error fetching current credits", { error: fetchError });
        return new Response("Error fetching user credits", { status: 500 });
      }
      
      // Update user credits by adding purchased amount
      const newCreditAmount = currentCredits.remaining_restorations + credits;
      
      const { error: updateError } = await supabase
        .from('user_credits')
        .update({
          remaining_restorations: newCreditAmount,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);
      
      if (updateError) {
        logStep("Error updating credits", { error: updateError });
        return new Response("Error updating user credits", { status: 500 });
      }
      
      logStep("Credits updated successfully", { 
        userId, 
        creditsPurchased: credits, 
        newTotal: newCreditAmount 
      });
      
      return new Response("Success", { status: 200 });
    }
    
    logStep("Unhandled event type", { eventType: event.type });
    return new Response("Unhandled event type", { status: 200 });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in stripe-webhook", { message: errorMessage });
    return new Response(`Webhook Error: ${errorMessage}`, { status: 500 });
  }
});
