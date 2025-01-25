/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCurrentAccount, useCurrentWallet, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Wallet, ArrowUpRight, ArrowDownLeft, Loader2 } from 'lucide-react';
import { shortenEthAddress } from '@/utils/shortenEthAddress';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import mistToSui from '@/utils/mist';
import { Input } from '@/components/ui/input';
import { generateDepositMoveCall, generateWithdrawMoveCall, generateApproveMoveCall } from '@/utils/moveCalls';
import { toast } from 'react-toastify';
import { useOnChainDataContext } from '@/context/OnChainDataContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import axios from 'axios';

interface RecentActivity {
    action: number[] | string;
    amount: string; 
    message: string; 
    otherPartyAddress: string; 
    otherPartyName: string; 
  }
interface PriceData {
  symbol: string;
  price: string;
}

const fetchSUIUSDTPrice = async (): Promise<PriceData> => {
  const response = await axios.get<PriceData>(
    `https://api.binance.com/api/v3/ticker/price?symbol=SUIUSDT`
  );
  return response.data;
};



interface UserData {
  username: string;
  balance: number;
  img_url: string;
}

interface RequestItem {
  key: number;
  value: {
    address_requestor: string;
    amount: string;
    message: number[];
    name: string;
    name_requestor: string;
  };
}

const DepositWithdrawModal = ({
  type,
  onSubmit,
  loading,
}: {
  type: 'deposit' | 'withdraw';
  onSubmit: (amount: string) => void;
  loading: boolean;
}) => {
    const [amount, setAmount] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(amount);
    };

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button
            className={`flex items-center gap-2 rounded-xl ${
                type === 'deposit'
                ? 'bg-lime-400 text-gray-900 hover:bg-lime-500'
                : 'bg-red-400 text-gray-900 hover:bg-red-500'
            }`}
            >
            {type === 'deposit' ? <Plus size={16} /> : <Minus size={16} />}
            {type === 'deposit' ? 'Deposit' : 'Withdraw'}
            </Button>
        </DialogTrigger>
        <DialogContent className="bg-neutral-950 border-while/20 rounded-xl">
            <DialogHeader>
            <DialogTitle className="text-white">
                {type === 'deposit' ? 'Deposit SUI' : 'Withdraw SUI'}
            </DialogTitle>
            </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="number"
                    placeholder={`Enter amount to ${type}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-gray-700 text-white border-gray-600 focus:border-lime-400 focus:ring-lime-400"
                />
                <Button
                    type="submit"
                    className="w-full bg-lime-400 text-gray-900 hover:bg-lime-500"
                    disabled={loading}
                >
                    {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                    ) : (
                    type === 'deposit' ? 'Deposit' : 'Withdraw'
                    )}
                </Button>
                </form>
        </DialogContent>
    </Dialog>
  );
};

const DashboardPage = () => {
    const account = useCurrentAccount();
    const { connectionStatus } = useCurrentWallet();
    const { getUserData, getRecentActivity, refreshCounter, updateRefreshCounter } = useOnChainDataContext();
    const [data, setData] = useState<UserData>({ username: 'Unknown', balance: 0, img_url: '' });
    const [requests, setRequests] = useState<RequestItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const [suiClient, setSuiClient] = useState<SuiClient | null>(null);
    const [approvingRequest, setApprovingRequest] = useState<number | null>(null);
    const [depositing, setDepositing] = useState(false);
    const [withdrawing, setWithdrawing] = useState(false);
    const [suiPrice, setSuiPrice] = useState<string | null>(null);
    const [priceLoading, setPriceLoading] = useState(true);
    const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
    
    useEffect(() => {

        const fetchPrice = async () => {
        try {
            const priceData = await fetchSUIUSDTPrice();
            setSuiPrice(priceData.price);
        } catch (error) {
            console.error('Error fetching SUI/USDT price:', error);
            toast.error('Failed to fetch SUI price.');
        } finally {
            setPriceLoading(false);
        }
        };

        fetchPrice(); 
        const intervalId = setInterval(fetchPrice, 10000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
        if (connectionStatus === 'connected' && account?.address) {
            const userData = await getUserData(account.address);
            if (userData) {
            setData({ username: userData.username, balance: userData.balance, img_url: userData.img_url });
            const activity = await getRecentActivity(userData.username);
            console.log(activity);
            if (activity) {
                setRecentActivity(activity || []);
            }
            }
        }
        setLoading(false);
        };

        fetchData();
    }, [connectionStatus, account, getUserData, getRecentActivity, refreshCounter]);


    useEffect(() => {
        const client = new SuiClient({ url: getFullnodeUrl('testnet') });
        setSuiClient(client);
    }, []);

    const handleDeposit = async (amount: string) => {
        if (!suiClient || !account?.address) {
        toast.error('Please connect your wallet!');
        return;
        }
        if (!amount || Number(amount) <= 0) {
        toast.error('Please enter a valid amount');
        return;
        }

        setDepositing(true);
        const toastId = toast.loading('Processing deposit...');
        try {
        const amountInMist = Math.floor(Number(amount) * 10 ** 9);
        const txb = new TransactionBlock();
        generateDepositMoveCall(txb, data.username, amountInMist);
        const serializedTransaction = await txb.serialize();
        signAndExecuteTransaction(
            {
            transaction: serializedTransaction,
            },
            {
            onSuccess: (result) => {
                console.log('Deposit success:', result);
                toast.success(`Deposited ${amount} SUI successfully!`);
                updateRefreshCounter();
            },
            onError: (error) => {
                console.error('error:', error);
                toast.error(`Error: ${error.message}`);
            },
            onSettled: () => {
                setDepositing(false);
                toast.dismiss(toastId);
            },
            }
        );
        } catch (error) {
        console.error('error:', error);
        toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setDepositing(false);
        toast.dismiss(toastId);
        }
    };

    const handleWithdraw = async (amount: string) => {
        if (!suiClient || !account?.address) {
        toast.error('Sui client not initialized or no account connected');
        return;
        }
        if (!amount) {
        toast.error('Please input amount for withdraw');
        return;
        }
        setWithdrawing(true);
        const toastId = toast.loading('Processing withdrawal...');
        try {
        const amountInMist = Math.floor(Number(amount) * 1000000000);
        const txb = new TransactionBlock();
        generateWithdrawMoveCall(txb, data.username, amountInMist);
        const serializedTransaction = await txb.serialize();
        signAndExecuteTransaction(
            {
            transaction: serializedTransaction,
            },
            {
            onSuccess: (result) => {
                console.log('Transaction success', result);
                toast.success('Withdrawal successful!');
                updateRefreshCounter();
            },
            onError: (error) => {
                console.error('Transaction Error:', error);
                toast.error('Failed to withdraw.');
            },
            onSettled: () => {
                setWithdrawing(false);
                toast.dismiss(toastId);
            },
            }
        );
        } catch (error) {
        console.error('Error during withdrawal:', error);
        toast.error('Failed to withdraw.');
        setWithdrawing(false);
        toast.dismiss(toastId);
        }
    };

    const handleApprove = async (requestId: number) => {
        if (!suiClient || !account?.address) {
        toast.error('Sui client not initialized or no account connected');
        return;
        }
        setApprovingRequest(requestId);
        const toastId = toast.loading('Approving payment...');
        try {
        const txb = new TransactionBlock();
        generateApproveMoveCall(txb, data.username, requestId);
        const serializedTransaction = await txb.serialize();
        signAndExecuteTransaction(
            {
            transaction: serializedTransaction,
            },
            {
            onSuccess: (result) => {
                console.log('Transaction success', result);
                toast.success('Payment approved successfully!');
                updateRefreshCounter();
            },
            onError: (error) => {
                console.error('Transaction Error:', error);
                toast.error('Failed to approve payment.');
            },
            onSettled: () => {
                setApprovingRequest(null);
                toast.dismiss(toastId);
            },
            }
        );
        } catch (error) {
        console.error('Error approving payment:', error);
        toast.error('Failed to approve payment.');
        setApprovingRequest(null);
        toast.dismiss(toastId);
        }
    };

    const handleReject = (requestId: number) => {
        toast.success(`Request ${requestId} rejected successfully!`);
        console.log(`Rejecting request with ID: ${requestId}`);
    };
    const getActionString = (action: number[] | string): string => {
        if (typeof action === 'string') {
            return action;
        }
        return action.map(code => String.fromCharCode(code)).join('');
    };
    return (
        <section className="space-y-6 p-6 bg-neutral-950 min-h-screen">
            {loading ? (
                <div className="text-center text-white">Loading...</div>
            ) : (
                <>
                <Card className="border-none max-w-lg">
                    <CardTitle className="text-xl text-white">Kaisho Card</CardTitle>
                    <CardHeader>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-4">
                        <div className="relative border rounded-xl p-6 shadow-lg overflow-hidden">
                        <div className="flex items-center gap-4 z-10 relative">
                            <img
                            src={data.img_url || 'https://via.placeholder.com/150'}
                            alt="User Avatar"
                            className="w-12 h-12 rounded-full object-cover border-2 border-white"
                            />
                            <div>
                            <p className="text-sm text-white/80">Username</p>
                            <p className="font-medium text-white text-lg">{data.username}</p>
                            </div>
                        </div>

                        <div className="mt-6 z-10 relative">
                            <p className="text-sm text-white/80">Total Balance</p>
                            <p className="font-bold text-white text-xl">
                                {mistToSui(data.balance)} SUI
                                <span className='text-sm'>
                                    {' '}≈{' '}{suiPrice
                                        ? `($${(mistToSui(data.balance) * parseFloat(suiPrice)).toFixed(2)})`
                                        : 'Loading...'}
                                </span>
                            </p>
                        </div>
                        <div className="mt-6 flex justify-between items-center z-10 relative">
                                <div>
                                <p className="text-sm text-white/80">Wallet Address</p>
                                <p className="font-medium text-white text-sm flex items-center">
                                {shortenEthAddress(account?.address || '0x0000...0000')}
                                <span
                                    className="ml-2 border px-2 rounded-xl text-neutral-500 hover:bg-neutral-800 hover:text-white cursor-pointer transition-all"
                                    onClick={() => {
                                    if (account?.address) {
                                        navigator.clipboard.writeText(account.address);
                                        toast.success('Address copied to clipboard!');
                                    }
                                    }}
                                >
                                    copy
                                </span>
                                </p>
                                </div>
                                <div className="flex items-center gap-2">
                                <Wallet className="text-white/80" size={20} />
                                <span className="text-white/80 text-sm">SUI</span>
                                </div>
                        </div>
                        </div>

                        <div className="flex gap-4 mt-4">
                        <DepositWithdrawModal
                            type="deposit"
                            onSubmit={handleDeposit}
                            loading={depositing}
                        />
                        <DepositWithdrawModal
                            type="withdraw"
                            onSubmit={handleWithdraw}
                            loading={withdrawing}
                        />
                        </div>
                    </div>
                    </CardContent>
                </Card>
                <div className="mt-8">
                    <h1 className="text-2xl font-semibold mb-4 text-white">Recent Activity</h1>
                    <div className="overflow-x-auto">
                    <table className="min-w-full bg-neutral-900 border border-neutral-800 rounded-lg">
                        <thead className="bg-neutral-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">action</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Message</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Other Party</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                        {recentActivity.length > 0 ? (
                            recentActivity.map((activity, index) => (
                            <tr key={index} className="hover:bg-neutral-800 transition-colors">
                                <td className="px-6 py-4 text-sm text-white flex items-center space-x-2">
                                    {(() => {
                                        const actionString = getActionString(activity.action);
                                        
                                        if (actionString === '-') {
                                            return (
                                                <>
                                                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                                    </svg>
                                                    <span>Send</span>
                                                </>
                                            );
                                        }
                                        
                                        if (actionString === '+') {
                                            return (
                                                <>
                                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                                    </svg>
                                                    <span>Receive</span>
                                                </>
                                            );
                                        }
                                        return <span>{actionString}</span>;
                                    })()}
                                </td>
                                <td className="px-6 py-4 text-sm text-white">{mistToSui(activity.amount)} SUI</td>
                                <td className="px-6 py-4 text-sm text-white">{activity.message}</td>
                                <td className="px-6 py-4 text-sm text-white">
                                {activity.otherPartyName} ({shortenEthAddress(activity.otherPartyAddress)})
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td colSpan={4} className="px-6 py-4 text-center text-sm text-neutral-400">
                                No recent activity found.
                            </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    </div>
                </div>
                </>
            )}
        </section>
    );
};

export default DashboardPage;