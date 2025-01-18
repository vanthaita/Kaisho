/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';


interface PriceData {
    symbol: string,
    price: string;
}
interface Token {
    name: string;
    symbol: string;
    img: string;
    pair?: string
}

const tokenProductSell: Token[] = [
    { name: "NEAR", symbol: "NEAR", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/6535.png", pair: "NEARUSDT" },
    { name: "USDC", symbol: "USDC", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png", pair: "USDCUSDT" },
    { name: "SOL", symbol: "SOL", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png", pair: "SOLUSDT" },
]

const tokenUserWantBuys: Token[] = [
    { name: "SUI", symbol: "SUI", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/20947.png", pair: "SUIUSDT" },
    { name: "APT", symbol: "APT", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/21794.png", pair: "APTUSDT" },
    { name: "BTC", symbol: "BTC", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png", pair: "BTCUSDT" },
    { name: "ETH", symbol: "ETH", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png", pair: "ETHUSDT" },
];

async function fetchTokenPrice(symbol: string): Promise<PriceData> {
    try {
        const response = await axios.get<PriceData>(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
        return response.data;
    } catch (error: any) {
        console.error(`Failed to fetch ${symbol} price:`, error.message)
        throw new Error(`Failed to fetch ${symbol} price: ${error.message}`)
    }
}

export default function PaymentCard() {
    const [currentSellTokenIndex, setCurrentSellTokenIndex] = useState<number>(0);
    const [currentBuyTokenIndex, setCurrentBuyTokenIndex] = useState<number>(0);
    const [sellTokenPrice, setSellTokenPrice] = useState<string | null>('0');
     const [buyTokenPrice, setBuyTokenPrice] = useState<string | null>('0');
    const [totalBuyToken, setTotalBuyToken] = useState<string>('0');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [nextPriceData, setNextPriceData] = useState<PriceData | null>(null);
    const [showFireworks, setShowFireworks] = useState(false);
     const [sellTokenVisible, setSellTokenVisible] = useState(false)

    const orderPrice = 120;

    const fetchPriceForNextToken = async (index: number) => {
         const nextSellToken = tokenProductSell[index];
        const nextBuyToken = tokenUserWantBuys[index];
        if (nextSellToken?.pair) {
          try {
               const sellResponseData = await fetchTokenPrice(nextSellToken.pair);
                setNextPriceData(sellResponseData)
             
            } catch (err: any) {
              console.log(err);
            }
        }
        if(nextBuyToken?.pair){
            try {
                const buyResponseData = await fetchTokenPrice(nextBuyToken.pair);
                 setNextPriceData(buyResponseData);

            } catch(err: any){
                console.log(err);
            }
        }
    }
    useEffect(() => {
         const getPriceRealTime = async () => {
            setLoading(true);
            setError(null);
            try {
                const currentSellToken = tokenProductSell[currentSellTokenIndex];
                const currentBuyToken = tokenUserWantBuys[currentBuyTokenIndex];
                let sellPrice = 0;
                let buyPrice = 0;
                if(currentSellToken?.pair){
                      const sellResponseData = await fetchTokenPrice(currentSellToken?.pair);
                       sellPrice = parseFloat(sellResponseData.price)
                      }else {
                        sellPrice = 1;
                    }
                 if(currentBuyToken?.pair){
                         const buyResponseData = await fetchTokenPrice(currentBuyToken?.pair);
                          buyPrice = parseFloat(buyResponseData.price)
                      } else {
                        buyPrice = 1;
                    }


                  setSellTokenPrice(sellPrice.toFixed(3));
                 setBuyTokenPrice(buyPrice.toFixed(3));

                try{
                    const calculatedTotal = (orderPrice * sellPrice/buyPrice).toFixed(2)
                    setTotalBuyToken(calculatedTotal);

                } catch (parseError: any){
                        console.error("Error parsing price:", parseError.message);
                        setError("Failed to parse the price from the API");
                        setSellTokenPrice('0');
                        setBuyTokenPrice('0');
                        setTotalBuyToken('0');
                    }

            } catch (error: any) {
                console.error("Error fetching token prices:", error.message);
                setError(`Failed to load token prices: ${error.message}`);
                setSellTokenPrice('0');
                  setBuyTokenPrice('0');
                setTotalBuyToken('0');
            } finally {
                setLoading(false);
            }

        }
          getPriceRealTime();
    }, [orderPrice, currentSellTokenIndex, currentBuyTokenIndex])
    useEffect(() => {
         const timer = setTimeout(() => {
              setSellTokenVisible(true);
        }, 300);
      
          return () => clearTimeout(timer);

    }, []);

    useEffect(() => {
         const intervalId = setInterval(() => {
           
            setShowFireworks(true);
            const nextSellIndex = (currentSellTokenIndex + 1) % tokenProductSell.length;
            const nextBuyIndex = (currentBuyTokenIndex + 1) % tokenUserWantBuys.length;
            fetchPriceForNextToken(nextSellIndex)
            setCurrentSellTokenIndex(nextSellIndex);
           setCurrentBuyTokenIndex(nextBuyIndex)
            setTimeout(() => {
                setShowFireworks(false);
            }, 800);

        }, 5000);
        return () => clearInterval(intervalId);
    }, [currentSellTokenIndex, currentBuyTokenIndex]);
    const currentSellToken = tokenProductSell[currentSellTokenIndex];
     const currentBuyToken = tokenUserWantBuys[currentBuyTokenIndex];

      const getSellPrice = (): string => {
         return sellTokenPrice ?? '0'
    }
      const getBuyPrice = (): string => {
         return buyTokenPrice ?? '0'
    }

    const calculateTotal = (): string => {
        const sellPrice = parseFloat(getSellPrice());
        const buyPrice = parseFloat(getBuyPrice());
        if (sellPrice && buyPrice && sellPrice !== 0 && buyPrice !== 0) {
            return (orderPrice * sellPrice/buyPrice).toFixed(2);
        }
        return '0';
    };


    const calculatedTotal = calculateTotal();


     const currentSellTokenPrice = getSellPrice();
    const currentBuyTokenPrice = getBuyPrice();

    return (
        <div className="flex justify-center items-center cursor-pointer relative">
            <Card className="w-[400px] h-[535px] border border-[rgba(98,72,255,0.4)] shadow-lg rounded-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="absolute w-2 h-2 bg-[rgba(98,72,255)] -top-1 -left-1"></div>
                    <div className="absolute w-2 h-2 bg-[rgba(98,72,255)] -top-1 -right-1"></div>
                    <div className="absolute w-2 h-2 bg-[rgba(98,72,255)] -bottom-1 -right-1"></div>
                    <div className="absolute w-2 h-2 bg-[rgba(98,72,255)] -bottom-1 -left-1"></div>

                    <CardContent className="p-4 space-y-4 relative">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between gap-3">
                             <div className="relative w-1/2">
                                <AnimatePresence  mode='wait'>
                                        {sellTokenVisible && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                transition={{ duration: 0.3 }}
                                                key={currentSellToken.symbol}
                                                className="border border-white/15 px-4 py-2 rounded-xl flex items-center gap-3 w-full relative"
                                            >
                                                <img src={currentSellToken.img} height="24" width="24" alt={currentSellToken.name} loading="lazy" decoding="async" />
                                                <div>
                                                    <p className="text-sm font-semibold">{currentSellToken.name}</p>
                                                    <p className="text-xs text-gray-400">${currentSellTokenPrice}</p>
                                                </div>
                                                <div className="absolute -top-1.5 -right-0">
                                                    <div className="inline-flex  font-bold text-xs text-white/45 px-2">
                                                        Pay with
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                             </div>


                                <div className="relative w-1/2">
                                    <AnimatePresence  mode='wait'>
                                        {currentBuyToken && (
                                            <motion.div
                                                key={currentBuyToken.symbol}
                                                className="border border-white/15 px-4 py-2 rounded-xl flex items-center gap-3 w-full relative"
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <img src={currentBuyToken.img} height="24" width="24" alt={currentBuyToken.name} loading="lazy" decoding="async" />
                                                <div>
                                                    <p className="text-sm font-semibold">{currentBuyToken.name}</p>
                                                    <p className="text-xs text-gray-400">${currentBuyTokenPrice}</p>
                                                </div>
                                            <div className="absolute -top-1.5 -right-0">
                                                <div className="inline-flex  font-bold text-xs text-white/45 px-2">
                                                    You Pay
                                                </div>
                                            </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                        
                                </div>

                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border border-white/15 p-4 rounded-xl">
                            <h3 className="text-lg font-semibold mb-2">Conversion</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Order Price</span>
                                    <span>${orderPrice}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>{currentSellToken?.name} Price</span>
                                    <span>${currentSellTokenPrice}</span>
                                </div>
                                   <div className="flex justify-between text-sm">
                                    <span>{currentBuyToken?.name} Price</span>
                                    <span>${currentBuyTokenPrice}</span>
                                </div>

                            </div>
                            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-white/10">
                                <span>Total {currentBuyToken?.symbol}</span>
                                <span>{calculatedTotal}</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border border-white/15 p-4 rounded-xl">
                            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Order Total</span>
                                    <span>{calculatedTotal}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Gas Fee</span>
                                    <span className="text-green-500">Free</span>
                                </div>
                            </div>
                            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-white/10">
                                <span>Total</span>
                                <span>{calculatedTotal}</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex justify-center gap-3">
                            <button className="bg-indigo-500 w-full text-white py-2 hover:bg-indigo-600 rounded-xl">
                                Pay Now
                            </button>
                            <button className="border border-gray-400 w-full py-2 text-white hover:bg-gray-700 rounded-xl">
                                Cancel Order
                            </button>
                        </motion.div>
                    </CardContent>
                </motion.div>
            </Card>

        </div>
    );
}