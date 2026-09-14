import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useEffect, useState } from "react";

import ar from "./ar.json";
import en from "./en.json";

export const LANGUAGE_STORAGE_KEY = "purecare-language";
export type Language = "ar" | "en";

const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
const deviceLanguage = typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("en") ? "en" : "ar";
const initialLanguage: Language = savedLanguage === "en" || savedLanguage === "ar" ? savedLanguage : deviceLanguage;

export const applyLanguageDirection = (language: Language) => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
};

export const isEnglish = (language = i18n.resolvedLanguage ?? i18n.language) => language.toLowerCase().startsWith("en");

const toLanguage = (language: string): Language => isEnglish(language) ? "en" : "ar";

/** Reactively exposes the active locale for API-backed text and non-i18next props. */
export const useCurrentLanguage = (): Language => {
    const [language, setLanguage] = useState<Language>(() => toLanguage(i18n.resolvedLanguage ?? i18n.language));

    useEffect(() => {
        const updateLanguage = (nextLanguage: string) => setLanguage(toLanguage(nextLanguage));
        i18n.on("languageChanged", updateLanguage);
        return () => {
            i18n.off("languageChanged", updateLanguage);
        };
    }, []);

    return language;
};

/** Returns the selected language field from an API object, with a safe fallback. */
export const localized = <T extends object>(value: T, key: string, language?: string): string => {
    const suffix = isEnglish(language) ? "En" : "Ar";
    return String(value[`${key}${suffix}` as keyof T] ?? value[key as keyof T] ?? "");
};

void i18n
    .use(initReactI18next)
    .init({
        resources: { ar: { translation: ar }, en: { translation: en } },
        lng: initialLanguage,
        fallbackLng: "ar",
        supportedLngs: ["ar", "en"],
        interpolation: { escapeValue: false },
    });

applyLanguageDirection(initialLanguage);

i18n.on("languageChanged", (language) => {
    const nextLanguage: Language = language === "en" ? "en" : "ar";
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    applyLanguageDirection(nextLanguage);
});

export default i18n;
