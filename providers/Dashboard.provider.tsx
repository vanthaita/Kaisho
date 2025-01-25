/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';
import Sidebar from '@/components/dashboard/Sidebar';
import Navbar from '@/components/dashboard/Navbar';
import { usePathname, useRouter } from 'next/navigation';
import { useOnChainDataContext } from '@/context/OnChainDataContext';
import { useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Props {
    children: React.ReactNode;
}

export function DashBoardProvider({ children }: Props) {
    const pathname = usePathname();
    const router = useRouter();
    const { getUserData } = useOnChainDataContext();
    const account = useCurrentAccount();
    const hiddenPaths = ["/dashboard/sign-in", "/dashboard/onboarding"];
    const isHiddenPage = hiddenPaths.includes(pathname);
    const { connectionStatus } = useCurrentWallet();
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (connectionStatus !== 'connected' && !isHiddenPage) {
            router.push('/dashboard/sign-in');
        }
    }, [connectionStatus, isHiddenPage, router]);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setIsSidebarOpen(!mobile);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobile && isSidebarOpen ? 'hidden' : 'auto';
    }, [isSidebarOpen, isMobile]);

    useEffect(() => {
        if (account?.address && isHiddenPage) {
            const userData = getUserData(account.address);
            userData && router.push('/dashboard');
        }
    }, [account, pathname, getUserData, router, isHiddenPage]);

    return (
        <section className="h-screen flex">
            {isHiddenPage ? (
                children
            ) : (
                <>
                    {!isMobile && (
                        <div className="fixed h-screen z-50">
                            <Sidebar 
                                isMobile={false}
                                isOpen={true}
                                onClose={() => {}}
                            />
                        </div>
                    )}

                    {isMobile && isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black/50 z-40"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    )}

                    <div className={cn(
                        "flex-1 transition-all",
                        !isMobile ? "ml-64" : "ml-0"
                    )}>
                        <Navbar 
                            isMobile={isMobile} 
                            onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                        />
                        
                        <main className="h-[calc(100vh-4rem)] overflow-y-auto p-4 md:p-6">
                            {children}
                        </main>
                    </div>

                    {isMobile && (
                        <div className={cn(
                            "fixed top-0 left-0 h-screen z-50 transform transition-transform duration-300 w-64",
                            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        )}>
                            <Sidebar 
                                isMobile={true}
                                isOpen={isSidebarOpen}
                                onClose={() => setIsSidebarOpen(false)}
                            />
                        </div>
                    )}
                </>
            )}
        </section>
    );
}