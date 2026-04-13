export async function logEvent(event: {
  type: 'page_view' | 'calculator_used' | 'compare_used' | 'search';
  data: Record<string, unknown>;
}) {
  if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) return;
  try {
    await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...event, ts: new Date().toISOString(), project: 'rent-vs-buy-now' }),
    });
  } catch { /* non-blocking */ }
}
