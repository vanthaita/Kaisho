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

export default function Home() {
    
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
    </>
  );
}