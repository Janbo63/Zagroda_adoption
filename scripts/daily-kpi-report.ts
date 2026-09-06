/**
 * Daily KPI Report — Pulls GA4 data from Stef Dashboard and posts a summary
 *
 * Run: npx tsx scripts/daily-kpi-report.ts
 * Schedule: cron every day at 06:00 CEST
 *
 * Fetches from: https://stef.futuresolutionsai.com/api/kpis?project=zagroda&refresh=true
 * Posts to:     https://stef.futuresolutionsai.com/api/logs
 */

const STEF_KPI_URL = 'https://stef.futuresolutionsai.com/api/kpis?project=zagroda&refresh=true';
const STEF_LOG_URL = 'https://stef.futuresolutionsai.com/api/logs';
const STEF_LOG_KEY = 'fs-log-key-2026';
const APP_NAME = 'zagroda-website';

interface KpiPeriod {
  visitors: number;
  sessions: number;
  avgEngagement: number;
  bounceRate: number;
}

interface TopPage {
  path: string;
  views: number;
  avgEngagement: number;
}

interface TrafficSource {
  source: string;
  medium: string;
  sessions: number;
}

interface Ecommerce {
  purchases: number;
  revenue: number;
  addToCarts: number;
  checkouts: number;
}

interface KpiData {
  configured: boolean;
  project: string;
  data: {
    today: KpiPeriod;
    week: KpiPeriod;
    month: KpiPeriod;
    previousToday: KpiPeriod;
    previousWeek: KpiPeriod;
    previousMonth: KpiPeriod;
    topPages: TopPage[];
    trafficSources: TrafficSource[];
    ecommerce: Ecommerce;
    previousEcommerce: Ecommerce;
    fetchedAt: string;
  };
}

function formatDelta(current: number, previous: number): string {
  if (previous === 0) return current > 0 ? `+${current} (new)` : '—';
  const delta = current - previous;
  const pct = Math.round((delta / previous) * 100);
  const sign = delta >= 0 ? '+' : '';
  return `${sign}${delta} (${sign}${pct}%)`;
}

async function postLog(level: 'info' | 'warn' | 'error', message: string, metadata?: Record<string, unknown>) {
  try {
    const res = await fetch(STEF_LOG_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': STEF_LOG_KEY },
      body: JSON.stringify({ app: APP_NAME, level, message, metadata }),
    });
    if (!res.ok) {
      console.error(`[stef-log] POST failed: ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error('[stef-log] Failed to send log:', err);
  }
}

async function main() {
  console.log(`[${new Date().toISOString()}] Fetching KPI data...`);

  const res = await fetch(STEF_KPI_URL);
  if (!res.ok) {
    const msg = `❌ KPI fetch failed: ${res.status} ${res.statusText}`;
    console.error(msg);
    await postLog('error', msg);
    process.exit(1);
  }

  const kpi: KpiData = await res.json();

  if (!kpi.configured) {
    await postLog('error', '❌ GA4 not configured for zagroda project on Stef Dashboard');
    process.exit(1);
  }

  const d = kpi.data;

  // Top pages summary
  const topPagesStr = d.topPages.length > 0
    ? d.topPages.slice(0, 5).map((p, i) => `${i + 1}. ${p.path} (${p.views} views)`).join(' | ')
    : 'No page data available';

  // Traffic sources summary
  const sourcesStr = d.trafficSources.length > 0
    ? d.trafficSources.slice(0, 5).map(s => `${s.source}/${s.medium}: ${s.sessions}`).join(' | ')
    : 'No source data available';

  // Build the summary
  const lines = [
    `📊 Zagroda Daily KPI Report — ${new Date().toLocaleDateString('pl-PL')}`,
    ``,
    `── Today ──`,
    `  Visitors: ${d.today.visitors} (vs yesterday: ${formatDelta(d.today.visitors, d.previousToday.visitors)})`,
    `  Sessions: ${d.today.sessions} (vs yesterday: ${formatDelta(d.today.sessions, d.previousToday.sessions)})`,
    `  Bounce: ${Math.round(d.today.bounceRate * 100)}%`,
    ``,
    `── This Week (7d) ──`,
    `  Visitors: ${d.week.visitors} (vs prev week: ${formatDelta(d.week.visitors, d.previousWeek.visitors)})`,
    `  Sessions: ${d.week.sessions} (vs prev week: ${formatDelta(d.week.sessions, d.previousWeek.sessions)})`,
    `  Avg Engagement: ${d.week.avgEngagement}s`,
    `  Bounce: ${Math.round(d.week.bounceRate * 100)}%`,
    ``,
    `── This Month (30d) ──`,
    `  Visitors: ${d.month.visitors} (vs prev month: ${formatDelta(d.month.visitors, d.previousMonth.visitors)})`,
    `  Sessions: ${d.month.sessions} (vs prev month: ${formatDelta(d.month.sessions, d.previousMonth.sessions)})`,
    `  Avg Engagement: ${d.month.avgEngagement}s`,
    `  Bounce: ${Math.round(d.month.bounceRate * 100)}%`,
    ``,
    `── Ecommerce ──`,
    `  Checkouts: ${d.ecommerce.checkouts} (prev: ${d.previousEcommerce.checkouts})`,
    `  Add to Cart: ${d.ecommerce.addToCarts} (prev: ${d.previousEcommerce.addToCarts})`,
    `  Purchases: ${d.ecommerce.purchases} (prev: ${d.previousEcommerce.purchases})`,
    `  Revenue: PLN ${d.ecommerce.revenue}`,
    ``,
    `── Top Pages ──`,
    `  ${topPagesStr}`,
    ``,
    `── Traffic Sources ──`,
    `  ${sourcesStr}`,
    ``,
    `Data fetched: ${d.fetchedAt}`,
  ];

  const summary = lines.join('\n');

  console.log(summary);

  // Determine log level based on alerts
  let level: 'info' | 'warn' = 'info';
  if (d.today.visitors === 0 && d.week.visitors === 0) {
    level = 'warn'; // No traffic at all — may indicate tracking issue
  }

  await postLog(level, summary, {
    today: d.today,
    week: d.week,
    month: d.month,
    ecommerce: d.ecommerce,
    topPages: d.topPages.slice(0, 5),
    trafficSources: d.trafficSources.slice(0, 5),
  });

  console.log(`✅ Report posted to Stef Dashboard (level: ${level})`);
}

main().catch(async (err) => {
  console.error('Fatal error:', err);
  await postLog('error', `❌ Daily KPI report crashed: ${err.message}`);
  process.exit(1);
});
