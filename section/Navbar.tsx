import Link from "next/link";
const navlinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#integrations" },
    { label: "FAQs", href: "#faqs" },
];

const Navbar = () => {

    return (
        <section className="py-4 lg:py-8" >
            <div className="container max-w-5xl">
                <div className="grid grid-cols-2 lg:grid-cols-3  p-2 px-4 md:pr-2 items-center">
                    <div className="flex justify-center">
                        <h1 className="font-extrabold text-[1.7rem] leading-[3rem] cursor-pointer mr-10">Kaisho</h1>
                    </div>

                    <div className="lg:flex justify-center items-center hidden">
                        <nav className="flex gap-6 font-medium">
                            {navlinks.map(link => (
                                <Link href={link.href} key={link.label}>
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex justify-end gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu md:hidden"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        <button className="border border-white/15 h-12 rounded-full px-6 font-medium bg-[#A3E635] text-neutral-950 hidden md:inline-block">
                            Launch App
                        </button>
                    </div>
                </div>
                

            </div>

        </section>
    );
} 

export default Navbar