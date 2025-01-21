/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useMoveCall.ts
import { useCallback } from "react";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useSignAndExecuteTransaction, useCurrentAccount } from "@mysten/dapp-kit";

const packageObjectId = process.env.NEXT_PUBLIC_SUI_PACKAGE_ID ?? '0x0c8688a618273fed1a19a2eceda9ec1580c2cf15743c394eabb957d650bbd3ef';
const KaiShoObjectId = process.env.NEXT_PUBLIC_POOL_OBJECT_ID ?? '0x2026a17b644d930529807e18c31c83855329aad991fd39d961253fe2781a8242';

export const useMoveCall = () => {
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const account = useCurrentAccount();

    /**
     * Hàm chung để thực hiện Move Call
     * @param functionName - Tên hàm trong smart contract (ví dụ: `add_user`, `create_request`)
     * @param args - Các đối số cần truyền vào hàm
     */
    const executeMoveCall = useCallback(async (functionName: string, args: any[]) => {
        if (!account?.address) {
            console.error("No account connected.");
            return;
        }
        console.log("Objects: ", packageObjectId, KaiShoObjectId);
        try {
            const txb = new TransactionBlock();
            txb.moveCall({
                target: `${packageObjectId}::suipay::${functionName}`,
                arguments: args,
            });

            const serializedTransaction = await txb.serialize();
            signAndExecuteTransaction(
                {
                    transaction: serializedTransaction,
                },
                {
                    onSuccess: (result) => {
                        console.log('Transaction success', result);
                        alert("Transaction successful!");
                    },
                    onError: (error) => {
                        console.error('Transaction Error:', error);
                        alert("Transaction failed!");
                    },
                },
            );
        } catch (error) {
            console.error("Error during transaction:", error);
        }
    }, [account, signAndExecuteTransaction]);

    /**
     * Thêm người dùng mới
     * @param username - Tên người dùng
     * @param imageUrl - URL hình ảnh
     */
    const addUser = useCallback(async (username: string, imageUrl: string) => {
        await executeMoveCall("add_user", [
            new TransactionBlock().pure(username),
            new TransactionBlock().pure(account?.address),
            new TransactionBlock().object(KaiShoObjectId),
            new TransactionBlock().pure(imageUrl),
        ]);
    }, [executeMoveCall, account]);

    /**
     * Tạo yêu cầu thanh toán
     * @param name - Tên người dùng
     * @param message - Thông điệp yêu cầu
     * @param amount - Số tiền yêu cầu
     * @param requestor - Tên người yêu cầu
     */
    const createRequest = useCallback(async (name: string, message: string, amount: number, requestor: string) => {
        await executeMoveCall("create_request", [
            new TransactionBlock().pure(name),
            new TransactionBlock().pure(message),
            new TransactionBlock().pure(amount),
            new TransactionBlock().pure(requestor),
        ]);
    }, [executeMoveCall]);

    /**
     * Thanh toán yêu cầu
     * @param name - Tên người dùng
     * @param requestId - ID yêu cầu
     * @param amount - Số tiền thanh toán
     */
    const payRequest = useCallback(async (name: string, requestId: number, amount: number) => {
        await executeMoveCall("pay_request", [
            new TransactionBlock().pure(name),
            new TransactionBlock().pure(requestId),
            new TransactionBlock().pure(amount),
        ]);
    }, [executeMoveCall]);

    /**
     * Nạp tiền vào tài khoản
     * @param name - Tên người dùng
     * @param amount - Số tiền nạp
     */
    const deposit = useCallback(async (name: string, amount: number) => {
        await executeMoveCall("deposit", [
            new TransactionBlock().pure(name),
            new TransactionBlock().pure(amount),
        ]);
    }, [executeMoveCall]);

    /**
     * Rút tiền từ tài khoản
     * @param name - Tên người dùng
     * @param amount - Số tiền rút
     */
    const withdraw = useCallback(async (name: string, amount: number) => {
        await executeMoveCall("withdraw", [
            new TransactionBlock().pure(name),
            new TransactionBlock().pure(amount),
        ]);
    }, [executeMoveCall]);

    return { addUser, createRequest, payRequest, deposit, withdraw };
};