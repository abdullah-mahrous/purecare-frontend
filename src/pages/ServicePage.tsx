import { useState } from "react";
import { useNavigate } from "react-router";

import { routes } from "../router/routes";
import { services } from "../services/services.service";

import BaseBtn from "../components/BaseBtn";
import PhoneIcon from "../assets/icons/PhoneIcon";
import WhatsappIcon from "../assets/icons/WhatsappIcon";
import peopleCommunityIcon from "../assets/icons/people-community.svg";
import starIcon from "../assets/icons/star.svg";
import Faq from "../components/Faq";
import ServiceInfo from "../components/ServiceInfo";

function ServicePage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const navigate = useNavigate();
    const service = services[0];

    return (
        <main className="px-4 py-2 text-primary sm:px-8 sm:py-8 lg:px-12 lg:py-10">
            {/* Service Hero Section */}
            <section aria-labelledby="service-page-title">

                <div>
                    <div className="mx-auto grid max-w-5xl items-center gap-2 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-8 text-right">
                        <div className="relative z-10 py-2 md:py-8">
                            <h2 className="max-w-md text-3xl font-extrabold leading-tight text-primary sm:text-4xl lg:text-5xl">
                                {service.name}
                            </h2>

                            <p className="mt-2 max-w-md text-base font-semibold leading-relaxed text-heading-text/85 sm:text-lg lg:text-xl">
                                {service.description}
                            </p>
                        </div>

                        <img
                            src={service.img}
                            alt="Illustration of a home nurse"
                            className="mx-auto w-full max-w-120 mix-blend-multiply md:translate-y-4"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <div className="grid gap-3 grid-cols-2">
                        <BaseBtn className="rounded-lg! bg-primary px-6 text-base text-white sm:text-lg">
                            <PhoneIcon className="size-5 mr-1" />
                            إتصل بينا
                        </BaseBtn>

                        <BaseBtn className="rounded-lg! bg-secondary px-6 text-base text-white sm:text-lg">
                            <WhatsappIcon className="size-6  mr-1" />
                            واتساب
                        </BaseBtn>
                    </div>

                    <BaseBtn clickAction={() => navigate(`/${routes.reservation}`)}
                        className="rounded-lg! mt-3 w-full gap-2 border-2 border-primary bg-white px-6 text-base text-primary sm:text-lg hover:bg-primary hover:text-white focus:bg-primary focus:text-white active:bg-primary active:text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 1024 1024">
                            <path d="M0 0h1024v1024H0z" fill="none" />
                            <path fill="currentColor" d="m960 95.888l-256.224.001V32.113c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76h-256v-63.76c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76H64c-35.344 0-64 28.656-64 64v800c0 35.343 28.656 64 64 64h896c35.344 0 64-28.657 64-64v-800c0-35.329-28.656-63.985-64-63.985m0 863.985H64v-800h255.776v32.24c0 17.679 14.32 32 32 32s32-14.321 32-32v-32.224h256v32.24c0 17.68 14.32 32 32 32s32-14.32 32-32v-32.24H960zM736 511.888h64c17.664 0 32-14.336 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32m0 255.984h64c17.664 0 32-14.32 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.696 14.336 32 32 32m-192-128h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32m0-255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32m-256 0h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32m0 255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32" />
                        </svg>

                        إحجز معاد
                    </BaseBtn>
                </div>
            </section>

            {/* Service Perks */}
            <section aria-labelledby="service-perks" className="my-16 sm:my-20 lg:my-24">

                <div className="grid gap-4 w-full text-primary sm:grid-cols-3 sm:px-6">

                    <div className="service-perk shadow-[0_10px_28px_rgba(11, 74, 133, 0.10)]">
                        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#eef6ff]">
                            <img src={starIcon} alt="rating icon" aria-hidden="true" className="size-10" />
                        </span>

                        <div className="min-w-0">
                            <p className="text-xl font-extrabold leading-tight">{service.perks.rate} / 5</p>
                            <p className="mt-1 text-sm font-semibold text-heading-text/75">Customer Rating</p>
                        </div>
                    </div>

                    <div className="service-perk shadow-[0_10px_28px_rgba(11, 74, 133, 0.10)]">
                        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#eef6ff]">
                            <img src={peopleCommunityIcon} alt="customers icon" aria-hidden="true" className="size-10" />
                        </span>

                        <div className="min-w-0">
                            <p className="text-xl font-extrabold leading-tight">{service.perks.customersCount}+</p>
                            <p className="mt-1 text-sm font-semibold text-heading-text/75">Satisfied Customers</p>
                        </div>
                    </div>

                    <div className="service-perk shadow-[0_10px_28px_rgba(11, 74, 133, 0.10)]">
                        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#eef6ff]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-10 text-[#2F88FF]" viewBox="0 0 16 16">
                                <path d="M0 0h16v16H0z" fill="none" />
                                <path fill="currentColor" d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
                            </svg>
                        </span>

                        <div className="min-w-0">
                            <p className="text-xl font-extrabold leading-tight">{service.perks.responseTime} mins</p>
                            <p className="mt-1 text-sm font-semibold text-heading-text/75">Average Response</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* who is it for section */}
            <section aria-labelledby="who-is-service-for">
                <div className="mx-auto w-full max-w-5xl">
                    <h2 className="text-center sm:text-left text-xl font-bold uppercase tracking-normal text-primary">
                        لمين الخدمة دي؟
                    </h2>

                    <ServiceInfo details={service.targetedCustomers} />
                </div>
            </section>

            {/* what is included section */}
            <section aria-labelledby="what-is-included" className="my-16 sm:my-20 lg:my-24">
                <div className="mx-auto w-full max-w-5xl">
                    <h2 className="text-center sm:text-left text-xl font-bold uppercase tracking-normal text-primary">
                        ايه اللي هتستفاد بيه؟
                    </h2>

                    <ServiceInfo details={service.includedServices} />
                </div>
            </section>

            {/* faq section */}
            <section className="mb-6 text-primary sm:mb-8 lg:mb-10" aria-labelledby="faq-section">
                <div className="mx-auto w-full max-w-5xl">
                    <div className="text-center sm:text-left">
                        <h2 className="text-xl font-bold uppercase tracking-normal text-primary">
                            أسئلة شائعة
                        </h2>
                    </div>

                    <div className="mt-4">
                        {service.faq.map((faq, index) => (
                            <Faq key={index} question={faq.question} answer={faq.answer} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? null : index)} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ServicePage;
