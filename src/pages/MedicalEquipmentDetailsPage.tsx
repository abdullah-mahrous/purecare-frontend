import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import { routes } from "@/router/routes";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { getEquipments, getEquipmentById } from "@/features/equipmentSlice";
import { contacts } from "@/services/contactsService";

import WhatsappIcon from "@/assets/icons/WhatsappIcon";
import PhoneIcon from "@/assets/icons/PhoneIcon";

const getPageDirection = () => document.documentElement.dir === "ltr" ? "ltr" : "rtl";

function MedicalEquipmentDetailsPage() {
    const { equipmentId } = useParams<{ equipmentId: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { equipment, data, isLoading } = useAppSelector(state => state.equipment);

    const direction = getPageDirection();

    useEffect(() => {
        if(data.length == 0)
            dispatch(getEquipments());

        dispatch(getEquipmentById(equipmentId as string));

        // to redirect to not found page if the service is no longer
        if(!equipment)
            navigate(routes.notFound);
    }, [dispatch, equipmentId, data]);


    return (
        <main dir={direction} className="px-4 pb-8 pt-6 text-primary sm:px-6 sm:pb-12 sm:pt-8">
            <div className="mx-auto w-full max-w-2xl">

                <section className="mt-2 sm:mt-4">
                    <img src={equipment?.imageUrl} alt={equipment?.name} className="aspect-[1.25] w-full object-contain" />
                </section>

                <h1 className="mt-8 text-center text-3xl font-extrabold leading-tight text-primary sm:mt-9 sm:text-4xl">
                    {equipment?.name}
                </h1>

                {/* Availability and daily rental price */}
                <section className="mt-8 grid grid-cols-2 divide-x divide-[#BFE5DE] rounded-[1.7rem] bg-[#F3F9F8] px-4 py-6 sm:mt-9 sm:px-8" aria-label="حالة وسعر الجهاز">
                    {equipment?.inStock ? (
                        <div className="flex items-center justify-center gap-3 px-2 text-start">
                            <span className="size-10 rounded-full bg-secondary text-white flex shrink-0 items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-8">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path fill="currentColor" d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z" />
                                </svg>
                            </span>

                            <p className="text-xl font-bold leading-none text-primary sm:text-2xl">متوفر</p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-3 px-2 text-start">
                            <span className="size-10 rounded-full bg-red-600 text-white flex shrink-0 items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-8" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" />
                                </svg>


                            </span>

                            <p className="text-xl font-bold leading-none text-primary sm:text-2xl">غير متوفر</p>
                        </div>
                    )}

                    <div className="px-2 text-center">
                        <p className="text-sm font-semibold text-primary sm:text-lg">سعر الإيجار اليومي</p>
                        <p className="mt-1 text-4xl font-extrabold leading-none text-secondary sm:text-5xl">
                            <bdi>{equipment?.pricePerDay}</bdi> <span className="text-xl sm:text-2xl">جنيه</span>
                        </p>
                    </div>
                </section>

                <section className="mt-8 sm:mt-10" aria-labelledby="equipment-description-title">
                    <div className="flex items-center gap-3">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10">
                            <img src="/src/assets/icons/text-file.svg" alt="desct=ription icon" className="size-8" />
                        </span>

                        <h2 id="equipment-description-title" className="text-2xl font-extrabold text-primary sm:text-3xl">
                            وصف الجهاز
                        </h2>
                    </div>

                    <p className="mt-4 text-base font-medium leading-8 text-body-text sm:text-lg sm:leading-9">
                        {equipment?.description}
                    </p>
                </section>

                {equipment?.inStock && (
                <section className="mt-8 space-y-3 sm:mt-10" aria-label="طرق التواصل">
                    <button type="button" className="renting-btns shadow-[0_10px_24px_rgba(11,74,133,0.12)] bg-secondary text-white" onClick={() => window.location.href=contacts.whatsappUrl(contacts.whatsappNumber, `عايز أحجز جهاز ${equipment.name}`)}>
                        <WhatsappIcon className="size-7"/>

                        <span className="text-start">
                            <span className="block text-xl font-extrabold sm:text-2xl">اطلب عبر واتساب</span>
                        </span>
                    </button>

                    <button type="button" className="renting-btns border border-[#DCE5F0] bg-white text-primary" onClick={() => window.location.href=`tel:${contacts.phoneNumber}`}>
                        <PhoneIcon className="size-7 fill-current" />

                        <span className="text-start">
                            <span className="block text-xl font-extrabold sm:text-2xl">اتصل الآن</span>
                        </span>
                    </button>
                </section>)}

                <section className="flex gap-4 mt-8 rounded-[1.8rem] bg-[#F1F8F8] px-4 py-6 sm:mt-10 sm:px-9 sm:py-9 items-center" aria-labelledby="safety-title">
                    <div className="flex shrink-0 p-2 items-center justify-center rounded-full border-8 border-white bg-primary/10 text-primary">
                        <img src="/src/assets/icons/shield-check.svg" className="size-20" alt="shield icon"/>
                    </div>

                    <div className="max-w-sm text-start">
                        <h2 id="safety-title" className="text-xl font-extrabold text-primary sm:text-2xl">
                            نظافة وأمان مضمون
                        </h2>

                        <p className="mt-3 text-sm font-medium leading-7 text-body-text sm:text-base sm:leading-8">
                            جميع أجهزتنا يتم تعقيمها وتطهيرها بعد كل استخدام وفقًا لأعلى معايير الجودة والسلامة.
                        </p>                        
                    </div>
                </section>
            </div>
        </main>
    );
}

export default MedicalEquipmentDetailsPage;
