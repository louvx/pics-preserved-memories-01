
import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  name: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name } = await req.json() as WelcomeEmailRequest;

    if (!email) {
      return new Response(JSON.stringify({ error: "Missing email" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Send email with Brevo (Sendinblue API)
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": Deno.env.get("BREVO_API_KEY") ?? "",
        "Content-Type": "application/json",
        ...corsHeaders,
      },
      body: JSON.stringify({
        sender: {
          name: "Photo Restoration",
          email: "noreply@yourdomain.com" // Replace with an email authorized in Brevo domain settings!
        },
        to: [{ email, name }],
        subject: "Welcome to Photo Restoration!",
        htmlContent: `
          <h1 style="color:#c2410c;">Welcome, ${name || email}!</h1>
          <p>Thank you for signing up for Photo Restoration.<br>
          We’re thrilled to help you restore your precious memories.<br>
          </p>
          <p>If you have any questions, just reply to this email!</p>
          <hr>
          <small>This is an automated message from Photo Restoration App.</small>
        `
      }),
    });

    if (!res.ok) {
      const brevoErr = await res.json();
      console.error("Brevo error:", brevoErr);
      return new Response(JSON.stringify({ error: brevoErr }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const data = await res.json();

    return new Response(JSON.stringify({ message: "Welcome email sent!", data }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Failed to send Brevo welcome email:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
