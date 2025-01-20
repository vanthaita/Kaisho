/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Send,
    LucideBookOpenCheck,
    Activity,
    GitBranch,
    Settings,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import AccountModel from './AccountModel';

interface SidebarProps {
    children: ReactNode;
}

interface SidebarLink {
    href: string;
    label: string;
    icon: React.ComponentType<any>; // Corrected type
}

const sidebarLinks: SidebarLink[] = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/send', label: 'Send', icon: Send },
    { href: '/address-book', label: 'Address Book', icon: LucideBookOpenCheck },
    { href: '/activity', label: 'Activity History', icon: Activity },
    { href: '/bridge', label: 'Bridge', icon: GitBranch },
    { href: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const pathname = usePathname();

    return (
        <section className="flex min-h-screen bg-gray-950">
            <aside className="w-64 flex-shrink-0 border-r border-white/20">
                <div className="p-4">
                    <h1 className="text-4xl text-center text-lime-400 font-semibold">
                        Kaisho
                    </h1>
                    <nav className="mt-8">
                        <ul className="space-y-3"> 
                            <AccountModel />
                            {sidebarLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            'flex items-center py-3 px-4 rounded-xl transition duration-200 font-extrabold text-lg text-gray-300', 
                                            pathname === link.href
                                                ? 'text-gray-900 bg-lime-300/90'
                                                : 'hover:bg-gray-800 hover:text-white'
                                        )}
                                    >
                                       <link.icon className="h-6 w-6 mr-3"/>
                                        <span className='font-medium'>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>

            <main className="flex-1 p-6 overflow-auto text-white">{children}</main>
        </section>
    );
};

export default Sidebar;