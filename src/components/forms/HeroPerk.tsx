type Props = {
    title: string;
    description: string;
    children: React.ReactNode
}

function HeroPerk({ title, description, children }: Props) {
    return (
        <div className="flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_6px_18px_rgba(11,74,133,0.05)]">

            <span className="icon-buble">
                { children }
            </span>

            <div>
                <p className="font-bold sm:text-base">{ title }</p>
                <p className="mt-0.5 text-xs font-medium text-heading-text/80 sm:text-sm">{ description }</p>
            </div>

        </div>
    )
}

export default HeroPerk