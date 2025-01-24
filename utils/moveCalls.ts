/* eslint-disable @typescript-eslint/no-explicit-any */
import { TransactionBlock } from '@mysten/sui.js/transactions';

const packageObjectId = process.env.NEXT_PUBLIC_PACKAGE_ID ?? '';
const KaiShoObjectId = process.env.NEXT_PUBLIC_SUI_PAY_ID ?? '';

export const generateAddUserMoveCall = (
    txb: TransactionBlock,
    username: string,
    imageUrl: string
) => {
    txb.moveCall({
        target: `${packageObjectId}::suipay::add_user`,
        arguments: [
            txb.pure(username),
            txb.object(KaiShoObjectId),
            txb.pure(imageUrl),
        ],
    });
    return txb;
};
export const generateCreateRequestMoveCall = (
    txb: TransactionBlock,
    recipientUsername: string,
    message: string,
    amountInMist: number,
    senderUsername: string,
    chainId: string
) => {
    txb.moveCall({
        target: `${packageObjectId}::suipay::create_request`,
        arguments: [
            txb.object(KaiShoObjectId),
            txb.pure(recipientUsername),
            txb.pure(message),
            txb.pure(amountInMist),
            txb.pure(senderUsername),
            txb.pure(chainId),
        ],
    });
    return txb;
};
export const generateDepositMoveCall = (
    txb: TransactionBlock,
    username: string,
    amountInMist: number
) => {
    const [splitCoin] = txb.splitCoins(txb.gas, [amountInMist]);
    txb.moveCall({
        target: `${packageObjectId}::suipay::deposit`,
        arguments: [
            txb.object(KaiShoObjectId),
            txb.pure(username),
            splitCoin,
        ],
    });
    return txb;
};

export const generateWithdrawMoveCall = (
    txb: TransactionBlock,
    username: string,
    amountInMist: number
) => {
    txb.moveCall({
        target: `${packageObjectId}::suipay::withdraw`,
        arguments: [
            txb.object(KaiShoObjectId),
            txb.pure(username),
            txb.pure(amountInMist),
        ],
    });
    return txb;
};

export const generateApproveMoveCall = (
    txb: TransactionBlock,
    username: string,
    requestId: number
) => {
    txb.moveCall({
        target: `${packageObjectId}::suipay::pay_request`,
        arguments: [
            txb.object(KaiShoObjectId),
            txb.pure(username),
            txb.pure(requestId),
        ],
    });
    return txb;
};

export const generateCreatePaymentLinkMoveCall = (
    txb: TransactionBlock,
    recipientUsername: string,
    amount: number,
    message: string,
    chainId: string
) => {
    txb.moveCall({
        target: `${packageObjectId}::suipay::create_payment_link`,
        arguments: [
            txb.object(KaiShoObjectId),
            txb.pure(recipientUsername),
            txb.pure(amount),
            txb.pure(message),
            txb.pure(chainId),
        ],
    });
    return txb;
};

export const generateApprovePaymentLink = (
    txb: TransactionBlock,
    username: string,
    link_id: number,
    amountInMist: number,
) => {
    const [splitCoin] = txb.splitCoins(txb.gas, [amountInMist]);
    console.log(splitCoin, txb, link_id, amountInMist);
    txb.moveCall({
        target: `${packageObjectId}::suipay::pay_via_payment_link`,
        arguments: [
            txb.object(KaiShoObjectId),
            txb.pure(username),        
            txb.pure(link_id),         
            splitCoin,                 
        ],
    });

    return txb;
};