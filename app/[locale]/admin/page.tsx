import React from 'react';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Ticket, TrendingUp, Users, Send, CheckCircle } from 'lucide-react';
import fs from 'fs';
import path from 'path';

// Force dynamic rendering (don't pre-render at build time)
export const dynamic = 'force-dynamic';

async function getStats() {
    // Wrapped in try/catch — Prisma models may not exist in all environments
    let adoptionCount = 0;
    let pendingAdoptions = 0;
    let voucherCount = 0;
    let totalRevenue = 0;

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = prisma as any;
        adoptionCount = await p.adoption.count({ where: { status: 'paid' } });
        pendingAdoptions = await p.adoption.count({ where: { status: 'pending' } });
        voucherCount = await p.voucher.count({ where: { status: 'active' } });

        const adoptionRevenue = await p.adoption.aggregate({
            where: { status: 'paid' },
            _sum: { price: true }
        });
        const voucherRevenue = await p.voucher.aggregate({
            where: { status: 'active' },
            _sum: { originalAmount: true }
        });
        totalRevenue = ((adoptionRevenue._sum.price || 0) + (voucherRevenue._sum.originalAmount || 0)) / 100;
    } catch (err) {
        console.error('Prisma query failed (models may not be in schema):', err);
    }

    let outreachData = null;
    try {
        const dataPath = path.join(process.cwd(), 'data', 'outreach_data.json');
        if (fs.existsSync(dataPath)) {
            const fileData = fs.readFileSync(dataPath, 'utf8');
            outreachData = JSON.parse(fileData);
        }
    } catch (err) {
        console.error('Error reading outreach data:', err);
    }

    return { adoptionCount, pendingAdoptions, voucherCount, totalRevenue, outreachData };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-primary-900">Dashboard Overview</h2>
                <p className="text-stone-500">Welcome back! Here&apos;s what&apos;s happening on the farm.</p>
            </div>

            {/* Sales Section */}
            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary-900 border-b border-stone-200 pb-2">Sales & Revenue</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-none shadow-sm flex flex-col justify-between">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-stone-500">Paid Adoptions</CardTitle>
                            <Heart className="w-4 h-4 text-rose-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-primary-900">{stats.adoptionCount}</div>
                            <p className="text-xs text-orange-600 font-bold mt-1">+{stats.pendingAdoptions} pending</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm flex flex-col justify-between">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-stone-500">Active Vouchers</CardTitle>
                            <Ticket className="w-4 h-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-primary-900">{stats.voucherCount}</div>
                            <p className="text-xs text-stone-400 font-medium mt-1">Ready for redemption</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm flex flex-col justify-between">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-stone-500">Total Revenue</CardTitle>
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-primary-900">{stats.totalRevenue.toLocaleString()} PLN</div>
                            <p className="text-xs text-stone-400 font-medium mt-1">Estimated total sales</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm flex flex-col justify-between">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-stone-500">Customer Reach</CardTitle>
                            <Users className="w-4 h-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-primary-900">{stats.adoptionCount + stats.voucherCount}</div>
                            <p className="text-xs text-stone-400 font-medium mt-1">Unique interactions</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Marketing & Outreach Section */}
            <div className="space-y-4 pt-4">
                <h3 className="text-2xl font-bold text-primary-900 border-b border-stone-200 pb-2">Marketing & Outreach Funnel</h3>
                {stats.outreachData ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="border-none shadow-sm flex flex-col justify-between">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest text-stone-500">Total Leads Sourced</CardTitle>
                                <Users className="w-4 h-4 text-purple-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black text-primary-900">{stats.outreachData.summary.total}</div>
                                <p className="text-xs text-stone-400 font-medium mt-1">Partners found</p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm flex flex-col justify-between">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest text-stone-500">Contacted (Sent)</CardTitle>
                                <Send className="w-4 h-4 text-blue-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black text-primary-900">
                                    {Object.entries(stats.outreachData.summary.by_status)
                                        .filter(([status]) => status !== 'New')
                                        .reduce((acc, [_, count]) => acc + (typeof count === 'number' ? count : 0), 0)}
                                </div>
                                <p className="text-xs text-blue-600 font-bold mt-1">First contact made</p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm flex flex-col justify-between">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest text-stone-500">Engaged / Replied</CardTitle>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black text-primary-900">
                                    {(stats.outreachData.summary.by_status['Replied'] || 0) + (stats.outreachData.summary.by_status['Interested'] || 0) + (stats.outreachData.summary.by_status['Listed'] || 0)}
                                </div>
                                <p className="text-xs text-green-600 font-bold mt-1">Positive engagement</p>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex items-center justify-center text-stone-500">
                        No recent marketing data exported. Run export script from Reachout.
                    </div>
                )}
            </div>

            {/* Placeholder for Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-rose-500" />
                        Recent Adoptions
                    </h3>
                    <div className="text-stone-400 text-sm italic">
                        Viewing detailed list in the Adoptions tab...
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Ticket className="w-5 h-5 text-orange-500" />
                        Recent Vouchers
                    </h3>
                    <div className="text-stone-400 text-sm italic">
                        Viewing detailed list in the Vouchers tab...
                    </div>
                </div>
            </div>
        </div>
    );
}
