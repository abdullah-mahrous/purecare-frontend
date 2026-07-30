import { useState } from "react";
import { useNavigate } from "react-router";

import { Autoplay, Pagination } from "swiper/modules";
import { services } from "../services/homeService";
import { testimonials } from "../services/homeService";
import { faqs } from "../services/homeService";
import { contacts, inquiryMessage } from "../services/contactsService";

import { Swiper, SwiperSlide } from "swiper/react";
import heroImg from "../assets/hero-img.png";
import BaseBtn from "../components/BaseBtn";
import EmergancyCTA from "../components/home/EmergancyCTA";
import ServiceCard from "../components/home/ServiceCard";
import TrustCard from "../components/home/TrustCard";
import VideoContainer from "../components/home/VideoContainer";
import WhyUsPoint from "../components/home/WhyUsPoint";
import Testemonial from "../components/home/Testemonial";
import Faq from "../components/home/Faq";

import "swiper/css";
import 'swiper/css/pagination';

function HomePage() {
    const navigate = useNavigate();

    const [openIndex, setOpenIndex] = useState<number | null>(null);

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
                    خدمات طبية و رعاية منزلية لأهلك و حبايبك بضغطة زرار
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
        <section className="px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <div className="mx-auto grid w-full max-w-4xl grid-cols-[repeat(auto-fit,minmax(min(100%,9rem),1fr))] gap-4">
                <TrustCard>
                    <img src="/src/assets/icons/nurse.svg" alt="medical team icon" className="size-10 shrink-0" />
                    <span className="font-bold leading-tight">
                        ممرضين على أعلى مستوى
                    </span>
                </TrustCard>

                <TrustCard>
                    <img src="/src/assets/icons/clock.svg" alt="clock icon" className="size-10"/>
                    <span className="font-bold leading-tight">
                        خدمة 24 ساعة
                    </span>
                </TrustCard>

                <TrustCard>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-10 text-[#2F88FF]" viewBox="0 0 16 16">
                        <path d="M0 0h16v16H0z" fill="none" />
                        <path fill="currentColor" d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
                    </svg>

                    <span className="font-bold leading-tight">
                        استجابة فورية
                    </span>
                </TrustCard>

                <TrustCard>
                    <img src="/src/assets/icons/shield.svg" alt="shield icon" className="size-10"/>
                    <span className="font-bold leading-tight">
                        جودة خدمة موثوقة 
                    </span>
                </TrustCard>
            </div>
        </section>

        {/* emergency section */}
        <EmergancyCTA />

        {/* services section */}
        <section className="px-5 py-16 text-primary sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <div className="mx-auto w-full max-w-5xl">
                <div className="text-center sm:text-left">
                    <h2 className="text-xl font-bold uppercase tracking-normal text-primary">
                        خدماتنا
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-primary sm:text-base">
                        خدمات طبية متكاملة في بيتك مصممة خصيصا لراحتك 
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
                                path={service.path}
                                icon={service.icon}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>

        {/* about section */}
        <section className="px-5 sm:px-8 lg:px-12">
            <h3 className="text-2xl font-bold uppercase text-center mb-8 tracking-normal text-primary">
                مين إحنا؟
            </h3>

            <div className="mx-auto w-full max-w-5xl">
                <VideoContainer source="/src/assets/introduction.mp4" bubbles={true} />
            </div>

            <div className="pt-8 sm:pt-12 lg:pt-20 text-right">
                <h3 className="text-xl font-bold uppercase tracking-normal text-primary">
                    مين هم بيوركير؟
                </h3>

                <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-primary/75 sm:text-base">
                    إحنا فريق من المختصين في الرعاية الصحية المنزلية، ملتزمين بتقديم خدمات طبية عالية الجودة في بيتك. هدفنا هو تحسين جودة حياتك عن طريق توفير رعاية شخصية وموثوقة.
                </p>
            </div>
        </section>

        <hr className="border-primary/20 mx-5 mt-8" />

        {/* why choose us section */}
        <section className="px-5 py-8 text-primary sm:px-8 sm:py-12 lg:px-12 lg:py-16">

            <div className="mx-auto w-full max-w-5xl">
                <div className="text-center sm:text-left">
                    <h2 className="text-xl font-bold uppercase tracking-normal text-primary">
                        ليه تختارنا؟
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-primary/75 sm:text-base">
                        بنقدملك أفضل خدمات الرعاية الصحية المنزلية مع ضمان الجودة والموثوقية.
                    </p>
                </div>

                <div className="grid gap-4 p-4 text-primary sm:grid-cols-6 grid-cols-3">

                    <WhyUsPoint label="فريق طبي على أعلى تجهيز" >
                        <img src="/src/assets/icons/about.svg" alt="medical team icon" className="size-10 shrink-0" />
                    </WhyUsPoint>

                    <WhyUsPoint label="متاحين في أي وقت" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-10" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="currentColor" d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7z" />
                        </svg>

                    </WhyUsPoint>

                    <WhyUsPoint label="خصوصية وسلامة تامة" >
                        <img src="/src/assets/icons/shield-check.svg" alt="shield icon" className="size-10 shrink-0" />
                    </WhyUsPoint>

                    <WhyUsPoint label="مستعدين لأي طرف طارئ" >
                        <img src="/src/assets/icons/chat.svg" alt="chat icon" className="size-10 shrink-0" />
                    </WhyUsPoint>

                    <WhyUsPoint label="حجز و تواصل سهل وسريع" >
                        <img src="/src/assets/icons/calender.svg" alt="calendar icon" className="size-10 shrink-0" />
                    </WhyUsPoint>

                    <WhyUsPoint label="استجابة فورية" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-10 shrink-0" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="#0b4a85" d="M19.5 22a1.5 1.5 0 0 0 1.5-1.5V17a1.5 1.5 0 0 0-1.5-1.5c-1.17 0-2.32-.18-3.42-.55a1.51 1.51 0 0 0-1.52.37l-1.44 1.44a14.77 14.77 0 0 1-5.89-5.89l1.43-1.43c.41-.39.56-.97.38-1.53c-.36-1.09-.54-2.24-.54-3.41A1.5 1.5 0 0 0 7 3H3.5A1.5 1.5 0 0 0 2 4.5C2 14.15 9.85 22 19.5 22M3.5 4H7a.5.5 0 0 1 .5.5c0 1.28.2 2.53.59 3.72c.05.14.04.34-.12.5L6 10.68c1.65 3.23 4.07 5.65 7.31 7.32l1.95-1.97c.14-.14.33-.18.51-.13c1.2.4 2.45.6 3.73.6a.5.5 0 0 1 .5.5v3.5a.5.5 0 0 1-.5.5C10.4 21 3 13.6 3 4.5a.5.5 0 0 1 .5-.5" />
                        </svg>
                    </WhyUsPoint>

                </div>

            </div>

        </section>

        {/* how it works section */}
        <section className="px-5 py-8 text-primary sm:px-8 sm:py-12 lg:px-12 lg:py-16">
            <div className="mx-auto w-full max-w-5xl">
                <div className="text-center sm:text-left">
                    <h2 className="text-xl font-bold uppercase tracking-normal text-primary">
                        إزاي بيوركير بيشتغل؟
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-primary/75 sm:text-base">
                        خطوات بسيطة وسهلة للحصول على الرعاية الصحية المنزلية.
                    </p>
                </div>
                
                <div className="flex justify-between items-start mt-4">
                    <div className="flex flex-col items-center justify-center w-1/3">

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
                            تواصل معانا 
                        </p>
                        
                        <p className="text-xs text-center text-primary/75 font-semibold">
                            اتصل بنا أو ابعتلنا على الواتساب
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


                    <div className="flex flex-col items-center justify-center w-1/3">
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
                            بنوصلك
                        </p>

                        <p className="text-xs text-center text-primary/75 font-semibold">
                            بنبعتلك الممرضين و الأطباء لحد عندك
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


                    <div className="flex flex-col items-center justify-center w-1/3">
                        <div className="relative rounded-full shadow p-5">
                            <img src="/src/assets/icons/nurse.svg" alt="healthcare icon" className="size-10 shrink-0" />

                            <span className="size-5 flex items-center justify-center absolute -bottom-3.5 left-7.5 rounded-full bg-primary p-2 text-center text-white text-sm">
                                3
                            </span>
                        </div>

                        <p className="text-sm font-bold leading-relaxed text-primary sm:text-base mt-3 mb-1">
                            الرعاية بتبدأ
                        </p>

                        <p className="text-center text-xs font-semibold text-primary/75">
                            الممرضين و الأطباء بيقدمولك الرعاية الصحية اللي محتاجها
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* testimonials section */}
        <section className="px-5 py-8 text-primary sm:px-8 sm:py-12 lg:px-12 lg:py-16">
            <div className="mx-auto w-full max-w-5xl">
                <div className="text-center sm:text-left">
                    <h2 className="text-xl font-bold uppercase tracking-normal text-primary">
                        آراء العملاء
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-primary/75 sm:text-base">
                        شوف رأي عملائنا في خدماتنا و تجربتهم معانا.
                    </p>
                </div>

                <Swiper
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
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <Testemonial name={testimonial.name} image={testimonial.image} text={testimonial.text} />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>

        {/* faq section */}
        <section className="px-5 py-8 text-primary sm:px-8 sm:py-12 lg:px-12 lg:py-16">
            <div className="mx-auto w-full max-w-5xl">
                <div className="text-center sm:text-left">
                    <h2 className="text-xl font-bold uppercase tracking-normal text-primary">
                        أسئلة شائعة
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-primary/75 sm:text-base">
                        إجابات لأكثر الأسئلة شيوعًا حول خدماتنا.
                    </p>
                </div>

                <div className="mt-4">
                    {faqs.map((faq, index) => (
                        <Faq key={index} question={faq.question} answer={faq.answer} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? null : index)} />
                    ))}
                </div>
            </div>
        </section>

    </main>
  );
}

export default HomePage;
