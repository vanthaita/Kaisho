// // useSuiPay.ts
// import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
// import { SuiClient, getFullnodeUrl, TransactionBlock } from '@mysten/sui.js/client';
// import { useEffect, useState } from 'react';

// // Replace with your SuiPay object ID and package ID
// const SUI_PAY_OBJECT_ID = process.env.NEXT_PUBLIC_SUI_PAY_OBJECT_ID ?? '';
// const PACKAGE_OBJECT_ID = process.env.NEXT_PUBLIC_SUI_PACKAGE_ID ?? '';

// // Initialize Sui client
// const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

// /**
//  * Check if a username exists on-chain.
//  * @param username - The username to check.
//  * @returns A boolean indicating whether the username exists.
//  */
// export const checkUsernameExists = async (username: string): Promise<boolean> => {
//   try {
//     const tx = new TransactionBlock();
//     tx.moveCall({
//       target: `${PACKAGE_OBJECT_ID}::suipay::user_exists`,
//       arguments: [tx.pure(username), tx.object(SUI_PAY_OBJECT_ID)],
//     });

//     const result = await suiClient.devInspectTransactionBlock({
//       transactionBlock: tx,
//       sender: '0x0', // Use a dummy sender address
//     });

//     return result.effects.status.status === 'success' && result.effects.status.events[0].parsedJson.exists;
//   } catch (error) {
//     console.error('Error checking username:', error);
//     return false;
//   }
// };

// /**
//  * Get linked addresses for a specific username.
//  * @param username - The username to fetch linked addresses for.
//  * @returns An array of linked addresses.
//  */
// export const getLinkedAddresses = async (username: string): Promise<string[]> => {
//   try {
//     const tx = new TransactionBlock();
//     tx.moveCall({
//       target: `${PACKAGE_OBJECT_ID}::suipay::get_linked_addresses`,
//       arguments: [tx.pure(username), tx.object(SUI_PAY_OBJECT_ID)],
//     });

//     const result = await suiClient.devInspectTransactionBlock({
//       transactionBlock: tx,
//       sender: '0x0', // Use a dummy sender address
//     });

//     if (result.effects.status.status === 'success') {
//       return result.effects.status.events[0].parsedJson.addresses;
//     }
//     return [];
//   } catch (error) {
//     console.error('Error fetching linked addresses:', error);
//     return [];
//   }
// };

// /**
//  * Get user details (e.g., balance, history, etc.) for a specific username.
//  * @param username - The username to fetch details for.
//  * @returns User details or null if the user doesn't exist.
//  */
// export const getUserDetails = async (username: string): Promise<any> => {
//   try {
//     const tx = new TransactionBlock();
//     tx.moveCall({
//       target: `${PACKAGE_OBJECT_ID}::suipay::get_user_detail`,
//       arguments: [tx.pure(username), tx.object(SUI_PAY_OBJECT_ID)],
//     });

//     const result = await suiClient.devInspectTransactionBlock({
//       transactionBlock: tx,
//       sender: '0x0', // Use a dummy sender address
//     });

//     if (result.effects.status.status === 'success') {
//       return result.effects.status.events[0].parsedJson;
//     }
//     return null;
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     return null;
//   }
// };

// /**
//  * Create a payment request.
//  * @param username - The username of the requestor.
//  * @param amount - The amount to request.
//  * @param message - A message for the request.
//  * @returns The transaction result.
//  */
// export const createRequest = async (username: string, amount: number, message: string) => {
//   const tx = new TransactionBlock();
//   tx.moveCall({
//     target: `${PACKAGE_OBJECT_ID}::suipay::create_request`,
//     arguments: [
//       tx.pure(username),
//       tx.pure(amount),
//       tx.pure(message),
//       tx.object(SUI_PAY_OBJECT_ID),
//     ],
//   });

//   const result = await suiClient.signAndExecuteTransactionBlock({
//     transactionBlock: tx,
//     sender: account.address,
//   });

//   return result;
// };

// /**
//  * Pay a payment request.
//  * @param username - The username of the requestor.
//  * @param requestId - The ID of the request to pay.
//  * @param amount - The amount to pay.
//  * @returns The transaction result.
//  */
// export const payRequest = async (username: string, requestId: number, amount: number) => {
//   const tx = new TransactionBlock();
//   tx.moveCall({
//     target: `${PACKAGE_OBJECT_ID}::suipay::pay_request`,
//     arguments: [
//       tx.pure(username),
//       tx.pure(requestId),
//       tx.pure(amount),
//       tx.object(SUI_PAY_OBJECT_ID),
//     ],
//   });

//   const result = await suiClient.signAndExecuteTransactionBlock({
//     transactionBlock: tx,
//     sender: account.address,
//   });

//   return result;
// };

// /**
//  * Deposit funds into a user's account.
//  * @param username - The username of the account to deposit into.
//  * @param amount - The amount to deposit.
//  * @returns The transaction result.
//  */
// export const deposit = async (username: string, amount: number) => {
//   const tx = new TransactionBlock();
//   tx.moveCall({
//     target: `${PACKAGE_OBJECT_ID}::suipay::deposit`,
//     arguments: [
//       tx.pure(username),
//       tx.pure(amount),
//       tx.object(SUI_PAY_OBJECT_ID),
//     ],
//   });

//   const result = await suiClient.signAndExecuteTransactionBlock({
//     transactionBlock: tx,
//     sender: account.address,
//   });

//   return result;
// };

// /**
//  * Withdraw funds from a user's account.
//  * @param username - The username of the account to withdraw from.
//  * @param amount - The amount to withdraw.
//  * @returns The transaction result.
//  */
// export const withdraw = async (username: string, amount: number) => {
//   const tx = new TransactionBlock();
//   tx.moveCall({
//     target: `${PACKAGE_OBJECT_ID}::suipay::withdraw`,
//     arguments: [
//       tx.pure(username),
//       tx.pure(amount),
//       tx.object(SUI_PAY_OBJECT_ID),
//     ],
//   });

//   const result = await suiClient.signAndExecuteTransactionBlock({
//     transactionBlock: tx,
//     sender: account.address,
//   });

//   return result;
// };