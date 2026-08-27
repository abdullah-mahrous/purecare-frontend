import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setCategory, setPriceRange } from "@/features/equipmentSlice";
import { equipmentCategories } from "@/services/equipment.service";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

import { Slider } from "@/components/ui/slider";
import EquipmentIcon from "@/components/equipment/EquipmentIcon";

function EquipmentFilters({ compact = false }: { compact?: boolean }) {
    const dispatch = useAppDispatch();
    const { category, minPrice, maxPrice } = useAppSelector((state) => state.equipment.filters);
    const [price, setPrice] = useState<[number, number]>([minPrice, maxPrice]);
    const debouncedPrice = useDebouncedValue(price);

    useEffect(() => {
        if (debouncedPrice[0] !== minPrice || debouncedPrice[1] !== maxPrice) {
            dispatch(setPriceRange(debouncedPrice));
        }
    }, [debouncedPrice, dispatch, maxPrice, minPrice]);

    return (
        <section className={compact ? "" : "rounded-2xl border border-[#E4EEF9] bg-white p-4 shadow-[0_8px_22px_rgba(11,74,133,0.05)]"}>
            <h2 className="text-base font-extrabold text-primary">التصنيفات</h2>

            <div className={compact ? "mt-3 flex gap-3 overflow-x-auto pb-2" : "mt-3 space-y-1"}>
                {equipmentCategories.map((item) => {
                    const isSelected = category === (item.id === "all" ? null : item.id);
                    const categoryId = item.id === "all" ? null : item.id;

                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => dispatch(setCategory(categoryId))}
                            className={`flex cursor-pointer shrink-0 items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm font-bold transition-all duration-300 ${isSelected ? "selected border-secondary/50 bg-secondary/10 text-secondary" : "border-[#DCE5F0] text-primary hover:border-secondary/50 hover:bg-secondary/10 hover:text-secondary"} ${compact ? "min-w-29 flex-col justify-center py-3 text-center" : "w-full"}`}
                            aria-pressed={isSelected}
                        >
                            <EquipmentIcon name={item.icon} className="size-6 shrink-0" />
                            <span className={compact ? "leading-snug" : "text-start"}>{item.label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 w-full max-w-md">
                <h2 className="mb-4 text-base font-extrabold text-primary">سعر الإيجار في اليوم</h2>
                <Slider
                    value={price}
                    onValueChange={(values) => setPrice([values[0], values[1]])}
                    min={0}
                    max={1000}
                    step={10}
                    aria-label="نطاق سعر الإيجار اليومي"
                />
                <div className="mt-2 flex justify-between">
                    <span><bdi>{price[1]}</bdi> EGP</span>
                    <span><bdi>{price[0]}</bdi> EGP</span>
                </div>
            </div>
        </section>
    );
}

export default EquipmentFilters;