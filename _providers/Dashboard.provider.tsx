'use client';
import Sidebar from '@/components/dashboard/Sidebar';
import Navbar from '@/components/dashboard/Navbar';
import { usePathname } from 'next/navigation';

interface Props {
    children: React.ReactNode;
}

export function DashBoardProvider({ children }: Props) {
    const pathname = usePathname();
    const hiddenPaths = ["/dashboard/sign-in", "/dashboard/onboarding"];
    const isHiddenPage = hiddenPaths.includes(pathname);
    return (
        <section>
            {isHiddenPage ? (
                children
            ) : (
                <Sidebar>
                    <Navbar />
                    {children}
                </Sidebar>
            )}
        </section>
    );
}