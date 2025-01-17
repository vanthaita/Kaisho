/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
interface Props {
  price: number;
}

const CryptoProductCard = ({
  price,
}: Props) => {
  

  return (
    <div>
      <Card className="w-[320px] h-[480px] block border-[rgba(98,72,255,0.4)] rounded-none relative cursor-pointer">
       
        <div className="w-2 h-2 bg absolute bg-[rgba(98,72,255)] -top-1 -left-1"></div>
        <div className="w-2 h-2 bg absolute bg-[rgba(98,72,255)] -top-1 -right-1"></div>
        <div className="w-2 h-2 bg absolute bg-[rgba(98,72,255)] -bottom-1 -right-1"></div>
        <div className="w-2 h-2 bg absolute bg-[rgba(98,72,255)] -bottom-1 -left-1"></div>
        
        <CardContent className="p-3 relative">
          <div className="text-indigo-500 border border-indigo-500 rounded-full p-1 font-bold text-xs w-[80px] absolute top-3 left-2 flex justify-center items-center">
            Best seller
          </div>
          <div className="h-[345px]">
            <img
              src="https://tradeport.mypinata.cloud/ipfs/bafybeia4j7f2spcu4zf2n4ix32arhp3hyudtpzp2xpurqi77gwdqffvbny/B100.png?pinataGatewayToken=sd9Ceh-eJIQ43PRB3JW6QGkHAr8-cxGhhjDF0Agxwd_X7N4_reLPQXZSP_vUethU&img-width=700&img-height=700&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp"
              alt="Leather Jacket"
              width={0}
              height={0}
              className="w-full px-6 h-[345px]"
            />
          </div>

          <div className="mb-3 text-center flex flex-col gap-1">
            <p className="">Leather Jacket</p>
            <p className="font-bold">
              {price} USDC
            </p>
          </div>

            <div>
                <button
                  className="bg-indigo-500 w-full disabled:opacity-80 font-medium text-white hover:text-black rounded-[8px] p-2"
                >
                    Buy with <span className="text-lime-500 font-extrabold">Kaisho</span>
                </button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoProductCard;