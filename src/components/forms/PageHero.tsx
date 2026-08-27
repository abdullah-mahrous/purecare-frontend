import type { ReactNode } from "react";

type Props = {
    children: ReactNode
    header: string;
    slogan: string;
    heroImg: string;
}

function PageHero({ children, header, slogan, heroImg }: Props) {
    return (
        <section className="my-4 overflow-hidden rounded-3xl border border-[#E4EEF9] bg-[#F4F9FF]" aria-labelledby="booking-title">

            <div className="grid items-center md:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
                <div className="px-5 pb-5 pt-7 sm:px-8 sm:pt-9 md:pb-8">

                    <div className="text-center md:text-left">
                        <h2 id="booking-title" className="text-[30px] font-bold leading-tight sm:text-[38px]">
                            { header }
                        </h2>

                        <p className="mx-auto mt-3 text-base font-medium leading-relaxed text-heading-text/85 sm:text-lg md:mx-0">
                            { slogan }
                        </p>
                    </div>

                    <div className="mt-6 grid gap-3 md:mt-7">
                        { children }
                    </div>
                </div>

                <div className="flex items-end justify-center px-4 md:min-h-full md:px-0">
                    <img
                        src={heroImg}
                        alt="hero img"
                        className="w-full max-w-[360px] object-contain sm:max-w-[420px] md:max-w-none"
                    />
                </div>
            </div>
        </section>
    )
}

export default PageHero;