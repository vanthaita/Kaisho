/* eslint-disable @next/next/no-img-element */
// import designExampleImage from '@/assets/images/design-example-1.png';
// import designExample2Image from '@/assets/images/design-example-2.png';
// import Image from 'next/image';
import Pointer from '@/components/Pointer';
import CryptoProductCard from '@/components/ProductCard';
import PaymentCard from '@/components/PaymentCard';
export default function Hero() {
    return (
        <section className="py-24 overflow-x-clip">
            <div className="container relative">
                <div className="absolute -left-56 top-16 hidden lg:block">
                    {/* <Image src={designExampleImage} alt="example1" /> */}
                    <CryptoProductCard price={120} />
                </div>
                <div className="absolute -right-[19.5rem] -top-16 hidden lg:block">
                    {/* <Image src={designExample2Image} alt="example2" /> */}
                    <PaymentCard />
                </div>
                <div className="absolute left-56 top-96 hidden lg:block">
                    <Pointer name="Wallet" color="red" symbols='walletConnect' />
                </div>

                <div className="absolute right-80 -top-4 hidden lg:block">
                    <Pointer name="Metamask" symbols='metamask' />
                </div>

                <div className="flex justify-center">
                    <div className="inline-flex py-1 px-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full text-neutral-950 font-semibold">
                        ✨ On Chain Payments, Starting on Sui
                    </div>
                </div>
                <h1 className="text-6xl font-medium md:text-7xl lg:text-8xl text-center mt-6">
                    Seamless <span className='text-lime-400'>Web3</span> Payments for Everyone
                </h1>
                <p className="text-center text-xl text-white/50 mt-8 max-w-2xl mx-auto">
                    Kaisho makes accepting and making crypto payments easy. Integrate seamlessly with your e-commerce or saas, powered by the speed and security of the Sui blockchain.
                </p>
                <form className="flex border border-white/15 mt-8 max-w-lg mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-transparent md:flex-1 w-full px-4 focus:outline-none"
                    />
                    <button
                        className="h-10 px-6 font-medium bg-[#A3E635] text-neutral-950 whitespace-nowrap"
                        type="submit"
                    >
                        Get Started
                    </button>
                </form>
                <div className='absolute -bottom-40 left-1/2 transform -translate-x-1/2 text-center'>
                    <h1 className='lg:text-xl text-sm font-semibold mb-4'>Token Support</h1>
                    <div className='flex lg:flex-wrap justify-center items-center gap-6'>
                        {[
                            { src: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png", alt: "USDC" },
                            { src: "https://s2.coinmarketcap.com/static/img/coins/64x64/20947.png", alt: "SUI" },
                            { src: "https://s2.coinmarketcap.com/static/img/coins/64x64/21794.png", alt: "APT" },
                            { src: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png", alt: "USDT" },
                            { src: "https://s2.coinmarketcap.com/static/img/coins/64x64/29679.png", alt: "SCA" },
                            { src: "https://s2.coinmarketcap.com/static/img/coins/64x64/34611.png", alt: "SEND" },
                            { src: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png", alt: "BTC" },
                            { src: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png", alt: "ETH" },
                        ].map((token, index) => (
                            <div key={index} className="flex flex-col items-center space-y-2">
                                <img
                                    src={token.src}
                                    height="32"
                                    width="32"
                                    alt={token.alt}
                                    loading="lazy"
                                    decoding="async"
                                    className="hover:scale-110 transition-transform"
                                />
                                <span className="text-sm font-medium">{token.alt}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}