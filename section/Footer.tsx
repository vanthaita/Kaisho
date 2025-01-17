import { FaGithub, FaDiscord } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';

const footerIcons = [
    { icon: <FaGithub size={24} />, href: "#", label: "Github" },
    { icon: <AiOutlineTwitter size={24} />, href: "#", label: "Twitter" },
    { icon: <FaDiscord size={24} />, href: "#", label: "Discord" },
];

export default function Footer() {
    return (
        <footer className="bg-neutral-950 py-12">
            <div className="container">
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="mb-6 md:mb-0 flex flex-col justify-center">
                        <span className="text-white text-2xl font-semibold text-center md:text-left">Kaisho</span>
                        <p className="text-gray-400 text-base font-medium">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>
                    <div className="flex space-x-4 justify-end">
                        {footerIcons.map((icon, index) => (
                                <a
                                    key={index}
                                    href={icon.href}
                                    aria-label={icon.label}
                                    className="text-white/70 hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-lime-400"
                                >
                                    {icon.icon}
                                </a>
                            ))}
                        </div>
                </div>
            </div>
        </footer>
    );
}