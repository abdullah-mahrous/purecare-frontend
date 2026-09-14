import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";

import { routes } from "../../router/routes";
import { closeDrawer } from "../../features/navSlice";
import { whatsappUrl } from "../../services/contactsService";

import Logo from "../Logo";
import LangToggler from "./LangToggler";
import EmergencyIcon from "../icons/EmergencyIcon";
import ChevronIcon from "../icons/ChevronIcon";
import PhoneIcon from "../icons/PhoneIcon";
import FacebookIcon from "../icons/FacebookIcon";
import TiktookIcon from "../icons/TiktookIcon";
import WhatsappIcon from "../icons/WhatsappIcon";
import InstagramIcon from "../icons/InstagramIcon";
import { useTranslation } from "react-i18next";
import { localized } from "../../i18n";

const MobileDrawer = () => {
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector((state: { nav: { isDrawerOpen: boolean } }) => state.nav.isDrawerOpen);
    const [shouldRender, setShouldRender] = useState<boolean>(isDrawerOpen);
    const [isVisible, setIsVisible] = useState<boolean>(isDrawerOpen);
    const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);

    const contacts = useAppSelector((state) => state.websiteGeneralData);
    const services = useAppSelector((state) => state.services.services);
    const { t, i18n } = useTranslation();

    const contactLinks = [
        { label: "Facebook", href: contacts.facebook, icon: <FacebookIcon className="size-6" /> },
        { label: "Instagram", href: contacts.instagram, icon: <InstagramIcon className="size-6" /> },
        { label: "TikTok", href: contacts.tiktook, icon: <TiktookIcon className="size-6" /> },
        { label: "WhatsApp", href: whatsappUrl(contacts.whatsappNumber, ''), icon: <WhatsappIcon className="size-6" /> },
        { label: "Phone", href: `tel:${contacts.phoneNumber}`, icon: <PhoneIcon className="size-6" /> },
    ];

    const navLinks = [
        { label: t("nav.about"), to: `${routes.home}#about`, icon: '/assets/icons/people.svg' },
        { label: t("nav.book"), to: routes.reservation, icon: '/assets/icons/calender.svg' },
        { label: t("nav.equipment"), to: routes.medicalEquipments, icon: '/assets/icons/shopping.svg' },
        { label: t("nav.careers"), to: routes.careers, icon: '/assets/icons/briefcase.svg' },
    ];

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
            mountFrameId = requestAnimationFrame(() => {
                setShouldRender(true);
                setIsVisible(false);

                visibleFrameId = requestAnimationFrame(() => {
                    setIsVisible(true);
                });
            });
        } else {
            mountFrameId = requestAnimationFrame(() => {
                setIsVisible(false);
                timeoutId = setTimeout(() => {
                    setShouldRender(false);
                }, 350);
            });
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
            className={`fixed inset-0 z-60 block h-screen w-full bg-slate-900/35 transition-opacity duration-[350ms] ease-out lg:hidden ${isVisible ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            onClick={closeSidebar}
        >
            <div
                className={`ltr:mr-auto rtl:ml-auto flex h-screen w-3/4 max-w-sm transform-gpu flex-col overflow-y-auto rtl:rounded-tl-[1.75rem] ltr:rounded-tr-[1.75rem] bg-white shadow-[-18px_0_50px_rgba(15,23,42,0.18)] transition-[translate,opacity] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[translate,opacity] ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full ltr:translate-x-[-20rem] opacity-0"}`}
                onClick={(e) => e.stopPropagation()}>

                {/* top section */}
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

                {/* Navigation links */}
                <div className="flex-1 overflow-y-auto p-6" dir={i18n.language === "en" ? "ltr" : "rtl"}>
                    <nav className="space-y-1" aria-label="Mobile navigation">
                        <Link
                            to={routes.home}
                            className="flex items-center gap-4 border-b border-gray-200 py-4 text-primary transition-colors duration-200 hover:text-secondary"
                            onClick={closeSidebar}
                        >
                            <img src="/assets/icons/home.svg" alt="Home" className="size-6" />
                            <span className="font-semibold">{t("nav.home")}</span>
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
                                <img src="/assets/icons/services.svg" alt="Services" className="size-6" />
                                <span className="font-semibold">{t("nav.services")}</span>
                            </span>

                            <ChevronIcon isOpen={isServicesOpen} />
                        </button>

                        <div
                            id="mobile-services-list"
                            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isServicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                }`}
                        >
                            <div className="overflow-hidden">
                                <ul className="list-disc space-y-4 py-4 pr-10 text-primary marker:text-primary marker:text-lg">
                                    {services.map((service, index) => (
                                        <li
                                            key={service.id}
                                            className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isServicesOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                                                }`}
                                            style={{ transitionDelay: isServicesOpen ? `${index * 45}ms` : "0ms" }}
                                        >
                                            <Link
                                                to={routes.services(service.id)}
                                                className="inline-flex text-base font-medium transition-colors duration-200 hover:text-secondary"
                                                onClick={closeSidebar}
                                            >
                                                {localized(service, "name")}
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
                                className="flex items-center gap-4 border-b  border-gray-200 py-4 text-primary transition-colors duration-200 hover:text-secondary"
                                onClick={closeSidebar}
                            >
                                <img src={link.icon} alt={link.label} className="size-6" />
                                <span className="font-semibold">{link.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* emergency section */}
                    <div className="mt-8 rounded-xl bg-stale-red p-4">
                        <div className="flex items-center gap-3 text-emergancy">
                            <EmergencyIcon className="size-12" />

                            <div className="min-w-0">
                                <p className="text-lg font-bold leading-tight">{t("emergency.hotline")}</p>
                                <p className="mt-1 font-medium">{t("emergency.available24")}</p>
                            </div>
                        </div>

                        <a
                            href={`tel:${contacts.emergencyNumber}`}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-emergancy-btn px-4 py-3 text-base font-bold text-white shadow-[0_10px_24px_rgba(217,44,44,0.22)] transition-transform duration-200 active:scale-[0.98]"
                        >
                            <PhoneIcon className="size-6" />
                            <span dir="ltr">{contacts.emergencyNumber}</span>
                        </a>
                    </div>

                    <div className="mt-8">
                        <p className="font-bold text-primary">{t("nav.followUs")}</p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            {contactLinks.map(contact => (
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
