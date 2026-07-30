import { contacts, inquiryMessage } from "../../services/contactsService";

import BaseBtn from "../BaseBtn";
import ambulanceImg from "../../assets/ambulance-vector.png";

const EmergancyCTA = () => {
    return (
        <section className="px-5 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-4xl rounded-3xl bg-stale-red p-4 shadow sm:gap-8 sm:px-8">
                <div className="flex items-center gap-2">
                    <img
                        src={ambulanceImg}
                        alt="ambulance img"
                        className="w-40 shrink-0 sm:w-40 lg:w-48"
                    />

                    <div className="min-w-0 flex-col items-end text-right sm:items-start">
                        <h2 className="text-2xl font-extrabold leading-8     text-emergancy sm:text-3xl">
                            محتاج مساعدة طبية فورية؟
                        </h2>

                        <p className="mt-3 text-sm font-bold text-primary sm:text-base">
                            إحنا جاهزين في أي وقت
                        </p>

                        <p className="mt-3 text-xs font-extrabold text-primary sm:text-sm">
                            نوصل إلى أي مكان في 30 دقيقة
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3 flex-col">
                            <BaseBtn className="gap-2 bg-emergancy text-white" clickAction={() => window.location.href = `tel:${contacts.emergencyNumber}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path fill="currentColor" d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3" />
                                </svg>
                                إتصال طارئ
                            </BaseBtn>

                            <BaseBtn className="gap-2 border border-emergancy text-emergancy" clickAction={() => window.open(contacts.whatsappUrl(contacts.whatsappNumber, inquiryMessage), "_blank")}>
                                <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m.01 18.11h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18l-3.14.82l.84-3.06l-.2-.31a8.2 8.2 0 1 1 6.99 3.88m4.5-6.14c-.25-.12-1.47-.72-1.7-.81s-.39-.12-.56.12s-.64.81-.79.98s-.29.19-.54.06a6.7 6.7 0 0 1-1.97-1.21a7.4 7.4 0 0 1-1.36-1.69c-.14-.25-.01-.38.11-.5c.11-.11.25-.29.37-.43s.17-.25.25-.41s.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31s-.87.85-.87 2.07s.89 2.4 1.01 2.57s1.75 2.67 4.24 3.74c.59.25 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.68-1.18s.21-1.08.14-1.18s-.22-.16-.47-.29" />
                                </svg>
                                واتساب
                            </BaseBtn>
                        </div>

                    </div>
                </div>

                <p className="mt-5 text-xs text-center font-bold text-primary sm:text-sm">
                    *وقت الوصول بيعتمد على المكان*
                </p>
            </div>
        </section>
    );
};

export default EmergancyCTA;
