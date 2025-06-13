
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Replicate from "https://esm.sh/replicate@0.25.2"
import { S3Client, PutObjectCommand } from "https://esm.sh/@aws-sdk/client-s3@3.445.0"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const REPLICATE_API_KEY = Deno.env.get('REPLICATE_API_KEY')
    const AWS_ACCESS_KEY_ID = Deno.env.get('AWS_ACCESS_KEY_ID')
    const AWS_SECRET_ACCESS_KEY = Deno.env.get('AWS_SECRET_ACCESS_KEY')
    const AWS_REGION = Deno.env.get('AWS_REGION')
    const AWS_S3_BUCKET_NAME = Deno.env.get('AWS_S3_BUCKET_NAME')

    if (!REPLICATE_API_KEY) {
      throw new Error('REPLICATE_API_KEY is not set')
    }

    if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION || !AWS_S3_BUCKET_NAME) {
      throw new Error('AWS credentials are not properly configured')
    }

    const replicate = new Replicate({
      auth: REPLICATE_API_KEY,
    })

    // Initialize S3 client
    const s3Client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    })

    const body = await req.json()

    // If it's a status check request
    if (body.predictionId) {
      console.log("Checking status for prediction:", body.predictionId)
      const prediction = await replicate.predictions.get(body.predictionId)
      console.log("Status check response:", prediction)
      return new Response(JSON.stringify(prediction), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // If it's a restoration request
    if (!body.imageUrl) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required field: imageUrl is required" 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    console.log("Starting photo restoration for image:", body.imageUrl)
    const output = await replicate.run(
      "flux-kontext-apps/restore-image",
      {
        input: {
          input_image: body.imageUrl
        }
      }
    )

    console.log("Restoration response:", output)

    // Handle the restored image and upload to S3
    if (output) {
      let restoredImageUrl = null;
      
      // Handle different response formats from Replicate
      if (typeof output === 'string') {
        restoredImageUrl = output;
      } else if (Array.isArray(output) && output.length > 0) {
        restoredImageUrl = output[0];
      } else if (output.url) {
        restoredImageUrl = output.url;
      }

      if (restoredImageUrl) {
        try {
          // Download the image from Replicate
          console.log("Downloading image from:", restoredImageUrl)
          const imageResponse = await fetch(restoredImageUrl)
          if (!imageResponse.ok) {
            throw new Error(`Failed to download image: ${imageResponse.statusText}`)
          }

          const imageBuffer = await imageResponse.arrayBuffer()
          const imageUint8Array = new Uint8Array(imageBuffer)

          // Generate a unique filename
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
          const filename = `restored-${timestamp}.png`
          const s3Key = `restored-photos/${filename}`

          // Upload to S3
          console.log("Uploading to S3:", s3Key)
          const uploadCommand = new PutObjectCommand({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: s3Key,
            Body: imageUint8Array,
            ContentType: 'image/png',
            ContentDisposition: 'attachment'
          })

          await s3Client.send(uploadCommand)

          // Generate S3 URL
          const s3Url = `https://${AWS_S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${s3Key}`
          
          console.log("Image uploaded to S3:", s3Url)

          return new Response(JSON.stringify({ 
            output: restoredImageUrl, // Keep original for preview
            s3Url: s3Url, // Add S3 URL for download
            filename: filename
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          })
        } catch (s3Error) {
          console.error("S3 upload error:", s3Error)
          // Still return the original output even if S3 fails
          return new Response(JSON.stringify({ 
            output: restoredImageUrl,
            s3Error: s3Error.message
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          })
        }
      } else {
        console.error('No valid URL found in response:', output)
        return new Response(JSON.stringify({ 
          error: "No restored image was returned"
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        })
      }
    } else {
      console.error('No output in response')
      return new Response(JSON.stringify({ 
        error: "No restored image was returned"
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }
  } catch (error) {
    console.error("Error in restore-photo function:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
