import { useEffect } from "react";
import { useNavigate } from "react-router";

import { routes } from "@/router/routes";
import { useAppSelector } from "@/app/hooks";
import { whatsappUrl } from "@/services/contactsService";

import WhatsappIcon from "@/components/icons/WhatsappIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import { localized } from "@/i18n";
import { useTranslation } from "react-i18next";
import { useGsapPageAnimations } from "@/hooks/useGsapPageAnimations";

function MedicalEquipmentDetailsPage() {
    const navigate = useNavigate();
    const contacts = useAppSelector((state) => state.websiteGeneralData);
    const { equipment, isLoading, error } = useAppSelector(state => state.equipment);
    const { t, i18n } = useTranslation();
    const direction = i18n.resolvedLanguage === "en" ? "ltr" : "rtl";
    const pageRef = useGsapPageAnimations();

    useEffect(() => {
        if (!isLoading && (error || !equipment))
            navigate(routes.notFound);
    }, [equipment, error, isLoading, navigate]);

    if (isLoading)
        return <main dir={direction} className="px-4 py-12 text-center font-bold text-primary">{t("equipment.loading")}</main>;

    if (error || !equipment)
        return null;


    return (
        <main ref={pageRef} dir={direction} className="px-4 pb-8 pt-6 text-primary sm:px-6 sm:pb-12 sm:pt-8">
            <div className="mx-auto w-full max-w-4xl">

                <section data-gsap-entrance data-gsap-variant="scale" className="mx-auto mt-2 flex aspect-[1.25] w-full max-w-3xl max-h-[34rem] items-center justify-center overflow-hidden rounded-3xl bg-[#F7FBFF] p-4 sm:mt-4 sm:p-8">
                    <img src={equipment.imageUrl} alt={localized(equipment, "name", i18n.resolvedLanguage)} className="h-full w-full object-contain" />
                </section>

                <h1 data-gsap-entrance data-gsap-variant="rise" className="mx-auto mt-8 max-w-3xl text-center text-3xl font-extrabold leading-tight text-primary sm:mt-9 sm:text-4xl">
                    {localized(equipment, "name", i18n.resolvedLanguage)}
                </h1>

                {/* Availability and daily rental price */}
                <section data-gsap-reveal data-gsap-variant="slide" className="mt-8 grid grid-cols-2 divide-x divide-[#BFE5DE] rounded-[1.7rem] bg-[#F3F9F8] px-4 py-6 sm:mt-9 sm:px-8" aria-label={t("equipment.availabilityAndPrice")}>
                    {equipment.inStock ? (
                        <div className="flex items-center justify-center gap-3 px-2 text-start">
                            <span className="size-10 rounded-full bg-secondary text-white flex shrink-0 items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-8">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path fill="currentColor" d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z" />
                                </svg>
                            </span>

                            <p className="text-xl font-bold leading-none text-primary sm:text-2xl">{t("equipment.available")}</p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-3 px-2 text-start">
                            <span className="size-10 rounded-full bg-red-600 text-white flex shrink-0 items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-8" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" />
                                </svg>


                            </span>

                            <p className="text-xl font-bold leading-none text-primary sm:text-2xl">{t("equipment.unavailable")}</p>
                        </div>
                    )}

                    <div className="px-2 text-center">
                        <p className="text-sm font-semibold text-primary sm:text-lg">{t("equipment.price")}</p>
                        <p className="mt-1 text-4xl font-extrabold leading-none text-secondary sm:text-5xl">
                            <bdi>{equipment.pricePerDay}</bdi> <span className="text-xl sm:text-2xl">{t("equipment.currency")}</span>
                        </p>
                    </div>
                </section>

                <section data-gsap-reveal className="mt-8 sm:mt-10" aria-labelledby="equipment-description-title">
                    <div className="flex items-center gap-3">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10">
                            <img src="/assets/icons/text-file.svg" alt="desct=ription icon" className="size-8" />
                        </span>

                        <h2 id="equipment-description-title" className="text-2xl font-extrabold text-primary sm:text-3xl">
                            {t("equipment.descriptionTitle")}
                        </h2>
                    </div>

                    <p className="mt-4 text-base font-medium leading-8 text-body-text sm:text-lg sm:leading-9">
                        {localized(equipment, "description", i18n.resolvedLanguage)}
                    </p>
                </section>

                {equipment.inStock && (
                    <section data-gsap-reveal data-gsap-variant="scale" className="mt-8 space-y-3 sm:mt-10" aria-label={t("equipment.contactOptions")}>
                        <button type="button" className="renting-btns shadow-[0_10px_24px_rgba(11,74,133,0.12)] bg-secondary text-white" onClick={() => window.location.href = whatsappUrl(contacts.whatsappNumber, `أهلاً، ممكن أعرف تفاصيل تأجير جهاز ${equipment.nameAr}، والسعر، والمدة المتاحة للتأجير، وإزاي أقدر أطلبه؟`)}>
                            <WhatsappIcon className="size-7" />

                            <span className="text-start">
                                <span className="block text-xl font-extrabold sm:text-2xl">{t("equipment.orderViaWhatsapp")}</span>
                            </span>
                        </button>

                        <button type="button" className="renting-btns border border-[#DCE5F0] bg-white text-primary" onClick={() => window.location.href = `tel:${contacts.phoneNumber}`}>
                            <PhoneIcon className="size-7 fill-current" />

                            <span className="text-start">
                                <span className="block text-xl font-extrabold sm:text-2xl">{t("equipment.callNow")}</span>
                            </span>
                        </button>
                    </section>)}

                <section data-gsap-reveal data-gsap-variant="slide" className="flex gap-4 mt-8 rounded-[1.8rem] bg-[#F1F8F8] px-4 py-6 sm:mt-10 sm:px-9 sm:py-9 items-center" aria-labelledby="safety-title">
                    <div className="flex shrink-0 p-2 items-center justify-center rounded-full border-8 border-white bg-primary/10 text-primary">
                        <img src="/assets/icons/shield-check.svg" className="size-20" alt="shield icon" />
                    </div>

                    <div className="max-w-sm text-start">
                        <h2 id="safety-title" className="text-xl font-extrabold text-primary sm:text-2xl">
                            {t("equipment.safetyTitle")}
                        </h2>

                        <p className="mt-3 text-sm font-medium leading-7 text-body-text sm:text-base sm:leading-8">
                            {t("equipment.safetyText")}
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default MedicalEquipmentDetailsPage;
