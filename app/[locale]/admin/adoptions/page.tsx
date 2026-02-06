import React from 'react';
import prisma from '@/lib/prisma';
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

async function getAdoptions() {
    return await prisma.adoption.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export default async function AdoptionsAdmin() {
    const adoptions = await getAdoptions();

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-black text-primary-900">Manage Adoptions</h2>
                    <p className="text-stone-500">Track and manage digital alpaca parents.</p>
                </div>
                <Badge variant="outline" className="text-stone-400">
                    Total: {adoptions.length}
                </Badge>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden">
                <Table>
                    <TableHeader className="bg-stone-50">
                        <TableRow>
                            <TableHead className="font-black text-primary-900 uppercase tracking-widest text-[10px] w-[150px]">Date</TableHead>
                            <TableHead className="font-black text-primary-900 uppercase tracking-widest text-[10px]">Alpaca</TableHead>
                            <TableHead className="font-black text-primary-900 uppercase tracking-widest text-[10px]">Email</TableHead>
                            <TableHead className="font-black text-primary-900 uppercase tracking-widest text-[10px]">Tier</TableHead>
                            <TableHead className="font-black text-primary-900 uppercase tracking-widest text-[10px]">Price</TableHead>
                            <TableHead className="font-black text-primary-900 uppercase tracking-widest text-[10px]">Status</TableHead>
                            <TableHead className="font-black text-primary-900 uppercase tracking-widest text-[10px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {adoptions.map((adoption) => (
                            <TableRow key={adoption.id} className="hover:bg-stone-50/50 transition-colors">
                                <TableCell className="text-stone-500 font-medium py-4">
                                    {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(adoption.createdAt))}
                                </TableCell>
                                <TableCell className="font-black text-primary-800 uppercase tracking-tight">
                                    {adoption.alpaca}
                                </TableCell>
                                <TableCell className="text-stone-600 font-medium">
                                    {adoption.email}
                                </TableCell>
                                <TableCell>
                                    <Badge className={`${adoption.tier.toLowerCase() === 'gold' ? 'bg-orange-100 text-orange-600 hover:bg-orange-100' :
                                        adoption.tier.toLowerCase() === 'silver' ? 'bg-stone-100 text-stone-600 hover:bg-stone-100' :
                                            'bg-amber-100 text-amber-700 hover:bg-amber-100'
                                        } font-bold capitalize border-none shadow-none`}>
                                        {adoption.tier}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-stone-900 font-bold">
                                    {(adoption.price / 100).toFixed(2)} PLN
                                </TableCell>
                                <TableCell>
                                    <Badge className={`${adoption.status === 'paid' || adoption.status === 'completed' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                                        adoption.status === 'pending' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                                            'bg-red-100 text-red-700 hover:bg-red-100'
                                        } font-bold animate-pulse-slow border-none shadow-none`}>
                                        {adoption.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right flex items-center justify-end gap-3">
                                    {/* TODO: Add AdminActionButton component */}
                                    {adoption.status === 'pending' && (
                                        <span className="text-xs text-stone-400">Pending</span>
                                    )}
                                    <button className="text-[10px] font-black uppercase text-orange-500 hover:text-orange-600 tracking-widest underline decoration-2 underline-offset-4">
                                        Details
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {adoptions.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-12 text-stone-400 font-medium italic">
                                    No adoptions found in the database.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
