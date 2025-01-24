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
    Link as LinkIcon,
    X
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarProps {
    isMobile: boolean;
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
}

interface SidebarLink {
    href: string;
    label: string;
    icon: React.ComponentType<any>;
}

const sidebarLinks: SidebarLink[] = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/requests', label: 'Requests', icon: Send },
    { href: '/dashboard/links', label: 'Links', icon: LinkIcon },
    { href: '/dashboard/address-book', label: 'Address Book', icon: LucideBookOpenCheck },
    { href: '/dashboard/activity', label: 'Activity History', icon: Activity },
    { href: '/dashboard/bridge', label: 'Bridge', icon: GitBranch },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ 
    isMobile, 
    isOpen, 
    onClose, 
    children 
}) => {
    const pathname = usePathname();

    const handleNavigation = () => {
        if (isMobile) {
            onClose();
        }
    };

    return (
        <section className="min-h-screen bg-gray-950">
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={onClose}
                />
            )}

            <aside className={cn(
                "fixed left-0 top-0 h-screen w-64 border-r border-white/20 bg-gray-950 z-50 transition-transform duration-300",
                isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
            )}>
                <div className="p-4 h-full flex flex-col">
                    {isMobile && (
                        <button
                            onClick={onClose}
                            className="absolute top-7 right-2 text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                    )}
                    <div className='flex gap-x-4 justify-center items-center mb-8'>
                        <svg 
                            width="32" 
                            height="32" 
                            viewBox="0 0 160 160" 
                            fill="none" 
                            className="transition-transform hover:rotate-[15deg]"
                        >
                            <circle cx="80" cy="80" r="80" fill="url(#paint0_linear_1_2)"/>
                            <path d="M80 28L108 60H100.8L80 37.04L59.2 60H52L80 28Z" fill="white"/>
                            <path d="M80 132L52 100H59.2L80 122.96L100.8 100H108L80 132Z" fill="white"/>
                            <path d="M68 64H92V96H68V64Z" fill="white"/>
                            <path d="M76 72H84V88H76V72Z" fill="url(#paint1_linear_1_2)"/>
                            <path d="M56 48L40 64H56V48Z" fill="#A3F9B9"/>
                            <path d="M104 48L120 64H104V48Z" fill="#A3F9B9"/>
                            <path d="M56 112L40 96H56V112Z" fill="#A3F9B9"/>
                            <path d="M104 112L120 96H104V112Z" fill="#A3F9B9"/>
                            <defs>
                                <linearGradient id="paint0_linear_1_2" x1="80" y1="0" x2="80" y2="160" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#6FEB87"/>
                                    <stop offset="1" stopColor="#2BDD5B"/>
                                </linearGradient>
                                <linearGradient id="paint1_linear_1_2" x1="80" y1="72" x2="80" y2="88" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#2BDD5B"/>
                                    <stop offset="1" stopColor="#1A9334"/>
                                </linearGradient>
                                <clipPath id="clip0_1_2">
                                    <rect width="160" height="160" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <h1 className="text-4xl text-center text-lime-400 font-semibold">
                            Kaisho
                        </h1>
                    </div>

                    <nav className="flex-1 overflow-y-auto">
                        <ul className="space-y-3"> 
                            {sidebarLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            'flex items-center py-3 px-4 rounded-xl transition duration-200',
                                            pathname === link.href
                                                ? 'text-gray-900 bg-lime-300/90'
                                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                        )}
                                        onClick={handleNavigation}
                                    >
                                       <link.icon className="h-6 w-6 mr-3"/>
                                        <span className='font-medium text-lg'>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>

            <main className={cn(
                "h-screen overflow-y-auto transition-all",
                isMobile ? "ml-0" : "ml-64"
            )}>
                {children}
            </main>
        </section>
    );
};

export default Sidebar;