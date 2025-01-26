/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState, useEffect } from 'react';
import { useSignAndExecuteTransaction, useCurrentAccount } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { generateCreatePaymentLinkMoveCall } from '@/utils/moveCalls';
import { toast } from 'react-toastify';
import { useOnChainDataContext } from '@/context/OnChainDataContext';
import { FaCopy, FaLink,FaFacebook, FaTwitter, FaLinkedin, FaDownload } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas'; 
import { Loader2 } from 'lucide-react';
import { shortenEthAddress } from '@/utils/shortenEthAddress';
import mistToSui from '@/utils/mist';

const LinkPage = () => {
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const { getUserData, getPaymentLinks, refreshCounter, updateRefreshCounter } = useOnChainDataContext();
  const [selectedLink, setSelectedLink] = useState<any>(null); 
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentLinks, setPaymentLinks] = useState<any[]>([]);
  const [linksLoading, setLinksLoading] = useState(true);
  const [screenshotLoading, setScreenshotLoading] = useState(false);
  const userData = getUserData(account?.address as string);
  const username = userData?.username as string;
  const img_url = userData?.img_url as string;

  useEffect(() => {
    const fetchPaymentLinks = async () => {
      if (username) {
        setLinksLoading(true);
        const links = getPaymentLinks(username) || [];
        setPaymentLinks(links);
        setLinksLoading(false);
      }
    };
    
    fetchPaymentLinks();
  }, [username, refreshCounter, getPaymentLinks]);

  const handleCreateLink = async () => {
    if (!amount || !account?.address) {
      toast.error('Please enter an amount and connect your wallet.');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Creating payment link...');

    try {
      const amountInMist = parseFloat(amount) * 1_000_000_000;
      const txb = new TransactionBlock();
      generateCreatePaymentLinkMoveCall(txb, username, amountInMist, message, "0x8");
      const serializedTransaction = await txb.serialize();
      
      signAndExecuteTransaction(
        { transaction: serializedTransaction },
        {
          onSuccess: (result) => {
            toast.success('Payment link created successfully!');
            updateRefreshCounter(); 
            resetForm();
          },
          onError: (error) => {
            console.error('Transaction Error:', error);
            toast.error('Failed to create payment link. Please try again.');
          },
          onSettled: () => {
            setLoading(false);
            toast.dismiss(toastId);
          },
        }
      );
    } catch (error) {
      console.error('Error during transaction:', error);
      toast.error('An unexpected error occurred. Please try again.');
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  const resetForm = () => {
    setAmount('');
    setMessage('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Link copied to clipboard!');
  };

  const openPopup = (link: any) => {
    setSelectedLink(link);
  };

  const closePopup = () => {
    setSelectedLink(null);
  };

  const shareOnSocialMedia = (platform: string) => {
    const shareUrl = `${window.location.origin}/pay?${new URLSearchParams({
      name: username,
      address: account?.address || '',
      id: selectedLink.id,
    }).toString()}`;

    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        break;
    }

    window.open(url, '_blank');
  };
  return (
    <section className="p-6 min-h-screen">
      <h2 className="text-2xl font-bold text-white mb-8">Create Payment Link</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="flex-1 space-y-4">
          <div className="bg-neutral-900 p-4 rounded-xl">
            <input
              type="text"
              placeholder="Amount in SUI"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 bg-transparent text-white rounded-lg border-none focus:outline-none focus:ring-0"
            />
          </div>
          <div className="bg-neutral-900 p-4 rounded-xl">
            <textarea
              placeholder="Message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
               className="w-full p-3 bg-transparent text-white rounded-lg border-none focus:outline-none focus:ring-0"
              rows={3}
            />
          </div>
          <button
            onClick={handleCreateLink}
            disabled={loading}
            className="w-full bg-lime-500 hover:bg-lime-600 text-white font-medium py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Payment Link'}
          </button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Your Payment Links</h2>
        {selectedLink && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
            <div
              id="payment-card-modal"
              className="bg-neutral-950 rounded-2xl p-8 w-full max-w-md relative shadow-2xl border-4 border-white/20"
            >
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-white hover:scale-110 transition-transform"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
          
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <img
                    src={img_url || '/default-avatar.png'}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full object-cover border-4 border-white/30 shadow-md"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-white/90 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral-950" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/80 mb-1">@{username}</p>
                  <p className="text-xs font-mono text-white/60">
                    {shortenEthAddress(account?.address || '0x0000...0000')}
                  </p>
                </div>
              </div>
          
              <div className="space-y-6 mb-8">
                <div className="text-center">
                  <p className="text-5xl font-bold text-white mb-2">
                  <p className="text-5xl font-bold text-white mb-2">
                      {mistToSui(selectedLink.amount)}
                      <span className="text-2xl ml-1">SUI</span>
                    </p>
                  </p>
                  {selectedLink.message && (
                    <p className="text-sm text-white/80 italic px-4">
                      &quot;{selectedLink.message}&quot;
                    </p>
                  )}
                </div>
                <div className="">
                  <div className="">
                  <QRCode
                    value={`${window.location.origin}/pay?${new URLSearchParams({
                      name: username,
                      address: account?.address || '',
                      id: selectedLink.id,
                    }).toString()}`}
                    size={200}
                    bgColor="#ffffff" 
                    fgColor="#000000" 
                    className="mx-auto"
                  />
                  </div>
                  <p className="text-center text-xs text-white/60 mt-3">
                    Scan QR code to pay
                  </p>
                </div>
              </div>
          
              <div className="flex flex-col gap-3">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => shareOnSocialMedia('facebook')}
                    className="p-3 bg-[#1877F2] hover:bg-[#166FE5] rounded-full transition-colors shadow-lg"
                  >
                    <FaFacebook className="text-white text-2xl" />
                  </button>
                  <button
                    onClick={() => shareOnSocialMedia('twitter')}
                    className="p-3 bg-[#1DA1F2] hover:bg-[#1991DB] rounded-full transition-colors shadow-lg"
                  >
                    <FaTwitter className="text-white text-2xl" />
                  </button>
                  <button
                    onClick={() => shareOnSocialMedia('linkedin')}
                    className="p-3 bg-[#0A66C2] hover:bg-[#0959AC] rounded-full transition-colors shadow-lg"
                  >
                    <FaLinkedin className="text-white text-2xl" />
                  </button>
                </div>
              </div>
          
              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center justify-center gap-2">
                  <span className="font-bold text-white text-xl">Kaisho Pay</span>
                </div>
              </div>
            </div>
          </div>
        )}

      <div className="bg-neutral-900 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-4 text-left text-neutral-300">Amount</th>
              <th className="p-4 text-left text-neutral-300">Status</th>
              <th className="p-4 text-left text-neutral-300">Message</th>
              <th className="p-4 text-left text-neutral-300">Created Date</th>
              <th className="p-4 text-left text-neutral-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentLinks.map((link, index) => (
              <tr
                key={index}
                className="hover:bg-neutral-800 transition-colors border-b border-neutral-700 cursor-pointer"
                onClick={() => openPopup(link)} 
              >
                <td className="p-4 text-white">{link.amount / 1_000_000_000} SUI</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      link.active
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {link.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4 text-neutral-400">{link.message || 'No message'}</td>
                <td className="p-4 text-neutral-400">{new Date().toLocaleDateString()}</td>
                <td className="p-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      copyToClipboard(
                        `${window.location.origin}/pay?${new URLSearchParams({
                          name: username,
                          address: account?.address || '',
                          id: link.id,
                        }).toString()}`
                      );
                    }}
                    className="flex items-center gap-2 text-neutral-400 hover:text-lime-500 transition-colors"
                  >
                    <FaCopy className="text-base" />
                    Copy Link
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </section>
  );
};

export default LinkPage;