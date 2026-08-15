import { Link } from "react-router";

import { routes } from "../router/routes";
import { services } from "../services/services.service";
import { contacts } from "../services/contactsService";

import Logo from "./Logo";

import FacebookIcon from "../assets/icons/FacebookIcon";
import InstagramIcon from "../assets/icons/InstagramIcon";
import TiktookIcon from "../assets/icons/TiktookIcon";
import WhatsappIcon from "../assets/icons/WhatsappIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";

const Footer = () => {
    const contactLinks = [
        { label: "Facebook", href: contacts.facebook, icon: <FacebookIcon className="size-6"/> },
        { label: "Instagram", href: contacts.instagram, icon: <InstagramIcon className="size-6"/> },
        { label: "TikTok", href: contacts.tiktook, icon: <TiktookIcon className="size-6"/> },
        { label: "WhatsApp", href: `https://wa.me/${contacts.whatsappNumber}`, icon: <WhatsappIcon className="size-6"/> },
        { label: "Phone", href: `tel:${contacts.phoneNumber}`, icon: <PhoneIcon className="size-6"/> },
    ];

    return (
        <footer className="bg-slate-900 text-slate-200" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <Logo />
                        
                        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                            خدمات طبية و رعاية منزلية لأهلك و حبايبك في جميع أنحاء الإسكندرية
                        </p>

                        <div className="flex items-center justify-between mt-6 space-x-3">
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
                        <h4 className="font-semibold mb-3">الخدمات</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            {
                                services.map(service => (
                                    <li key={routes.services(service.id)}>
                                        <Link to={routes.services(service.id)} className="hover:underline">{service.name}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">بيوركير</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link to={`${routes.home}#about`} className="hover:underline">عن بيوركير</Link></li>
                            <li><Link to={`${routes.home}#testimonials`} className="hover:underline">آراء العملاء</Link></li>
                            <li><Link to={`${routes.home}#faq`} className="hover:underline">الأسئلة الشائعة</Link></li>
                            <li><Link to={routes.reservation} className="hover:underline">احجز معاد</Link></li>
                            <li><Link to={routes.careers} className="hover:underline">انضم لفريقنا</Link></li>
                            <li><Link to={routes.medicalEquipment} className="hover:underline">تأجير اجهزة طبية</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">اتصل بنا</h4>

                        <div className="flex text-sm text-slate-400">
                            <PhoneIcon className="w-5 h-5 mr-3 shrink-0" />
                            <a href="tel:+201234567890" className="block font-medium text-slate-800 dark:text-slate-100">
                                {contacts.phoneNumber}
                            </a>
                        </div>
                        
                        <div className="flex text-sm text-slate-400 mt-2">
                            <WhatsappIcon className="w-5 h-5 mr-3 shrink-0" />
                            <a href="tel:+201234567890" className="block font-medium text-slate-800 dark:text-slate-100">
                                {contacts.whatsappNumber}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 mt-6 pt-6 text-sm flex flex-col md:flex-row items-center justify-between">
                    <p className="text-slate-600 dark:text-slate-400 text-center">
                        جميع الحقوق محفوظة لشركة بيوركير &copy; {new Date().getFullYear()}
                       &nbsp; 

                       <span className="xs:inline-block hidden">
                            |
                       </span>
                       
                       <span className="inline-block xs:block mt-2 xs:mt-0">
                            &nbsp; تم التطوير بواسطة <a href="https://abdullah-mahrous.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                عبدالله محروس
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;