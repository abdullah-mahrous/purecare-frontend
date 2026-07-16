import type { ReactNode } from "react";

type BaseBtnProps = {
    children: ReactNode;
    className?: string;
};

const BaseBtn = ({ children, className = "" }: BaseBtnProps) => {
    return (
        <button
            type="button"
            className={`inline-flex min-h-10 items-center justify-center rounded-full px-5 text-sm font-bold shadow-[0_10px_22px_rgba(11,74,133,0.16)] transition-transform duration-200 active:scale-[0.98] ${className}`}
        >
            {children}
        </button>
    );
};

export default BaseBtn;
