#!/usr/bin/env node
/**
 * Google Analytics 4 - Data Pull Script
 * Zagroda Alpakoterapii
 *
 * Pulls traffic, demographics, landing pages, and events from GA4.
 * Saves results to .agent/data/
 *
 * SETUP: See .agent/scripts/README.md before running.
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'data');

// ─── CONFIG ────────────────────────────────────────────────────────────────
const PROPERTY_ID = process.env.GA4_PROPERTY_ID; // e.g. "properties/123456789"
const DAYS_BACK = parseInt(process.env.GA4_DAYS_BACK || '30');
const CREDENTIALS_FILE = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!PROPERTY_ID) {
    console.error('❌ Missing GA4_PROPERTY_ID in environment.');
    process.exit(1);
}
if (!CREDENTIALS_FILE) {
    console.error('❌ Missing GOOGLE_APPLICATION_CREDENTIALS in environment.');
    process.exit(1);
}

const today = new Date();
const since = new Date(today);
since.setDate(since.getDate() - DAYS_BACK);
const startDate = since.toISOString().split('T')[0];
const endDate = today.toISOString().split('T')[0];

const analyticsDataClient = new BetaAnalyticsDataClient();

// ─── HELPERS ───────────────────────────────────────────────────────────────
function toCSV(headers, rows) {
    const lines = [headers.join(',')];
    for (const row of rows) {
        lines.push(row.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','));
    }
    return lines.join('\n');
}

function saveCSV(filename, headers, rows) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    const file = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(file, toCSV(headers, rows), 'utf8');
    console.log(`✅ Saved ${rows.length} rows → ${file}`);
}

function parseReport(response) {
    const headers = [
        ...response.dimensionHeaders.map(h => h.name),
        ...response.metricHeaders.map(h => h.name),
    ];
    const rows = response.rows.map(row => [
        ...row.dimensionValues.map(v => v.value),
        ...row.metricValues.map(v => v.value),
    ]);
    return { headers, rows };
}

// ─── 1. TRAFFIC ACQUISITION ────────────────────────────────────────────────
async function pullTrafficAcquisition() {
    console.log('\n📢 Pulling traffic acquisition...');
    const [response] = await analyticsDataClient.runReport({
        property: PROPERTY_ID,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }, { name: 'sessionSourceMedium' }],
        metrics: [
            { name: 'sessions' },
            { name: 'activeUsers' },
            { name: 'engagementRate' },
            { name: 'averageSessionDuration' },
            { name: 'bounceRate' },
        ],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 50,
    });
    const { headers, rows } = parseReport(response);
    saveCSV(`ga4_traffic_${startDate}_to_${endDate}.csv`, headers, rows);
}

// ─── 2. COUNTRY DEMOGRAPHICS ───────────────────────────────────────────────
async function pullCountries() {
    console.log('\n🌍 Pulling country demographics...');
    const [response] = await analyticsDataClient.runReport({
        property: PROPERTY_ID,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'country' }, { name: 'city' }],
        metrics: [
            { name: 'activeUsers' },
            { name: 'newUsers' },
            { name: 'engagedSessions' },
            { name: 'engagementRate' },
            { name: 'averageSessionDuration' },
        ],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 50,
    });
    const { headers, rows } = parseReport(response);
    saveCSV(`ga4_countries_${startDate}_to_${endDate}.csv`, headers, rows);
}

// ─── 3. LANDING PAGES ──────────────────────────────────────────────────────
async function pullLandingPages() {
    console.log('\n📄 Pulling landing pages...');
    const [response] = await analyticsDataClient.runReport({
        property: PROPERTY_ID,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'landingPage' }],
        metrics: [
            { name: 'sessions' },
            { name: 'activeUsers' },
            { name: 'newUsers' },
            { name: 'averageSessionDuration' },
            { name: 'bounceRate' },
            { name: 'keyEvents' },
        ],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 50,
    });
    const { headers, rows } = parseReport(response);
    saveCSV(`ga4_landing_pages_${startDate}_to_${endDate}.csv`, headers, rows);
}

// ─── 4. KEY EVENTS / CONVERSIONS ───────────────────────────────────────────
async function pullEvents() {
    console.log('\n🎯 Pulling events...');
    const [response] = await analyticsDataClient.runReport({
        property: PROPERTY_ID,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'eventName' }],
        metrics: [
            { name: 'eventCount' },
            { name: 'totalUsers' },
            { name: 'eventCountPerUser' },
        ],
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
        limit: 50,
    });
    const { headers, rows } = parseReport(response);
    saveCSV(`ga4_events_${startDate}_to_${endDate}.csv`, headers, rows);
}

// ─── MAIN ──────────────────────────────────────────────────────────────────
console.log(`\n🦙 GA4 Data Pull — ${startDate} to ${endDate}`);
console.log(`   Property: ${PROPERTY_ID}`);

try {
    await pullTrafficAcquisition();
    await pullCountries();
    await pullLandingPages();
    await pullEvents();
    console.log(`\n✨ Done! Files saved to: ${OUTPUT_DIR}`);
    console.log('   Tell your AI agent: "analyse the latest ads data"');
} catch (err) {
    console.error('\n❌ Error:', err.message);
    process.exit(1);
}
