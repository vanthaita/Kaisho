'use client'
import { useOnChainDataContext } from '@/context/OnChainDataContext';
import mistToSui from '@/utils/mist';
import { useCurrentAccount } from '@mysten/dapp-kit';
import React from 'react';

interface RecentActivity {
  action: number[] | string;
  amount: string;
  message: string;
  otherPartyAddress: string;
  otherPartyName: string;
}

const Activity: React.FC = () => {
    const { getRecentActivity, getUserData } = useOnChainDataContext();
    const accountAddress = useCurrentAccount()?.address as string;
    const username = getUserData(accountAddress)?.username as string;

    const recentActivities = getRecentActivity(username) || [];

    return (
        <div className="p-4 bg-neutral-950 text-white">
        <h1 className="text-2xl font-bold mb-4">Activity</h1>
        <table className="min-w-full bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
            <thead>
            <tr className="bg-neutral-800">
                <th className="py-3 px-4 text-left text-sm font-semibold text-neutral-300">Action</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-neutral-300">Amount</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-neutral-300">Message</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-neutral-300">Other Party</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-neutral-300">Address</th>
            </tr>
            </thead>
            <tbody>
            {recentActivities.map((activity: RecentActivity, index: number) => (
                <tr key={index} className="hover:bg-neutral-800 transition-colors">
                <td className="py-3 px-4 border-b border-neutral-800 text-sm text-neutral-200">
                    {typeof activity.action === 'string'
                    ? activity.action
                    : new TextDecoder().decode(new Uint8Array(activity.action))}
                </td>
                <td className="py-3 px-4 border-b border-neutral-800 text-sm text-neutral-200">
                    {mistToSui(activity.amount)}
                </td>
                <td className="py-3 px-4 border-b border-neutral-800 text-sm text-neutral-200">
                    {activity.message}
                </td>
                <td className="py-3 px-4 border-b border-neutral-800 text-sm text-neutral-200">
                    {activity.otherPartyName}
                </td>
                <td className="py-3 px-4 border-b border-neutral-800 text-sm text-neutral-200">
                    {activity.otherPartyAddress}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default Activity;