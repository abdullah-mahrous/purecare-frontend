import { Link } from "react-router";

import { routes } from "../router/routes";
import { useAppSelector } from "../app/hooks";

import Logo from "./Logo";

import FacebookIcon from "../assets/icons/FacebookIcon";
import InstagramIcon from "../assets/icons/InstagramIcon";
import TiktookIcon from "../assets/icons/TiktookIcon";
import WhatsappIcon from "../assets/icons/WhatsappIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";
import { useTranslation } from "react-i18next";
import { localized, useCurrentLanguage } from "../i18n";

const Footer = () => {
    const contacts = useAppSelector((state) => state.websiteGeneralData);
    const services = useAppSelector((state) => state.services.services);
    const { t } = useTranslation();
    const language = useCurrentLanguage();

    const contactLinks = [
        { label: "Facebook", href: contacts.facebook, icon: <FacebookIcon className="size-6" /> },
        { label: "Instagram", href: contacts.instagram, icon: <InstagramIcon className="size-6" /> },
        { label: "TikTok", href: contacts.tiktook, icon: <TiktookIcon className="size-6" /> },
        { label: "WhatsApp", href: `https://wa.me/${contacts.whatsappNumber}`, icon: <WhatsappIcon className="size-6" /> },
        { label: "Phone", href: `tel:${contacts.phoneNumber}`, icon: <PhoneIcon className="size-6" /> },
    ];

    return (
        <footer className="bg-slate-900 text-slate-200" dir={language === "en" ? "ltr" : "rtl"}>
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <Logo />

                        <p className="mt-4 text-sm leading-relaxed text-slate-600">
                            {t("home.heroText")}
                        </p>

                        <div className="flex items-center justify-between mt-6 gap-2 flex-wrap">
                            {contactLinks.map((contact) => (
                                <a
                                    key={contact.label}
                                    href={contact.href}
                                    className="flex p-2 items-center justify-center rounded-full bg-white text-slate-700 transition-all duration-200 hover:bg-primary hover:text-white"
                                    aria-label={contact.label}
                                >
                                    {contact.icon}
                                </a>
                            ))}
                        </div>

                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">{t("nav.services")}</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            {
                                services.map(service => (
                                    <li key={routes.services(service.id)}>
                                        <Link to={routes.services(service.id)} className="hover:underline">{localized(service, "name", language)}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">{t("footer.brand")}</h4>

                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><Link to={routes.reservation} className="hover:underline">{t("nav.book")}</Link></li>
                            <li><Link to={routes.careers} className="hover:underline">{t("nav.careers")}</Link></li>
                            <li><Link to={routes.medicalEquipments} className="hover:underline">{t("nav.equipment")}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">{t("nav.contact")}</h4>

                        <div className="flex gap-2 text-sm text-slate-400">
                            <PhoneIcon className="w-5 h-5 shrink-0" />
                            <a href="tel:+201234567890" className="block font-medium text-slate-600">
                                {contacts.phoneNumber}
                            </a>
                        </div>

                        <div className="flex gap-2 text-sm text-slate-400 mt-2">
                            <WhatsappIcon className="w-5 h-5 shrink-0" />
                            <a href="tel:+201234567890" className="block font-medium text-slate-600">
                                {contacts.whatsappNumber}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 mt-6 pt-6 text-sm flex flex-col md:flex-row items-center justify-between">
                    <p className="text-slate-600 text-center w-full">
                        {t("common.rights")} &copy; {new Date().getFullYear()}
                        &nbsp;

                        <span className="xs:inline-block hidden">
                            |
                        </span>

                        <span className="inline-block mt-2 xs:mt-0">
                            &nbsp; {t("common.developedBy")} <a href="https://abdullah-mahrous.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {t("common.developerName")}
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
