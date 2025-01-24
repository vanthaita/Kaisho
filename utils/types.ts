/* eslint-disable @typescript-eslint/no-explicit-any */
// types.ts
export interface SuiPayObject {
    data?: {
      content?: {
        dataType: 'moveObject';
        type: string;
        fields: {
          accounts?: {
            fields: {
              contents: AccountEntry[];
            };
          };
        };
      };
    };
  }
  
  export interface AccountEntry {
    fields: {
      value: {
        fields: UserData;
      };
    };
  }
  
  export interface UserData {
    username: {
      fields: {
        name: string;
        owner: string;
      };
    };
    balance: string;
    img_url?: string;
    listAddress: any[];
    id?: { id: string };
    history: any[];
    requests: any;
    payment_links: any[];
  }