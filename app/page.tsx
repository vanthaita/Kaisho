'use client';

import { CallToAction } from "@/section/CallToAction";
import Faqs from "@/section/Faqs";
import Features from "@/section/Features";
import Footer from "@/section/Footer";
import Hero from "@/section/Hero";
import Integrations from "@/section/Integrations";
import Introduction from "@/section/Introduction";
import LogoTicker from "@/section/LogoTicker";
import Navbar from "@/section/Navbar";
import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function Home() {
    const [showBackToTop, setShowBackToTop] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <>
            <Navbar />
            <Hero />
            <LogoTicker />
            <Introduction />
            <Features />
            <Integrations />
            <Faqs />
            <CallToAction />
            <Footer />
            {showBackToTop && (
                <button
                  onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-lime-400 rounded-full p-3 shadow-md hover:bg-lime-500 transition-colors"
                >
                    <FaArrowUp className="text-neutral-950"/>
                </button>
            )}
        </>
    );
}