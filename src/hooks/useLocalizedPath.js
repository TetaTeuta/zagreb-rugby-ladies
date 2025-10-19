import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

/**
 * Custom hook to generate localized paths based on current language
 * @returns {Function} A function that takes a path and returns the localized version
 */
export const useLocalizedPath = () => {
    const { i18n } = useTranslation();
    const location = useLocation();

    // Determine current language from URL or i18n
    const currentLanguage = location.pathname.startsWith("/hr")
        ? "hr"
        : i18n.language;

    /**
     * Converts a base path to a localized path
     * @param {string} path - Base path (e.g., "/team", "/about")
     * @returns {string} Localized path (e.g., "/hr/team" if Croatian)
     */
    const getLocalizedPath = (path) => {
        if (currentLanguage === "hr") {
            // Add /hr prefix for Croatian
            return path === "/" ? "/hr" : `/hr${path}`;
        }
        // Return base path for English
        return path;
    };

    return getLocalizedPath;
};
