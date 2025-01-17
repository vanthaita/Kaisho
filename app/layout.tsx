import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
    axes: ["opsz"],
});


export const metadata: Metadata = {
    title: "Kaisho Pay: On Chain Payments for Web3",
    description:
      "Kaisho simplifies on chain payments across multiple blockchains. Built on Sui, it provides seamless integration for e-commerce and SaaS businesses.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} font-sans antialiased bg-neutral-950 text-white scroll-custom`}
            >
                {children}
            </body>
        </html>
    );
}
