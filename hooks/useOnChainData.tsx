/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { useCallback } from "react";

const KaiShoObjectId = process.env.NEXT_PUBLIC_POOL_OBJECT_ID ?? '0xa9ac2dd0b8b0f4bea402004108ec3da917ba42d3c46f6681b95bebbdd3de3289';

export const useOnChainData = () => {
    const { data: suipayObject, isLoading: isSuipayLoading } = useSuiClientQuery('getObject', {
        id: KaiShoObjectId,
        options: {
            showContent: true,
        },
    });

    const getUserData = useCallback((username: string) => {
        if (!suipayObject || !suipayObject.data || !suipayObject.data.content) return null;

        const content = suipayObject.data.content;
        if (content.dataType === 'moveObject' && content.type.includes('suipay::SuiPay')) {
            const fields = content.fields as any;
            if (fields.accounts && fields.accounts.fields.contents) {
                const userEntry = fields.accounts.fields.contents.find(
                    (entry: any) => entry.fields.key === username
                );
                return userEntry ? userEntry.fields.value : null;
            }
        }
        return null;
    }, [suipayObject]);

    return { suipayObject, isSuipayLoading, getUserData };
};