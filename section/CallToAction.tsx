"use client";

import React from 'react';
import { FaRocket, FaBook } from 'react-icons/fa';

export function CallToAction() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col items-center justify-center h-[40rem]
          bg-grid-white/[0.2] border text-center bg-neutral-950 border-[rgba(98,72,255,0.4)] rounded-none
        ">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="w-2 h-2 bg absolute bg-[rgba(98,72,255)] -top-1 -left-1"></div>
            <div className="w-2 h-2 bg absolute bg-[rgba(98,72,255)] -top-1 -right-1"></div>
            <div className="w-2 h-2 bg absolute bg-[rgba(98,72,255)] -bottom-1 -right-1"></div>
            <div className="w-2 h-2 bg absolute bg-[rgba(98,72,255)] -bottom-1 -left-1"></div>

            <div className="max-w-2xl mx-auto px-4">
                <h2 className="text-lime-400 text-4xl sm:text-5xl font-bold mb-6">
                Power Your Business with Kaisho
                </h2>
                <p className="text-neutral-200 text-lg sm:text-xl mb-8">
                  Unlock seamless Web3 payments for your online store, saas platform, or any digital business. Kaisho offers low fees, fast transactions, and easy integration.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                        className="bg-lime-500 hover:bg-lime-600 text-neutral-950 font-bold py-2 px-4 lg:py-3 lg:px-6 rounded-md transition-colors duration-300 flex items-center gap-2"
                    >
                        <FaRocket /> Launch App
                    </button>
                    <button
                    className="bg-transparent border-2 border-lime-400 hover:border-lime-300 text-lime-400 font-bold py-2 px-4 lg:py-3 lg:px-6 rounded-md transition-colors duration-300 flex items-center gap-2"
                    onClick={() => {
                        window.location.href = "/docs";
                    }}
                    >
                        <FaBook /> Docs
                    </button>
              </div>
            </div>
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 bg-lime-500  w-20 h-20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 bg-lime-500 w-32 h-32 rounded-full blur-2xl animate-pulse delay-1000"></div>
            </div>
        </div>
        </div>
    </section>
  );
}
