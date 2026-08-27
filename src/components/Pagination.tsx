type PaginationProps = {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onPageChange: (page: number) => void;
};

function Pagination({ currentPage, totalPages, hasNextPage, hasPreviousPage, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <nav className="mt-4 flex w-full items-center justify-center sm:mt-6 lg:mt-8" aria-label="صفحات المعدات">
            <div className="flex gap-2">
                <button type="button" tabIndex={0} className="pagination-btns disabled:cursor-not-allowed disabled:opacity-50" onClick={() => onPageChange(currentPage - 1)} disabled={!hasPreviousPage} aria-label="الصفحة السابقة">
                    <img src="/src/assets/icons/less-than.svg" alt="" className="size-4" />
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;
                    const isSelected = currentPage === page;

                    return (
                        <button key={page} type="button" tabIndex={0} className={`pagination-btns ${isSelected ? "selected border-secondary! bg-secondary text-white" : ""}`} onClick={() => onPageChange(page)} aria-current={isSelected ? "page" : undefined} aria-label={`الصفحة ${page}`}>
                            {page}
                        </button>
                    );
                })}

                <button type="button" tabIndex={0} className="pagination-btns disabled:cursor-not-allowed disabled:opacity-50" onClick={() => onPageChange(currentPage + 1)} disabled={!hasNextPage} aria-label="الصفحة التالية">
                    <img src="/src/assets/icons/greater-than.svg" alt="" className="size-4" />
                </button>
            </div>
        </nav>
    );
}

export default Pagination;
