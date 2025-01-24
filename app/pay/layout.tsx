import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DappKitPaymentProvider } from "@/providers/DappKitPaymentProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaisho Pay - Crypto Payment Link",
  description:
    "Secure blockchain payment link powered by Kaisho Pay.",
};

export default function PayPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased tex-white bg-neutral-950 `}
      >
        <DappKitPaymentProvider>
          {children}
        </DappKitPaymentProvider>
      </body>
    </html>
  );
}