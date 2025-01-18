import FeatureCard from "@/components/FeatureCard";
import Tag from "@/components/Tag";
import { 
    QrCodeIcon,
    UserIcon,
    BoltIcon,
    CodeBracketSquareIcon,
    ShieldCheckIcon,
    CreditCardIcon
 } from "@heroicons/react/24/outline";

const features = [
    {
        title: "Zero Fee Transfers",
        description: "Enjoy lightning-fast, zero-fee SUI transfers on the Sui network, making payments seamless and cost-effective.",
        icon: <BoltIcon className="h-8 w-8 text-lime-400" />
    },
    {
        title: "Payment Requests",
        description: "Easily request payments from anyone using shareable links or QR codes.",
        icon: <UserIcon className="h-8 w-8 text-lime-400" />
    },
    {
        title: "QR Code Payments",
        description: "Accept and send payments instantly using unique QR codes, streamlining transactions.",
        icon: <QrCodeIcon className="h-8 w-8 text-lime-400" />
    },
    {
        title: "Secure Escrow",
        description: "Conduct secure transactions with conditional escrow, ensuring peace of mind for both parties.",
         icon: <ShieldCheckIcon className="h-8 w-8 text-lime-400" />,
    },
     {
        title: "Payment Intents",
        description: "Create and manage 'payment intents' for more complex payment scenarios.",
        icon: <CreditCardIcon className="h-8 w-8 text-lime-400" />,
    },
    {
         title: "Developer SDK",
         description: "Use our easy-to-use SDK and comprehensive documentation to seamlessly integrate Kaisho.",
        icon: <CodeBracketSquareIcon className="h-8 w-8 text-lime-400" />
    }
];
 

export default function Features() {
    return   <section  id="features" className="lg:h-[50rem] w-full bg-black bg-dot-white/[0.3] relative flex items-center justify-center py-24">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black/80 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="container">
            <div className="flex justify-center">
            <Tag>Key Features</Tag>
            </div>
            <h2 className="text-6xl font-medium text-center mt-6">
               Unlock the Future of Payments with <span className="text-lime-400">Kaisho</span>
            </h2>
            <p className="text-white/50 text-center mt-2">
                Essential features for fast and secure payments on the Sui blockchain.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map(feature => (
                    <FeatureCard 
                        key={feature.title} 
                        title={feature.title} 
                        description={feature.description}
                        icon={feature.icon}
                    />
                ))}
            </div>
        </div>
    </section>;
}