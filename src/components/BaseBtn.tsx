import type { ComponentPropsWithoutRef } from "react";

type BaseBtnProps = ComponentPropsWithoutRef<"button">

const BaseBtn = ({ children, className = "", ...props }: BaseBtnProps) => {
    return (
        <button
            className={`inline-flex min-h-10 items-center justify-center rounded-full px-5 text-sm font-bold shadow-[0_10px_22px_rgba(11,74,133,0.16)] transition duration-200 ease-in-out active:scale-[0.98] cursor-pointer ${className}`} 
            {...props}
        >
            {children}
        </button>
    );
};

export default BaseBtn;
