import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { routes } from '../router/routes';
import { submitReservationForm } from "../services/forms.service";
import reservationSchema from "../utils/validation/reservationSchema";

import PageHero from '../components/forms/PageHero';
import BaseInput from "../components/BaseInput";
import BaseBtn from "../components/BaseBtn";
import DropDownList from "../components/DropDownList";
import HeroPerk from '../components/forms/HeroPerk';
import FormField from '../components/forms/FormField';
import { useAppSelector } from '../app/hooks';
import { localized } from '../i18n';
import { useTranslation } from 'react-i18next';
import { useGsapPageAnimations } from '../hooks/useGsapPageAnimations';

type formFields = z.output<typeof reservationSchema>
type formInput = z.input<typeof reservationSchema>

function ReservationPage() {
    const navigate = useNavigate();
    const phoneNumber = useAppSelector((state) => state.websiteGeneralData.phoneNumber);
    const services = useAppSelector((state) => state.services.services);
    const { t, i18n } = useTranslation();
    const [submitError, setSubmitError] = useState(false);
    const pageRef = useGsapPageAnimations();
    const listedServices = services.map(service => {
        return {
            text: localized(service, "name"),
            value: service.id
        }
    });

    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<formInput, unknown, formFields>({
        resolver: zodResolver(reservationSchema), defaultValues: {
            fullName: '',
            phoneNumber: '',
            age: undefined,
            desiredDate: '',
            address: '',
            serviceIds: [],
            healthIssue: undefined,
            notes: undefined
        }
    });

    const reservationSubmitHandler: SubmitHandler<formFields> = async (data) => {
        setSubmitError(false);

        try {
            await submitReservationForm(data);
            navigate(routes.sentSuccessfully, { state: { header: 'تم إرسال طلبك بنجاح', slogan: 'شكرًا لك، هنتواصل معاك قريبًا لتأكيد تفاصيل الحجز' } });
        } catch (error) {
            console.error('Failed to submit reservation:', error);
            setSubmitError(true);
        }
    }

    return (
        <main ref={pageRef} dir={i18n.language === "en" ? "ltr" : "rtl"} className="mx-auto w-full max-w-6xl px-3 py-2 text-primary sm:px-6 sm:py-8">

            <PageHero header={t("forms.reservationTitle")} slogan={t("forms.reservationSlogan")} heroImg='/src/assets/medical-care.png'>
                <HeroPerk title={i18n.language === "en" ? "Complete safety and trust" : "أمان و ثقة كاملة"} description={i18n.language === "en" ? "Your data and health are completely safe with us" : "بياناتك و صحتك آمنة تماما معانا"}>
                    <img src="/src/assets/icons/shield-check.svg" alt="perk icon" className="size-8" />
                </HeroPerk>

                <HeroPerk title={i18n.language === "en" ? "Available anytime" : "متاحين في كل وقت"} description={i18n.language === "en" ? "We are here whenever you need us" : "إحنا هنا لما تحتاجنا في أي وقت"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" className="size-8">
                        <path d="M0 0h14v14H0z" fill="none" />
                        <g fill="none">
                            <path fill="none" d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13" />
                            <path stroke="#0B4A85" stroke-linecap="round" stroke-linejoin="round"
                                d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13" />
                            <path stroke="#0B4A85" stroke-linecap="round" stroke-linejoin="round" d="M7 4.5V7l2.54 2.96" />
                        </g>
                    </svg>
                </HeroPerk>
            </ PageHero>

            <form className="mx-auto my-8 w-full max-w-6xl" onSubmit={handleSubmit(reservationSubmitHandler)}>
                <div className="space-y-5 sm:space-y-6">
                    <FormField
                        id="full-name"
                        label={t("forms.name")}
                        required={true}
                        error={errors.fullName?.message}
                        input={<BaseInput id="full-name" type="text" placeholder={i18n.language === "en" ? "Enter your full name" : "اكتب اسمك الكامل"} {...register("fullName")} required />}
                        icon={<img src="/src/assets/icons/person.svg" alt="person icon" className="size-8" />}
                    />

                    <FormField
                        id="phone-number"
                        label={t("forms.phone")}
                        required={true}
                        error={errors.phoneNumber?.message}
                        input={
                            <div className="flex gap-2 w-full">
                                <Controller name='phoneNumber' control={control} render={({ field }) => (
                                    <PhoneInput className="flex-1 gap-2"
                                        international
                                        defaultCountry="EG"
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder={i18n.language === "en" ? "Phone number" : "رقم الهاتف"}
                                        required
                                    />
                                )} />
                            </div>
                        }
                        icon={<img src="/src/assets/icons/phone-outline.svg" alt="phone icon" className="size-8" />}
                    />

                    <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
                        <FormField
                            id="age"
                            label={t("forms.age")}
                            error={errors.age?.message}
                            input={<BaseInput id="age" type="number" min="0" placeholder={i18n.language === "en" ? "Enter age" : "السن"} {...register("age")} />}
                            icon={<img src="/src/assets/icons/calendar-month-outline.svg" alt="calender icon" className="size-8" />}
                        />

                        <FormField
                            id="desired-date"
                            label={t("forms.date")}
                            required={true}
                            error={errors.desiredDate?.message}
                            input={<BaseInput id="desired-date" min={new Date().toISOString().slice(0, 16)} type="datetime-local" placeholder={i18n.language === "en" ? "Select date" : "اختار الموعد"} {...register("desiredDate")} required />}
                            icon={<img src="/src/assets/icons/calendar-check-outline.svg" alt="calender icon" className="size-8" />}
                        />
                    </div>

                    <FormField
                        id="address"
                        label={t("forms.address")}
                        required={true}
                        error={errors.address?.message}
                        input={<BaseInput id="address" type="address" placeholder={i18n.language === "en" ? "Enter your full address" : "اكتب عنوانك بالكامل"} {...register("address")} required />}
                        icon={<img src="/src/assets/icons/map-marker-outline.svg" alt="Map Marker icon" className="size-8" />}
                    />

                    <FormField
                        id="service"
                        label={t("forms.service")}
                        error={errors.serviceIds?.message}
                        input={
                            <Controller name="serviceIds" control={control} render={({ field }) => (
                                <DropDownList className="min-w-0 max-w-full w-full flex relative h-14 rounded-xl border border-[#DCE5F0] px-3 text-sm font-bold text-primary sm:px-4 sm:text-base" placeholder={i18n.language === "en" ? "Choose a service" : "اختار الخدمة"} items={listedServices} selectedValues={field.value ?? []} onChange={field.onChange} multiple={true} />
                            )} />
                        }
                        icon={<img src="/src/assets/icons/services.svg" alt="Services icon" className="size-8" />}
                    />

                    <FormField
                        id="health-problem"
                        label={t("forms.healthIssue")}
                        error={errors.healthIssue?.message}
                        input={<textarea id="health-problem" placeholder={i18n.language === "en" ? "Describe the health problem or condition" : "اوصف المشكلة الصحية أو الحالة"} className="h-30 w-full resize-none rounded-xl border border-[#DCE5F0] bg-white px-4 py-3 text-base font-medium text-heading-text outline-none placeholder:text-[#8391AA]" {...register("healthIssue")} />}
                        icon={<img src="/src/assets/icons/heart-pulse.svg" alt="health problem icon" className="size-8" />}
                    />

                    <FormField
                        id="notes"
                        label={t("forms.notes")}
                        error={errors.notes?.message}
                        input={<textarea id="notes" placeholder={i18n.language === "en" ? "Any additional notes or special requests" : "أي ملاحظات إضافية أو طلبات خاصة"} className="h-30 w-full resize-none rounded-xl border border-[#DCE5F0] bg-white px-4 py-3 text-base font-medium text-heading-text outline-none placeholder:text-[#8391AA]" {...register("notes")} />}
                        icon={<img src="/src/assets/icons/message-text-outline.svg" alt="notes icon" className="size-8" />}
                    />
                </div>

                <BaseBtn className="mt-6 w-full justify-center gap-2 bg-secondary text-white font-bold text-xl p-4 rounded-xl sm:mt-8 sm:h-14 sm:text-lg disabled:cursor-not-allowed disabled:opacity-80" type="submit" disabled={isSubmitting}>
                    {isSubmitting ?
                        (<>
                            {t('forms.booking')}
                            <svg className="animate-spin size-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </>) : (<>

                            {t("forms.submit")}
                            <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2V5a2 2 0 0 0-2-2m0 16H5V9h14zM5 7V5h14v2zm5.56 10.46l5.94-5.93l-1.07-1.06l-4.87 4.87l-2.11-2.11l-1.06 1.06z" /></svg>
                        </>)
                    }


                </BaseBtn>

                {submitError && (
                    <p role="alert" className="mt-3 text-center text-sm font-bold text-red-600">
                        {t('forms.submitError')}
                    </p>
                )}

                <div className="mt-8 rounded-2xl border border-secondary/20 bg-secondary/5 p-3 sm:mt-9 sm:p-4">
                    <div className="flex items-center gap-3">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#E6F8EE] sm:size-14">
                            <img src="/src/assets/icons/headset.svg" alt="Shield Check icon" className="size-8" />
                        </span>

                        <p className="text-sm font-semibold leading-relaxed text-heading-text sm:text-base">
                            <span className="block font-bold text-primary">
                                {t('forms.help')}
                            </span>
                            {t('forms.callAnytime')}
                            <a href={`tel:${phoneNumber}`} className="font-bold text-secondary">
                                {phoneNumber}
                            </a>
                        </p>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default ReservationPage;
