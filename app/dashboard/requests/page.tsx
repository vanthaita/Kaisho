/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import { useSignAndExecuteTransaction, useCurrentAccount } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { generateCreateRequestMoveCall, generateApproveMoveCall } from '@/utils/moveCalls';
import { useOnChainDataContext } from '@/context/OnChainDataContext';
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft, Loader2 } from 'lucide-react';
import { shortenEthAddress } from '@/utils/shortenEthAddress';
import mistToSui from '@/utils/mist';

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

const SendPage = () => {
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const account = useCurrentAccount();
    const [recipientUsername, setRecipientUsername] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { getUserData, getRequestUserData, refreshCounter, updateRefreshCounter } = useOnChainDataContext();
    const [requests, setRequests] = useState<RequestItem[]>([]);
    const [approvingRequest, setApprovingRequest] = useState<number | null>(null);
    const [userName, setUsernName] = useState<string>();

    useEffect(() => {
        const fetchRequests = async () => {
        if (account?.address) {
            const userData = await getUserData(account.address);
            setUsernName(userData?.username);
            if (userData) {
            const requests = await getRequestUserData(userData.username);
            if (requests) {
                setRequests(requests.map((item: any) => ({
                key: item.fields.key,
                value: item.fields.value.fields,
                })));
            }
            }
        }
        };

        fetchRequests();
    }, [account, getUserData, getRequestUserData, refreshCounter]);

    const handleSendRequest = async () => {
        if (!recipientUsername) {
        toast.error('Recipient username is required.');
        return;
        }

        if (!amount) {
        toast.error('Amount is required.');
        return;
        }

        if (!account?.address) {
        toast.error('Please connect your wallet.');
        return;
        }

        setIsLoading(true);
        setError('');
        const toastId = toast.loading('Sending request...');

        const data = getUserData(account.address);
        if (!data) {
        toast.error('Failed to fetch user data.');
        setIsLoading(false);
        toast.dismiss(toastId);
        return;
        }

        try {
        const amountInMist = parseFloat(amount) * 1_000_000_000;
        const txb = new TransactionBlock();
        generateCreateRequestMoveCall(
            txb,
            recipientUsername,
            message,
            amountInMist,
            data.username,
            "0x8"
        );

        const serializedTransaction = await txb.serialize();
        signAndExecuteTransaction(
            {
            transaction: serializedTransaction,
            },
            {
            onSuccess: (result) => {
                console.log('Transaction success', result);
                toast.success('Request sent successfully!');
                setRecipientUsername('');
                setAmount('');
                setMessage('');
                updateRefreshCounter();
            },
            onError: (error) => {
                console.error('Transaction Error:', error);
                toast.error('Failed to send request. Please try again.');
            },
            onSettled: () => {
                setIsLoading(false);
                toast.dismiss(toastId);
            },
            },
        );
        } catch (error) {
        console.error('Error during transaction:', error);
        toast.error('An unexpected error occurred. Please try again.');
        setIsLoading(false);
        toast.dismiss(toastId);
        }
    };

        const handleApprove = async (requestId: number) => {
            if (!account?.address) {
            toast.error('Please connect your wallet.');
            return;
            }

            setApprovingRequest(requestId);
            const toastId = toast.loading('Approving request...');

            try {
            const txb = new TransactionBlock();
            generateApproveMoveCall(txb, userName as string, requestId);

            const serializedTransaction = await txb.serialize();
            signAndExecuteTransaction(
                {
                transaction: serializedTransaction,
                },
                {
                onSuccess: (result) => {
                    console.log('Transaction success', result);
                    toast.success('Request approved successfully!');
                    updateRefreshCounter();
                },
                onError: (error) => {
                    console.error('Transaction Error:', error);
                    toast.error('Failed to approve request.');
                },
                onSettled: () => {
                    setApprovingRequest(null);
                    toast.dismiss(toastId);
                },
                },
            );
            } catch (error) {
            console.error('Error approving request:', error);
            toast.error('Failed to approve request.');
            setApprovingRequest(null);
            toast.dismiss(toastId);
            }
        };

        const handleReject = (requestId: number) => {
            toast.success(`Request ${requestId} rejected successfully!`);
            console.log(`Rejecting request with ID: ${requestId}`);
        };

    return (
        <div className="p-6">
            <div className="w-full bg-transparent">
                <h1 className="text-2xl font-bold text-white mb-8">Send Payment Request</h1>
                <div className="space-y-4">
                <div className="bg-neutral-900 p-4 rounded-xl">
                    {/* <label className="text-gray-400">Recipient Username</label> */}
                    <input
                    type="text"
                    placeholder="Enter recipient's username"
                    value={recipientUsername}
                    onChange={(e) => setRecipientUsername(e.target.value)}
                    className="w-full p-3 bg-transparent text-white rounded-lg border-none focus:outline-none focus:ring-0"
                    />
                </div>
                <div className="bg-neutral-900 p-4 rounded-xl">
                    {/* <label className="text-gray-400">Amount (SUI)</label> */}
                    <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 bg-transparent text-white rounded-lg border-none focus:outline-none focus:ring-0"
                    />
                </div>
                <div className="bg-neutral-900 p-4 rounded-xl">
                    {/* <label className="text-gray-400">Message (Optional)</label> */}
                    <textarea
                    placeholder="Enter a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 bg-transparent text-white rounded-lg border-none focus:outline-none focus:ring-0"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    onClick={handleSendRequest}
                    disabled={isLoading}
                    className="w-full bg-lime-500 hover:bg-lime-600 text-white font-medium py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Sending...' : 'Send Request'}
                </button>
                </div>
            </div>
        <div className="mt-8">
            <h1 className="text-2xl font-semibold mb-4 text-white">Recent Requests</h1>
            <div className="overflow-x-auto">
            <table className="min-w-full bg-neutral-900 border border-neutral-800 rounded-lg">
                <thead className="bg-neutral-800">
                <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">From</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                {requests.length > 0 ? (
                    requests.map((request) => (
                    <tr key={request.key} className="hover:bg-neutral-800 transition-colors">
                        <td className="px-6 py-4 text-sm text-white">{request.value.name_requestor}</td>
                        <td className="px-6 py-4 text-sm text-white">{mistToSui(request.value.amount)} SUI</td>
                        <td className="px-6 py-4 text-sm text-white">{request.value.message}</td>
                        <td className="px-6 py-4 text-sm text-white">{shortenEthAddress(request.value.address_requestor)}</td>
                        <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                            <Button
                            onClick={() => handleApprove(request.key)}
                            className="flex items-center gap-2 bg-lime-400 text-neutral-700 rounded-xl hover:bg-lime-600 transition-all"
                            disabled={approvingRequest === request.key}
                            >
                            {approvingRequest === request.key ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <ArrowUpRight size={16} />
                            )}
                                Approve
                            </Button>
                            <Button
                            onClick={() => handleReject(request.key)}
                            className="flex items-center gap-2 bg-red-500 rounded-xl hover:bg-red-700 transition-all"
                            >
                            <ArrowDownLeft size={16} />
                                Reject
                            </Button>
                        </div>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-neutral-400">
                        No requests found.
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
};

export default SendPage;