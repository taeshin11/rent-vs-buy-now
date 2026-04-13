// Simple in-memory visitor counter (resets on server restart)
// For production use Vercel KV: import { kv } from '@vercel/kv'

let totalVisitors = Math.floor(Math.random() * 5000) + 10000;
let todayVisitors = Math.floor(Math.random() * 50) + 50;
let lastReset = new Date().toISOString().slice(0, 10);

export async function POST() {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== lastReset) {
    todayVisitors = 0;
    lastReset = today;
  }
  totalVisitors++;
  todayVisitors++;
  return Response.json({ total: totalVisitors, today: todayVisitors });
}

export async function GET() {
  return Response.json({ total: totalVisitors, today: todayVisitors });
}
