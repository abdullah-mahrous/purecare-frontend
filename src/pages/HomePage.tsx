import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../app/hooks";
import { useGsapPageAnimations } from "../hooks/useGsapPageAnimations";

import { Autoplay, Pagination } from "swiper/modules";
import { whatsappUrl } from "../services/contactsService";

import { Swiper, SwiperSlide } from "swiper/react";
import BaseBtn from "../components/BaseBtn";
import EmergancyCTA from "../components/home/EmergancyCTA";
import ServiceCard from "../components/home/ServiceCard";
import TrustCard from "../components/home/TrustCard";
import VideoContainer from "../components/home/VideoContainer";
import WhyUsPoint from "../components/home/WhyUsPoint";
import Testemonial from "../components/home/Testemonial";
import Faq from "../components/Faq";

import "swiper/css";
import 'swiper/css/pagination';
import { routes } from "../router/routes";
import { localized, useCurrentLanguage } from "../i18n";
import { useTranslation } from "react-i18next";

function HomePage() {
    const navigate = useNavigate();

    const contacts = useAppSelector((state) => state.websiteGeneralData);
    const services = useAppSelector((state) => state.services.services);
    const testimonials = useAppSelector((state) => state.testimonials.data);
    const faqs = useAppSelector((state) => state.faqs.data);
    const { t, i18n } = useTranslation();
    const language = useCurrentLanguage();
    const direction = language === "en" ? "ltr" : "rtl";
    const pageRef = useGsapPageAnimations();

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <main ref={pageRef}>
            {/* header */}
            <section
                className="relative isolate flex min-h-[calc(100svh-5rem)] overflow-hidden rounded-b-[4rem] bg-cover bg-[position:68%_center] px-5 pb-8 pt-64 text-white sm:min-h-[36rem] sm:rounded-b-[4rem] sm:bg-center sm:px-8 sm:pt-72 lg:min-h-[42rem] lg:px-12 lg:pt-80 xl:min-h-[46rem]"
                style={{ backgroundImage: "url('/assets/hero-img.png')" }}
            >
                <div className="absolute inset-x-0 bottom-0 -z-10 h-[80%] bg-gradient-to-t from-[#010f1b] via-[#010f1b]/95 to-transparent" />

                <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-end text-center">
                    <h1 data-gsap-entrance data-gsap-variant="slide" className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                        {t("home.heroTitle")}
                    </h1>

                    <p data-gsap-entrance data-gsap-variant="drift" className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-white/90 sm:text-base">
                        {t("home.heroText")}
                    </p>

                    <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-3">
                        <BaseBtn className="bg-secondary text-white" onClick={() => window.location.href = `tel:${contacts.phoneNumber}`}>
                            {t("home.call")}
                        </BaseBtn>
                        <BaseBtn className="bg-secondary text-white" onClick={() => window.open(whatsappUrl(contacts.whatsappNumber, ''), "_blank")}>
                            {t("home.whatsapp")}
                        </BaseBtn>
                        <BaseBtn className="bg-white text-primary" onClick={() => navigate("/reservation")}>
                            {t("home.book")}
                        </BaseBtn>
                    </div>

                    <p className="mt-5 text-sm font-medium text-white/90">{t("home.location")}</p>
                </div>
            </section>

            {/* qualities */}
            <section data-gsap-reveal data-gsap-variant="scale" className="px-5 py-12 text-center sm:px-8 sm:py-16 lg:px-12 lg:py-24">
                <div data-gsap-stagger data-gsap-variant="rise" className="mx-auto grid w-full max-w-6xl grid-cols-[repeat(auto-fit,minmax(min(100%,9rem),1fr))] gap-4 lg:gap-6">

                    <TrustCard>
                        <img src="/assets/icons/nurse.svg" alt="medical team icon" className="size-10 shrink-0" />
                        <span className="font-bold leading-tight">
                            {t("home.trustNurses")}
                        </span>
                    </TrustCard>

                    <TrustCard>
                        <img src="/assets/icons/clock.svg" alt="clock icon" className="size-10" />
                        <span className="font-bold leading-tight">
                            {t("home.trustHours")}
                        </span>
                    </TrustCard>

                    <TrustCard>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-10 text-[#2F88FF]" viewBox="0 0 16 16">
                            <path d="M0 0h16v16H0z" fill="none" />
                            <path fill="currentColor" d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
                        </svg>

                        <span className="font-bold leading-tight">
                            {t("home.trustResponse")}
                        </span>
                    </TrustCard>

                    <TrustCard>
                        <img src="/assets/icons/shield.svg" alt="shield icon" className="size-10" />
                        <span className="font-bold leading-tight">
                            {t("home.trustQuality")}
                        </span>
                    </TrustCard>
                </div>
            </section>

            {/* emergency section */}
            <div data-gsap-reveal data-gsap-variant="slide"><EmergancyCTA /></div>

            {/* services section */}
            <section data-gsap-reveal className="px-5 py-12 text-primary sm:px-8 sm:py-16 lg:px-12 lg:py-24">
                <div className="mx-auto w-full max-w-6xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold uppercase tracking-normal text-primary">
                            {t("home.servicesTitle")}
                        </h2>

                        <p className="mt-4 text-center text-sm font-semibold leading-relaxed text-primary sm:text-base">
                            {t("home.servicesText")}
                        </p>
                    </div>
                    <Swiper
                        data-gsap-stagger
                        key={`services-${i18n.language}`}
                        dir={direction}
                        slidesPerView={1.25}
                        centeredSlides={false}
                        centerInsufficientSlides={true}
                        spaceBetween={10}
                        breakpoints={{
                            480: { slidesPerView: 2 },
                            768: { slidesPerView: 3, spaceBetween: 16 },
                            1280: { slidesPerView: 4, spaceBetween: 20 },
                        }}
                        grabCursor={true}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 5000
                        }}
                        modules={[Pagination, Autoplay]}

                    >
                        {services.map(service => (
                            <SwiperSlide key={service.id} data-gsap-item className="!h-auto">
                                <ServiceCard
                                    key={service.id}
                                    title={localized(service, "name")}
                                    description={localized(service, "description")}
                                    path={routes.services(service.id)}
                                    icon={service.imgUrl}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* about section */}
            <section data-gsap-reveal className="px-5 py-12 text-primary sm:px-8 sm:py-16 lg:px-12 lg:py-24" id="about">
                <h3 className="text-3xl font-bold uppercase text-center tracking-normal text-primary">
                    {t("home.aboutTitle")}
                </h3>

                <div className="mx-auto mt-8 w-full max-w-6xl">
                    <VideoContainer source={contacts.introVideoUrl} bubbles={true} />
                </div>

                <div className="mx-auto max-w-6xl pt-12 text-center sm:pt-16 lg:pt-20">
                    <h3 className="text-3xl font-bold uppercase tracking-normal text-primary">
                        {t("home.aboutSubtitle")}
                    </h3>

                    <p className="mt-4 text-sm font-semibold leading-relaxed text-primary sm:text-base">
                        {t("home.aboutText")}
                    </p>
                </div>
            </section>

            {/* why choose us section */}
            <section data-gsap-reveal className="px-5 py-12 text-primary sm:px-8 sm:py-16 lg:px-12 lg:py-24">

                <div className="mx-auto w-full max-w-6xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold uppercase tracking-normal text-primary">
                            {t("home.whyTitle")}
                        </h2>

                        <p className="mt-4 text-sm font-semibold leading-relaxed text-primary sm:text-base">
                            {t("home.whyText")}
                        </p>
                    </div>

                    <div data-gsap-stagger data-gsap-variant="rise" className="grid gap-4 p-4 text-primary sm:grid-cols-6 grid-cols-3">

                        <WhyUsPoint label={t("home.whyPoints.team")} >
                            <img src="/assets/icons/people.svg" alt="medical team icon" className="size-10 shrink-0" />
                        </WhyUsPoint>

                        <WhyUsPoint label={t("home.whyPoints.availability")} >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" className="size-10 shrink-0">
                                <path d="M0 0h14v14H0z" fill="none" />
                                <g fill="none">
                                    <path fill="none" d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13" />
                                    <path stroke="#0B4A85" stroke-linecap="round" stroke-linejoin="round"
                                        d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13" />
                                    <path stroke="#0B4A85" stroke-linecap="round" stroke-linejoin="round" d="M7 4.5V7l2.54 2.96" />
                                </g>
                            </svg>
                        </WhyUsPoint>

                        <WhyUsPoint label={t("home.whyPoints.privacy")} >
                            <img src="/assets/icons/shield-check.svg" alt="shield icon" className="size-10 shrink-0" />
                        </WhyUsPoint>

                        <WhyUsPoint label={t("home.whyPoints.emergency")} >
                            <img src="/assets/icons/message-text-outline.svg" alt="chat icon" className="size-10 shrink-0" />
                        </WhyUsPoint>

                        <WhyUsPoint label={t("home.whyPoints.booking")} >
                            <img src="/assets/icons/calendar-check-outline.svg" alt="calendar icon" className="size-10 shrink-0" />
                        </WhyUsPoint>

                        <WhyUsPoint label={t("home.whyPoints.response")} >
                            <img src="/assets/icons/phone-outline.svg" alt="phone icon" className="size-10 shrink-0" />
                        </WhyUsPoint>

                    </div>

                </div>

            </section>

            {/* how it works section */}
            <section data-gsap-reveal className="px-5 py-12 text-primary sm:px-8 sm:py-16 lg:px-12 lg:py-24">
                <div className="mx-auto w-full max-w-6xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold uppercase tracking-normal text-primary">
                            {t("home.howTitle")}
                        </h2>

                        <p className="mt-4 text-sm font-semibold leading-relaxed text-primary sm:text-base">
                            {t("home.howText")}
                        </p>
                    </div>

                    <div data-gsap-stagger data-gsap-variant="rise" className="mt-8 flex items-start justify-between rtl:flex-row-reverse">
                        <div data-gsap-item className="flex flex-col items-center justify-center w-1/3">

                            <div className="relative rounded-full shadow p-5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-10 shrink-0" viewBox="0 0 48 48">
                                    <path d="M0 0h48v48H0z" fill="none" />
                                    <path fill="#37474F" d="M12 40V8c0-2.2 1.8-4 4-4h16c2.2 0 4 1.8 4 4v32c0 2.2-1.8 4-4 4H16c-2.2 0-4-1.8-4-4" />
                                    <path fill="#BBDEFB" d="M32 7H16c-.6 0-1 .4-1 1v29c0 .6.4 1 1 1h16c.6 0 1-.4 1-1V8c0-.6-.4-1-1-1" />
                                    <path fill="#78909C" d="M21 40h6v2h-6z" />
                                </svg>

                                <span className="size-5 flex items-center justify-center absolute -bottom-3.5 left-7.5 rounded-full bg-primary p-2 text-center text-white text-sm">
                                    1
                                </span>
                            </div>

                            <p className="text-sm font-bold leading-relaxed text-primary sm:text-base mt-3 mb-1">
                                {t("home.stepContact")}
                            </p>

                            <p className="text-xs text-center font-semibold text-primary">
                                {t("home.stepContactText")}
                            </p>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" className="size-8 text-primary mt-8" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                <path stroke-dasharray="20" d="M3 12h17.5">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="20;0" />
                                </path>
                                <path stroke-dasharray="12" stroke-dashoffset="12" d="M21 12l-7 7M21 12l-7 -7">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" to="0" />
                                </path>
                            </g>
                        </svg>


                        <div data-gsap-item className="flex flex-col items-center justify-center w-1/3">
                            <div className="relative rounded-full shadow p-5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-10" viewBox="0 0 80 80">
                                    <path d="M0 0h80v80H0z" fill="none" />
                                    <g fill="none">
                                        <path fill="#56ccf2" stroke="#56ccf2" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M50 25a2 2 0 0 1 2-2h8.385a4 4 0 0 1 3.241 1.656L74 39H50z" />
                                        <path fill="#f2f2f2" fill-rule="evenodd" d="M74 39H50v16h4.885q.117-.42.287-.828A7.39 7.39 0 0 1 69.115 55H74z" clip-rule="evenodd" />
                                        <path fill="#e0e0e0" d="M50 39v-2a2 2 0 0 0-2 2zm24 0h2a2 2 0 0 0-2-2zM50 55h-2a2 2 0 0 0 2 2zm4.885 0v2a2 2 0 0 0 1.925-1.459zm.287-.828l-1.848-.766zm4-4l.765 1.847zm5.656 0l.766-1.848zm4 4l-1.847.765zm.287.828l-1.925.541A2 2 0 0 0 69.115 57zM74 55v2a2 2 0 0 0 2-2zM50 41h24v-4H50zm2 14V39h-4v16zm2.885-2H50v4h4.885zm1.925 2.541q.085-.306.21-.604l-3.696-1.53a9 9 0 0 0-.365 1.052zm.21-.604a5.4 5.4 0 0 1 2.917-2.918l-1.53-3.695a9.4 9.4 0 0 0-5.083 5.082zm2.917-2.918a5.4 5.4 0 0 1 4.126 0l1.53-3.695a9.4 9.4 0 0 0-7.187 0zm4.126 0a5.4 5.4 0 0 1 2.918 2.918l3.695-1.53a9.4 9.4 0 0 0-5.082-5.083zm2.918 2.918q.122.297.209.604l3.85-1.082a9 9 0 0 0-.364-1.053zM74 53h-4.885v4H74zm-2-14v16h4V39z" />
                                        <path fill="#828282" stroke="#828282" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M59.172 50.172a7.39 7.39 0 1 1 5.656 13.655a7.39 7.39 0 0 1-5.656-13.655" />
                                        <path fill="#f2f2f2" fill-rule="evenodd" d="M10 15a4 4 0 0 0-4 4v36h5.885q.117-.42.287-.828A7.39 7.39 0 0 1 26.115 55H50V19a4 4 0 0 0-4-4z" clip-rule="evenodd" />
                                        <path fill="#e0e0e0" d="M6 55H4a2 2 0 0 0 2 2zm5.885 0v2a2 2 0 0 0 1.925-1.459zm.287-.828l1.847.765zm9.656-4l.766-1.848zm4 4l-1.847.765zm.287.828l-1.925.541A2 2 0 0 0 26.115 57zM50 55v2a2 2 0 0 0 2-2zM8 19a2 2 0 0 1 2-2v-4a6 6 0 0 0-6 6zm0 36V19H4v36zm3.885-2H6v4h5.885zm1.925 2.541q.085-.306.21-.604l-3.696-1.53a9 9 0 0 0-.365 1.052zm.21-.604a5.4 5.4 0 0 1 2.917-2.918l-1.53-3.695a9.4 9.4 0 0 0-5.083 5.082zm2.917-2.918a5.4 5.4 0 0 1 4.126 0l1.53-3.695a9.4 9.4 0 0 0-7.187 0zm4.126 0a5.4 5.4 0 0 1 2.918 2.918l3.695-1.53a9.4 9.4 0 0 0-5.082-5.083zm2.918 2.918q.122.297.209.604l3.85-1.082a9 9 0 0 0-.364-1.053zM50 53H26.115v4H50zm-2-34v36h4V19zm-2-2a2 2 0 0 1 2 2h4a6 6 0 0 0-6-6zm-36 0h36v-4H10z" />
                                        <path fill="#828282" stroke="#828282" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M16.172 50.172a7.39 7.39 0 1 1 5.656 13.655a7.39 7.39 0 0 1-5.656-13.655" />
                                        <path fill="#eb5757" fill-rule="evenodd" d="M24.923 40.595v1.923c0 .637.517 1.154 1.154 1.154h3.846c.637 0 1.154-.517 1.154-1.154v-5.673c0-.053.043-.096.096-.096h5.673c.637 0 1.154-.517 1.154-1.154v-3.846c0-.637-.517-1.154-1.154-1.154h-5.673a.096.096 0 0 1-.096-.096v-5.673c0-.637-.517-1.154-1.154-1.154h-3.846c-.637 0-1.154.517-1.154 1.154v5.769h-5.769c-.637 0-1.154.517-1.154 1.154v3.846c0 .637.517 1.154 1.154 1.154h5.769z" clip-rule="evenodd" />
                                    </g>
                                </svg>

                                <span className="size-5 flex items-center justify-center absolute -bottom-3.5 left-7.5 rounded-full bg-primary p-2 text-center text-white text-sm">
                                    2
                                </span>
                            </div>

                            <p className="text-sm font-bold leading-relaxed text-primary sm:text-base mt-3 mb-1">
                                {t("home.stepArrive")}
                            </p>

                            <p className="text-xs text-center font-semibold text-primary">
                                {t("home.stepArriveText")}
                            </p>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" className="size-8 text-[#cac9c9] mt-8" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                <path stroke-dasharray="20" d="M3 12h17.5">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="20;0" />
                                </path>
                                <path stroke-dasharray="12" stroke-dashoffset="12" d="M21 12l-7 7M21 12l-7 -7">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" to="0" />
                                </path>
                            </g>
                        </svg>


                        <div data-gsap-item className="flex flex-col items-center justify-center w-1/3">
                            <div className="relative rounded-full shadow p-5">
                                <img src="/assets/icons/nurse.svg" alt="healthcare icon" className="size-10 shrink-0" />

                                <span className="size-5 flex items-center justify-center absolute -bottom-3.5 left-7.5 rounded-full bg-primary p-2 text-center text-white text-sm">
                                    3
                                </span>
                            </div>

                            <p className="text-sm font-bold leading-relaxed text-primary sm:text-base mt-3 mb-1">
                                {t("home.stepCare")}
                            </p>

                            <p className="text-center text-xs font-semibold text-primary">
                                {t("home.stepCareText")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* testimonials section */}
            <section data-gsap-reveal className="px-5 py-12 text-primary sm:px-8 sm:py-16 lg:px-12 lg:py-24">
                <div className="mx-auto w-full max-w-6xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold uppercase tracking-normal text-primary">
                            {t("home.testimonialsTitle")}
                        </h2>

                        <p className="mt-4 text-sm font-semibold leading-relaxed text-primary sm:text-base">
                            {t("home.testimonialsText")}
                        </p>
                    </div>

                    <Swiper
                        key={`testimonials-${i18n.language}`}
                        dir={direction}
                        slidesPerView={1}
                        centeredSlides={false}
                        spaceBetween={10}
                        grabCursor={true}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 5000
                        }}
                        modules={[Pagination, Autoplay]}

                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id} className="!h-auto">
                                <Testemonial
                                    name={localized(testimonial, "name", i18n.resolvedLanguage)}
                                    image={testimonial.gender.toLowerCase() === 'female' ? '/assets/female-testemonial.png' : '/assets/male-testemonial.png'}
                                    text={localized(testimonial, "comment", i18n.resolvedLanguage)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </section>

            {/* faq section */}
            <section className="px-5 py-12 text-primary sm:px-8 sm:py-16 lg:px-12 lg:py-24">
                <div className="mx-auto w-full max-w-5xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold uppercase tracking-normal text-primary">
                            {t("home.faqTitle")}
                        </h2>

                        <p className="mt-4 text-sm font-semibold leading-relaxed text-primary sm:text-base">
                            {t("home.faqText")}
                        </p>
                    </div>

                    <div data-gsap-stagger data-gsap-variant="rise" className="mt-4">
                        {faqs.map((faq, index) => (
                            <div data-gsap-item key={`${faq.id}-${i18n.language}`}>
                                <Faq question={localized(faq, "question")} answer={localized(faq, "answer")} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? null : index)} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}

export default HomePage;
