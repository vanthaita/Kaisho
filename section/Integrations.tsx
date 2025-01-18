import IntegrationColumn from "@/components/IntegrationColumn";
import Tag from "@/components/Tag";
import { IconType } from "react-icons";
import {
    SiShopify,
    SiWoocommerce,
    SiZendesk,
    SiGithub
} from "react-icons/si";
import { FaCode, FaEthereum } from "react-icons/fa";
import { TbBrandAsana } from "react-icons/tb";
import Marquee from "@/components/ui/marquee";
type IntegrationItem = {
    name: string;
    icon: IconType;
    description: string;
}

const integrations: IntegrationItem[] = [
    {
        name: "Shopify",
        icon: SiShopify,
        description: "Easily integrate Kaisho with your Shopify store for seamless crypto payments.",
    },
    {
        name: "Woocommerce",
        icon: SiWoocommerce,
        description: "Accept crypto payments in your WooCommerce store with the Kaisho plugin.",
    },
    {
        name: "Metamask",
        icon: FaEthereum,
        description: "Connect your preferred EVM wallet to make and receive payments.",
    },
    {
        name: "Sui Explorer",
        icon: SiZendesk,
        description: "Track and verify Kaisho transactions on the Sui blockchain explorer.",
    },
    {
        name: "Triple A",
        icon: TbBrandAsana,
        description: "Enable secure and compliant crypto payments with Triple A's advanced payment infrastructure.",
    },
    {
        name: "GitHub",
        icon: SiGithub,
        description: "Kaisho is Open-source",
    },
    {
        name: "Custom APIs",
        icon: FaCode,
        description: "Use our developer-friendly APIs to integrate Kaisho into your platform."
    }
];

export type IntegrationsType = typeof integrations
export default function Integrations() {
    return (
        <section id="integrations" className="py-24 overflow-hidden">
            <div className="container">
                <div className="grid lg:grid-cols-2 items-center lg:gap-16">
                    <div className="">
                        <Tag>Integrations</Tag>
                        <h2 className="text-6xl font-medium mt-6">
                            Seamlessly Integrate  <span className="text-lime-400">Kaisho</span>
                        </h2>
                        <p className="text-white/50 mt-4 text-lg"> Kaisho connects with your favorite platforms and tools, making crypto payments easy to plug into any workflow or application.</p>
                    </div>
                    <div className="">
                        <div className="h-[500px] lg:h-[800px] lg:mt-0 mt-8 overflow-hidden grid md:grid-cols-2 gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                            <Marquee pauseOnHover vertical className="[--duration:20s] text-center">
                                <IntegrationColumn integrations={integrations} />
                            </Marquee>
                            <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
                                <IntegrationColumn integrations={integrations.slice().reverse()} className="hidden md:flex" />
                            </Marquee>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}