import React from 'react';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Ticket, TrendingUp, Users } from 'lucide-react';

async function getStats() {
    const adoptionCount = await prisma.adoption.count({ where: { status: 'paid' } });
    const pendingAdoptions = await prisma.adoption.count({ where: { status: 'pending' } });
    const voucherCount = await prisma.voucher.count({ where: { status: 'active' } });

    // Sum of all paid adoptions (price in cents)
    const adoptionRevenue = await prisma.adoption.aggregate({
        where: { status: 'paid' },
        _sum: { price: true }
    });

    const voucherRevenue = await prisma.voucher.aggregate({
        where: { status: 'active' },
        _sum: { originalAmount: true }
    });

    return {
        adoptionCount,
        pendingAdoptions,
        voucherCount,
        totalRevenue: ((adoptionRevenue._sum.price || 0) + (voucherRevenue._sum.originalAmount || 0)) / 100
    };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-primary-900">Dashboard Overview</h2>
                <p className="text-stone-500">Welcome back! Here's what's happening on the farm.</p>
            </div>

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

            {/* Placeholder for Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
