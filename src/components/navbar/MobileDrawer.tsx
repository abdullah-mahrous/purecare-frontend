import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "../../features/navSlice";
import Logo from "../Logo";

const MobileDrawer = () => {
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector((state: { nav: { isDrawerOpen: boolean } }) => state.nav.isDrawerOpen);
    const [shouldRender, setShouldRender] = useState<boolean>(isDrawerOpen);
    const [isVisible, setIsVisible] = useState<boolean>(isDrawerOpen);

    const closeSidebar = () => {
        if (isDrawerOpen)
            dispatch(closeDrawer());
    };

    useEffect(() => {
        let mountFrameId: number | undefined;
        let visibleFrameId: number | undefined;
        let timeoutId: number | undefined;

        if (isDrawerOpen) {
            setShouldRender(true);
            setIsVisible(false);

            mountFrameId = requestAnimationFrame(() => {
                visibleFrameId = requestAnimationFrame(() => {
                    setIsVisible(true);
                });
            });
        } else {
            setIsVisible(false);
            timeoutId = setTimeout(() => {
                setShouldRender(false);
            }, 350);
        }

        return () => {
            if (mountFrameId) {
                cancelAnimationFrame(mountFrameId);
            }

            if (visibleFrameId) {
                cancelAnimationFrame(visibleFrameId);
            }

            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [isDrawerOpen]);

    useEffect(() => {
        if (!shouldRender) return;

        const prevBodyOverflow = document.body.style.overflow;
        const prevHtmlOverflow = document.documentElement.style.overflow;

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = prevBodyOverflow;
            document.documentElement.style.overflow = prevHtmlOverflow;
        };
    }, [shouldRender]);

    return (
            shouldRender ? (
                <div
                className={`bg-slate-900/35 dark:bg-[#0b0b0f91] z-60 w-full h-screen fixed inset-0 block sm:hidden transition-opacity duration-350 ease-out ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={(e) => {
                    e.stopPropagation();
                    closeSidebar()
                }}>

                <div
                    className={`transform-gpu duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[translate,opacity] bg-white w-3/4 h-full overflow-y-auto flex flex-col ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}>

                    <div className="bg-primary">
                        <div className="flex items-center justify-between">
                            <Logo color="text-white" />

                            <button type="button" className="p-1"
                                aria-label="Close menu" onClick={(e) => {
                                    e.stopPropagation();
                                    closeSidebar()
                                }}>

                                <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-white" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20" />
                                </svg>

                            </button>
                        </div>
                        
                        <div className="mt-6 flex items-center">
                            
                        </div>
                    </div>

                    <div className="my-8 space-x-2">
                        <Link to={ '/'} 
                            className="mobile-nav-link flex items-center rounded-lg p-4">
                            الرئيسية
                        </Link>

                        <div className="mobile-nav-link flex items-center rounded-lg p-4">
                            <span>الخدمات</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-primary mr-2" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                            </svg>

                            <ul>
                                <li>
                                    زيارة دكاترة
                                </li>
                                <li>
                                    زيارة تمريض
                                </li>
                                <li>
                                    زيارة علاج طبيعي
                                </li>
                                <li>
                                    زيارة مختبرات
                                </li>
                                <li>
                                    زيارة أشعة
                                </li>
                            </ul>
                        </div>

                        <Link to={ 'journal' } className="mobile-nav-link flex items-center rounded-lg p-4">
                            عن الشركة
                        </Link>

                        <Link to={ 'journal' } className="mobile-nav-link flex items-center rounded-lg p-4">
                            احجز الآن
                        </Link>

                        <Link to={ 'journal' } className="mobile-nav-link flex items-center rounded-lg p-4">
                            انضم لفريق العمل
                        </Link>
                    </div>

                    {/* emergency cta */}
                    <div
                        className="mt-10 mb-12 rounded-xl base-border bg-white dark:bg-[linear-gradient(135deg,#101118_0%,#0D0E14_100%)] px-4 py-4 flex flex-col gap-4 shadow-[0_8px_30px_rgba(17,24,39,0.06)] dark:shadow-[0_0_24px_rgba(131,21,231,0.08)]">

                        <div className="flex items-start gap-3">
                            <div
                                className="p-2 rounded-lg border border-primary bg-[#8315e71f] flex items-center justify-center shrink-0">
                                {/* <MessagesSquare className="text-primary" :size="24" /> */}
                            </div>

                            <div className="relative z-10 min-w-0 flex-1">
                                <h3 className="text-primary text-xl xs:text-2xl leading-tight">Let's Talk</h3>
                                <p className="text-slate-600 dark:text-offWhite mt-2 text-sm xs:text-base leading-relaxed">
                                    Have a project in mind?<br/>I'd love to hear about it.
                                </p>
                            </div>
                        </div>

                        {/* <base-btn className="w-full py-3 border-0 shadow-[0_0_20px_rgba(131,21,231,0.35)]"
                            @click="scrollToContactForm" aria-label="Go to Contact form">
                            Contact Me
                            <MoveRight :size="18" className="ml-2" />
                        </base-btn> */}
                    </div>

                    {/* contacts links */}
                    <div className="border-t border-gray-200 dark:border-[#1F2028] pt-8">
                        <p className="text-slate-700 dark:text-offWhite">
                            تابعنا على
                        </p>

                        <div className="flex gap-4 mt-6">
                            {/* <github-link class="hero-socials base-border p-2" :icon-size="20" />
                            <linkedin-link class="hero-socials base-border p-2" :icon-size="20" />
                            <facebook-link class="hero-socials base-border p-2" :icon-size="20" />
                            <mail-link class="hero-socials base-border p-2" :icon-size="20" /> */}
                        </div>

                    </div>

                </div>
            </div>
        ) : null
        )
}
           
export default MobileDrawer;
