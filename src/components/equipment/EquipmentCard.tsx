import { Link } from "react-router";

import { routes } from "../../router/routes";
import type { Equipment } from "../../services/equipment.service";

function EquipmentCard({ equipment }: {equipment: Equipment}) {
    return (
        <Link
            to={routes.medicalEquipmentDetails(equipment.id)}
            aria-label={`عرض تفاصيل ${equipment.name}`}
            className="group flex min-h-[17rem] min-w-0 flex-col rounded-2xl border border-[#E4EEF9] bg-white p-3 text-primary shadow-[0_8px_22px_rgba(11,74,133,0.07)] transition duration-200 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-[0_14px_30px_rgba(11,74,133,0.13)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-h-[19rem] sm:p-4"
        >
                <img src={equipment.imageUrl} alt={equipment.name} className="object-cover max-h-75 w-full" />

            <div className="mt-3 min-w-0 text-start">
                <h2 className="text-sm font-extrabold leading-snug text-primary sm:text-base">
                    {equipment.name}
                </h2>

                <p className="mt-1.5 text-xs font-medium leading-relaxed text-body-text line-clamp-2 sm:text-sm">
                    {equipment.description}
                </p>
            </div>

            <div className="w-full flex-wrap gap-2 flex justify-between mt-auto pt-3 text-sm font-extrabold text-primary sm:text-base">
                <p>
                    <bdi>{equipment.pricePerDay}</bdi> ج.م <span className="font-semibold text-body-text">/ يوم</span>
                </p>

                    {equipment.inStock ? (
                        <p className="text-secondary flex gap-1 items-center">
                            <span className="size-2.5 inline-block rounded-full bg-secondary mt-1"></span>
                            متوفر
                        </p>
                    ) : (
                        <p className="text-yellow-600 flex gap-1 items-center">
                            <span className="size-2.5 inline-block rounded-full bg-yellow-500 mt-1"></span>
                            غير متوفر
                        </p>
                    )}
            </div>
        </Link>
    );
}

export default EquipmentCard;
