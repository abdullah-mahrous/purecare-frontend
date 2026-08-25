import { Link, useParams } from "react-router";

import EquipmentIcon from "../components/equipment/EquipmentIcon";
import { routes } from "../router/routes";
import { equipmentCategories, equipmentItems } from "../services/equipment.service";

const getPageDirection = () => document.documentElement.dir === "ltr" ? "ltr" : "rtl";

function BackToEquipmentLink() {
    return (
        <Link
            to={`/${routes.medicalEquipment}`}
            className="inline-flex items-center gap-2 rounded-xl border border-base-border bg-white px-4 py-2.5 text-sm font-bold text-primary transition hover:border-primary hover:bg-[#F7FBFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
            <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="m15 18-6-6 6-6" />
            </svg>
            العودة إلى المعدات
        </Link>
    );
}

function MedicalEquipmentDetailsPage() {
    const { equipmentId } = useParams<{ equipmentId: string }>();
    const equipment = equipmentItems.find((item) => item.id === equipmentId);
    const direction = getPageDirection();

    if (!equipment) {
        return (
            <main dir={direction} className="px-4 py-10 text-primary sm:px-6 sm:py-14 lg:px-8">
                <section className="mx-auto max-w-xl rounded-3xl border border-[#E4EEF9] bg-[#F7FBFF] p-8 text-center shadow-[0_12px_30px_rgba(11,74,133,0.07)] sm:p-10">
                    <EquipmentIcon name="grid" className="mx-auto size-14 text-secondary" />
                    <h1 className="mt-4 text-2xl font-extrabold">المعدة غير موجودة</h1>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-body-text sm:text-base">
                        ممكن تكون المعدات دي اتشالت أو الرابط غير صحيح.
                    </p>
                    <div className="mt-6">
                        <BackToEquipmentLink />
                    </div>
                </section>
            </main>
        );
    }

    const category = equipmentCategories.find((item) => item.id === equipment.category);

    return (
        <main dir={direction} className="px-4 py-6 text-primary sm:px-6 sm:py-10 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <BackToEquipmentLink />

                <section className="mt-5 overflow-hidden rounded-3xl border border-[#E4EEF9] bg-[#F7FBFF] shadow-[0_14px_32px_rgba(11,74,133,0.07)] sm:mt-6">
                    <div className="grid items-center gap-6 p-5 sm:p-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-10 md:p-10">
                        <div className="flex min-h-56 items-center justify-center rounded-2xl bg-white shadow-[0_8px_22px_rgba(11,74,133,0.06)] sm:min-h-72">
                            <EquipmentIcon name={equipment.icon} className="size-36 text-primary sm:size-44" title={equipment.name} />
                        </div>

                        <div className="min-w-0 text-start">
                            {category && (
                                <p className="inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary sm:text-sm">
                                    {category.label}
                                </p>
                            )}

                            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-primary sm:text-4xl">
                                {equipment.name}
                            </h1>

                            <p className="mt-3 text-base font-medium leading-relaxed text-body-text sm:text-lg">
                                {equipment.description}
                            </p>

                            <p className="mt-6 text-xl font-extrabold text-primary sm:text-2xl">
                                <bdi>{equipment.pricePerDay}</bdi> ج.م <span className="text-base font-semibold text-body-text">/ يوم</span>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default MedicalEquipmentDetailsPage;
