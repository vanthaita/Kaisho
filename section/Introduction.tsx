/* eslint-disable @next/next/no-img-element */
import Tag from "@/components/Tag";

const text = `You're navigating the complexities of Web3 payments, but traditional methods are slow, expensive, and difficult to integrate.`;

const blockchains = {
    EVM: [
        { name: "Ethereum", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" },
        { name: "Polygon", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png" },
        { name: "BNB Chain", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png" },
        { name: "Avalanche", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png" } 
    ],
    NonEVM: [
        { name: "Sui Network", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/20947.png" },
        { name: "Aptos", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/21794.png" },
        { name: "Movement", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/32452.png" },
        { name: "Solana", img: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png" }
    ]
};

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
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h3 className="text-3xl font-semibold mb-6 text-lime-400">EVM Blockchains</h3>
                        <div className="grid grid-cols-2 gap-6">
                            {blockchains.EVM.map((network, index) => (
                                <div
                                    key={index}
                                    className="border border-white/20 hover:border-lime-400 bg-black rounded-2xl p-6 flex flex-col items-center transition-all duration-300 cursor-pointer shadow-lg hover:shadow-lime-400/50"
                                >
                                    <img src={network.img} alt={network.name} height="60" width="60" className="mb-4"/>
                                    <p className="text-lg font-semibold">{network.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-3xl font-semibold mb-6 text-lime-400">Non-EVM Blockchains</h3>
                        <div className="grid grid-cols-2 gap-6">
                            {blockchains.NonEVM.map((network, index) => (
                                <div
                                    key={index}
                                    className="border border-white/20 hover:border-lime-400 bg-black rounded-2xl p-6 flex flex-col items-center transition-all duration-300 cursor-pointer shadow-lg hover:shadow-lime-400/50"
                                >
                                    <img src={network.img} alt={network.name} height="60" width="60" className="mb-4"/>
                                    <p className="text-lg font-semibold">{network.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>;
}
