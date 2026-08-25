import { Link } from "react-router";

import { routes } from "../../router/routes";
import type { Equipment } from "../../services/equipment.service";

import EquipmentIcon from "./EquipmentIcon";

type EquipmentCardProps = {
    equipment: Equipment;
};

function EquipmentCard({ equipment }: EquipmentCardProps) {
    return (
        <Link
            to={routes.medicalEquipmentDetails(equipment.id)}
            aria-label={`عرض تفاصيل ${equipment.name}`}
            className="group flex min-h-[17rem] min-w-0 flex-col rounded-2xl border border-[#E4EEF9] bg-white p-3 text-primary shadow-[0_8px_22px_rgba(11,74,133,0.07)] transition duration-200 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-[0_14px_30px_rgba(11,74,133,0.13)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-h-[19rem] sm:p-4"
        >
            <div className="flex min-h-28 items-center justify-center rounded-xl bg-[radial-gradient(circle_at_center,#F7FBFF_0%,#EEF6FF_72%,#FFFFFF_100%)] sm:min-h-32">
                <EquipmentIcon name={equipment.icon} className="size-20 text-primary sm:size-24" />
            </div>

            <div className="mt-3 min-w-0 text-start">
                <h2 className="text-sm font-extrabold leading-snug text-primary sm:text-base">
                    {equipment.name}
                </h2>

                <p className="mt-1.5 text-xs font-medium leading-relaxed text-body-text line-clamp-2 sm:text-sm">
                    {equipment.description}
                </p>
            </div>

            <p className="mt-auto pt-3 text-sm font-extrabold text-primary sm:text-base">
                <bdi>{equipment.pricePerDay}</bdi> ج.م <span className="font-semibold text-body-text">/ يوم</span>
            </p>
        </Link>
    );
}

export default EquipmentCard;
