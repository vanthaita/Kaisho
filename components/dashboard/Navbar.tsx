// Navbar.tsx
'use client';
import React from 'react';
import {  MenuIcon } from 'lucide-react';

interface NavbarProps {
  isMobile: boolean;
  onMenuToggle: () => void;
}
const Navbar = ({ isMobile, onMenuToggle }: NavbarProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-white/20">
      {isMobile && (
                <button 
                    onClick={onMenuToggle}
                    className="text-gray-400 hover:text-white"
                >
                    <MenuIcon className="h-6 w-6" />
                </button>
            )}
      
      <div className="flex-grow"></div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-900 rounded-lg">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-sm font-medium text-white">SUI Testnet</span>
        </div>

        <button className="p-2 hover:bg-gray-800 rounded-lg relative">
          <svg 
            className="w-6 h-6 text-white" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5">0</span>
        </button>

        <div className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <div className="w-8 h-8  flex items-center justify-center">
            <span className="text-sm font-bold text-white">USD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;