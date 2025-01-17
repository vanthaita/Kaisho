
export default function FeatureCard(props: {
    title: string,
    description: string,
    children?: React.ReactNode,
    icon?: React.ReactNode
}) {
    const {title, description, icon} = props;
    return (
        <div className="bg-neutral-900 border border-white/10 p-6 rounded-3xl flex flex-col">
            {icon && (
                 <div className="flex justify-center">
                    {icon}
                </div>
            )}
            {props.children && ( <div className="aspect-video">
                {props.children}
            </div>)}
            <div className="mt-4 text-center">
                <h3 className="text-3xl font-medium">{title}</h3>
                <p className="text-white/50 mt-2">
                    {description}
                </p>
            </div>
        </div>
    )
}