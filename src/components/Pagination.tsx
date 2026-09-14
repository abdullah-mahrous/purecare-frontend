type PaginationProps = {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onPageChange: (page: number) => void;
};

import { useTranslation as useI18nTranslation } from "react-i18next";

function Pagination({ currentPage, totalPages, hasNextPage, hasPreviousPage, onPageChange }: PaginationProps) {
    const { t, i18n } = useI18nTranslation();
    if (totalPages <= 0)
        return null;

    const isRtl = i18n.language !== "en";

    return (
        <nav className="mt-4 flex w-full items-center justify-center sm:mt-6 lg:mt-8" aria-label={t("equipment.list")} dir={isRtl ? "rtl" : "ltr"}>
            <div className="flex gap-2">
                <button type="button" tabIndex={0} className="pagination-btns disabled:cursor-not-allowed disabled:opacity-50" onClick={() => onPageChange(currentPage - 1)} disabled={!hasPreviousPage} aria-label={t("common.previous")}>
                    <img src={isRtl ? "/src/assets/icons/less-than.svg" : "/src/assets/icons/greater-than.svg"} alt="" className="size-4" />
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;
                    const isSelected = currentPage === page;

                    return (
                        <button key={page} type="button" tabIndex={0} className={`pagination-btns ${isSelected ? "selected border-secondary! bg-secondary text-white" : ""}`} onClick={() => onPageChange(page)} aria-current={isSelected ? "page" : undefined} aria-label={`${t("common.page")} ${page}`}>
                            {page}
                        </button>
                    );
                })}

                <button type="button" tabIndex={0} className="pagination-btns disabled:cursor-not-allowed disabled:opacity-50" onClick={() => onPageChange(currentPage + 1)} disabled={!hasNextPage} aria-label={t("common.next")}>
                    <img src={isRtl ? "/src/assets/icons/greater-than.svg" : "/src/assets/icons/less-than.svg"} alt="" className="size-4" />
                </button>
            </div>
        </nav>
    );
}

export default Pagination;
