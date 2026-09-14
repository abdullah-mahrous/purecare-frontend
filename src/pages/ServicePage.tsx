import { useState } from "react";
import { useNavigate } from "react-router";

import { routes } from "../router/routes";
import { useAppSelector } from '@/app/hooks'

import BaseBtn from "../components/BaseBtn";
import PhoneIcon from "../assets/icons/PhoneIcon";
import WhatsappIcon from "../assets/icons/WhatsappIcon";
import peopleCommunityIcon from "../assets/icons/people-community.svg";
import starIcon from "../assets/icons/star.svg";
import Faq from "../components/Faq";
import ServiceInfo from "../components/ServiceInfo";
import { localized, useCurrentLanguage } from "../i18n";
import { useTranslation } from "react-i18next";
import { useGsapPageAnimations } from "@/hooks/useGsapPageAnimations";

function ServicePage() {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { service } = useAppSelector(state => state.services);
    const { t, i18n } = useTranslation();
    const language = useCurrentLanguage();
    const pageRef = useGsapPageAnimations();

    return (
        <main ref={pageRef} dir={language === "en" ? "ltr" : "rtl"} className="mx-auto w-full max-w-7xl px-4 py-2 text-primary sm:px-8 sm:py-8 lg:px-12 lg:py-10">
            {/* Service Hero Section */}
            <section aria-labelledby="service-page-title">

                <div>
                    <div className="mx-auto grid max-w-6xl items-center gap-2 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12 lg:gap-20">
                        <div className="relative z-10 py-2 md:py-8">
                            <h2 data-gsap-entrance data-gsap-variant="drift" className="max-w-md text-3xl font-extrabold leading-tight text-primary sm:text-4xl lg:text-5xl">
                                {service ? localized(service, "name", language) : ""}
                            </h2>

                            <p data-gsap-entrance data-gsap-variant="slide" className="mt-2 max-w-md text-base font-semibold leading-relaxed text-heading-text/85 sm:text-lg lg:text-xl">
                                {service ? localized(service, "description", language) : ""}
                            </p>
                        </div>

                        <img
                            data-gsap-entrance data-gsap-variant="scale"
                            src={service?.imgUrl}
                            alt="Illustration of a home nurse"
                            className="mx-auto object-contain w-full max-w-120 mix-blend-multiply md:translate-y-4 max-h-[30rem]"
                        />
                    </div>
                </div>

                <div data-gsap-stagger data-gsap-variant="rise" className="mt-4">
                    <div className="flex gap-3">
                        <BaseBtn data-gsap-item className="rounded-lg! w-1/2 bg-primary text-base text-white sm:text-lg">
                            <PhoneIcon className="size-5 mr-1" />
                            {t("home.call")}
                        </BaseBtn>

                        <BaseBtn data-gsap-item className="rounded-lg! w-1/2 bg-secondary text-base text-white sm:text-lg">
                            <WhatsappIcon className="size-6  mr-1" />
                            {t("home.whatsapp")}
                        </BaseBtn>
                    </div>

                    <BaseBtn data-gsap-item onClick={() => navigate(`/${routes.reservation}`)}
                        className="rounded-lg! mt-3 w-full gap-2 border-2 border-primary bg-white px-6 text-base text-primary sm:text-lg"
                    >
                        <img src="/src/assets/icons/calendar-month-outline.svg" alt="calender icon" className="size-6" />

                        {t("home.book")}
                    </BaseBtn>
                </div>
            </section>

            {/* Service Perks */}
            <section data-gsap-reveal aria-labelledby="service-perks" className="my-16 sm:my-20 lg:my-24">

                <div data-gsap-stagger data-gsap-variant="rise" className="grid gap-4 w-full text-primary sm:grid-cols-3">

                    <div data-gsap-item className="service-perk shadow-[0_10px_28px_rgba(11, 74, 133, 0.10)]">
                        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#eef6ff]">
                            <img src={starIcon} alt="rating icon" aria-hidden="true" className="size-10" />
                        </span>

                        <div className="min-w-0">
                            <p className="text-xl font-extrabold leading-tight">{service?.rate} / 5</p>
                            <p className="mt-1 text-sm font-semibold text-heading-text/75">{t("service.customerRating")}</p>
                        </div>
                    </div>

                    <div data-gsap-item className="service-perk shadow-[0_10px_28px_rgba(11, 74, 133, 0.10)]">
                        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#eef6ff]">
                            <img src={peopleCommunityIcon} alt="customers icon" aria-hidden="true" className="size-10" />
                        </span>

                        <div className="min-w-0">
                            <p className="text-xl font-extrabold leading-tight">{service?.customersCount}+</p>
                            <p className="mt-1 text-sm font-semibold text-heading-text/75">{t("service.satisfiedCustomers")}</p>
                        </div>
                    </div>

                    <div data-gsap-item className="service-perk shadow-[0_10px_28px_rgba(11, 74, 133, 0.10)]">
                        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#eef6ff]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-10 text-[#2F88FF]" viewBox="0 0 16 16">
                                <path d="M0 0h16v16H0z" fill="none" />
                                <path fill="currentColor" d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
                            </svg>
                        </span>

                        <div className="min-w-0">
                            <p className="text-xl font-extrabold leading-tight">{service?.responseTime} {t("service.minutes")}</p>
                            <p className="mt-1 text-sm font-semibold text-heading-text/75">{t("service.averageResponse")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* who is it for section */}
            {service?.targeted && service?.targeted.length > 0 && (
                <section data-gsap-reveal aria-labelledby="who-is-service-for">
                    <div className="mx-auto w-full max-w-6xl">
                        <h2 className="text-center sm:text-start text-xl font-bold uppercase tracking-normal text-primary">
                            {i18n.language === "en" ? "Who is this service for?" : "لمين الخدمة دي؟"}
                        </h2>

                        <ServiceInfo details={service?.targeted} language={language} />
                    </div>
                </section>)}

            {/* what is included section */}
            {service?.included && service?.included.length > 0 && (
                <section data-gsap-reveal aria-labelledby="what-is-included" className="my-16 sm:my-20 lg:my-24">
                    <div className="mx-auto w-full max-w-6xl">
                        <h2 className="text-center sm:text-start text-xl font-bold uppercase tracking-normal text-primary">
                            {i18n.language === "en" ? "What is included?" : "ايه اللي هتستفاد بيه؟"}
                        </h2>

                        <ServiceInfo details={service?.included} language={language} />
                    </div>
                </section>)}

            {/* faq section */}
            {service?.faqs && service?.faqs.length > 0 && (
                <section data-gsap-reveal className="mb-6 text-primary sm:mb-8 lg:mb-10" aria-labelledby="faq-section">
                    <div className="mx-auto w-full max-w-6xl">
                        <div className="text-center sm:text-start">
                            <h2 className="text-xl font-bold uppercase tracking-normal text-primary">
                                أسئلة شائعة
                            </h2>
                        </div>

                        <div data-gsap-stagger data-gsap-variant="rise" className="mt-4">
                            {service?.faqs.map((faq, index) => (
                                <div data-gsap-item key={`${index}-${i18n.language}`}>
                                    <Faq question={localized(faq, "question")} answer={localized(faq, "answer")} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? null : index)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>)}
        </main>
    );
}

export default ServicePage;
