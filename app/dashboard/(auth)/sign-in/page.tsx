/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect } from 'react';
import { ConnectButton, useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import { useRouter } from 'next/navigation';
import { useOnChainDataContext } from '@/context/OnChainDataContext';

const SignInPage = () => {
    const router = useRouter();
    const { connectionStatus } = useCurrentWallet();
    const { getUserData } = useOnChainDataContext();
    const account = useCurrentAccount();
    useEffect(() => {
        if (connectionStatus === 'connected' && account?.address) {
            console.log("Connected Wallet, checking for account...");
            const userData = getUserData(account?.address);
            if (userData) {
                console.log("User has an account, redirecting to dashboard...");
                router.push('/dashboard'); 
            } else {
                console.log("User does not have an account, redirecting to onboarding...");
                router.push('/dashboard/onboarding');
            }
        }
    }, [connectionStatus, account?.address, getUserData, router]);

    return (
        <section className="h-screen w-full bg-black bg-dot-white/[0.3] relative flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black/80 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            <div className="container max-w-3xl mx-auto px-6 py-8 text-white">
                <div className="flex items-center justify-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-bold ml-4 text-lime-400">Kaisho Pay</h1>
                </div>

                <div className="border border-white/20 text-center rounded-xl p-8 md:p-10 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">
                        Connect to your Wallet
                    </h2>
                    <p className="text-gray-300 mb-6">
                        Seamlessly send and receive payments. Available on SUI
                    </p>
                    <div className="mb-6">
                        <ConnectButton />
                    </div>

                    <p className="text-xs text-gray-500">
                        By connecting your wallet, you agree to Kaisho&apos;s terms.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SignInPage;