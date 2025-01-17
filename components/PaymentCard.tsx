/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, CardContent } from "./ui/card";

export default function PaymentCard() {
    return (
        <div className="flex justify-center items-center cursor-pointer">
            <Card className="w-[400px] h-[500px] border border-[rgba(98,72,255,0.4)] shadow-lg rounded-none">
                {/* Corner styling */}
                <div className="absolute w-2 h-2 bg-[rgba(98,72,255)] -top-1 -left-1"></div>
                <div className="absolute w-2 h-2 bg-[rgba(98,72,255)] -top-1 -right-1"></div>
                <div className="absolute w-2 h-2 bg-[rgba(98,72,255)] -bottom-1 -right-1"></div>
                <div className="absolute w-2 h-2 bg-[rgba(98,72,255)] -bottom-1 -left-1"></div>

                <CardContent className="p-4 space-y-4 relative">
                    {/* Token Selection Section */}
                    <div className="flex justify-between gap-3">
                        <div className="border border-white/15 px-4 py-2 rounded-lg flex items-center gap-3 w-full">
                            <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png" height="24" width="24" alt="USDC" loading="lazy" decoding="async"/>
                            <div>
                                <p className="text-sm font-semibold">SUI-USDC</p>
                                <p className="text-xs text-gray-400">$1</p>
                            </div>
                        </div>
                        <div className="border border-white/15 px-4 py-2 rounded-lg flex items-center gap-3 w-full">
                            <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/20947.png" height="24" width="24" alt="SUI" loading="lazy" decoding="async"  />
                            <div>
                                <p className="text-sm font-semibold">SUI</p>
                                <p className="text-xs text-gray-400">$4.48</p>
                            </div>
                        </div>
                    </div>

                    {/* Conversion Rate Section */}
                    <div className="border border-white/15 p-4 rounded-lg">
                        <h2 className="text-lg font-bold mb-2">Conversion Rate</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Order Price</span>
                                <span>$120</span>
                            </div>
                            <div className="flex justify-between">
                                <span>SUI Price</span>
                                <span>$4.48</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>26.78</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="border border-white/15 p-4 rounded-lg">
                        <h2 className="text-lg font-bold mb-2">Order Summary</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Order Total</span>
                                <span>$26.78</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Gas Fee</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>26.78</span>
                            </div>
                        </div>
                    </div>

                    {/* Buttons Section */}
                    <div className="flex justify-center gap-3">
                        <button className="bg-indigo-500 w-full text-white py-2 rounded-lg hover:bg-indigo-600">
                            Pay Now
                        </button>
                        <button className="border border-gray-400 w-full py-2 text-white rounded-lg hover:bg-gray-700">
                            Cancel Order
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}