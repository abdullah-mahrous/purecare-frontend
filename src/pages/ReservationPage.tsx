import { useState } from "react";

import { contacts } from "../services/contactsService";
import { services } from "../services/services.service";
import "react-phone-number-input/style.css";

import BaseInput from "../components/BaseInput";
import BaseBtn from "../components/BaseBtn";
import PhoneInput from "react-phone-number-input";
import DropDownList from "../components/DropDownList";

function ReservationPage() {
    const [phone, setPhone] = useState<string | undefined>();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const listedServices = services.map(service => {
        return {
            text: service.name,
            value: service.id
        }
    });

    return (
        <main dir="rtl" className="px-3 py-2 text-primary sm:px-6 sm:py-8">

            <section className="my-4 overflow-hidden rounded-3xl border border-[#E4EEF9] bg-[#F4F9FF]" aria-labelledby="booking-title">

                <div className="grid items-center md:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
                    <div className="px-5 pb-5 pt-7 sm:px-8 sm:pt-9 md:pb-8">

                        <div className="text-center md:text-left">
                            <h2 id="booking-title" className="text-[30px] font-bold leading-tight sm:text-[38px]">
                                إحجز الآن
                            </h2>

                            <p className="mx-auto mt-3 text-base font-medium leading-relaxed text-heading-text/85 sm:text-lg md:mx-0">
                                إملى البيانات المطلوبة و إحنا هنعمل الباقي
                            </p>
                        </div>

                        <div className="mt-6 grid gap-3 md:mt-7">

                            <div className="flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_6px_18px_rgba(11,74,133,0.05)]">

                                <span className="icon-buble">
                                    <img src="/src/assets/icons/shield-check.svg" alt="Shield Check icon" className="size-8" />
                                </span>

                                <div>
                                    <p className="font-bold sm:text-base">أمان و ثقة كاملة</p>
                                    <p className="mt-0.5 text-xs font-medium text-heading-text/80 sm:text-sm">
                                        بياناتك و صحتك آمنة تماما معانا
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_6px_18px_rgba(11,74,133,0.05)]">
                                <span className="icon-buble">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" className="size-8">
                                        <path d="M0 0h14v14H0z" fill="none" />
                                        <g fill="none">
                                            <path fill="none" d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13" />
                                            <path stroke="#0B4A85" stroke-linecap="round" stroke-linejoin="round"
                                                d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13" />
                                            <path stroke="#0B4A85" stroke-linecap="round" stroke-linejoin="round" d="M7 4.5V7l2.54 2.96" />
                                        </g>
                                    </svg>
                                </span>

                                <div>
                                    <p className="font-bold sm:text-base">متاحين في كل وقت</p>
                                    <p className="mt-0.5 text-xs font-medium text-heading-text/80 sm:text-sm">
                                        إحنا هنا لما تحتاجنا في أي وقت
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-end justify-center px-4 md:min-h-full md:px-0">
                        <img
                            src="/src/assets/services/medical-care-amico.png"
                            alt="Healthcare team caring for a patient"
                            className="w-full max-w-[360px] object-contain sm:max-w-[420px] md:absolute md:bottom-[-3%] md:right-[-9%] md:w-[118%] md:max-w-none"
                        />
                    </div>
                </div>
            </section>

            <form className="my-8">
                <div className="space-y-5 sm:space-y-6">

                    <div className="form-field-container">
                        <span className="icon-buble h-14">
                            <img src="/src/assets/icons/person.svg" alt="person icon" className="size-8" />
                        </span>

                        <div className="flex-1">
                            <label htmlFor="full-name" className="mb-2 block text-base font-bold">
                                الاسم الكامل 
                                <span className="text-red-500">*</span>
                            </label>

                            <BaseInput id="full-name" type="text" placeholder="اكتب اسمك الكامل" value="" required />
                        </div>
                    </div>

                    <div className="form-field-container">
                        <span className="icon-buble h-14">
                            <img src="/src/assets/icons/phone-outline.svg" alt="phone icon" className="size-8" />
                        </span>

                        <div className="flex-1">
                            <label htmlFor="phone-number" className="mb-2 block text-base font-bold">
                                رقم التليفون 
                                <span className="text-red-500">*</span>
                            </label>

                            <div className="flex gap-2">
                                <PhoneInput className="flex-1 gap-2"
                                    international
                                    defaultCountry="EG"
                                    value={phone}
                                    onChange={setPhone}
                                    placeholder="رقم الهاتف"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
                        <div className="form-field-container">

                            <span className="icon-buble h-14">
                                <img src="/src/assets/icons/calendar-month-outline.svg" alt="calender icon" className="size-8" />
                            </span>

                            <div className="flex-1">
                                <label htmlFor="age" className="mb-2 block text-base font-bold">
                                    السن 
                                    <span className="text-red-500">*</span>
                                </label>
                                <BaseInput id="age" type="number" min="0" placeholder="Enter age" value="" required />
                            </div>

                        </div>

                        <div className="form-field-container">
                            <span className="icon-buble h-14">
                                <img src="/src/assets/icons/calendar-check-outline.svg" alt="calender icon" className="size-8" />
                            </span>

                            <div className="flex-1">
                                <label htmlFor="desired-date" className="mb-2 block text-base font-bold">
                                    معاد الزيارة المطلوبة 
                                    <span className="text-red-500">*</span>
                                </label>

                                <BaseInput id="desired-date" min={new Date().toISOString().slice(0, 16)} type="datetime-local" placeholder="Select date" value="" required />
                            </div>
                        </div>
                    </div>

                    <div className="form-field-container">
                        <span className="icon-buble h-14">
                            <img src="/src/assets/icons/map-marker-outline.svg" alt="Map Marker icon" className="size-8" />
                        </span>

                        <div className="flex-1">
                            <label htmlFor="address" className="mb-2 block text-base font-bold">
                                العنوان
                                <span className="text-red-500">*</span>
                            </label>

                            <div>
                                <BaseInput id="address" type="address" placeholder="Enter your full address" value="" required />
                            </div>
                        </div>
                    </div>

                    <div className="form-field-container">
                        <span className="icon-buble h-14">
                            <img src="/src/assets/icons/services.svg" alt="Services icon" className="size-8" />
                        </span>

                        <div className="flex-1">
                            <label htmlFor="service" className="mb-2 block text-base font-bold">
                                الخدمة المطلوبة
                                <span className="text-red-500">*</span>
                            </label>

                            <DropDownList className="flex w-full h-14 items-center justify-between rounded-xl border border-[#DCE5F0] px-3 text-sm font-bold text-primary sm:px-4 sm:text-base" placeholder="اختار الخدمة" items={listedServices} selectedValues={selectedItems} onChange={(selected) => setSelectedItems(selected)}/>
                        </div>
                    </div>

                    <div className="form-field-container items-start!">
                        <span className="icon-buble h-14 mt-8">
                            <img src="/src/assets/icons/heart-pulse.svg" alt="health problem icon" className="size-8" />
                        </span>

                        <div className="flex-1">
                            <label htmlFor="health-problem" className="mb-2 block text-base font-bold">
                                المشكلة الصحية 
                                <span className="text-red-500">*</span>
                            </label>

                            <div className="relative w-full">
                                <textarea id="health-problem" placeholder="Describe the health problem or condition" value="" required className="h-30 w-full resize-none rounded-xl border border-[#DCE5F0] bg-white px-4 py-3 text-base font-medium text-heading-text outline-none placeholder:text-[#8391AA]" />
                                
                                <span className="pointer-events-none absolute bottom-3 right-4 text-sm font-bold text-heading-text">
                                    0/300
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="form-field-container items-start!">
                        <span className="icon-buble h-14 mt-8">
                            <img src="/src/assets/icons/message-text-outline.svg" alt="Shield Check icon" className="size-8" />
                        </span>

                        <div className="flex-1">
                            <label htmlFor="notes" className="mb-2 block text-base font-bold">
                                أي ملاحظات إضافية أو طلبات خاصة 
                            </label>
                            
                            <div className="relative">
                                <textarea id="notes" placeholder="Any additional notes or special requests" value="" className="h-30 w-full resize-none rounded-xl border border-[#DCE5F0] bg-white px-4 py-3 text-base font-medium text-heading-text outline-none placeholder:text-[#8391AA]" />

                                <span className="pointer-events-none absolute bottom-3 right-4 text-sm font-bold text-heading-text">
                                    0/300
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <BaseBtn className="mt-6 w-full justify-center gap-2 bg-secondary text-white font-bold text-xl p-4 rounded-xl sm:mt-8 sm:h-14 sm:text-lg">
                    احجز
                    <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2V5a2 2 0 0 0-2-2m0 16H5V9h14zM5 7V5h14v2zm5.56 10.46l5.94-5.93l-1.07-1.06l-4.87 4.87l-2.11-2.11l-1.06 1.06z"/></svg>
                </BaseBtn>

                <div className="mt-8 rounded-2xl border border-secondary/20 bg-secondary/5 p-3 sm:mt-9 sm:p-4">
                    <div className="flex items-center gap-3">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#E6F8EE] sm:size-14">
                            <img src="/src/assets/icons/headset.svg" alt="Shield Check icon" className="size-8" />
                        </span>
                        
                        <p className="text-sm font-semibold leading-relaxed text-heading-text sm:text-base">
                            <span className="block font-bold text-primary">
                                محتاج مساعدة؟
                            </span>
                                اتصل في اي وقت:  
                            <a href={`tel:${contacts.phoneNumber}`} className="font-bold text-secondary">
                                {contacts.phoneNumber}
                            </a>
                        </p>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default ReservationPage;
