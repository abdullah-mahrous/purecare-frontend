import type { ComponentPropsWithoutRef, HTMLInputTypeAttribute } from "react";

type BaseInputProps = Omit<
    ComponentPropsWithoutRef<"input">,
    "type" | "placeholder" | "value"
> & {
    type: HTMLInputTypeAttribute;
    placeholder: string;
    value: string;
};

function BaseInput({ type, placeholder, value, className = "", ...props }: BaseInputProps) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            className={`h-14 w-full rounded-xl border border-[#DCE5F0] bg-white px-4 text-base font-medium text-heading-text outline-none placeholder:text-[#8391AA] ${className}`}
            {...props}
        />
    );
}

export default BaseInput;
