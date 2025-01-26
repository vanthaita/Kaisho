/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { useSuiClientQuery } from '@mysten/dapp-kit';
import { KAISHO_PAY_ID } from '@/constant/config';

const KaiShoObjectId = KAISHO_PAY_ID ?? ''
interface PaymentLinkData {
    id: string;
    amount: number;
    message: string;
    creator: string;
    active: boolean;
}

interface UserData {
    username: string;
    balance: number;
    img_url: string;
    listAddress: any[];
    id?: string;
    history: any[];
    requests: any;
    payment_links: any[];
}

interface RecentActivity {
    action: number[] | string;
    amount: string; 
    message: string; 
    otherPartyAddress: string; 
    otherPartyName: string; 
  }
interface OnChainDataContextType {
    suipayObject: any;
    isSuipayLoading: boolean;
    getUserData: (address: string) => UserData | null;
    getHistoryUserData: (username: string) => any[] | null;
    getRequestUserData: (username: string) => any[] | null;
    refreshData: () => void;
    refreshCounter: number;
    updateRefreshCounter: () => void;
    getPaymentLinks: (username: string) => PaymentLinkData[] | null;
    getRecentActivity: (username: string) => RecentActivity[] | null;
}

const OnChainDataContext = createContext<OnChainDataContextType | undefined>(undefined);

export const useOnChainDataContext = () => {
    const context = useContext(OnChainDataContext);
    if (!context) {
        throw new Error('useOnChainDataContext must be used within an OnChainDataProvider');
    }
    return context;
};

export const OnChainDataProvider = ({ children }: { children: ReactNode }) => {
    const [refreshCounter, setRefreshCounter] = useState(0);
    const { data: suipayObject, isLoading: isSuipayLoading, refetch } = useSuiClientQuery('getObject', {
        id: KaiShoObjectId,
        options: {
            showContent: true,
        },
    });


    const refreshData = useCallback(() => {
        refetch();
    }, [refetch]);
   
   const updateRefreshCounter = useCallback(() => {
        setRefreshCounter((prev) => prev + 1);
    }, []);

    const getUserData = useCallback((address: string) => {
        if (!suipayObject || !suipayObject.data || !suipayObject.data.content) return null;

        const content = suipayObject.data.content;

        if (content.dataType === 'moveObject' && content.type.includes('suipay::SuiPay')) {
            const fields = content.fields as any;
            console.log(fields);

            if (fields.accounts && fields.accounts.fields.contents) {
                const accounts = fields.accounts.fields.contents;
                for (const accountEntry of accounts) {
                    const user = accountEntry.fields.value;
                    if (user && user.fields && user.fields.username && user.fields.username.fields.owner === address) {
                        return {
                            username: user.fields.username.fields.name,
                            balance: parseInt(user.fields.balance, 10),
                            img_url: user.fields.img_url || "https://via.placeholder.com/150",
                            listAddress: user.fields.listAddress || [],
                            id: user.fields.id?.id,
                            history: user.fields.history || [],
                            requests: user.fields.requests || { fields: { contents: [] } },
                            payment_links: user.fields.payment_links || [],
                        };
                    }
                }
            }
        }
        return null;
    }, [suipayObject]);

    const getHistoryUserData = useCallback((username: string) => {
        if (!suipayObject || !suipayObject.data || !suipayObject.data.content) return null;

        const content = suipayObject.data.content;

        if (content.dataType === 'moveObject' && content.type.includes('suipay::SuiPay')) {
            const fields = content.fields as any;
            if (fields.accounts && fields.accounts.fields.contents) {
                const accounts = fields.accounts.fields.contents;
                for (const accountEntry of accounts) {
                    const user = accountEntry.fields.value;
                    if (user && user.fields && user.fields.username && user.fields.username.fields.name === username) {
                        return user.fields.history || [];
                    }
                }
            }
        }
        return null;
    }, [suipayObject]);

    const getRequestUserData = useCallback((username: string) => {
        if (!suipayObject || !suipayObject.data || !suipayObject.data.content) return null;

        const content = suipayObject.data.content;

        if (content.dataType === 'moveObject' && content.type.includes('suipay::SuiPay')) {
            const fields = content.fields as any;
            if (fields.accounts && fields.accounts.fields.contents) {
                const accounts = fields.accounts.fields.contents;
                for (const accountEntry of accounts) {
                    const user = accountEntry.fields.value;
                    if (user && user.fields && user.fields.username && user.fields.username.fields.name === username) {
                        return user.fields.requests?.fields?.contents || [];
                    }
                }
            }
        }
        return null;
    }, [suipayObject]);
    const getPaymentLinks = useCallback((username: string) => {
        if (!suipayObject || !suipayObject.data || !suipayObject.data.content) return null;
    
        const content = suipayObject.data.content;
    
        if (content.dataType === 'moveObject' && content.type.includes('suipay::SuiPay')) {
            const fields = content.fields as any;
            if (fields.accounts && fields.accounts.fields.contents) {
                const accounts = fields.accounts.fields.contents;
                for (const accountEntry of accounts) {
                    const user = accountEntry.fields.value;
                    if (user?.fields?.username?.fields?.name === username) {
                        return user.fields.payment_links?.fields?.contents?.map((link: any) => ({
                            id: link.fields.key,
                            amount: parseInt(link.fields.value.fields.amount, 10),
                            message: link.fields.value.fields.message,
                            creator: link.fields.value.fields.creator,
                            active: link.fields.value.fields.active
                        })) || [];
                    }
                }
            }
        }
        return [];
    }, [suipayObject]);
    const getRecentActivity = useCallback((username: string) => {
        if (!suipayObject || !suipayObject.data || !suipayObject.data.content) return null;
        const content = suipayObject.data.content;
        if (content.dataType === 'moveObject' && content.type.includes('suipay::SuiPay')) {
          const fields = content.fields as any;
          if (fields.accounts && fields.accounts.fields.contents) {
            const accounts = fields.accounts.fields.contents;
            for (const accountEntry of accounts) {
              const user = accountEntry.fields.value;
              if (user?.fields?.username?.fields?.name === username) {
                return user.fields.history?.map((activity: any) => ({
                  action: activity.fields.action,
                  amount: activity.fields.amount,
                  message: activity.fields.message,
                  otherPartyAddress: activity.fields.otherPartyAddress,
                  otherPartyName: activity.fields.otherPartyName,
                })) || [];
              }
            }
          }
        }
        return [];
      }, [suipayObject]);
    return (
        <OnChainDataContext.Provider
            value={{
                suipayObject,
                isSuipayLoading,
                getUserData,
                getHistoryUserData,
                getRequestUserData,
                refreshData,
                refreshCounter,
                updateRefreshCounter,
                getPaymentLinks,
                getRecentActivity,
            }}
        >
            {children}
        </OnChainDataContext.Provider>
    );
};