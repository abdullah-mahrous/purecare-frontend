import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchEquipment, setPage, setSearch } from "@/features/equipmentSlice";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

import Pagination from "@/components/Pagination";
import BaseInput from "@/components/BaseInput";
import EquipmentCard from "@/components/equipment/EquipmentCard";
import EquipmentIcon from "@/components/equipment/EquipmentIcon";
import EquipmentFilters from "@/components/equipment/EquipmentsFilters";

const getPageDirection = () => document.documentElement.dir === "ltr" ? "ltr" : "rtl";

function EquipmentState() {
    const { data, error, isLoading } = useAppSelector((state) => state.equipment);
    const dispatch = useAppDispatch();

    if (error) {
        return (
            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-6 text-center text-primary">
                <p className="font-bold">تعذر تحميل المعدات.</p>
                <button type="button" onClick={() => dispatch(fetchEquipment())} className="mt-3 rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-white">
                    إعادة المحاولة
                </button>
            </div>
        );
    }

    if (!isLoading && data.length === 0) {
        return (
            <div className="rounded-2xl border border-[#E4EEF9] bg-[#F7FBFF] p-8 text-center">
                <EquipmentIcon name="grid" className="mx-auto size-12 text-primary" />
                <p className="mt-3 font-bold text-primary">لا توجد معدات تطابق اختياراتك.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {data.map((equipment) => <EquipmentCard key={equipment.id} equipment={equipment} />)}
        </div>
    );
}

function MedicalEquipmentPage() {
    const dispatch = useAppDispatch();
    const { filters, pagination, isLoading, data } = useAppSelector((state) => state.equipment);
    const [searchValue, setSearchValue] = useState(filters.search);
    const debouncedSearch = useDebouncedValue(searchValue);
    const direction = getPageDirection();

    useEffect(() => {
        if (debouncedSearch !== filters.search) dispatch(setSearch(debouncedSearch));
    }, [debouncedSearch, dispatch, filters.search]);

    useEffect(() => {
        dispatch(fetchEquipment());
    }, [dispatch, filters.category, filters.limit, filters.maxPrice, filters.minPrice, filters.page, filters.search]);

    return (
        <main dir={direction} className="overflow-x-hidden py-4 text-primary sm:py-6 lg:py-8">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                <section className="relative overflow-hidden rounded-3xl border border-[#E4EEF9] bg-[linear-gradient(135deg,#F8FBFF_0%,#EAF4FF_100%)]" aria-labelledby="equipment-page-title">
                    <div className="relative flex flex-col items-center gap-2 px-5 pb-4 pt-7 sm:px-8 sm:pt-9 md:flex-row md:gap-8 md:px-10 md:py-8">

                        <div className="min-w-0 flex-1 text-start">
                            <h1 id="equipment-page-title" className="mt-2 max-w-lg text-3xl font-extrabold leading-tight text-primary sm:text-4xl lg:text-5xl">
                                وجهتك الموثوقة لتأجير المعدات <span className="text-secondary">الطبية</span>
                            </h1>

                            <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-primary sm:text-base lg:text-lg">
                                كل أنواع المعدات الطبية اللي هتساعدك تهتم براحتك ورعاية اللي بتحبهم من البيت.
                            </p>
                        </div>

                        <img src="/src/assets/Thermometer-amico.png" alt="معدات طبية" className="w-full max-w-64 shrink-0 object-contain sm:max-w-76 md:max-w-90" />
                    </div>
                </section>

                <div role="search" aria-label="البحث في المعدات" className="relative">
                    <svg aria-hidden="true" className="absolute top-1/2 right-2 size-6 shrink-0 text-body-text" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="6.5" />
                        <path d="m16 16 4 4" />
                    </svg>

                    <BaseInput type="search" value={searchValue} onChange={(event) => setSearchValue(event.target.value)} placeholder="ابحث عن أي معدات..." className="mt-6 pr-10" />
                </div>

                <div className="mt-6 lg:hidden"><EquipmentFilters compact /></div>

                <section className="mt-7 grid gap-6 lg:grid-cols-[14.5rem_minmax(0,1fr)] lg:items-start lg:gap-8" aria-labelledby="equipment-list-title">
                    <aside className="hidden lg:block"><EquipmentFilters /></aside>

                    <div className="min-w-0">
                        <div className="mb-4 text-start">
                            <h2 id="equipment-list-title" className="text-lg font-extrabold text-primary sm:text-xl">
                                معدات للإيجار
                            </h2>

                            <p className="mt-1 text-sm font-medium text-body-text">
                                عرض <bdi>{data.length}</bdi> معدات من أصل <bdi>{pagination.totalItems}</bdi>
                            </p>
                        </div>

                        {isLoading && data.length === 0 ? (
                            <div className="rounded-2xl bg-primary/10 p-8 text-center font-bold text-primary border border-primary/20 flex justify-center items-center gap-2">
                                جارِ تحميل المعدات
                                <svg className="animate-spin size-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        ) : <EquipmentState />}
                    </div>
                </section>

                <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    hasNextPage={pagination.hasNextPage}
                    hasPreviousPage={pagination.hasPreviousPage}
                    onPageChange={(page) => dispatch(setPage(page))}
                />
            </div>
        </main>
    );
}

export default MedicalEquipmentPage;
