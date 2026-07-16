import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "../../features/navSlice";
import Logo from "../Logo";
import LangToggler from "./LangToggler";
import { navLinks, services } from "../../services/navService";

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        aria-hidden="true"
        className={`size-5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "rotate-180" : ""}`}
        viewBox="0 0 24 24"
    >
        <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z" />
    </svg>
);

const EmergencyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="size-12" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="currentColor" d="M6 20q-.425 0-.712-.288T5 19t.288-.712T6 18h.6l1.975-6.575q.2-.65.738-1.037T10.5 10h3q.65 0 1.188.388t.737 1.037L17.4 18h.6q.425 0 .713.288T19 19t-.288.713T18 20zm5-13V4q0-.425.288-.712T12 3t.713.288T13 4v3q0 .425-.288.713T12 8t-.712-.288T11 7m5.25 1.35l2.125-2.125q.275-.275.688-.288t.712.288q.275.275.275.7t-.275.7l-2.125 2.15q-.3.3-.7.3t-.7-.3t-.3-.712t.3-.713M19 13h3q.425 0 .713.288T23 14t-.288.713T22 15h-3q-.425 0-.712-.288T18 14t.288-.712T19 13M6.35 9.75L4.225 7.625q-.275-.275-.287-.687t.287-.713q.275-.275.7-.275t.7.275l2.15 2.125q.3.3.3.7t-.3.7t-.712.3t-.713-.3M2 15q-.425 0-.712-.288T1 14t.288-.712T2 13h3q.425 0 .713.288T6 14t-.288.713T5 15z" />
    </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="currentColor" d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3" />
    </svg>
);

const FacebookIcon = () => (
    <svg aria-hidden="true" className="size-6" viewBox="0 0 24 24">
        <path fill="currentColor" d="M14 8h2.5V5H14c-2.62 0-4 1.58-4 4v2H8v3h2v7h3v-7h2.45l.55-3h-3V9c0-.65.35-1 1-1" />
    </svg>
);

const InstagramIcon = () => (
    <svg aria-hidden="true" className="size-6" viewBox="0 0 24 24">
        <path fill="currentColor" d="M7 2h10c2.76 0 5 2.24 5 5v10c0 2.76-2.24 5-5 5H7c-2.76 0-5-2.24-5-5V7c0-2.76 2.24-5 5-5m0 2c-1.66 0-3 1.34-3 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V7c0-1.66-1.34-3-3-3zm5 3.25A4.75 4.75 0 1 1 7.25 12A4.75 4.75 0 0 1 12 7.25m0 2A2.75 2.75 0 1 0 14.75 12A2.75 2.75 0 0 0 12 9.25M17.5 6.5a1 1 0 1 1-1 1a1 1 0 0 1 1-1" />
    </svg>
);

const TikTokIcon = () => (
    <svg aria-hidden="true" className="size-6" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.5 3c.3 2 1.5 3.55 3.5 3.9V10c-1.28 0-2.47-.38-3.5-1.04v5.54c0 3.05-2.25 5.5-5.42 5.5A5.06 5.06 0 0 1 5 14.93c0-3.25 2.84-5.78 6.07-5.08v3.22c-1.42-.45-2.95.52-2.95 1.86c0 1.1.86 1.95 2.02 1.95c1.28 0 2.16-.88 2.16-2.38V3z" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg aria-hidden="true" className="size-6" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m.01 18.11h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18l-3.14.82l.84-3.06l-.2-.31a8.2 8.2 0 1 1 6.99 3.88m4.5-6.14c-.25-.12-1.47-.72-1.7-.81s-.39-.12-.56.12s-.64.81-.79.98s-.29.19-.54.06a6.7 6.7 0 0 1-1.97-1.21a7.4 7.4 0 0 1-1.36-1.69c-.14-.25-.01-.38.11-.5c.11-.11.25-.29.37-.43s.17-.25.25-.41s.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31s-.87.85-.87 2.07s.89 2.4 1.01 2.57s1.75 2.67 4.24 3.74c.59.25 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.68-1.18s.21-1.08.14-1.18s-.22-.16-.47-.29" />
    </svg>
);

const contactLinks = [
    { label: "Facebook", href: "#", icon: <FacebookIcon /> },
    { label: "Instagram", href: "#", icon: <InstagramIcon /> },
    { label: "TikTok", href: "#", icon: <TikTokIcon /> },
    { label: "WhatsApp", href: "https://wa.me/201234567890", icon: <WhatsAppIcon /> },
    { label: "Phone", href: "tel:01234567890", icon: <PhoneIcon /> },
];


const MobileDrawer = () => {
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector((state: { nav: { isDrawerOpen: boolean } }) => state.nav.isDrawerOpen);
    const [shouldRender, setShouldRender] = useState<boolean>(isDrawerOpen);
    const [isVisible, setIsVisible] = useState<boolean>(isDrawerOpen);
    const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);

    const closeSidebar = () => {
        if (isDrawerOpen) {
            dispatch(closeDrawer());
        }
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

    return shouldRender ? (
        <div
            className={`fixed inset-0 z-[60] block h-screen w-full bg-slate-900/35 transition-opacity duration-[350ms] ease-out sm:hidden ${
                isVisible ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={closeSidebar}
        >
            <div
                className={`ml-auto flex h-full w-3/4 max-w-sm transform-gpu flex-col overflow-y-auto rounded-tl-[1.75rem] bg-white shadow-[-18px_0_50px_rgba(15,23,42,0.18)] transition-[translate,opacity] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[translate,opacity] ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`} 
                    onClick={(e) => e.stopPropagation()}>
                <div className="bg-primary p-6">
                    <div className="flex items-center justify-between">
                        <Logo color="text-white" />

                        <button
                            type="button"
                            className="rounded-full p-1 text-white transition-colors duration-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                            aria-label="Close menu"
                            onClick={closeSidebar}
                        >
                            <svg aria-hidden="true" className="size-6" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M20 20L4 4m16 0L4 20" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-8 flex items-center">
                        <LangToggler />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6" dir="rtl">
                    <nav className="space-y-1" aria-label="Mobile navigation">
                        <Link
                            to="/"
                            className="flex items-center gap-4 border-b border-gray-200 py-4 text-primary transition-colors duration-200 hover:text-secondary"
                            onClick={closeSidebar}
                        >
                            <img src="src/assets/icons/home.svg" alt="Home" className="size-6" />
                            <span className="font-semibold">الرئيسية</span>
                        </Link>

                        <button
                            type="button"
                            className="flex w-full items-center justify-between border-b border-gray-200 py-4 text-primary transition-colors duration-200 hover:text-secondary"
                            aria-expanded={isServicesOpen}
                            aria-controls="mobile-services-list"
                            tabIndex={0}
                            onClick={() => setIsServicesOpen((isOpen) => !isOpen)}
                        >
                            <span className="flex items-center gap-4">
                                <img src="src/assets/icons/services.svg" alt="Services" className="size-6" />
                                <span className="font-semibold">الخدمات</span>
                            </span>

                            <ChevronIcon isOpen={isServicesOpen} />
                        </button>

                        <div
                            id="mobile-services-list"
                            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                isServicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            }`}
                        >
                            <div className="overflow-hidden">
                                <ul className="list-disc space-y-4 py-4 pr-10 text-primary marker:text-primary marker:text-lg">
                                    {services.map((service, index) => (
                                        <li
                                            key={service.to}
                                            className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                                isServicesOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                                            }`}
                                            style={{ transitionDelay: isServicesOpen ? `${index * 45}ms` : "0ms" }}
                                        >
                                            <Link
                                                to={service.to}
                                                className="inline-flex text-base font-medium transition-colors duration-200 hover:text-secondary"
                                                onClick={closeSidebar}
                                            >
                                                {service.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {navLinks.slice(1).map((link) => (
                            <Link
                                key={link.label}
                                to={link.to}
                                className="flex items-center gap-4 border-b border-gray-200 py-4 text-primary transition-colors duration-200 hover:text-secondary"
                                onClick={closeSidebar}
                            >
                                <img src={link.icon} alt={link.label} className="size-6" />
                                <span className="font-semibold">{link.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-8 rounded-xl bg-stale-red p-4">
                        <div className="flex items-center gap-3 text-emergancy">
                            <EmergencyIcon />

                            <div className="min-w-0">
                                <p className="font-bold leading-tight text-lg">الخط الساخن للطوارئ</p>
                                <p className="mt-1 font-medium">متاح 24 ساعة</p>
                            </div>
                        </div>

                        <a
                            href="tel:01234567890"
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-emergancy-btn px-4 py-3 text-base font-bold text-white shadow-[0_10px_24px_rgba(217,44,44,0.22)] transition-transform duration-200 active:scale-[0.98]"
                        >
                            <PhoneIcon />
                            <span dir="ltr">012 3456 7890</span>
                        </a>
                    </div>

                    <div className="mt-8">
                        <p className="font-bold text-primary">تابعنا على</p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            {contactLinks.map((contact) => (
                                <a
                                    key={contact.label}
                                    href={contact.href}
                                    className="flex size-11 items-center justify-center rounded-full bg-gray-100 text-primary transition-all duration-200 hover:bg-primary hover:text-white"
                                    aria-label={contact.label}
                                >
                                    {contact.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};
           
export default MobileDrawer;
