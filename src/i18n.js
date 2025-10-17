import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enTranslation from "./locales/en/translation.json";
import hrTranslation from "./locales/hr/translation.json";

const resources = {
    en: {
        translation: enTranslation,
    },
    hr: {
        translation: hrTranslation,
    },
};

// Custom sessionStorage detector for i18next
const sessionStorageDetector = {
    name: "sessionStorage",
    lookup() {
        if (typeof window !== "undefined") {
            return window.sessionStorage.getItem("i18nextLng") || undefined;
        }
        return undefined;
    },
    cacheUserLanguage(lng) {
        if (typeof window !== "undefined") {
            window.sessionStorage.setItem("i18nextLng", lng);
        }
    },
};

// Initialize LanguageDetector with custom detector
const languageDetector = new LanguageDetector();
languageDetector.addDetector(sessionStorageDetector);

// Clean up old localStorage if it exists (migration from localStorage to sessionStorage)
if (typeof window !== "undefined") {
    const oldLng = window.localStorage.getItem("i18nextLng");
    if (oldLng && !window.sessionStorage.getItem("i18nextLng")) {
        window.sessionStorage.setItem("i18nextLng", oldLng);
    }
    window.localStorage.removeItem("i18nextLng");
}

i18n.use(languageDetector)
    .use(initReactI18next)
    .init({
        resources,

        // Fallback language (used when no language is detected)
        fallbackLng: "en",

        // Language detection options
        detection: {
            // Order of language detection methods
            order: ["sessionStorage", "navigator", "htmlTag"],

            // Cache user language
            caches: ["sessionStorage"],

            // Don't lookup from subdomain
            lookupFromSubdomainIndex: 0,

            // Don't lookup from path
            lookupFromPathIndex: 0,

            // Check all fallback languages
            checkWhitelist: true,
        },

        interpolation: {
            // React already does escaping
            escapeValue: false,
        },

        // Debug mode (set to false in production)
        debug: false,

        // Key separator
        keySeparator: ".",

        // Namespace separator
        nsSeparator: ":",

        // React options
        react: {
            // Wait for translation to be loaded before rendering
            useSuspense: false,
        },
    });

export default i18n;
