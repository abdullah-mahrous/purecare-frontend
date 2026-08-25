import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { routes } from '../router/routes';
import { submitCareerForm } from "../services/forms.service";
import careerSchema from "../utils/validation/careerSchema";

import BaseInput from "../components/BaseInput";
import BaseBtn from "../components/BaseBtn";
import DropDownList from '../components/DropDownList';

type formFields = z.output<typeof careerSchema>
type formInput = z.input<typeof careerSchema>

function CareersPage() {
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState(false);

    const positions = [{ text: 'تمريض', value: 'تمريض' }, { text: 'دكتور', value: 'دكتور' }, { text: 'علاج طبيعي', value: 'علاج طبيعي' }, { text: 'رعاية منزلية', value: 'رعاية منزلية' }];

    const { register, handleSubmit, control, formState: { errors, isSubmitting} } = useForm<formInput, unknown, formFields>({ resolver: zodResolver(careerSchema) });

    const careerSubmitHandler: SubmitHandler<formFields> = async (data) => {
        setSubmitError(false);
        console.log(data);
        
        try {
            await submitCareerForm(data);
            navigate(routes.sentSuccessfully, {state: { header: 'تم إرسال بياناتك بنجاح', slogan: 'فريقنا هيراجع بياناتك و هنكلمك لو في فرصة عمل مناسبة' }});
        } catch {
            setSubmitError(true);
        }
    }

    return (
        <main dir="rtl" className="px-3 py-2 text-primary sm:px-6 sm:py-8">

            <section className="my-4 overflow-hidden rounded-3xl border border-[#E4EEF9] bg-[#F4F9FF]" aria-labelledby="booking-title">

                <div className="grid items-center md:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
                    <div className="px-5 pb-5 pt-7 sm:px-8 sm:pt-9 md:pb-8">

                        <div className="text-center md:text-left">
                            <h2 id="booking-title" className="text-[30px] font-bold leading-tight sm:text-[38px]">
                                إنضم لفريق العمل
                            </h2>

                            <p className="mx-auto mt-3 text-base font-medium leading-relaxed text-heading-text/85 sm:text-lg md:mx-0">
                                سجل و إنضم لأكبر فريق عمل طبي مختص بالرعاية المنزلية
                            </p>
                        </div>

                        <div className="mt-6 grid gap-3 md:mt-7">

                            <div className="flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_6px_18px_rgba(11,74,133,0.05)]">

                                <span className="icon-buble">
                                    <img src="/src/assets/icons/briefcase-check-outline.svg" alt="briefcase check icon" className="size-8" />
                                </span>

                                <div>
                                    <p className="font-bold sm:text-base">بيئة عمل مناسبة</p>
                                    <p className="mt-0.5 text-xs font-medium text-heading-text/80 sm:text-sm">
                                        اشتغل في بيئة عمل صحية تساعدك على التطور
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_6px_18px_rgba(11,74,133,0.05)]">
                                <span className="icon-buble">
                                    <img src="/src/assets/icons/wallet.svg" alt="wallet icon" className='size-8'/>
                                </span>

                                <div>
                                    <p className="font-bold sm:text-base">رواتب مجزية</p>
                                    <p className="mt-0.5 text-xs font-medium text-heading-text/80 sm:text-sm">
                                        تمتع برواتب تنافسية و مجزية
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_6px_18px_rgba(11,74,133,0.05)]">
                                <span className="icon-buble">
                                    <img src="/src/assets/icons/schedule.svg" alt="timed schedule" className='size-8'/>
                                </span>

                                <div>
                                    <p className="font-bold sm:text-base">ساعات عمل مرنة</p>
                                    <p className="mt-0.5 text-xs font-medium text-heading-text/80 sm:text-sm">
                                        إشتغل في الاوقات المناسبة معاك من خلال جدول سهل ومرن
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-end justify-center px-4 md:min-h-full md:px-0">
                        <img
                            src="/src/assets/medical-staff.png"
                            alt="Healthcare team caring for a patient"
                            className="w-full max-w-[360px] object-contain sm:max-w-[420px] md:max-w-none"
                        />
                    </div>
                </div>
            </section>

            <form className="my-8" onSubmit={handleSubmit(careerSubmitHandler)}>
                <div className="space-y-5 sm:space-y-6">

                    <div className="form-field-container flex-col">
                        <label htmlFor="full-name" className="mr-16 block text-base font-bold">
                            الاسم الكامل 
                            <span className="text-red-500">*</span>
                        </label>

                        <div className="flex w-full gap-4">
                            <span className="icon-buble h-14">
                                <img src="/src/assets/icons/person.svg" alt="person icon" className="size-8" />
                            </span>

                            <BaseInput id="full-name" type="text" placeholder="اكتب اسمك الكامل" {...register("name")} required/>
                        </div>

                        {errors.name && (<p className="text-red-500 text-sm mr-16">{errors.name.message}</p>)}
                    </div>

                    <div className="form-field-container flex-col">
                        <label htmlFor="phone-number" className="mr-16 block text-base font-bold">
                           رقم التليفون (عليه واتساب)
                            <span className="text-red-500">*</span>
                        </label>

                        <div className="flex w-full gap-3">
                            <span className="icon-buble h-14">
                                <img src="/src/assets/icons/phone-outline.svg" alt="phone icon" className="size-8" />
                            </span>

                            <div className="flex gap-2 w-full">
                                <Controller name='phoneNumber' control={control} render={({ field }) => (
                                    <PhoneInput className="flex-1 gap-2"
                                        international
                                        defaultCountry="EG"
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="رقم الهاتف"
                                        required
                                    />
                                )} />
                            </div>
                        </div>

                        {errors.phoneNumber && (<p className="text-red-500 text-sm mr-16">{errors.phoneNumber.message}</p>)}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
                        <div className="form-field-container flex-col">
                            <label htmlFor="age" className="mr-16 block text-base font-bold">
                                السن 
                            </label>

                            <div className="flex w-full gap-4">
                                <span className="icon-buble h-14">
                                    <img src="/src/assets/icons/calendar-month-outline.svg" alt="calender icon" className="size-8" />
                                </span>

                                <BaseInput id="age" type="number" min="0" placeholder="Enter age" {...register("age")}/>
                            </div>

                            {errors.age && (<p className="text-red-500 text-sm mr-16">{errors.age.message}</p>)}
                        </div>

                        <div className="form-field-container flex-col">
                            <label htmlFor="yoe" className="mr-16 block text-base font-bold">
                                عدد سنين الخبرة 
                            </label>

                            <div className="flex w-full gap-4">
                                <span className="icon-buble h-14">
                                    <img src="/src/assets/icons/work-history-outline.svg" alt="calender icon" className="size-8" />
                                </span>

                                <BaseInput id="yoe" type="number" min="0" placeholder="Enter years of experience" {...register("yoe")}/>
                            </div>

                            {errors.yoe && (<p className="text-red-500 text-sm mr-16">{errors.yoe.message}</p>)}
                        </div>
                    </div>

                    <div className="form-field-container flex-col">
                        <label htmlFor="address" className="mr-16 block text-base font-bold">
                            العنوان
                            <span className="text-red-500">*</span>
                        </label>

                        <div className="flex w-full gap-4">
                            <span className="icon-buble h-14">
                                <img src="/src/assets/icons/map-marker-outline.svg" alt="Map Marker icon" className="size-8" />
                            </span>

                            <BaseInput id="address" type="address" placeholder="Enter your full address" {...register("address")} required/>
                        </div>

                        {errors.address && (<p className="text-red-500 text-sm mr-16">{errors.address.message}</p>)}
                    </div>

                    <div className="form-field-container flex-col">
                        <label htmlFor="service" className="mr-16 block text-base font-bold">
                            الوظيفة الي هتقدم عليها
                            <span className="text-red-500">*</span>
                        </label>

                        <div className="flex w-full gap-4">
                            <span className="icon-buble h-14">
                                <img src="/src/assets/icons/services.svg" alt="Services icon" className="size-8" />
                            </span>

                            <Controller name='position' control={control} render={({ field }) => (
                                <DropDownList className="min-w-0 max-w-full w-full flex relative h-14 rounded-xl border border-[#DCE5F0] px-3 text-sm font-bold text-primary sm:px-4 sm:text-base" placeholder="اختار الوظيفة" items={positions} selectedValues={field.value ?? []} onChange={field.onChange}/>
                            )} />
                        </div>

                        {errors.position && (<p className="text-red-500 text-sm mr-16">{errors.position.message}</p>)}
                    </div>

                    <div className="form-field-container flex-col">
                        <label htmlFor="id-files" className="mr-16 block text-base font-bold">
                            صورة البطاقة 
                            <span className="text-red-500">*</span>
                        </label>

                        <div className="flex w-full gap-4">
                            <span className="icon-buble h-14">
                                <img src="/src/assets/icons/id-card.svg" alt="Services icon" className="size-8" />
                            </span>
                            
                            <BaseInput id="id-files" type="file" className='py-4' placeholder="" accept="image/*,.pdf,.doc,.docx" multiple {...register('ID')} />
                        </div>

                        {errors.ID && (<p className="text-red-500 text-sm mr-16">{errors.ID.message}</p>)}
                    </div>

                    <div className="form-field-container flex-col">
                        <label htmlFor="work-id" className="mr-16 block text-base font-bold">
                            صورة كارنيه مزاولة المهنة
                        </label>

                        <div className="flex w-full gap-4">
                            <span className="icon-buble h-14">
                                <img src="/src/assets/icons/auth-card.svg" alt="Services icon" className="size-8" />
                            </span>

                            <BaseInput id="work-id" type="file" className='py-4' placeholder="" accept="image/*,.pdf,.doc,.docx" {...register('workId')} />
                        </div>

                        {errors.workId && (<p className="text-red-500 text-sm mr-16">{errors.workId.message}</p>)}
                    </div>

                    <div className="form-field-container flex-col">
                        <label htmlFor="graduation-certificate" className="mr-16 block text-base font-bold">
                            صورة شهادة التخرج
                        </label>

                        <div className="flex w-full gap-4">
                            <span className="icon-buble h-14">
                                <img src="/src/assets/icons/certificate-outline.svg" alt="Services icon" className="size-8" />
                            </span>

                            <BaseInput id="graduation-certificate" type="file" className='py-4' placeholder="chose" accept="image/*,.pdf,.doc,.docx" {...register('graduationCerteficate')} />
                        </div>

                        {errors.graduationCerteficate && (<p className="text-red-500 text-sm mr-16">{errors.graduationCerteficate.message}</p>)}
                    </div>

                    <div className="form-field-container flex-col">
                        <label htmlFor="work-places" className="mr-16 block text-base font-bold">
                            الأماكن الي اشتغلت فيها قبل كدة
                        </label>

                        <div className="flex w-full gap-4">
                            <span className="icon-buble h-14">
                                <img src="/src/assets/icons/home-work-outline.svg" alt="work places icon" className="size-8" />
                            </span>

                            <textarea id="work-places" placeholder="اكتب أماكن العمل السابقة" className="h-30 w-full resize-none rounded-xl border border-[#DCE5F0] bg-white px-4 py-3 text-base font-medium text-heading-text outline-none placeholder:text-[#8391AA]" {...register("workPlaces")} />
                        </div>

                        {errors.workPlaces && (<p className="text-red-500 text-sm mr-16">{errors.workPlaces.message}</p>)}
                    </div>

                </div>

                <BaseBtn className="mt-6 w-full justify-center gap-2 bg-secondary text-white font-bold text-xl p-4 rounded-xl sm:mt-8 sm:h-14 sm:text-lg disabled:cursor-not-allowed disabled:opacity-80" type="submit" disabled={isSubmitting}>
                    { isSubmitting ? 
                        (<>
                            جار الإرسال...
                            <svg className="animate-spin size-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </>) : (<>

                            إرسال الطلب
                            <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2V5a2 2 0 0 0-2-2m0 16H5V9h14zM5 7V5h14v2zm5.56 10.46l5.94-5.93l-1.07-1.06l-4.87 4.87l-2.11-2.11l-1.06 1.06z"/></svg>
                        </>)
                    }
                </BaseBtn>

                {submitError && (
                    <p role="alert" className="mt-3 text-center text-sm font-bold text-red-600">
                        حدث خطأ أثناء إرسال طلبك، من فضلك حاول مرة أخرى.
                    </p>
                )}
            </form>
        </main>
    );
}

export default CareersPage;
