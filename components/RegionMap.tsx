'use client';

import { motion } from 'framer-motion';

/**
 * RegionMap — a visual hub-and-spoke distance diagram.
 * Shows the farm at centre with two concentric rings (15 min / 1 hour)
 * and attraction labels positioned at approximate compass bearings.
 * Tapping any attraction opens Google Maps search.
 */

interface Place {
    label: string;
    icon: string;
    ring: 1 | 2; // 1 = 15 min, 2 = 1 hour
    angleDeg: number; // 0 = top, clockwise
    mapsQuery: string;
}

const PLACES: Place[] = [
    // ── 15-minute ring ────────────────────────────────────────────────────────
    { label: 'Karkonosze\nNational Park', icon: '🏔️', ring: 1, angleDeg: 340, mapsQuery: 'Karkonoski+Park+Narodowy' },
    { label: 'Kwisa Valley', icon: '🌊', ring: 1, angleDeg: 45, mapsQuery: 'Kwisa+Valley+Mirsk' },
    { label: 'Singiel Trail', icon: '🏖️', ring: 1, angleDeg: 130, mapsQuery: 'Singiel+Trail+Karkonosze' },
    { label: 'Silver Mine\nKrobica', icon: '💎', ring: 1, angleDeg: 215, mapsQuery: 'Kopalnia+Srebra+Krobica' },
    { label: 'Świeradów\nSpa', icon: '🛁', ring: 1, angleDeg: 270, mapsQuery: 'Świeradów-Zdrój+termy' },
    // ── 1-hour ring ───────────────────────────────────────────────────────────
    { label: 'Kamieńczyk\nWaterfall', icon: '💧', ring: 2, angleDeg: 10, mapsQuery: 'Wodospad+Kamieńczyk' },
    { label: 'Castle Czocha', icon: '🏰', ring: 2, angleDeg: 60, mapsQuery: 'Zamek+Czocha' },
    { label: 'Jelenia Góra', icon: '🏙️', ring: 2, angleDeg: 110, mapsQuery: 'Jelenia+Góra+centrum' },
    { label: 'Liberec\n(Czechia)', icon: '🌍', ring: 2, angleDeg: 175, mapsQuery: 'Liberec+Czech+Republic' },
    { label: 'Śnieżka\n1602m', icon: '⛰️', ring: 2, angleDeg: 235, mapsQuery: 'Śnieżka+szczyt' },
    { label: 'Lądek Spa\nTherms', icon: '♨️', ring: 2, angleDeg: 300, mapsQuery: 'Termy+Lądek-Zdrój' },
];

function polarToXY(angleDeg: number, radius: number, cx: number, cy: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
        x: cx + radius * Math.cos(rad),
        y: cy + radius * Math.sin(rad),
    };
}

export function RegionMap({ tab15Label, tab60Label }: { tab15Label: string; tab60Label: string }) {
    const cx = 250;
    const cy = 250;
    const r1 = 105; // 15-min ring radius
    const r2 = 195; // 1-hour ring radius

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[520px] mx-auto select-none"
        >
            <svg viewBox="0 0 500 500" className="w-full h-auto" aria-label="Region distance map">
                {/* ── Outer ring glow ── */}
                <circle cx={cx} cy={cy} r={r2 + 8} fill="none" stroke="#d1fae5" strokeWidth="16" opacity="0.4" />

                {/* ── Rings ── */}
                <circle cx={cx} cy={cy} r={r2} fill="none" stroke="#6ee7b7" strokeWidth="1.5" strokeDasharray="6 4" />
                <circle cx={cx} cy={cy} r={r1} fill="none" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 3" />

                {/* ── Ring labels ── */}
                <text x={cx} y={cy - r1 + 14} textAnchor="middle" fontSize="9" fill="#059669" fontWeight="600" letterSpacing="0.5">
                    {tab15Label}
                </text>
                <text x={cx} y={cy - r2 + 14} textAnchor="middle" fontSize="9" fill="#047857" fontWeight="600" letterSpacing="0.5">
                    {tab60Label}
                </text>

                {/* ── Spoke lines ── */}
                {PLACES.map((p, i) => {
                    const inner = polarToXY(p.angleDeg, p.ring === 1 ? r1 - 20 : r2 - 20, cx, cy);
                    const outer = polarToXY(p.angleDeg, p.ring === 1 ? r1 - 5 : r2 - 5, cx, cy);
                    return (
                        <line
                            key={i}
                            x1={inner.x} y1={inner.y}
                            x2={outer.x} y2={outer.y}
                            stroke={p.ring === 1 ? '#6ee7b7' : '#a7f3d0'}
                            strokeWidth="1"
                        />
                    );
                })}

                {/* ── Attraction badges ── */}
                {PLACES.map((p, i) => {
                    const r = p.ring === 1 ? r1 : r2;
                    const pin = polarToXY(p.angleDeg, r, cx, cy);
                    // push label further out
                    const label = polarToXY(p.angleDeg, r + 34, cx, cy);
                    const lines = p.label.split('\n');
                    return (
                        <a
                            key={i}
                            href={`https://www.google.com/maps/search/?api=1&query=${p.mapsQuery}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={p.label.replace('\n', ' ')}
                        >
                            <g>
                                {/* Pin circle */}
                                <circle
                                    cx={pin.x} cy={pin.y} r="14"
                                    fill={p.ring === 1 ? '#ecfdf5' : '#f0fdf4'}
                                    stroke={p.ring === 1 ? '#34d399' : '#6ee7b7'}
                                    strokeWidth="1.5"
                                    className="transition-all"
                                />
                                {/* Emoji */}
                                <text x={pin.x} y={pin.y + 5} textAnchor="middle" fontSize="12">{p.icon}</text>
                                {/* Label lines */}
                                {lines.map((line, li) => (
                                    <text
                                        key={li}
                                        x={label.x}
                                        y={label.y + li * 11 - (lines.length - 1) * 5.5}
                                        textAnchor="middle"
                                        fontSize="8.5"
                                        fill="#374151"
                                        fontWeight="600"
                                    >
                                        {line}
                                    </text>
                                ))}
                            </g>
                        </a>
                    );
                })}

                {/* ── Farm centre ── */}
                <circle cx={cx} cy={cy} r="36" fill="white" stroke="#10b981" strokeWidth="2.5" filter="url(#shadow)" />
                <text x={cx} y={cy - 4} textAnchor="middle" fontSize="20">🦙</text>
                <text x={cx} y={cy + 14} textAnchor="middle" fontSize="7" fill="#059669" fontWeight="700" letterSpacing="0.5">
                    YOUR BASE
                </text>

                {/* ── Drop shadow filter ── */}
                <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
                    </filter>
                </defs>
            </svg>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-emerald-400 inline-block rounded" style={{ borderTop: '2px dashed #34d399' }} />
                    {tab15Label}
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 inline-block rounded" style={{ borderTop: '2px dashed #6ee7b7' }} />
                    {tab60Label}
                </span>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">Tap any attraction to open in Google Maps</p>
        </motion.div>
    );
}
