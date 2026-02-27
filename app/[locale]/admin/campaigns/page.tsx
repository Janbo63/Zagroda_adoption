import React from 'react';
import fs from 'fs';
import path from 'path';
import { RefreshCw } from 'lucide-react';
import { RunScriptButton } from './RunScriptButton';

export const dynamic = 'force-dynamic';

// ─── Types ───────────────────────────────────────────────────────────────────

interface TrafficChannel {
    channel: string;
    source: string;
    sessions: number;
    users: number;
    pct: number;
    engagement_rate: number;
    avg_duration_s: number;
}

interface CountryData {
    country: string;
    users: number;
}

interface CampaignRow {
    lang: string;
    total: number;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    first_sent: string | null;
    last_event: string | null;
}

interface OutreachData {
    exported_at?: string;
    summary?: {
        total: number;
        by_status: Record<string, number>;
        by_lang: Record<string, number>;
        by_category: Record<string, number>;
    };
    campaigns?: CampaignRow[];
    ga4?: {
        traffic?: { total_sessions: number; channels: TrafficChannel[] };
        countries?: CountryData[];
    };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtDuration(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
}

function pct(num: number, denom: number): string {
    if (!denom) return '0%';
    return `${Math.round((num / denom) * 100)}%`;
}

const LANG_LABEL: Record<string, string> = {
    PL: '🇵🇱 Polish',
    CZ: '🇨🇿 Czech',
    NL: '🇳🇱 Dutch/BE',
    EN: '🇬🇧 English',
};

const LANG_COLOR: Record<string, { bar: string; bg: string; text: string }> = {
    PL: { bar: '#f59e0b', bg: 'rgba(245,158,11,0.12)', text: '#fbbf24' },
    CZ: { bar: '#3b82f6', bg: 'rgba(59,130,246,0.12)', text: '#60a5fa' },
    NL: { bar: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', text: '#a78bfa' },
    EN: { bar: '#10b981', bg: 'rgba(16,185,129,0.12)', text: '#34d399' },
};

const CHANNEL_COLOR: Record<string, string> = {
    'Organic Search': '#10b981',
    'Paid Social': '#3b82f6',
    'Direct': '#6b7280',
    'Organic Social': '#8b5cf6',
    'Referral': '#f59e0b',
    'Paid Search': '#eab308',
    'Unassigned': '#374151',
};

const COUNTRY_FLAG: Record<string, string> = {
    Poland: '🇵🇱', Belgium: '🇧🇪', Netherlands: '🇳🇱',
    Germany: '🇩🇪', Czechia: '🇨🇿', 'United Kingdom': '🇬🇧',
    'United States': '🇺🇸', France: '🇫🇷', Sweden: '🇸🇪',
    Norway: '🇳🇴', Denmark: '🇩🇰',
};

// ─── Data Loading ─────────────────────────────────────────────────────────────

async function getCampaignData(): Promise<OutreachData> {
    try {
        const dataPath = path.join(process.cwd(), 'data', 'outreach_data.json');
        if (fs.existsSync(dataPath)) {
            return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        }
    } catch (err) {
        console.error('Error reading campaign data:', err);
    }
    return {};
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, color }: {
    label: string; value: string | number; sub?: string; color: string;
}) {
    return (
        <div style={{
            background: '#1a1d27',
            border: '1px solid #2a2d3a',
            borderRadius: 10,
            padding: '14px 16px',
            minWidth: 0,
        }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                {label}
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color, lineHeight: 1.1 }}>{value}</div>
            {sub && <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>{sub}</div>}
        </div>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
            {children}
        </div>
    );
}

function FunnelBar({ label, value, max, color, sub }: {
    label: string; value: number; max: number; color: string; sub?: string;
}) {
    const pctVal = max > 0 ? Math.round((value / max) * 100) : 0;
    return (
        <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
                <span style={{ color: '#d1d5db' }}>{label}</span>
                <span style={{ color, fontWeight: 700 }}>{value} <span style={{ color: '#6b7280', fontWeight: 400 }}>({pctVal}%)</span></span>
            </div>
            <div style={{ background: '#2a2d3a', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                <div style={{ background: color, height: '100%', width: `${pctVal}%`, borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            {sub && <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{sub}</div>}
        </div>
    );
}

function Panel({ title, children, style }: {
    title: string; children: React.ReactNode; style?: React.CSSProperties;
}) {
    return (
        <div style={{
            background: '#1a1d27',
            border: '1px solid #2a2d3a',
            borderRadius: 10,
            padding: '18px 20px',
            ...style,
        }}>
            <SectionTitle>{title}</SectionTitle>
            {children}
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CampaignsDashboard() {
    const data = await getCampaignData();
    const ga4 = data.ga4 || {};
    const traffic = ga4.traffic;
    const countries = ga4.countries || [];
    const outreach = data.summary || { total: 0, by_status: {}, by_lang: {}, by_category: {} };
    const campaigns: CampaignRow[] = data.campaigns || [];

    const exportedAt = data.exported_at
        ? new Date(data.exported_at).toLocaleString('en-GB', {
            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
        })
        : null;

    // === Direct channel KPIs ===
    const totalSessions = traffic?.total_sessions ?? 0;
    const paidSessions = traffic?.channels?.filter(c => c.channel.includes('Paid')).reduce((a, c) => a + c.sessions, 0) ?? 0;
    const organicSessions = traffic?.channels?.filter(c => c.channel === 'Organic Search').reduce((a, c) => a + c.sessions, 0) ?? 0;
    const topChannel = traffic?.channels?.[0] ?? null;

    // === Partner outreach KPIs ===
    const totalContacts = outreach.total;
    const sentCount = outreach.by_status['Sent'] ?? 0;
    const repliedCount = outreach.by_status['Replied'] ?? 0;
    const interestedCount = outreach.by_status['Interested'] ?? 0;
    const listedCount = outreach.by_status['Listed'] ?? 0;
    const declinedCount = outreach.by_status['Declined'] ?? 0;
    const bouncedCount = outreach.by_status['Bounced'] ?? 0;
    const newCount = outreach.by_status['New'] ?? 0;

    // Aggregate email engagement across all campaigns
    const totalSent = campaigns.reduce((a, c) => a + (c.sent || 0), 0);
    const totalDelivered = campaigns.reduce((a, c) => a + (c.delivered || 0), 0);
    const totalOpened = campaigns.reduce((a, c) => a + (c.opened || 0), 0);
    const totalClicked = campaigns.reduce((a, c) => a + (c.clicked || 0), 0);
    const totalBounced = campaigns.reduce((a, c) => a + (c.bounced || 0), 0);
    const engaged = repliedCount + interestedCount + listedCount;

    const panelStyle: React.CSSProperties = {
        background: '#0f1117',
        border: '1px solid #2a2d3a',
        borderRadius: 12,
        padding: 24,
    };

    return (
        <div style={{ background: '#0f1117', minHeight: '100vh', color: '#e2e4ec', fontFamily: 'Inter, system-ui, sans-serif', fontSize: 14 }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <span style={{ fontSize: 22 }}>🦙</span>
                <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#e2e4ec' }}>Campaign Intelligence</h2>
                    <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>Both funnels in one place — direct & partner channels</p>
                </div>
                {exportedAt && (
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280', background: '#1a1d27', border: '1px solid #2a2d3a', padding: '6px 12px', borderRadius: 8 }}>
                        <RefreshCw size={12} />
                        Updated {exportedAt}
                    </div>
                )}
            </div>

            {/* ── Top KPI Strip ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginBottom: 24 }}>
                <KpiCard label="Total Sessions" value={totalSessions || '—'} sub="Last 30 days · GA4" color="#10b981" />
                <KpiCard label="Paid Traffic" value={paidSessions || '—'} sub="Meta + Google Ads" color="#3b82f6" />
                <KpiCard label="Organic Search" value={organicSessions || '—'} sub="Google / Bing" color="#8b5cf6" />
                <KpiCard label="Partners Sourced" value={totalContacts} sub={`${newCount} pending · ${sentCount} emailed`} color="#f59e0b" />
                <KpiCard label="Emails Sent" value={totalSent} sub={`${totalDelivered} delivered`} color="#4fb8a0" />
                <KpiCard label="Opened" value={totalOpened} sub={totalSent ? `${pct(totalOpened, totalSent)} open rate` : '—'} color="#f59e0b" />
                <KpiCard label="Clicked" value={totalClicked} sub={totalSent ? `${pct(totalClicked, totalSent)} CTR` : '—'} color="#ec4899" />
                <KpiCard label="Engaged" value={engaged} sub="Replied / Interested / Listed" color="#22c55e" />
            </div>

            {/* ── Pipeline Operations Flow ── */}
            <div style={{ ...panelStyle, marginBottom: 24 }}>
                <SectionTitle>⚙️ Partner Outreach Automation Flow (Manual Execution Required)</SectionTitle>

                {/* Pipeline Steps Graphic */}
                <div style={{ display: 'flex', alignItems: 'stretch', gap: 16, overflowX: 'auto', paddingBottom: 10, marginBottom: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <RunScriptButton
                            baseCommand="python prospect_agent.py"
                            description="Searches Google for new partner websites using Gemini AI."
                            icon="🔍"
                            requireInput={true}
                            inputPlaceholder="Search query (e.g. noclegi góry izerskie)"
                            defaultInputValue='"vakantiehuis met kinderen reuzengebergte" --lang NL'
                        />
                        <RunScriptButton
                            baseCommand="python auto_prospect.py"
                            description="Run 20-hour auto-search loop"
                            icon="🤖"
                            requireInput={false}
                            highlight={true}
                            runInBackground={true}
                        />
                    </div>
                    <div style={{ color: '#4b5563', fontSize: 24, alignSelf: 'center' }}>→</div>

                    <RunScriptButton
                        baseCommand="python import_agent_leads.py"
                        description="Loads new leads from the CSV into the outreach database."
                        icon="📥"
                    />
                    <div style={{ color: '#4b5563', fontSize: 24, alignSelf: 'center' }}>→</div>

                    <RunScriptButton
                        baseCommand="python send_outreach.py"
                        description="Sends initial outreach emails to contacts in 'New' status."
                        icon="📤"
                        highlight={newCount > 0}
                        requireInput={true}
                        inputPlaceholder="--csv ../contacts/clean/target.csv"
                        defaultInputValue="--csv ../contacts/clean/nl_be_targets.csv"
                    />
                    <div style={{ color: '#4b5563', fontSize: 24, alignSelf: 'center' }}>→</div>

                    <RunScriptButton
                        baseCommand="python monitor_replies.py"
                        description="Checks Inbox for replies and uses AI to draft exact responses."
                        icon="👀"
                    />
                    <div style={{ color: '#4b5563', fontSize: 24, alignSelf: 'center' }}>→</div>

                    <RunScriptButton
                        baseCommand="python send_draft.py --send-approved"
                        description="Sends all AI drafted replies that you have approved."
                        icon="💬"
                    />
                </div>

                {/* Automation Action Alerts — Per-language Send Buttons */}
                {newCount > 0 && (
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        {campaigns.filter(c => c.total > c.sent).map(c => {
                            const pending = c.total - c.sent;
                            return (
                                <RunScriptButton
                                    key={c.lang}
                                    baseCommand="python send_outreach.py"
                                    description={`${pending} ${LANG_LABEL[c.lang] || c.lang} emails ready`}
                                    icon="📨"
                                    highlight={true}
                                    requireInput={false}
                                    defaultInputValue={`--lang ${c.lang}`}
                                />
                            );
                        })}
                        {/* Global send-all button */}
                        <RunScriptButton
                            baseCommand="python send_outreach.py"
                            description={`Send ALL ${newCount} pending emails (all languages)`}
                            icon="🚀"
                            highlight={true}
                            requireInput={false}
                        />
                    </div>
                )}
            </div>

            {/* ── Two-Column Funnel Layout ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

                {/* ════ LEFT: DIRECT CHANNEL FUNNEL ════ */}
                <div style={{ ...panelStyle, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ borderBottom: '1px solid #2a2d3a', paddingBottom: 12, marginBottom: 4 }}>
                        <div style={{ fontSize: 15, fontWeight: 800, color: '#e2e4ec', display: 'flex', alignItems: 'center', gap: 8 }}>
                            📡 Direct Channel Funnel
                        </div>
                        <div style={{ fontSize: 12, color: '#6b7280', marginTop: 3 }}>
                            GA4 traffic → website → booking widget
                        </div>
                    </div>

                    {/* GA4 Traffic Channels */}
                    <div>
                        <SectionTitle>Traffic by Channel</SectionTitle>
                        {traffic?.channels.length ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {traffic.channels.map((ch, i) => {
                                    const color = CHANNEL_COLOR[ch.channel] || '#6b7280';
                                    return (
                                        <div key={i}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, fontSize: 12 }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
                                                    <span style={{ color: '#d1d5db', fontWeight: 600 }}>{ch.channel}</span>
                                                    <span style={{ color: '#4b5563', fontSize: 11 }}>{ch.source}</span>
                                                </span>
                                                <span style={{ display: 'flex', gap: 14, color: '#9ca3af' }}>
                                                    <span style={{ color: '#e2e4ec', fontWeight: 700 }}>{ch.sessions}</span>
                                                    <span>{ch.engagement_rate}% eng</span>
                                                    <span>{fmtDuration(ch.avg_duration_s)}</span>
                                                    <span style={{ color, fontWeight: 700, minWidth: 32, textAlign: 'right' }}>{ch.pct}%</span>
                                                </span>
                                            </div>
                                            <div style={{ background: '#2a2d3a', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                                                <div style={{ background: color, height: '100%', width: `${ch.pct}%`, borderRadius: 4 }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{ color: '#4b5563', fontSize: 12, padding: '16px 0' }}>No GA4 data — run export_for_dashboard.py</div>
                        )}
                    </div>

                    {/* Countries */}
                    {countries.length > 0 && (
                        <div>
                            <SectionTitle>Visitors by Country</SectionTitle>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                                {countries.map((c, i) => {
                                    const max = countries[0]?.users || 1;
                                    const pctVal = Math.round((c.users / max) * 100);
                                    return (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <span style={{ fontSize: 16, flexShrink: 0 }}>{COUNTRY_FLAG[c.country] || '🌍'}</span>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, fontSize: 12 }}>
                                                    <span style={{ color: '#d1d5db', fontWeight: 500 }}>{c.country}</span>
                                                    <span style={{ color: '#9ca3af' }}>{c.users} users</span>
                                                </div>
                                                <div style={{ background: '#2a2d3a', borderRadius: 3, height: 5, overflow: 'hidden' }}>
                                                    <div style={{ background: '#3b82f6', height: '100%', width: `${pctVal}%`, borderRadius: 3 }} />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Booking Widget Funnel (static, from book_logs analysis) */}
                    <div>
                        <SectionTitle>Booking Widget — Bottom of Funnel (Feb 2026)</SectionTitle>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            {[
                                { label: 'Widget Sessions', value: 24, icon: '📲' },
                                { label: 'Unique Visitors', value: 21, icon: '👤' },
                                { label: 'Countries', value: 9, icon: '🌍' },
                                { label: 'Viewed Prices', value: 9, icon: '💰' },
                                { label: 'High Engagement (>3 events)', value: 5, icon: '🔥' },
                                { label: 'NL/BE Sessions', value: 3, icon: '🇳🇱' },
                            ].map((item, i) => (
                                <div key={i} style={{ background: '#0f1117', border: '1px solid #2a2d3a', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                                    <div>
                                        <div style={{ fontSize: 20, fontWeight: 800, color: '#4fb8a0', lineHeight: 1.1 }}>{item.value}</div>
                                        <div style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.3 }}>{item.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ fontSize: 11, color: '#4b5563', marginTop: 10 }}>
                            📄 Source: book_logs_20260225.csv · Use Microsoft Clarity + Meta Events Manager for live data
                        </div>
                    </div>
                </div>

                {/* ════ RIGHT: PARTNER OUTREACH FUNNEL ════ */}
                <div style={{ ...panelStyle, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ borderBottom: '1px solid #2a2d3a', paddingBottom: 12, marginBottom: 4 }}>
                        <div style={{ fontSize: 15, fontWeight: 800, color: '#e2e4ec', display: 'flex', alignItems: 'center', gap: 8 }}>
                            📨 Partner Outreach Funnel
                        </div>
                        <div style={{ fontSize: 12, color: '#6b7280', marginTop: 3 }}>
                            Prospecting → email → engagement → listing/referral
                        </div>
                    </div>

                    {/* Overall funnel */}
                    <div>
                        <SectionTitle>Overall Funnel Progress</SectionTitle>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <FunnelBar label="Sourced / In Pipeline" value={totalContacts} max={totalContacts} color="#6b7280" />
                            <FunnelBar label="Email Sent" value={totalSent} max={totalContacts} color="#3b82f6" />
                            <FunnelBar label="Delivered" value={totalDelivered} max={totalContacts} color="#4fb8a0" />
                            <FunnelBar label="Opened" value={totalOpened} max={totalContacts} color="#f59e0b" sub={totalDelivered ? `${pct(totalOpened, totalDelivered)} of delivered` : undefined} />
                            <FunnelBar label="Clicked" value={totalClicked} max={totalContacts} color="#ec4899" sub={totalDelivered ? `${pct(totalClicked, totalDelivered)} of delivered` : undefined} />
                            <FunnelBar label="Engaged (Replied / Interested / Listed)" value={engaged} max={totalContacts} color="#22c55e" />
                            {declinedCount > 0 && <FunnelBar label="Declined" value={declinedCount} max={totalContacts} color="#ef4444" />}
                            {bouncedCount > 0 && <FunnelBar label="Bounced" value={bouncedCount} max={totalContacts} color="#374151" />}
                        </div>
                    </div>

                    {/* Per-language campaign cards */}
                    <div>
                        <SectionTitle>By Language Campaign</SectionTitle>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {campaigns.length > 0 ? campaigns.map((c) => {
                                const colors = LANG_COLOR[c.lang] || { bar: '#6b7280', bg: 'rgba(107,114,128,0.1)', text: '#9ca3af' };
                                const openRate = c.sent ? Math.round((c.opened / c.sent) * 100) : 0;
                                const clickRate = c.sent ? Math.round((c.clicked / c.sent) * 100) : 0;
                                const statusLabel = c.sent === 0 ? 'Not sent yet' : `${c.sent}/${c.total} emailed`;
                                return (
                                    <div key={c.lang} style={{ background: colors.bg, border: `1px solid ${colors.bar}33`, borderRadius: 10, padding: '14px 16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                            <div style={{ fontWeight: 800, fontSize: 14, color: colors.text }}>
                                                {LANG_LABEL[c.lang] || c.lang}
                                            </div>
                                            <div style={{ fontSize: 11, color: '#6b7280' }}>{statusLabel}</div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 10 }}>
                                            {[
                                                { label: 'Total', value: c.total },
                                                { label: 'Sent', value: c.sent, color: '#3b82f6' },
                                                { label: 'Opened', value: c.opened, color: '#f59e0b' },
                                                { label: 'Clicked', value: c.clicked, color: '#ec4899' },
                                            ].map((m, j) => (
                                                <div key={j} style={{ textAlign: 'center' }}>
                                                    <div style={{ fontSize: 20, fontWeight: 800, color: m.color || '#e2e4ec', lineHeight: 1.1 }}>{m.value}</div>
                                                    <div style={{ fontSize: 11, color: '#6b7280' }}>{m.label}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Action Button for Unsent Contacts */}
                                        {c.total - c.sent > 0 && (
                                            <div style={{ marginTop: 16 }}>
                                                <RunScriptButton
                                                    baseCommand="python send_outreach.py"
                                                    description={`Process ${c.total - c.sent} pending ${c.lang} emails.`}
                                                    icon="📨"
                                                    highlight={true}
                                                    requireInput={false}
                                                    defaultInputValue={`--csv ../contacts/raw/agent_leads.csv --lang ${c.lang}`}
                                                />
                                            </div>
                                        )}

                                        {/* Open & click rate bars */}
                                        {c.sent > 0 && (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                                                    <span style={{ color: '#6b7280', width: 70, flexShrink: 0 }}>Open rate</span>
                                                    <div style={{ flex: 1, background: '#2a2d3a', borderRadius: 3, height: 5, overflow: 'hidden' }}>
                                                        <div style={{ background: '#f59e0b', height: '100%', width: `${Math.min(openRate, 100)}%`, borderRadius: 3 }} />
                                                    </div>
                                                    <span style={{ color: '#f59e0b', fontWeight: 700, minWidth: 30, textAlign: 'right' }}>{openRate}%</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                                                    <span style={{ color: '#6b7280', width: 70, flexShrink: 0 }}>Click rate</span>
                                                    <div style={{ flex: 1, background: '#2a2d3a', borderRadius: 3, height: 5, overflow: 'hidden' }}>
                                                        <div style={{ background: '#ec4899', height: '100%', width: `${Math.min(clickRate, 100)}%`, borderRadius: 3 }} />
                                                    </div>
                                                    <span style={{ color: '#ec4899', fontWeight: 700, minWidth: 30, textAlign: 'right' }}>{clickRate}%</span>
                                                </div>
                                            </div>
                                        )}
                                        {c.bounced > 0 && (
                                            <div style={{ marginTop: 6, fontSize: 11, color: '#ef4444' }}>⚠️ {c.bounced} bounced</div>
                                        )}
                                        {c.first_sent && (
                                            <div style={{ marginTop: 4, fontSize: 11, color: '#4b5563' }}>
                                                First sent: {new Date(c.first_sent).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                                {c.last_event ? ` · Last event: ${new Date(c.last_event).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}` : ''}
                                            </div>
                                        )}
                                    </div>
                                );
                            }) : (
                                <div style={{ color: '#4b5563', fontSize: 12, padding: '16px 0' }}>
                                    No campaign data. Run <code style={{ background: '#2a2d3a', padding: '2px 6px', borderRadius: 4 }}>python export_for_dashboard.py</code>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Status summary pills */}
                    <div>
                        <SectionTitle>Pipeline Status Breakdown</SectionTitle>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {Object.entries(outreach.by_status).map(([status, count]) => {
                                const colors: Record<string, { bg: string; text: string }> = {
                                    New: { bg: 'rgba(59,130,246,0.15)', text: '#93c5fd' },
                                    Sent: { bg: 'rgba(245,158,11,0.15)', text: '#fcd34d' },
                                    Replied: { bg: 'rgba(139,92,246,0.15)', text: '#c4b5fd' },
                                    Interested: { bg: 'rgba(16,185,129,0.15)', text: '#6ee7b7' },
                                    Listed: { bg: 'rgba(34,197,94,0.15)', text: '#86efac' },
                                    Declined: { bg: 'rgba(239,68,68,0.15)', text: '#fca5a5' },
                                    Bounced: { bg: 'rgba(107,114,128,0.15)', text: '#9ca3af' },
                                };
                                const c = colors[status] || { bg: 'rgba(255,255,255,0.08)', text: '#9ca3af' };
                                return (
                                    <div key={status} style={{ background: c.bg, color: c.text, borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 700 }}>
                                        {status}: {count as number}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Category breakdown */}
                        {Object.keys(outreach.by_category || {}).length > 0 && (
                            <div style={{ marginTop: 14 }}>
                                <SectionTitle>By Category</SectionTitle>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                    {Object.entries(outreach.by_category).map(([cat, count]) => (
                                        <div key={cat} style={{ background: '#1a1d27', border: '1px solid #2a2d3a', borderRadius: 8, padding: '6px 12px', fontSize: 12 }}>
                                            <span style={{ color: '#e2e4ec', fontWeight: 700 }}>{count as number}</span>
                                            <span style={{ color: '#6b7280', marginLeft: 5 }}>{cat.replace(/_/g, ' ')}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Bottom: Funnel Comparison Summary ── */}
            <div style={{ ...panelStyle }}>
                <SectionTitle>📊 Funnel Comparison — At a Glance</SectionTitle>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    {/* Direct */}
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#4fb8a0', marginBottom: 10 }}>📡 Direct Channel</div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                {[
                                    ['GA4 Sessions (30d)', totalSessions || '—'],
                                    ['Top Channel', topChannel ? `${topChannel.channel} (${topChannel.pct}%)` : '—'],
                                    ['Paid Sessions', paidSessions || '—'],
                                    ['Organic Sessions', organicSessions || '—'],
                                    ['Widget Interactions', '24 sessions'],
                                    ['Price Views', '9 sessions'],
                                    ['NL/BE Interest', '3 sessions'],
                                ].map(([label, val], i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #2a2d3a' }}>
                                        <td style={{ padding: '7px 0', color: '#6b7280', fontSize: 12 }}>{label}</td>
                                        <td style={{ padding: '7px 0', color: '#e2e4ec', fontWeight: 700, fontSize: 12, textAlign: 'right' }}>{val}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Partner */}
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#8b5cf6', marginBottom: 10 }}>📨 Partner Outreach</div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                {[
                                    ['Partners Sourced', totalContacts],
                                    ['Emails Sent', totalSent],
                                    ['Delivered', totalDelivered],
                                    ['Opened', `${totalOpened} (${pct(totalOpened, totalSent)})`],
                                    ['Clicked', `${totalClicked} (${pct(totalClicked, totalSent)})`],
                                    ['Engaged / Positive', engaged || '0'],
                                    ['Still Pending', newCount],
                                ].map(([label, val], i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #2a2d3a' }}>
                                        <td style={{ padding: '7px 0', color: '#6b7280', fontSize: 12 }}>{label}</td>
                                        <td style={{ padding: '7px 0', color: '#e2e4ec', fontWeight: 700, fontSize: 12, textAlign: 'right' }}>{val}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}
