import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";
import {
    SiShopify,
    SiWoocommerce,
    SiZendesk,
    SiGithub
} from "react-icons/si";
import { FaCode } from "react-icons/fa";
import { FaEthereum } from "react-icons/fa";
import { TbBrandAsana } from "react-icons/tb";

type IntegrationItem = {
    name: string;
    icon?: IconType;
    description: string;
}

const iconMap : Record<string, IconType> = {
    'Shopify': SiShopify,
    'Woocommerce': SiWoocommerce,
    'Metamask': FaEthereum,
    'Sui Explorer': SiZendesk,
    'Triple A': TbBrandAsana,
    'Custom APIs': FaCode,
    'GitHub': SiGithub
}

export default function IntegrationColumn(props: {
    integrations: IntegrationItem[],
    className?: string
}) {
    const {integrations, className } = props;
    return (
        <div className={twMerge("flex flex-col gap-4 pb-4", className)}>
            {integrations.map(integration => (
                <div key={integration.name} className="bg-neutral-900 border border-white/10 rounded-3xl p-6 ">
                    <div className="flex justify-center">
                        {
                             iconMap[integration.name] ? <DynamicIcon Icon={iconMap[integration.name]} /> : <></>
                        }
                    </div>
                    <h3 className="text-2xl text-center mt-6 ">
                        {integration.name}
                    </h3>
                    <p className="text-center text-white/50 mt-2">{integration.description}</p>
                </div>
            ))}
        </div>
    )
}
function DynamicIcon({Icon} : {Icon:IconType}) {
    return  <Icon size={36} color="white"/> 
}