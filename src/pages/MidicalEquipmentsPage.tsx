import { useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getEquipments, setPage, setSearch } from "@/features/equipmentSlice";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

import Pagination from "@/components/Pagination";
import BaseInput from "@/components/BaseInput";
import EquipmentCard from "@/components/equipment/EquipmentCard";
import EquipmentIcon from "@/components/equipment/EquipmentIcon";
import EquipmentFilters from "@/components/equipment/EquipmentsFilters";
import { useTranslation } from "react-i18next";
import { useGsapPageAnimations } from "@/hooks/useGsapPageAnimations";

function EquipmentState() {
    const { data, error, isLoading } = useAppSelector((state) => state.equipment);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    if (error) {
        return (
            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-6 text-center text-primary">
                <p className="font-bold">{t("equipment.error")}</p>
                <button type="button" onClick={() => dispatch(getEquipments())} className="mt-3 rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-white">
                    {t("equipment.retry")}
                </button>
            </div>
        );
    }

    if (!isLoading && data.length === 0) {
        return (
            <div className="rounded-2xl border border-[#E4EEF9] bg-[#F7FBFF] p-8 text-center">
                <EquipmentIcon name="grid" className="mx-auto size-12 text-primary" />
                <p className="mt-3 font-bold text-primary">{t("equipment.empty")}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {data.map((equipment) => <EquipmentCard key={equipment.id} equipment={equipment} />)}
        </div>
    );
}

function MedicalEquipmentPage() {
    const dispatch = useAppDispatch();
    const { filters, pagination, isLoading, data } = useAppSelector((state) => state.equipment);
    const [searchValue, setSearchValue] = useState(filters.search);
    const debouncedSearch = useDebouncedValue(searchValue);
    const { t, i18n } = useTranslation();
    const direction = i18n.language === "en" ? "ltr" : "rtl";
    const isFirstRender = useRef(true);
    const pageRef = useGsapPageAnimations();

    useEffect(() => {
        if (debouncedSearch !== filters.search)
            dispatch(setSearch(debouncedSearch));
    }, [debouncedSearch, dispatch, filters.search]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        void dispatch(getEquipments());
    }, [dispatch, filters.category, filters.limit, filters.maxPrice, filters.minPrice, filters.page, filters.search]);

    return (
        <main ref={pageRef} dir={direction} className="overflow-x-hidden py-4 text-primary sm:py-6 lg:py-8">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                <section data-gsap-entrance className="relative overflow-hidden rounded-3xl border border-[#E4EEF9] bg-[linear-gradient(135deg,#F8FBFF_0%,#EAF4FF_100%)]" aria-labelledby="equipment-page-title">
                    <div className="relative flex flex-col items-center gap-2 px-5 pb-4 pt-7 sm:px-8 sm:pt-9 md:flex-row md:gap-8 md:px-10 md:py-8">

                        <div className="min-w-0 flex-1 text-start">
                            <h1 id="equipment-page-title" className="mt-2 max-w-lg text-3xl font-extrabold leading-tight text-primary sm:text-4xl lg:text-5xl">
                                {t("equipment.hero").trim().split(/\s+/).slice(0, -1).join(" ")} {" "}
                                <span className="text-secondary">{t("equipment.hero").trim().split(/\s+/).at(-1)}</span>
                            </h1>

                            <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-primary sm:text-base lg:text-lg">
                                {t("equipment.heroText")}
                            </p>
                        </div>

                        <img src="/assets/Thermometer-amico.webp" alt="معدات طبية" className="w-full max-w-64 shrink-0 object-contain sm:max-w-76 md:max-w-90 lg:max-w-105" loading="lazy" />
                    </div>
                </section>

                <div data-gsap-reveal data-gsap-variant="rise" role="search" aria-label={t("equipment.search")} className="relative">
                    <svg aria-hidden="true" className={`absolute top-1/2 ${direction === "rtl" ? "right-2" : "left-2"} size-6 shrink-0 text-body-text`} fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="6.5" />
                        <path d="m16 16 4 4" />
                    </svg>

                    <BaseInput type="search" value={searchValue} onChange={(event) => setSearchValue(event.target.value)} placeholder={t("equipment.search")} className={`mt-6 ${direction === "rtl" ? "pr-10" : "pl-10"}`} />
                </div>

                <div className="mt-6 lg:hidden"><EquipmentFilters compact /></div>

                <section data-gsap-reveal className="mt-7 grid gap-6 lg:grid-cols-[14.5rem_minmax(0,1fr)] lg:items-start lg:gap-8" aria-labelledby="equipment-list-title">
                    <aside className="hidden lg:block"><EquipmentFilters /></aside>

                    <div className="min-w-0">
                        <div className="mb-4 text-start">
                            <h2 id="equipment-list-title" className="text-lg font-extrabold text-primary sm:text-xl">
                                {t("equipment.list")}
                            </h2>

                            <p className="mt-1 text-sm font-medium text-body-text">
                                {t("equipment.showing")} <bdi>{data.length + (pagination.page - 1) * pagination.limit}</bdi> {t("equipment.of")} <bdi>{pagination.total}</bdi>
                            </p>
                        </div>

                        {isLoading ? (
                            <div className="rounded-2xl bg-primary/10 p-8 text-center font-bold text-primary border border-primary/20 flex justify-center items-center gap-2">
                                {t("equipment.loading")}
                                <svg className="animate-spin size-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        ) : <div data-gsap-stagger><EquipmentState /></div>}
                    </div>
                </section>

                <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.pages}
                    hasNextPage={pagination.hasNextPage}
                    hasPreviousPage={pagination.hasPreviousPage}
                    onPageChange={(page) => {
                        if (page !== filters.page)
                            dispatch(setPage(page));
                    }}
                />
            </div>
        </main>
    );
}

export default MedicalEquipmentPage;
