
/* eslint-disable @typescript-eslint/no-explicit-any */

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

export const getOnChainDataFunctions = (suipayObject: any) => {
    
    const getUserData = (address: string): UserData | null => {
        if (!suipayObject || !suipayObject.data || !suipayObject.data.content) return null;
    
        const content = suipayObject.data.content;
        if (content.dataType === 'moveObject' && content.type.includes('suipay::SuiPay')) {
          const fields = content.fields as any;
          if (fields.accounts?.fields?.contents) {
            const accounts = fields.accounts.fields.contents;
            for (const accountEntry of accounts) {
              const user = accountEntry.fields.value;
              if (user?.fields?.username?.fields?.owner === address) {
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
      };
      const getPaymentLinkById = (
        username: string,
        paymentId: string
    ): PaymentLinkData | null => {
        if (!suipayObject?.data?.content) return null;
    
        const content = suipayObject.data.content;
    
        if (
            content.dataType === 'moveObject' &&
            content.type.includes('suipay::SuiPay')
        ) {
            const accounts = content.fields.accounts?.fields?.contents || [];
    
            for (const accountEntry of accounts) {
                const user = accountEntry.fields.value;
                const currentUsername = user?.fields?.username?.fields?.name;
    
                if (currentUsername === username) {
                    const links = user.fields.payment_links?.fields?.contents || [];
                    const foundLink = links.find((link: any) => 
                        link.fields.key === parseInt(paymentId, 10) 
                    );
    
                    if (foundLink) {
                        return {
                            id: foundLink.fields.key,
                            amount: parseInt(foundLink.fields.value.fields.amount, 10),
                            message: foundLink.fields.value.fields.message,
                            creator: foundLink.fields.value.fields.creator,
                            active: foundLink.fields.value.fields.active
                        };
                    }
                }
            }
        }
    
        return null;
    };

    return {
        getUserData,
        getPaymentLinkById, 
    };
};