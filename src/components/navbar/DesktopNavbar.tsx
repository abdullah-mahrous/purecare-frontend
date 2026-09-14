import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { useAppSelector } from "../../app/hooks";
import { routes } from "../../router/routes";
import ChevronIcon from "../../assets/icons/ChevronIcon";
import LangToggler from "./LangToggler";
import { useTranslation } from "react-i18next";
import { localized } from "../../i18n";

function DesktopNavbar() {
    const services = useAppSelector((state) => state.services.services);
    const { t, i18n } = useTranslation();
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const servicesMenuRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (!isServicesOpen) return;

        const closeOnOutsidePress = (event: PointerEvent) => {
            if (!servicesMenuRef.current?.contains(event.target as Node))
                setIsServicesOpen(false);
        };

        document.addEventListener("pointerdown", closeOnOutsidePress);
        return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
    }, [isServicesOpen]);

    return (
        <div className="hidden min-w-0 flex-1 items-center gap-3 pl-6 md:flex xl:gap-6 xl:pl-12" dir={i18n.resolvedLanguage === "en" ? "ltr" : "rtl"}>
            <nav className="min-w-0 flex-1" aria-label="Desktop navigation">
                <ul className="flex items-center justify-center gap-3 whitespace-nowrap text-xs font-bold text-primary xl:gap-6 xl:text-sm">
                    <li>
                        <Link className="transition-colors hover:text-secondary" to={routes.home}>{t("nav.home")}</Link>
                    </li>
                    <li ref={servicesMenuRef} className="relative">
                        <button
                            type="button"
                            className="flex items-center gap-1 cursor-pointer transition-colors hover:text-secondary"
                            aria-expanded={isServicesOpen}
                            aria-controls="desktop-services-list"
                            onClick={() => setIsServicesOpen((isOpen) => !isOpen)}
                        >
                            {t("nav.services")}
                            <ChevronIcon isOpen={isServicesOpen} />
                        </button>

                        {isServicesOpen && (
                            <ul id="desktop-services-list" className="absolute right-0 top-full z-50 mt-4 min-w-56 rounded-2xl border border-base-border/70 bg-white p-2 text-right shadow-[0_14px_35px_rgba(11,74,133,0.14)]">
                                {services.map((service) => (
                                    <li key={service.id}>
                                        <Link
                                            to={routes.services(service.id)}
                                            className="block rounded-xl px-4 py-3 transition-colors hover:bg-[#eef6ff] hover:text-secondary"
                                            onClick={() => setIsServicesOpen(false)}
                                        >
                                            {localized(service, "name", i18n.resolvedLanguage)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                    <li>
                        <Link className="transition-colors hover:text-secondary" to={routes.medicalEquipments}>{t("nav.equipment")}</Link>
                    </li>
                    <li>
                        <Link className="transition-colors hover:text-secondary" to={routes.careers}>{t("nav.careers")}</Link>
                    </li>
                </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-2 xl:gap-3" dir="rtl">
                <Link to={routes.reservation} className="shrink-0 h-full rounded-xl bg-secondary font-bold text-white transition hover:bg-secondary/90 px-4 py-2.5 text-sm">
                    {t("nav.book")}
                </Link>

                <LangToggler />
            </div>
        </div>
    );
}

export default DesktopNavbar;
