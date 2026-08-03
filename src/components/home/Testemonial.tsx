const Testemonial = ({ name, image, text }: { name: string; image: string; text: string }) => {
    return (
        <div className="flex items-start gap-2 relative bg-white rounded-2xl shadow-[0_8px_8px_rgba(11,74,133,0.12)] ring-1 ring-base-border/50 p-6">
            <img src="/src/assets/icons/quotes.svg" alt="quotes icon" className="size-8 absolute top-0 left-2" />

            <div className="w-1/3 flex flex-col items-center justify-start">
                <img src={image} alt="customer image" className="size-full rounded-full" />
                <p className="text-sm font-bold text-primary">
                    {name}  
                </p>
            </div>

            <p className="text-sm font-semibold text-primary/75 text-right w-2/3 size-full leading-relaxed">
                {text}
            </p>
        </div>
    )
}

export default Testemonial;