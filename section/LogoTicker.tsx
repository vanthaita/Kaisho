import quantumLogo from "@/assets/images/quantum.svg";
import acmeLogo from "@/assets/images/acme-corp.svg";
import echoValleyLogo from "@/assets/images/echo-valley.svg";
import pulseLogo from "@/assets/images/pulse.svg";
import outsideLogo from "@/assets/images/outside.svg";
import apexLogo from "@/assets/images/apex.svg";
import celestialLogo from "@/assets/images/celestial.svg";
import twiceLogo from "@/assets/images/twice.svg";
import Image from "next/image";
import Marquee from "@/components/ui/marquee";
const logos = [
    { name: "Quantum", image: quantumLogo },
    { name: "Acme Corp", image: acmeLogo },
    { name: "Echo Valley", image: echoValleyLogo },
    { name: "Pulse", image: pulseLogo },
    { name: "Outside", image: outsideLogo },
    { name: "Apex", image: apexLogo },
    { name: "Celestial", image: celestialLogo },
    { name: "Twice", image: twiceLogo },
];

export default function LogoTicker() {
    return <section className="py-24 overflow-x-clip">
        <div className="absolute items-center">
            <h3 className="text-center text-white/50 text-xl">Already chosen by these market leaders</h3>
                <div className="relative flex mt-12 w-full flex-col items-center justify-center overflow-hidden md:shadow-xl">
                    {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-background"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-background"></div> */}
                    <Marquee pauseOnHover className="[--duration:20s]">
                        {logos.map(logo => (
                            <Image 
                                src={logo.image} 
                                key={logo.name}
                                alt={logo.name}
                            />

                        ))}
                    </Marquee>
                </div>
        </div>
    </section>;
}
