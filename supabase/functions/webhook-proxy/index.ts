const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const N8N_WEBHOOK = 'https://promptadvisers.app.n8n.cloud/webhook-test/bafca7c5-dc53-4967-9f1b-c2f5b1048c00';

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    const payload = await req.json();

    // Forward the request to n8n webhook with a 30-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 35000); // 35 seconds to allow for some network overhead

    try {
      const response = await fetch(N8N_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Send payload directly without wrapping
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`n8n webhook responded with status: ${response.status}`);
      }

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    } catch (fetchError) {
      if (fetchError.name === 'AbortError') {
        throw new Error('Request timed out after 35 seconds');
      }
      throw fetchError;
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
});