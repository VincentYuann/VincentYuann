import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const recipientEmail = Deno.env.get("CONTACT_RECIPIENT_EMAIL") || "vincentyuan1020@gmail.com";

    if (!resendApiKey) {
      console.error("RESEND_API_KEY secret is not set");
      return new Response(JSON.stringify({ error: "Email service configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Rate Limiting by Client IP
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown-client";

    const { data: isAllowed, error: rateLimitErr } = await supabase.rpc(
      "check_contact_rate_limit",
      { client_ip: clientIp }
    );

    if (rateLimitErr) {
      console.warn("Rate limit check error:", rateLimitErr);
    } else if (isAllowed === false) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded. You can only send up to 3 messages per hour. Please try again later.",
        }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 2. Parse & Validate Payload
    const body = await req.json();
    const { name, email, subject, message, attachment, honeypot } = body;

    // Silent spam-bot trap: If honeypot is filled, return 200 without sending
    if (honeypot) {
      return new Response(
        JSON.stringify({ success: true, message: "Your message has been delivered." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!name || typeof name !== "string" || !name.trim()) {
      return new Response(JSON.stringify({ error: "Please enter your name." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return new Response(JSON.stringify({ error: "Please enter a valid email address." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: "Message must contain at least 10 characters." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Attachment validation (if present)
    if (attachment) {
      if (typeof attachment !== "object" || !attachment.filename || !attachment.content) {
        return new Response(
          JSON.stringify({ error: "Invalid attachment format." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      // Content is expected to be base64 string, max ~5MB
      if (attachment.content.length > 7 * 1024 * 1024) {
        return new Response(
          JSON.stringify({ error: "Attachment file size exceeds 5MB limit." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = (subject || "General Opportunity").trim();
    const cleanMessage = message.trim();

    // 3. Dispatch Email via Resend API
    const resendPayload: any = {
      from: "Vincent Yuann Portfolio <onboarding@resend.dev>",
      to: [recipientEmail],
      reply_to: cleanEmail,
      subject: `[Portfolio Contact] ${cleanSubject} - ${cleanName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #E1E6EB; border-radius: 12px; background-color: #ffffff;">
          <div style="border-bottom: 2px solid #3894B3; padding-bottom: 12px; margin-bottom: 20px;">
            <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #3894B3; font-weight: bold;">New Portfolio Reach-Out</span>
            <h2 style="margin: 6px 0 0 0; color: #1B2127; font-size: 20px; font-weight: 700;">${cleanSubject}</h2>
          </div>

          <div style="background-color: #F6F8FA; border: 1px solid #D0D7DE; padding: 16px; border-radius: 8px; margin-bottom: 20px; font-size: 13px; line-height: 1.6; color: #24292F;">
            <p style="margin: 0 0 8px 0;"><strong>Sender:</strong> ${cleanName}</p>
            <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${cleanEmail}" style="color: #3894B3; text-decoration: none; font-weight: 600;">${cleanEmail}</a></p>
            <p style="margin: 0;"><strong>Timestamp:</strong> ${new Date().toUTCString()}</p>
          </div>

          <div style="margin-bottom: 24px;">
            <h3 style="font-size: 12px; text-transform: uppercase; color: #57606A; margin: 0 0 8px 0; letter-spacing: 0.5px;">Inquiry Message:</h3>
            <div style="background-color: #ffffff; padding: 16px; border: 1px solid #D0D7DE; border-radius: 8px; font-size: 14px; line-height: 1.7; color: #1B2127; white-space: pre-wrap;">${cleanMessage}</div>
          </div>

          ${
            attachment
              ? `
          <div style="padding: 12px 16px; background-color: #EBF6F9; border: 1px solid #A0D8E9; border-radius: 8px; font-size: 12px; color: #2B6D83; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
            <span>📎</span>
            <span><strong>Attached File:</strong> ${attachment.filename}</span>
          </div>
          `
              : ""
          }

          <div style="font-size: 11px; color: #8C959F; border-top: 1px solid #E1E6EB; padding-top: 12px;">
            💡 Simply click <strong>Reply</strong> in your email app to reply directly to ${cleanEmail}.
          </div>
        </div>
      `,
    };

    if (attachment && attachment.content && attachment.filename) {
      resendPayload.attachments = [
        {
          filename: attachment.filename,
          content: attachment.content,
        },
      ];
    }

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resendPayload),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend API delivery error:", errText);
      throw new Error(`Email provider error: ${errText}`);
    }

    const resendData = await resendRes.json();

    // 4. Save to contact_messages in Supabase for Admin records
    const noteWithAttachment = attachment
      ? `${cleanMessage}\n\n[Attachment: ${attachment.filename}]`
      : cleanMessage;

    await supabase.from("contact_messages").insert({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: noteWithAttachment,
      status: "unread",
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Your message has been delivered to Vincent.",
        id: resendData.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error processing contact email:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "An unexpected error occurred while delivering your message.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
