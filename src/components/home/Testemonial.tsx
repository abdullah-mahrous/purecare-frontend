const Testemonial = ({ name, image, text }: { name: string; image: string; text: string }) => {
    return (
        <div className="relative flex items-start gap-2 sm:gap-6 rounded-2xl bg-white p-6 shadow-[0_8px_8px_rgba(11,74,133,0.12)] ring-1 ring-base-border/50 sm:p-5 sm:px-8">
            <img src="/assets/icons/quotes.svg" alt="quotes icon" className="size-8 absolute top-0 rtl:left-2 ltr:right-2" />

            <p className="w-2/3 font-semibold leading-relaxed text-primary/75 lg:w-4/5 xs:text-xl lg:leading-9">
                {text}
            </p>

            <div className="flex w-1/3 flex-col items-center justify-start lg:w-1/5">
                <img src={image} alt="customer image" className="size-full rounded-full object-cover sm:size-35 lg:size-40" />

                <p className="text-sm font-bold text-primary xs:text-base">
                    {name}
                </p>
            </div>
        </div>
    )
}

export default Testemonial;