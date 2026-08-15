import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const body = await req.json().catch(() => ({}));

    console.log('[Hostinger Agentic Mail Webhook]', {
      authHeader: authHeader ? 'Bearer token present' : 'No auth header',
      body,
    });

    // Extract message fields from Hostinger webhook payload
    const event = body.event || body.type || 'message.received';
    const sender = body.sender || body.from || 'unknown';
    const subject = body.subject || '(No Subject)';
    const snippet = body.message || body.snippet || body.text || '';

    console.log(`[Hostinger Mail] New inbound message received from: ${sender}, Subject: "${subject}"`);

    // Optional: Log to Stef Dashboard if configured
    try {
      const STEF_LOG_URL = process.env.STEF_LOG_URL || 'https://stef.futuresolutionsai.com/api/logs';
      const STEF_LOG_KEY = process.env.STEF_LOG_KEY || 'fs-log-key-2026';
      
      await fetch(STEF_LOG_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': STEF_LOG_KEY },
        body: JSON.stringify({
          app: 'zagroda-mail-webhook',
          level: 'info',
          message: `Inbound Email from ${sender}: ${subject}`,
          metadata: { sender, subject, snippet, event, raw: body },
        }),
      }).catch(() => {});
    } catch {
      // Non-blocking log failure
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Webhook processed successfully',
        receivedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Hostinger Agentic Mail Webhook Error]', errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    endpoint: 'Hostinger Agentic Mail Webhook',
    timestamp: new Date().toISOString(),
  });
}
