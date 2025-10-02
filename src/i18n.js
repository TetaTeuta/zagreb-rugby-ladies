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

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,

        // Default language
        lng: "en",

        // Fallback language
        fallbackLng: "en",

        // Language detection options
        detection: {
            // Order of language detection methods
            order: ["localStorage", "navigator", "htmlTag"],

            // Cache user language
            caches: ["localStorage"],

            // localStorage key
            lookupLocalStorage: "i18nextLng",

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
