/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react';

type AddressEntry = {
  address: string;
  network: 'sui' | 'ethereum' | 'bsc' | 'solana';
};

type NetworkInfo = {
  iconUrl: string;
  name: string;
};

const AddressBook: React.FC = () => {
  const [addresses, setAddresses] = useState<AddressEntry[]>([]);

  const fetchAddresses = async () => {
    const mockAddresses: AddressEntry[] = [
      { address: '0x1234567890abcdef1234567890abcdef12345678', network: 'sui' },
      { address: '0xabcdef1234567890abcdef1234567890abcdef12', network: 'ethereum' },
      { address: '0x0987654321fedcba0987654321fedcba09876543', network: 'bsc' },
      { address: '0x1234567890abcdef1234567890abcdef12345678', network: 'solana' },
    ];
    setAddresses(mockAddresses);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const getNetworkInfo = (network: AddressEntry['network']): NetworkInfo => {
    switch (network) {
      case 'sui':
        return { iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/20947.png', name: 'Sui' };
      case 'ethereum':
        return { iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', name: 'Ethereum' };
      case 'bsc':
        return { iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png', name: 'Binance Smart Chain' };
      case 'solana':
        return { iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png', name: 'Solana' };
      default:
        return { iconUrl: '', name: 'Unknown' };
    }
  };

  return (
    <div className="p-4 bg-neutral-950 text-white">
      <h1 className="text-2xl font-bold mb-4">Address Book</h1>
      <table className="min-w-full bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-neutral-800">
            <th className="py-3 px-4 text-left text-sm font-semibold text-neutral-300">Network</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-neutral-300">Address</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((item, index) => {
            const { iconUrl, name } = getNetworkInfo(item.network);
            return (
              <tr key={index} className="hover:bg-neutral-800 transition-colors">
                <td className="py-3 px-4 border-b border-neutral-800 text-sm text-neutral-200 flex items-center gap-2">
                  <img src={iconUrl} alt={name} className="w-5 h-5" />
                  <span>{name}</span>
                </td>
                <td className="py-3 px-4 border-b border-neutral-800 text-sm text-neutral-200">
                  {item.address}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AddressBook;