// 'use client';
// import React, { useState } from 'react';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Transaction } from '@mysten/sui/transactions';
// import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
// import { toast } from 'sonner';

// export default function Home() {
//     const [name, setName] = useState('');
//     const [owner, setOwner] = useState('');
//     const [imgUrl, setImgUrl] = useState('');
//     const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
//     const account = useCurrentAccount();
//     const sui = useSuiClient();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!account) {
//             toast.error('Please connect your wallet.');
//             return;
//         }
//         try {
//             const txb = new Transaction();
//             const packageObjectId = process.env.NEXT_PUBLIC_PACKAGE_ID || '';
//             const userCap = process.env.NEXT_PUBLIC_SUI_PAY_ID || '';

//              if (!packageObjectId || !userCap) {
//                  toast.error("Missing environment variables for package or user cap");
//                  return;
//               }

//            const nameBytes = Array.from(Buffer.from(name, 'utf-8'));
//            const imgUrlBytes = Array.from(Buffer.from(imgUrl, 'utf-8'));

//             txb.moveCall({
//                 target: `${packageObjectId}::sui_pay::add_user`,
//                 arguments: [
//                     txb.pure("address", "2dikawjdlakwd"),
//                     d

//                 ],
//             });

//             const result = await signAndExecuteTransaction({
//                 transaction: txb,
//             });

//             if (result?.signature) {
//                 toast.success("User Added Successfully!");
//             } else {
//                 toast.error("Failed to add user. Check console for error");
//             }
//         }
//         catch (error) {
//             console.error("Transaction Error:", error);
//             toast.error(`Error adding user: ${error.message}`)
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//                 <h2 className="text-2xl font-semibold mb-6 text-center">Add User</h2>
//                 <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//                     <Input
//                         type="text"
//                         placeholder="Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                     <Input
//                         type="text"
//                         placeholder="Owner Address"
//                         value={owner}
//                         onChange={(e) => setOwner(e.target.value)}
//                         required
//                     />
//                     <Input
//                         type="text"
//                         placeholder="Image URL"
//                         value={imgUrl}
//                         onChange={(e) => setImgUrl(e.target.value)}
//                         required
//                     />
//                     <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                         Add User
//                     </Button>
//                 </form>
//             </div>
//         </div>
//     );
// }



import React from 'react'

const DashboardPage = () => {
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage