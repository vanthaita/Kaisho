"use client";

import FaqCard from "@/components/FaqCard";
import Tag from "@/components/Tag";
import React, { useState } from "react";

const faqs = [
    {
        question: "What is Kaisho?",
        answer: "Kaisho is a Web3 payment gateway simplifying crypto payments for businesses and developers across multiple blockchains, with initial focus on the Sui Network. It handles the complexities of blockchain transactions and offers features like payment requests and intents.",
    },
    {
        question: "What cryptocurrencies does Kaisho support?",
        answer: "Kaisho currently supports SUI on the Sui Network. We are actively exploring and will be adding support for other tokens and blockchains in the future to expand our ecosystem.",
    },
    {
        question: "Is Kaisho secure across different blockchains?",
        answer: "Yes, security is a top priority. Kaisho uses secure smart contracts across various blockchains and adheres to industry best practices to safeguard user funds and transactions.",
    },
    {
        question: "How can I integrate Kaisho into my application for multiple blockchains?",
        answer: "Kaisho offers a developer-friendly SDK and API that can be utilized for multiple blockchain integrations. Our documentation provides clear instructions and examples to help you get started.",
    },
    {
        question: "What are payment requests, and how can they help me with any crypto?",
        answer: "Payment requests allow you to generate simple payment links or QR codes for customers to pay using crypto, regardless of which blockchain they are on. This is perfect for invoices, donations, and other straightforward transactions.",
    },
    {
        question: "What are payment intents, and how are they useful across different networks?",
        answer: "Payment intents are ideal for more complex transactions, like escrow or conditional payments, and they can be set up to operate seamlessly across various blockchain networks. You can define a payment agreement, and it's executed only when all parties meet the specified conditions.",
    },
];

export default function Faqs() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); 

    const handleToggle = (index: number) => {
        setOpenFaqIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <section id="faqs" className="py-24">
            <div className="container">
                <div className="flex justify-center">
                    <Tag>FAQS</Tag>
                </div>
                <h2 className="text-6xl font-medium mt-6 text-center max-w-xl mx-auto">
                    Questions? We&apos;ve got <span className="text-lime-400">answers</span>
                </h2>

                <div className="mt-8 overflow-hidden max-w-2xl mx-auto space-y-6">
                    {faqs.map((faq, index) => (
                        <FaqCard
                            question={faq.question}
                            key={faq.question}
                            answer={faq.answer}
                            isOpen={openFaqIndex === index} 
                            onToggle={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}