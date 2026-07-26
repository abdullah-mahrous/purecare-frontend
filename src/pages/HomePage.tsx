import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Autoplay, Pagination } from "swiper/modules";

import { services } from "../services/navService";
import { contacts, inquiryMessage } from "../services/contactsService";

import BaseBtn from "../components/BaseBtn";
import EmergancyCTA from "../components/home/EmergancyCTA";
import ServiceCard from "../components/home/ServiceCard";
import TrustCard from "../components/home/TrustCard";
import heroImg from "../assets/hero-img.png";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import 'swiper/css/pagination';

function HomePage() {
    const navigate = useNavigate();

    return (
    <main>
        {/* header */}
        <section
        className="relative isolate flex min-h-[calc(100svh-5rem)] overflow-hidden rounded-b-[4rem] bg-cover bg-[position:58%_center] px-5 pb-8 pt-64 text-white sm:min-h-[36rem] sm:rounded-b-[4rem] sm:bg-center sm:px-8 sm:pt-72 lg:min-h-[42rem] lg:px-12 lg:pt-80"
        style={{ backgroundImage: `url(${heroImg})` }}
        >
            <div className="absolute inset-x-0 bottom-0 -z-10 h-[80%] bg-gradient-to-t from-[#010f1b] via-[#010f1b]/95 to-transparent" />

            <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-end text-center">
                <h1 className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                    رعاية طبية متكاملة في بيتك
                </h1>

                <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-white/90 sm:text-base">
                    خدمات طبية و رعاية منزلية لأهلك و أحبابك على بعد ضغطة زر
                </p>

                <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-3">
                <BaseBtn className="bg-secondary text-white" clickAction={() => window.location.href = `tel:${contacts.phoneNumber}`}>
                    اتصل الآن
                </BaseBtn>
                <BaseBtn className="bg-secondary text-white" clickAction={() => window.open(contacts.whatsappUrl(contacts.whatsappNumber, inquiryMessage), "_blank")}>
                    واتساب
                </BaseBtn>
                <BaseBtn className="bg-white text-primary" clickAction={() => navigate("/reservation")}>
                    احجز معاد
                </BaseBtn>
                </div>

                <p className="mt-5 text-sm font-medium text-white/90">متواجدون في جميع انحاء الإسكندرية</p>
            </div>
        </section>

        {/* qualities */}
        <section className="px-5 py-8 text-center sm:px-8 sm:py-12 lg:px-12 lg:py-16">
            <div className="mx-auto grid w-full max-w-4xl grid-cols-[repeat(auto-fit,minmax(min(100%,9rem),1fr))] gap-4">
                <TrustCard>
                    <svg
                        aria-hidden="true"
                        className="size-10 shrink-0 text-primary"
                        viewBox="0 0 64 64"
                    >
                        <path fill="currentColor" d="M40.067 20.573c0 4.557-3.699 8.25-8.26 8.25c-4.556 0-8.249-3.694-8.249-8.25s3.693-8.25 8.249-8.25c4.561 0 8.26 3.694 8.26 8.25" />
                        <path fill="currentColor" d="M31.82.524c-3.818 0-9.151 1.522-13.014 5.385l4.588 8.359a10.7 10.7 0 0 1 8.426-4.09c3.459 0 6.537 1.634 8.498 4.175l4.5-8.636C41.475 2.064 35.48.525 31.82.525zm3.4 6.138h-2.136v2.134h-2.566V6.662h-2.136V4.097h2.136V1.954h2.566v2.143h2.136zM20.966 43.651h2.113l-3.018 10.344h23.581l-3.004-10.344h2.115l3.023 10.344h6.939l-4.736-15.672c-.74-2.587-3.984-7.142-9.582-7.28l-12.87-.011c-5.725.028-9.037 4.672-9.786 7.29l-4.828 15.672h7.037zM.947 57.293h61.73v5.873H.947z" />
                    </svg>
                    <span className="font-semibold leading-tight">
                        ممرضون على أعلى مستوى
                    </span>
                </TrustCard>

                <TrustCard>
                    <svg
                        aria-hidden="true"
                        className="size-10 shrink-0 text-primary"
                        viewBox="0 0 24 24"
                    >
                        <path fill="currentColor" d="M7.5 8.744C7.847 8.362 8.415 8 9.25 8c1.152 0 1.894.792 2.155 1.661c.253.847.1 1.895-.62 2.618a8 8 0 0 1-.793.67l-.04.031c-.28.216-.53.412-.75.63c-.255.256-.464.535-.585.89h2.133a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75c0-1.247.524-2.083 1.144-2.701c.296-.296.618-.545.89-.756l.003-.002c.286-.221.508-.393.685-.57c.272-.274.367-.725.246-1.13c-.115-.381-.37-.591-.718-.591c-.353 0-.535.137-.64.253a.8.8 0 0 0-.148.229v.003a.75.75 0 0 1-1.428-.462l.035-.096a2.3 2.3 0 0 1 .43-.683M13.25 8a.75.75 0 0 1 .75.75v2.75h1.5V8.75a.75.75 0 0 1 1.5 0v6.47a.75.75 0 0 1-1.5 0V13h-2.25a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 .75-.75M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10M3.5 12a8.5 8.5 0 1 1 17 0a8.5 8.5 0 0 1-17 0" />
                    </svg>
                    <span className="font-semibold leading-tight">
                        خدمة 24 ساعة
                    </span>
                </TrustCard>

                <TrustCard>
                    <svg
                        aria-hidden="true"
                        className="size-10 shrink-0 text-primary"
                        viewBox="0 0 24 24"
                    >
                        <path fill="currentColor" d="M12 20a7 7 0 0 1-7-7a7 7 0 0 1 7-7a7 7 0 0 1 7 7a7 7 0 0 1-7 7m7.03-12.61l1.42-1.42c-.45-.51-.9-.97-1.41-1.41L17.62 6c-1.55-1.26-3.5-2-5.62-2a9 9 0 0 0-9 9a9 9 0 0 0 9 9c5 0 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61M11 14h2V8h-2m4-7H9v2h6z" />
                    </svg>
                    <span className="font-semibold leading-tight">
                        استجابة فورية
                    </span>
                </TrustCard>

                <TrustCard>
                    <svg
                        aria-hidden="true"
                        className="size-10 shrink-0 text-primary"
                        viewBox="0 0 24 24"
                    >
                        <path fill="currentColor" d="M12 5a3.5 3.5 0 0 0-3.5 3.5A3.5 3.5 0 0 0 12 12a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 12 5m0 2a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 12 10a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 7M5.5 8A2.5 2.5 0 0 0 3 10.5c0 .94.53 1.75 1.29 2.18c.36.2.77.32 1.21.32s.85-.12 1.21-.32c.37-.21.68-.51.91-.87A5.42 5.42 0 0 1 6.5 8.5v-.28c-.3-.14-.64-.22-1-.22m13 0c-.36 0-.7.08-1 .22v.28c0 1.2-.39 2.36-1.12 3.31c.12.19.25.34.4.49a2.48 2.48 0 0 0 1.72.7c.44 0 .85-.12 1.21-.32c.76-.43 1.29-1.24 1.29-2.18A2.5 2.5 0 0 0 18.5 8M12 14c-2.34 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.66-3.5-7-3.5m-7.29.55C2.78 14.78 0 15.76 0 17.5V19h3v-1.93c0-1.01.69-1.85 1.71-2.52m14.58 0c1.02.67 1.71 1.51 1.71 2.52V19h3v-1.5c0-1.74-2.78-2.72-4.71-2.95M12 16c1.53 0 3.24.5 4.23 1H7.77c.99-.5 2.7-1 4.23-1" />
                    </svg>
                    <span className="font-semibold leading-tight">
                        جودة خدمة موثوقة 
                    </span>
                </TrustCard>
            </div>
        </section>

        {/* emergency section */}
        <EmergancyCTA />

        {/* services section */}
        <section className="px-5 pb-12 text-primary sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
            <div className="mx-auto w-full max-w-5xl">
                <div className="text-center sm:text-left">
                    <h2 className="text-xl font-bold uppercase tracking-normal text-primary">
                        خدماتنا
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-primary sm:text-base">
                        خدمات طبية متكاملة في منزلك مصممة خصيصا لراحتك 
                    </p>
                </div>
                <Swiper
                    slidesPerView={2}
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
                    {services.map(service => (
                        <SwiperSlide key={service.path}>
                            <ServiceCard
                                key={service.path}
                                title={service.title}
                                description={service.description}
                                to={service.path}
                                icon={service.icon}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    </main>
  );
}

export default HomePage;
