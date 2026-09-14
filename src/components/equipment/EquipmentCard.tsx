import { Link } from "react-router";

import { routes } from "../../router/routes";
import type { Equipment } from "../../services/equipment.service";
import { localized } from "../../i18n";
import { useTranslation } from "react-i18next";

function EquipmentCard({ equipment }: { equipment: Equipment }) {
    const { t, i18n } = useTranslation();
    const name = localized(equipment, "name", i18n.resolvedLanguage);
    const description = localized(equipment, "description", i18n.resolvedLanguage);
    return (
        <Link
            to={routes.medicalEquipmentDetails(equipment.id)}
            aria-label={name}
            data-gsap-item
            className="group flex h-[24rem] min-w-0 flex-col rounded-2xl border border-[#E4EEF9] bg-white p-3 text-primary shadow-[0_8px_22px_rgba(11,74,133,0.07)] transition duration-200 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-[0_14px_30px_rgba(11,74,133,0.13)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-[26rem] sm:p-4"
        >
            <div className="flex h-44 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F7FBFF] sm:h-52">
                <img src={equipment.imageUrl} alt={name} className="h-full w-full object-contain p-2" />
            </div>

            <div className="mt-3 min-w-0 text-start">
                <h2 className="font-extrabold leading-snug text-primary sm:text-base">
                    {name}
                </h2>

                <p className="mt-1.5 text-sm font-medium leading-relaxed text-body-text line-clamp-4">
                    {description}
                </p>
            </div>

            <div className="w-full flex-wrap gap-2 flex justify-between mt-auto pt-3 text-sm font-extrabold text-primary sm:text-base">
                <p>
                    <bdi>{equipment.pricePerDay}</bdi> {t("equipment.perDay")}
                </p>

                {equipment.inStock ? (
                    <p className="text-secondary flex gap-1 items-center">
                        <span className="size-2.5 inline-block rounded-full bg-secondary mt-1"></span>
                        {t("equipment.available")}
                    </p>
                ) : (
                    <p className="text-yellow-600 flex gap-1 items-center">
                        <span className="size-2.5 inline-block rounded-full bg-yellow-500 mt-1"></span>
                        {t("equipment.unavailable")}
                    </p>
                )}
            </div>
        </Link>
    );
}

export default EquipmentCard;
