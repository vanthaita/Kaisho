/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SuiClient, SuiHTTPTransport } from '@mysten/sui.js/client';
import { useCallback } from 'react';

const useOnChainEvents = () => {
    const suiClient = new SuiClient({
        transport: new SuiHTTPTransport({
            url: 'https://fullnode.testnet.sui.io:443',
            websocket: {
                url: 'wss://fullnode.testnet.sui.io:443',
                reconnectTimeout: 3000,
                maxReconnects: 5,
            },
        }),
    });
    console.log("socket: ", suiClient);
    const createSubscription = useCallback(async (eventType: string, onEvent: (event: any) => void) => {
        let retries = 0;
        const maxRetries = 3;

        const connect = async () => {
            try {
                return await suiClient.subscribeEvent({
                    filter: { MoveEventType: eventType },
                    onMessage: (event) => {
                        console.log(`New ${eventType} event:`, event);
                        onEvent(event);
                        retries = 0; 
                    },
                });
            } catch (error) {
                console.error(`Failed to subscribe to ${eventType}:`, error);
                if (retries < maxRetries) {
                    console.log(`Retrying... (${retries + 1}/${maxRetries})`);
                    retries++;
                    await new Promise(resolve => setTimeout(resolve, 1000 * retries));
                    return connect();
                }
                throw error;
            }
        };

        return connect();
    }, [suiClient]);

    const listenForPaymentRequestCreated = useCallback((onEvent: (event: any) => void) => {
        return createSubscription('suipay::EventPaymentRequestCreated', onEvent);
    }, [createSubscription]);

    const listenForPaymentMade = useCallback((onEvent: (event: any) => void) => {
        return createSubscription('suipay::EventPaymentMade', onEvent);
    }, [createSubscription]);

    return {
        listenForPaymentRequestCreated,
        listenForPaymentMade,
    };
};

export default useOnChainEvents;