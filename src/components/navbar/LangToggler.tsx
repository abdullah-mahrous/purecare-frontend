import { useState } from "react";

const LangToggler = () => {
    const [selectedLang, setSelectedLang] = useState<"en" | "ar">("ar");

    return (
        <div
            className="grid w-full grid-cols-2 gap-1 rounded-xl bg-white p-1 shadow-[inset_0_1px_4px_rgba(11,74,133,0.12)]"
            dir="ltr"
        >
            <button
                type="button"
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    selectedLang === "en"
                        ? "bg-primary text-white shadow-[0_8px_18px_rgba(11,74,133,0.24)]"
                        : "bg-white text-primary"
                }`}
                onClick={() => setSelectedLang("en")}
            >
                English
            </button>

            <button
                type="button"
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    selectedLang === "ar"
                        ? "bg-primary text-white shadow-[0_8px_18px_rgba(11,74,133,0.24)]"
                        : "bg-white text-primary"
                }`}
                onClick={() => setSelectedLang("ar")}
            >
                العربية
            </button>
        </div>
    );
};

export default LangToggler;
