/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import { Suspense } from 'react';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  useCurrentAccount,
  ConnectButton,
  useCurrentWallet,
  useSignAndExecuteTransaction,
  useSuiClientQuery,
} from '@mysten/dapp-kit';
import { shortenEthAddress } from '@/utils/shortenEthAddress';
import { getOnChainDataFunctions } from '@/utils/onChaindata';
import mistToSui from '@/utils/mist';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { generateApprovePaymentLink } from '@/utils/moveCalls';
import { CheckCircle, Copy, Loader2, ShieldCheck, Wallet, XCircle } from 'lucide-react';
import axios from 'axios';
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

const KaiShoObjectId = process.env.NEXT_PUBLIC_SUI_PAY_ID ?? '';

interface PaymentInfo {
  amount: number;
  message: string;
  active: boolean;
  creator: string;
}

interface UserProfile {
  username: string;
  img_url: string;
}

const PayPage = () => {
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const { connectionStatus } = useCurrentWallet();
  const searchParams = useSearchParams();
  const account = useCurrentAccount();
  const [paySuccess, setPaySuccess] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const { data: suipayObject, isLoading: isSuipayLoading } = useSuiClientQuery('getObject', {
    id: KaiShoObjectId,
    options: {
      showContent: true,
    },
  });
  const [suiPrice, setSuiPrice] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const name = searchParams.get('name') as string;
  const address = searchParams.get('address') as string;
  const paymentLinkId = searchParams.get('id') as string;

  const { getUserData, getPaymentLinkById } = useMemo(() => {
    return getOnChainDataFunctions(suipayObject);
  }, [suipayObject]);
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
  const fetchData = useCallback(async () => {
    try {
      if (!address || !name || !paymentLinkId) {
        setError('Missing required parameters');
        return;
      }

      const [userData, paymentData] = await Promise.all([
        getUserData(address),
        getPaymentLinkById(name, paymentLinkId),
      ]);

      setUserProfile(userData);
      setPaymentInfo(paymentData);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [address, name, paymentLinkId, getUserData, getPaymentLinkById]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePay = useCallback(async () => {
    if (!paymentInfo?.active) {
      setPayError('This payment link is inactive');
      return;
    }

    if (connectionStatus !== 'connected') {
      setPayError('Please connect your wallet to proceed');
      return;
    }

    setIsPaying(true);
    setPayError(null);
    setPaySuccess(false);

    try {
      const txb = new TransactionBlock();
      generateApprovePaymentLink(txb, name, parseFloat(paymentLinkId), paymentInfo.amount);
      const serializedTransaction = await txb.serialize();

      await signAndExecuteTransaction(
        { transaction: serializedTransaction },
        {
          onSuccess: () => {
            setPaySuccess(true);
            toast.success('Payment successful!');
          },
          onError: (error) => {
            console.error('Transaction Error:', error);
            setPayError('Payment failed. Please try again.');
          },
        }
      );
    } catch (err) {
      console.error(err);
      setPayError('Payment failed. Please try again.');
    } finally {
      setIsPaying(false);
    }
  }, [paymentInfo, name, paymentLinkId, signAndExecuteTransaction, connectionStatus]);


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl max-w-md text-center shadow-lg">
          <div className="mb-4 flex justify-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-red-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-lime-500 text-white py-2 rounded-lg hover:bg-lime-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (loading || isSuipayLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl max-w-md text-center shadow-lg animate-pulse">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-12 bg-gray-200 rounded-lg mt-6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 flex items-center justify-center">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 160 160" 
                fill="none" 
                className="transition-transform hover:rotate-[15deg]"
            >
                <circle cx="80" cy="80" r="80" fill="url(#paint0_linear_1_2)"/>
                <path d="M80 28L108 60H100.8L80 37.04L59.2 60H52L80 28Z" fill="white"/>
                <path d="M80 132L52 100H59.2L80 122.96L100.8 100H108L80 132Z" fill="white"/>
                <path d="M68 64H92V96H68V64Z" fill="white"/>
                <path d="M76 72H84V88H76V72Z" fill="url(#paint1_linear_1_2)"/>
                <path d="M56 48L40 64H56V48Z" fill="#A3F9B9"/>
                <path d="M104 48L120 64H104V48Z" fill="#A3F9B9"/>
                <path d="M56 112L40 96H56V112Z" fill="#A3F9B9"/>
                <path d="M104 112L120 96H104V112Z" fill="#A3F9B9"/>
                <defs>
                    <linearGradient id="paint0_linear_1_2" x1="80" y1="0" x2="80" y2="160" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6FEB87"/>
                        <stop offset="1" stopColor="#2BDD5B"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_1_2" x1="80" y1="72" x2="80" y2="88" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2BDD5B"/>
                        <stop offset="1" stopColor="#1A9334"/>
                    </linearGradient>
                    <clipPath id="clip0_1_2">
                        <rect width="160" height="160" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-lime-500">Kaisho Pay</h1>
        </div>
        <p className="text-neutral-400 max-w-xl mx-auto text-sm">
          Secure SUI Payments Powered by Kaisho Pay
        </p>
      </div>

      <div className="max-w-md mx-auto bg-neutral-900 rounded-2xl shadow-xl p-6 border border-neutral-800">
        {paySuccess && (
          <div className="mb-6 p-4 bg-green-900/30 rounded-lg flex items-center border border-green-800/50">
            <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-green-400 text-sm">Payment completed successfully!</span>
          </div>
        )}

        {payError && (
          <div className="mb-6 p-4 bg-red-900/30 rounded-lg flex items-center border border-red-800/50">
            <XCircle className="w-5 h-5 text-red-400 mr-2" />
            <span className="text-red-400 text-sm">{payError}</span>
          </div>
        )}

        <div className="flex items-center gap-4 mb-8">
          <img
            src={userProfile?.img_url || '/default-avatar.png'}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-lime-500/80"
          />
          <div>
            <h1 className="text-xl font-semibold text-neutral-100">{userProfile?.username}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-neutral-400 text-sm">{shortenEthAddress(address || '')}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(address || '')}
                className="text-neutral-500 hover:text-lime-500 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-neutral-800/50 rounded-xl p-6 mb-8 border border-neutral-700">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-lime-400 mb-2">
              {mistToSui(paymentInfo?.amount || 0)} SUI 
              <span className='text-sm'>
                  {' '}≈{' '}{suiPrice
                      ? `($${(mistToSui(paymentInfo?.amount || 0) * parseFloat(suiPrice)).toFixed(2)})`
                      : 'Loading...'}
              </span>
            </div>
            {paymentInfo?.message && (
              <p className="text-neutral-300 mt-2 italic text-sm">&quot;{paymentInfo.message}&quot;</p>
            )}
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Status:</span>
              <span className={`flex items-center ${paymentInfo?.active ? 'text-green-400' : 'text-red-400'}`}>
                {paymentInfo?.active ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Active
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 mr-1" />
                    Inactive
                  </>
                )}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Network:</span>
              <span className="text-neutral-300 flex items-center">
                <img src='https://s2.coinmarketcap.com/static/img/coins/64x64/20947.png' alt='sui-icon' className='w-4 h-4 mr-2'/>
                SUI Testnet
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Link ID:</span>
              <span className="font-mono text-neutral-300 text-sm">{paymentLinkId}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Created by:</span>
              <span className="text-neutral-300 text-sm">
                {shortenEthAddress(paymentInfo?.creator || '')}
              </span>
            </div>
          </div>
        </div>

        {connectionStatus !== 'connected' ? (
          <div className="flex justify-center">
            <ConnectButton className="w-full bg-lime-500/90 hover:bg-lime-400 text-black py-3 rounded-xl transition-all font-medium hover:scale-[0.98]">
              Connect Wallet
            </ConnectButton>
          </div>
        ) : (
          <button
            onClick={handlePay}
            disabled={!paymentInfo?.active || isPaying}
            className="w-full bg-lime-500/90 hover:bg-lime-400 text-black py-3 rounded-xl transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed relative hover:scale-[0.98]"
          >
            {isPaying ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            ) : null}
            <span className={isPaying ? 'invisible' : ''}>Confirm Payment</span>
          </button>
        )}

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-neutral-500 text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Sui network</span>
          </div>
          <p className="text-neutral-600 text-xs mt-2">
            Powered by Kaisho Protocol • v1.2.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default function PayPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PayPage />
    </Suspense>
  );
}