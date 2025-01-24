/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import Tag from "@/components/Tag";
import { FC } from 'react';

const text = `You're navigating the complexities of Web3 payments, but traditional methods are slow, expensive, and difficult to integrate.`;

interface Blockchain {
    name: string;
    img: string;
}


const blockchains: { EVM: Blockchain[], NonEVM: Blockchain[] } = {
    EVM: [
        // { name: "Ethereum", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" },
        // { name: "Polygon", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png" },
        // { name: "BNB Chain", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png" },
        // { name: "Avalanche", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png" }
    ],
    NonEVM: [
        { name: "Sui Network", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/20947.png" },
        { name: "Aptos", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/21794.png" },
        { name: "Near", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/6535.png" },
        { name: "Solana", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png" }
    ]
};

const NetworkItem: FC<Blockchain> = ({ name, img }) => (
    <div
        className=" flex flex-col items-center transition-all duration-300 cursor-pointer p-4"
    >
       <img src={img} alt={name} className="w-10 h-10 object-contain"/>
        <p className="text-lg font-semibold mt-2">{name}</p>
    </div>
);


export default function Introduction() {
    return <section className="py-28 lg:py-40 bg-neutral-950 text-white">
        <div className="container">
            <div className="flex justify-center">
                <Tag className="text-lime-400 text-lg font-semibold">
                    Introducing Kaisho
                </Tag>
            </div>
            <div className="text-4xl md:text-6xl lg:text-7xl text-center font-medium mt-10">
                <span>
                    Your Web3 payments deserve better. {" "}
                </span>
                <span className="text-white/50 italic">
                    {text}
                </span>
                <span className="text-lime-400 block mt-6">
                    That&apos;s why we built Kaisho.
                </span>
                <div className="mt-16 flex justify-center"> 
                    <div className="flex gap-6">
                        {blockchains.EVM.map((network, index) => (
                            <NetworkItem key={index} {...network} />
                        ))}
                           {blockchains.NonEVM.map((network, index) => (
                            <NetworkItem key={index} {...network} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>;
}