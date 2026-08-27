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
import PageHero from '../components/forms/PageHero';
import HeroPerk from '../components/forms/HeroPerk';
import FormField from '../components/forms/FormField';

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

            <PageHero header="إنضم لفريق العمل" slogan="سجل و إنضم لأكبر فريق عمل طبي مختص بالرعاية المنزلية" heroImg="/src/assets/medical-staff.png">
                <HeroPerk title="بيئة عمل مناسبة" description="اشتغل في بيئة عمل صحية تساعدك على التطور">
                    <img src="/src/assets/icons/briefcase-check-outline.svg" alt="briefcase check icon" className="size-8" />
                </HeroPerk>
                <HeroPerk title="رواتب مجزية" description="تمتع برواتب تنافسية و مجزية">
                    <img src="/src/assets/icons/wallet.svg" alt="wallet icon" className="size-8" />
                </HeroPerk>
                <HeroPerk title="ساعات عمل مرنة" description="إشتغل في الاوقات المناسبة معاك من خلال جدول سهل ومرن">
                    <img src="/src/assets/icons/schedule.svg" alt="timed schedule" className="size-8" />
                </HeroPerk>
            </PageHero>

            <form className="my-8" onSubmit={handleSubmit(careerSubmitHandler)}>
                <div className="space-y-5 sm:space-y-6">

                    <FormField
                        id="full-name"
                        label="الاسم الكامل"
                        required={true}
                        error={errors.name?.message}
                        input={<BaseInput id="full-name" type="text" placeholder="اكتب اسمك الكامل" {...register("name")} required/>}
                        icon={<img src="/src/assets/icons/person.svg" alt="person icon" className="size-8" />}
                    />

                    <FormField
                        id="phone-number"
                        label="رقم التليفون (عليه واتساب)"
                        required={true}
                        error={errors.phoneNumber?.message}
                        input={
                            <Controller name="phoneNumber" control={control} render={({ field }) => (
                                <PhoneInput className="flex-1 gap-2"
                                    international
                                    defaultCountry="EG"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="رقم الهاتف"
                                    required
                                />
                            )} />
                        }
                        icon={<img src="/src/assets/icons/phone-outline.svg" alt="phone icon" className="size-8" />}
                    />

                    <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
                        <FormField
                            id="age"
                            label="السن"
                            error={errors.age?.message}
                            input={<BaseInput id="age" type="number" min="0" placeholder="Enter age" {...register("age")} />}
                            icon={<img src="/src/assets/icons/calendar-month-outline.svg" alt="calender icon" className="size-8" />}
                        />

                        <FormField
                            id="yoe"
                            label="عدد سنين الخبرة"
                            error={errors.yoe?.message}
                            input={<BaseInput id="yoe" type="number" min="0" placeholder="Enter years of experience" {...register("yoe")} />}
                            icon={<img src="/src/assets/icons/work-history-outline.svg" alt="calender icon" className="size-8" />}
                        />
                    </div>

                    <FormField
                        id="address"
                        label="العنوان"
                        required={true}
                        error={errors.address?.message}
                        input={<BaseInput id="address" type="address" placeholder="Enter your full address" {...register("address")} required/>}
                        icon={<img src="/src/assets/icons/map-marker-outline.svg" alt="Map Marker icon" className="size-8" />}
                    />

                    <FormField
                        id="service"
                        label="الوظيفة الي هتقدم عليها"
                        required={true}
                        error={errors.position?.message}
                        input={
                            <Controller name="position" control={control} render={({ field }) => (
                                <DropDownList className="min-w-0 max-w-full w-full flex relative h-14 rounded-xl border border-[#DCE5F0] px-3 text-sm font-bold text-primary sm:px-4 sm:text-base" placeholder="اختار الوظيفة" items={positions} selectedValues={field.value ?? []} onChange={field.onChange}/>
                            )} />
                        }
                        icon={<img src="/src/assets/icons/services.svg" alt="Services icon" className="size-8" />}
                    />

                    <FormField
                        id="id-files"
                        label="صورة البطاقة"
                        required={true}
                        error={errors.ID?.message}
                        input={<BaseInput id="id-files" type="file" className="py-4" placeholder="" accept="image/*,.pdf,.doc,.docx" multiple {...register("ID")} />}
                        icon={<img src="/src/assets/icons/id-card.svg" alt="Services icon" className="size-8" />}
                    />

                    <FormField
                        id="work-id"
                        label="صورة كارنيه مزاولة المهنة"
                        error={errors.workId?.message}
                        input={<BaseInput id="work-id" type="file" className="py-4" placeholder="" accept="image/*,.pdf,.doc,.docx" {...register("workId")} />}
                        icon={<img src="/src/assets/icons/auth-card.svg" alt="Services icon" className="size-8" />}
                    />

                    <FormField
                        id="graduation-certificate"
                        label="صورة شهادة التخرج"
                        error={errors.graduationCerteficate?.message}
                        input={<BaseInput id="graduation-certificate" type="file" className="py-4" placeholder="chose" accept="image/*,.pdf,.doc,.docx" {...register("graduationCerteficate")} />}
                        icon={<img src="/src/assets/icons/certificate-outline.svg" alt="Services icon" className="size-8" />}
                    />

                    <FormField
                        id="work-places"
                        label="الأماكن الي اشتغلت فيها قبل كدة"
                        error={errors.workPlaces?.message}
                        input={<textarea id="work-places" placeholder="اكتب أماكن العمل السابقة" className="h-30 w-full resize-none rounded-xl border border-[#DCE5F0] bg-white px-4 py-3 text-base font-medium text-heading-text outline-none placeholder:text-[#8391AA]" {...register("workPlaces")} />}
                        icon={<img src="/src/assets/icons/home-work-outline.svg" alt="work places icon" className="size-8" />}
                    />

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
