import { useTranslation } from "react-i18next";

const LangToggler = () => {
    const { i18n, t } = useTranslation();
    const selectedLang = i18n.language === "en" ? "en" : "ar";

    return (
        <div
            className="grid w-full grid-cols-2 gap-1 rounded-xl bg-white p-1 shadow-[inset_0_1px_4px_rgba(11,74,133,0.12)]"
            dir="ltr"
        >
            <button
                type="button"
                className={`cursor-pointer rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${selectedLang === "en"
                    ? "bg-primary text-white shadow-[0_8px_18px_rgba(11,74,133,0.24)]"
                    : "bg-white text-primary"
                    }`}
                onClick={() => void i18n.changeLanguage("en")}
            >
                {t("language", { lng: "en" })}
            </button>

            <button
                type="button"
                className={`cursor-pointer rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${selectedLang === "ar"
                    ? "bg-primary text-white shadow-[0_8px_18px_rgba(11,74,133,0.24)]"
                    : "bg-white text-primary"
                    }`}
                onClick={() => void i18n.changeLanguage("ar")}
            >
                {t("language", { lng: "ar" })}
            </button>
        </div>
    );
};

export default LangToggler;
