/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { User, ImageIcon, UploadIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { useSignAndExecuteTransaction, useCurrentAccount } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useRouter } from "next/navigation";
import { generateAddUserMoveCall } from "@/utils/moveCalls";
import { toast } from "react-toastify";

const Onboarding = () => {
    const [username, setUsername] = useState("");
    const [imageUrl, setImageUrl] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnQxE9Qwzoz_W4RlSV0v1Fs3NA0601JBpfeA&s");
    const [usernameError, setUsernameError] = useState("");
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [suiClient, setSuiClient] = useState<SuiClient | null>(null);
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const account = useCurrentAccount();
    const router = useRouter();
    useEffect(() => {
        const client = new SuiClient({ url: getFullnodeUrl('testnet') });
        setSuiClient(client);
    }, []);

    const handleAddUserName = async () => {
        if (usernameError) {
            toast.error("Username has errors. Cannot submit.");
            return;
        }

        if (!username) {
            setUsernameError("Username is required");
            toast.error("Username is required");
            return;
        }

        if (!account?.address) {
            toast.error("No account connected."); 
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading("Submitting form...");

        try {
            if (!suiClient) {
                toast.error("Sui client not initialized");
                return;
            }

            const txb = new TransactionBlock();
            generateAddUserMoveCall(txb, username, imageUrl);

            const serializedTransaction = await txb.serialize();
            signAndExecuteTransaction(
                {
                    transaction: serializedTransaction,
                },
                {
                    onSuccess: (result) => {
                        console.log('Transaction success', result);
                        toast.success("Form submitted successfully!"); 
                        router.push('/dashboard');
                    },
                    onError: (error) => {
                        console.error('Transaction Error:', error);
                        toast.error("Transaction failed!"); 
                    },
                    onSettled: () => {
                        toast.dismiss(toastId); 
                        setIsSubmitting(false);
                    }
                },
            );
        } catch (error) {
            console.error("Error during transaction:", error);
            toast.error("An unexpected error occurred. Please try again."); 
            setIsSubmitting(false);
            toast.dismiss(toastId); 
        }
    };

    const handleImageUpload = async (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsImageLoading(true);
        const toastId = toast.loading("Uploading image..."); 

        try {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    setImageUrl(event.target.result as string);
                    setPreviewImage(event.target.result as string);
                    toast.success("Image uploaded successfully!"); 
                }
                setIsImageLoading(false);
                toast.dismiss(toastId); 
            };
            reader.onerror = () => {
                setIsImageLoading(false);
                toast.error("Error reading the file."); 
                toast.dismiss(toastId);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            setIsImageLoading(false);
            toast.error("Error uploading the file"); 
            toast.dismiss(toastId); 
        }
    };

    const handleImageUrlChange = (e: any) => {
        const url = e.target.value;
        setImageUrl(url);
        if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
            setPreviewImage(url);
        } else {
            setPreviewImage(null);
        }
    };

    const handleOpenFileDialog = () => {
        fileInputRef.current?.click();
    };

    const validateUsername = (value: string) => {
        const regex = /^[a-z0-9_]+$/;

        if (!value) {
            return "Username is required";
        } else if (value.length < 3) {
            return "Username must be at least 3 characters long";
        } else if (value.length > 20) {
            return "Username must be less than 20 characters long";
        } else if (!regex.test(value)) {
            return "Username can only contain lowercase letters, numbers, and underscores";
        }
        return "";
    };

    useEffect(() => {
        setUsernameError(validateUsername(username));
    }, [username]);



    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    };

    const sectionVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut", delay: 0.1 } },
    };

    const formVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut", delay: 0.2 } },
    };


    return (
        <section className="h-screen w-full relative flex items-center justify-center bg-gray-950 text-white">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container max-w-5xl mx-auto flex max-h-[80vh] h-auto rounded-2xl border border-gray-800 p-6 md:p-10  flex-col md:flex-row"
            >
                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full md:w-1/2 pr-0 md:pr-10 flex flex-col justify-start md:justify-center "
                >
                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold mb-4 text-gray-200">
                            Complete your profile
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Your profile will help us personalize your experience.
                        </p>
                    </div>
                    <motion.div variants={formVariants} initial="hidden" animate="visible" className="space-y-4">
                        <div className="mb-2">
                            <label
                                htmlFor="username"
                                className="text-sm font-medium text-gray-300 mb-1 flex items-center gap-1"
                            >
                                <User className="h-4 w-4 inline-block" />
                                Username
                            </label>
                            <Input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={cn(
                                    "border border-gray-700 rounded-md focus:ring-lime-500 focus:border-lime-500  placeholder:text-gray-500 text-gray-200 bg-gray-800",
                                    usernameError ? "border-red-500" : ""
                                )}
                            />
                            {usernameError && (
                                <p className="text-red-500 text-xs mt-1">
                                    {usernameError}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-300 mb-1 flex items-center gap-1">
                                <ImageIcon className="h-4 w-4 inline-block" />
                                Avatar
                            </label>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full mt-2 flex items-center justify-center ">
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-40  border-2 border-dashed border-gray-700 rounded-md cursor-pointer hover:bg-gray-800 transition-colors duration-200"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            {isImageLoading ? (
                                                <p className="mb-2 text-sm text-gray-500">
                                                    Loading...
                                                </p>
                                            ) : (
                                                <>
                                                    <svg
                                                        className="w-8 h-8 mb-4 text-gray-500 "
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 20 16"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                        />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500">
                                                        <span className="font-semibold">
                                                            Click to upload
                                                        </span>{" "}
                                                        or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 ">
                                                        SVG, PNG, JPG or GIF (Max. 800x400px)
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            accept="image/*"
                                        />
                                    </label>
                                </div>
                                {previewImage && (
                                    <div className="w-full md:w-1/2 flex items-center justify-center">
                                        <div className="relative w-40 h-40 overflow-hidden rounded-md border border-gray-700">
                                            <Image
                                                src={previewImage}
                                                alt="Preview"
                                                layout="fill"
                                                objectFit="cover"
                                                className="w-full h-full rounded-md"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                                <div className="mt-2">
                                 <label
                                        htmlFor="imageUrl"
                                         className="text-sm font-medium text-gray-300 mb-1 flex items-center gap-1"
                                    >
                                     Or enter image URL
                                </label>
                                <Input
                                       type="text"
                                       id="imageUrl"
                                       placeholder="Enter image URL"
                                       value={imageUrl}
                                        onChange={handleImageUrlChange}
                                        className="border border-gray-700 rounded-md focus:ring-lime-500 focus:border-lime-500  placeholder:text-gray-500 text-gray-200 bg-gray-800"
                                 />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button
                                disabled={isSubmitting || !!usernameError || !username}
                                className={cn(
                                    "bg-lime-500 text-black hover:bg-lime-600 transition-colors duration-200",
                                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                )}
                                onClick={handleAddUserName}
                            >
                                Submit →
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
                <motion.div variants={formVariants} initial="hidden" animate="visible" className="w-full md:w-1/2 pl-0 md:pl-10 border-t md:border-t-0 md:border-l border-gray-800 mt-8 md:mt-0 py-4 md:py-0">
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold mb-4 text-gray-200">
                            Accept Payments in Crypto and Fiat
                        </h1>
                        <p className="text-gray-400 ">
                            Our diverse suite of tools and APIs is best fit for Web3 SaaS,
                            gaming, treasury management, distributing grants, e-commerce
                            business, and many more.
                        </p>
                        <p className="text-gray-500 mt-4">
                            Complete your profile to get started.
                        </p>
                        <ul className="mt-4 list-disc pl-5 text-gray-500">
                            <li>
                                Your username and avatar will be used throughout the
                                application
                            </li>
                            <li>
                                Choose a unique username that&apos;s easy to remember
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Onboarding;