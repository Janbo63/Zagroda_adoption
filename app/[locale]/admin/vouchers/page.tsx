import React from 'react';
import prisma from '@/lib/prisma';

// Force dynamic rendering (don't pre-render at build time)
export const dynamic = 'force-dynamic';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
// import { AdminActionButton } from '@/components/AdminActionButton'; // TODO: Create this component

async function getVouchers() {
    return await prisma.voucher.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export default async function VouchersAdmin() {
    const vouchers = await getVouchers();

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-black text-primary-900">Manage Vouchers</h2>
                    <p className="text-stone-500">View and track gift voucher redemptions.</p>
                </div>
                <Badge variant="outline" className="text-stone-400">
                    Total: {vouchers.length}
                </Badge>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden">
                <Table>
                    <TableHeader className="bg-stone-50">
                        <TableRow>
                            <TableHead className="font-black text-primary-900 uppercase tracking-widest text-[10px] w-[150px]">Code</TableHead>
                            <TableHead className="font-black text-primary-900 uppercase tracking-widest text-[10px]">Buyer</TableHead>
                            <TableHead className="font-black text-primary-900 uppercase tracking-widest text-[10px]">Amount</TableHead>
                            <TableHead className="font-black text-primary-900 uppercase tracking-widest text-[10px]">Recipient</TableHead>
                            <TableHead className="font-black text-primary-900 uppercase tracking-widest text-[10px]">Expires</TableHead>
                            <TableHead className="font-black text-primary-900 uppercase tracking-widest text-[10px]">Status</TableHead>
                            <TableHead className="font-black text-primary-900 uppercase tracking-widest text-[10px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vouchers.map((voucher) => {
                            const isExpired = new Date(voucher.expiresAt) < new Date();
                            const status = isExpired && voucher.status === 'active' ? 'expired' : voucher.status;

                            return (
                                <TableRow key={voucher.id} className="hover:bg-stone-50/50 transition-colors">
                                    <TableCell className="font-mono text-orange-600 font-black py-4">
                                        {voucher.code}
                                    </TableCell>
                                    <TableCell className="text-stone-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                                        {voucher.buyerEmail}
                                    </TableCell>
                                    <TableCell className="font-bold text-primary-900">
                                        {(voucher.remainingAmount / 100).toFixed(2)} {voucher.currency}
                                        {voucher.remainingAmount < voucher.originalAmount && (
                                            <span className="text-[10px] text-stone-400 block font-normal">
                                                Original: {(voucher.originalAmount / 100).toFixed(2)}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-stone-500 text-xs font-medium">
                                        {voucher.recipientName || 'Gift for self'}
                                    </TableCell>
                                    <TableCell className={`text-xs font-bold ${isExpired ? 'text-red-400' : 'text-stone-500'}`}>
                                        {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(voucher.expiresAt))}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={`${status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                                            status === 'fully_redeemed' ? 'bg-stone-100 text-stone-500 hover:bg-stone-100' :
                                                status === 'pending' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                                                    'bg-red-100 text-red-700 hover:bg-red-100'
                                            } font-bold border-none shadow-none`}>
                                            {status.replace('_', ' ')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right flex items-center justify-end gap-3">
                                        {/* TODO: Add AdminActionButton component */}
                                        {status === 'pending' && (
                                            <span className="text-xs text-stone-400">Pending</span>
                                        )}
                                        {status === 'active' && (
                                            <span className="text-xs text-green-600">Active</span>
                                        )}
                                        <button className="text-[10px] font-black uppercase text-orange-500 hover:text-orange-600 tracking-widest underline decoration-2 underline-offset-4">
                                            Edit
                                        </button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {vouchers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-12 text-stone-400 font-medium italic">
                                    No vouchers found in the database.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
