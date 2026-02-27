#!/usr/bin/env node
/**
 * Meta Marketing API - Data Pull Script
 * Zagroda Alpakoterapii
 *
 * Pulls campaign performance + audience breakdowns and saves to .agent/data/
 *
 * SETUP: See .agent/scripts/README.md before running.
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'data');

// ─── CONFIG ────────────────────────────────────────────────────────────────
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID; // e.g. "act_123456789"
const DAYS_BACK = parseInt(process.env.META_DAYS_BACK || '30');

if (!ACCESS_TOKEN || !AD_ACCOUNT_ID) {
    console.error('❌ Missing META_ACCESS_TOKEN or META_AD_ACCOUNT_ID in environment.');
    console.error('   Copy .env.example to .env and fill in your credentials.');
    process.exit(1);
}

const today = new Date();
const since = new Date(today);
since.setDate(since.getDate() - DAYS_BACK);
const dateRange = {
    since: since.toISOString().split('T')[0],
    until: today.toISOString().split('T')[0],
};

const BASE_URL = 'https://graph.facebook.com/v19.0';

// ─── HELPERS ───────────────────────────────────────────────────────────────
async function metaGet(endpoint, params = {}) {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    url.searchParams.set('access_token', ACCESS_TOKEN);
    for (const [k, v] of Object.entries(params)) {
        url.searchParams.set(k, typeof v === 'object' ? JSON.stringify(v) : v);
    }
    const res = await fetch(url.toString());
    const json = await res.json();
    if (json.error) throw new Error(`Meta API error: ${json.error.message}`);
    return json;
}

function toCSV(rows) {
    if (!rows.length) return '';
    const headers = Object.keys(rows[0]);
    const lines = [headers.join(',')];
    for (const row of rows) {
        lines.push(headers.map(h => `"${String(row[h] ?? '').replace(/"/g, '""')}"`).join(','));
    }
    return lines.join('\n');
}

function saveCSV(filename, rows) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    const file = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(file, toCSV(rows), 'utf8');
    console.log(`✅ Saved ${rows.length} rows → ${file}`);
}

// ─── 1. CAMPAIGN OVERVIEW ──────────────────────────────────────────────────
async function pullCampaigns() {
    console.log('\n📊 Pulling campaign overview...');
    const fields = [
        'campaign_name', 'adset_name', 'ad_name',
        'reach', 'impressions', 'frequency',
        'spend', 'cpm', 'cpp',
        'video_thruplay_watched_actions',
        'actions', 'cost_per_action_type',
        'clicks', 'ctr', 'cpc',
    ].join(',');

    const data = await metaGet(`${AD_ACCOUNT_ID}/insights`, {
        fields,
        level: 'adset',
        time_range: dateRange,
        limit: 200,
    });

    const rows = (data.data || []).map(d => ({
        campaign: d.campaign_name,
        adset: d.adset_name,
        reach: d.reach,
        impressions: d.impressions,
        frequency: d.frequency,
        spend_pln: d.spend,
        cpm: d.cpm,
        clicks: d.clicks,
        ctr: d.ctr,
        cpc: d.cpc,
        thruplay: d.video_thruplay_watched_actions?.[0]?.value ?? 0,
        date_from: dateRange.since,
        date_to: dateRange.until,
    }));

    saveCSV(`meta_campaigns_${dateRange.since}_to_${dateRange.until}.csv`, rows);
}

// ─── 2. BREAKDOWN BY COUNTRY ───────────────────────────────────────────────
async function pullCountryBreakdown() {
    console.log('\n🌍 Pulling country breakdown...');
    const data = await metaGet(`${AD_ACCOUNT_ID}/insights`, {
        fields: 'campaign_name,reach,impressions,spend,actions',
        level: 'campaign',
        breakdowns: 'country',
        time_range: dateRange,
        limit: 500,
    });

    const rows = (data.data || []).map(d => ({
        campaign: d.campaign_name,
        country: d.country,
        reach: d.reach,
        impressions: d.impressions,
        spend_pln: d.spend,
    }));

    saveCSV(`meta_by_country_${dateRange.since}_to_${dateRange.until}.csv`, rows);
}

// ─── 3. BREAKDOWN BY AGE & GENDER ─────────────────────────────────────────
async function pullDemographics() {
    console.log('\n👥 Pulling age & gender breakdown...');
    const data = await metaGet(`${AD_ACCOUNT_ID}/insights`, {
        fields: 'campaign_name,reach,impressions,spend',
        level: 'campaign',
        breakdowns: 'age,gender',
        time_range: dateRange,
        limit: 500,
    });

    const rows = (data.data || []).map(d => ({
        campaign: d.campaign_name,
        age: d.age,
        gender: d.gender,
        reach: d.reach,
        impressions: d.impressions,
        spend_pln: d.spend,
    }));

    saveCSV(`meta_by_demographics_${dateRange.since}_to_${dateRange.until}.csv`, rows);
}

// ─── MAIN ──────────────────────────────────────────────────────────────────
console.log(`\n🦙 Meta Ads Pull — ${dateRange.since} to ${dateRange.until}`);
console.log(`   Account: ${AD_ACCOUNT_ID}`);

try {
    await pullCampaigns();
    await pullCountryBreakdown();
    await pullDemographics();
    console.log(`\n✨ Done! Files saved to: ${OUTPUT_DIR}`);
    console.log('   Tell your AI agent: "analyse the latest ads data"');
} catch (err) {
    console.error('\n❌ Error:', err.message);
    process.exit(1);
}
