/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';
import Sidebar from '@/components/dashboard/Sidebar';
import Navbar from '@/components/dashboard/Navbar';
import { usePathname, useRouter } from 'next/navigation';
import { useOnChainDataContext } from '@/context/OnChainDataContext';
import { useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader } from '@/components/ui/loader';

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
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

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
        const checkAuth = async () => {
            if (connectionStatus === 'connected' && account?.address) {
                const userData = getUserData(account.address);
                if (isHiddenPage) {
                    userData ? router.replace('/dashboard') : router.replace('/dashboard/onboarding');
                }
                setIsCheckingAuth(false);
            } else if (connectionStatus === 'disconnected' && !isHiddenPage) {
                router.replace('/dashboard/sign-in');
                setIsCheckingAuth(false);
            } else {
                setIsCheckingAuth(false);
            }
        };

        const timer = setTimeout(checkAuth, 300);
        return () => clearTimeout(timer);
    }, [connectionStatus, account, isHiddenPage, router, getUserData]);

    if (isCheckingAuth) {
        return <div className="h-screen w-full flex items-center justify-center">
            <Loader />
        </div>;
    }

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