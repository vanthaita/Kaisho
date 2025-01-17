"use client";

import FaqCard from "@/components/FaqCard";
import Tag from "@/components/Tag";
import React from "react";


const faqs = [
    {
        question: "What is Kaisho and how does it work?",
        answer: "Kaisho is a Web3 payment gateway built on the Sui Network. It simplifies accepting cryptocurrency payments for businesses and developers by handling the complexities of blockchain transactions.",
    },
    {
        question: "What cryptocurrencies does Kaisho support?",
       answer: "Kaisho primarily supports SUI tokens on the Sui Network. We are also exploring support for other tokens in the future.",
    },
    {
       question: "Is Kaisho secure?",
       answer: "Yes, security is our top priority. Kaisho uses secure smart contracts on the Sui blockchain, and follows industry best practices to safeguard user funds and transactions.",
   },
    {
        question: "How can I integrate Kaisho into my application?",
        answer: "Kaisho offers a developer-friendly SDK and API, making it easy to integrate into any application. Our documentation provides clear instructions and examples to help you get started.",
    },
    {
        question: "What are payment requests, and how can they help me?",
        answer: "Payment requests allow you to generate simple payment links or QR codes for customers to pay directly. This is perfect for invoices, donations, and other simple transactions.",
    },
    {
        question: "What are payment intents, and how are they useful?",
        answer: "Payment intents are ideal for more complex transactions, such as escrow or conditional payments. You can define a payment agreement, and it's executed only when all parties have fulfilled their conditions.",
    },
];

export default function Faqs() {
    return <section className="py-24">
        <div className="container">
                    <div className="flex justify-center">
                        <Tag>FAQS</Tag>
                    </div>
                    <h2 className="text-6xl font-medium mt-6 text-center max-w-xl mx-auto">Questions? We&apos;ve got <span className="text-lime-400">answers</span></h2>

                    <div className="mt-8 overflow-hidden max-w-2xl mx-auto space-y-6">
                        {faqs.map((faq) => (
                            <FaqCard question={faq.question} key={faq.question} answer={faq.answer}/>
                        ))}
                    </div>
        </div>
            
    </section>;
}