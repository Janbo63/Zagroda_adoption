import React from 'react';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

async function getReportData() {
    const adoptions = await prisma.adoption.findMany({ where: { status: 'paid' } });
    const vouchers = await prisma.voucher.findMany({ where: { status: 'active' } });

    // Popularity by Alpaca
    const alpacaStats: Record<string, number> = {};
    adoptions.forEach(a => {
        alpacaStats[a.alpaca] = (alpacaStats[a.alpaca] || 0) + 1;
    });

    // Revenue by Tier
    const tierRevenue: Record<string, number> = { bronze: 0, silver: 0, gold: 0 };
    adoptions.forEach(a => {
        tierRevenue[a.tier.toLowerCase()] = (tierRevenue[a.tier.toLowerCase()] || 0) + (a.price / 100);
    });

    // Monthly Trend (Simple count)
    const monthStats: Record<string, number> = {};
    [...adoptions, ...vouchers].forEach(item => {
        const month = new Date(item.createdAt).toLocaleString('default', { month: 'short' });
        monthStats[month] = (monthStats[month] || 0) + 1;
    });

    return {
        alpacaStats: Object.entries(alpacaStats).sort((a, b) => b[1] - a[1]),
        tierRevenue,
        monthStats: Object.entries(monthStats)
    };
}

export default async function ReportsAdmin() {
    const data = await getReportData();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-primary-900">Analytics & Reports</h2>
                <p className="text-stone-500">Insights into your campaign performance.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Alpaca Popularity */}
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChart className="w-5 h-5 text-rose-500" />
                            Alpaca Popularity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.alpacaStats.map(([name, count]) => (
                                <div key={name} className="flex items-center gap-4">
                                    <div className="w-20 font-bold text-stone-600">{name}</div>
                                    <div className="flex-grow bg-stone-100 h-4 rounded-full overflow-hidden">
                                        <div
                                            className="bg-orange-500 h-full rounded-full"
                                            style={{ width: `${(count / (data.alpacaStats[0][1] || 1)) * 100}%` }}
                                        />
                                    </div>
                                    <div className="w-8 text-right font-black text-primary-900">{count}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Revenue by Tier */}
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            Revenue by Tier (PLN)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                            {Object.entries(data.tierRevenue).map(([tier, revenue]) => (
                                <div key={tier} className="text-center p-4 bg-stone-50 rounded-2xl">
                                    <div className="text-xs font-black uppercase text-stone-400 mb-1">{tier}</div>
                                    <div className="text-xl font-black text-primary-900">{revenue.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Trend */}
                <Card className="border-none shadow-sm lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-blue-500" />
                            Monthly Activity Trend
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-end gap-2 h-40 pt-4">
                            {data.monthStats.map(([month, count]) => (
                                <div key={month} className="flex-grow flex flex-col items-center gap-2">
                                    <div
                                        className="bg-blue-500 w-full rounded-t-lg transition-all duration-1000"
                                        style={{ height: `${(count / (Math.max(...data.monthStats.map(m => m[1])) || 1)) * 100}%` }}
                                    />
                                    <div className="text-[10px] font-bold text-stone-400 uppercase">{month}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
