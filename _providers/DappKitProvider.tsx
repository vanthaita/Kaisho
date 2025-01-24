'use client';

import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mysten/dapp-kit/dist/index.css';
import { OnChainDataProvider } from '@/app/context/OnChainDataContext';
import { ToastContainer } from 'react-toastify';
interface Props {
    children: React.ReactNode;
}
const queryClient = new QueryClient();
const {networkConfig} = createNetworkConfig({
  testnet: { url: getFullnodeUrl('testnet') },
});

export function DappKitProvider({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
                <WalletProvider autoConnect>
                    <OnChainDataProvider>
                        {children}
                        <ToastContainer />
                    </OnChainDataProvider>
                    </WalletProvider>
            </SuiClientProvider>
        </QueryClientProvider>
    );
}