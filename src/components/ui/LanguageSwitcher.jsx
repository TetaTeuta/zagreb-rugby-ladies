import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = ({ className = "", variant = "default" }) => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        {
            code: "en",
            name: "English",
            countryCode: "gb",
            flagUrl: "https://flagcdn.com/w40/gb.png",
        },
        {
            code: "hr",
            name: "Croatian",
            countryCode: "hr",
            flagUrl: "https://flagcdn.com/w40/hr.png",
        },
    ];

    const currentLanguage =
        languages.find((lang) => lang.code === i18n.language) || languages[0];

    const handleLanguageChange = (languageCode) => {
        i18n.changeLanguage(languageCode);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    const getTriggerClasses = () => {
        const base =
            "inline-flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

        const variantStyles = {
            default: "hover:bg-primary/10 active:bg-primary/20 active:scale-95",
            header: "hover:bg-text-light/10 active:bg-text-light/20 active:scale-95",
            mobile: "hover:bg-primary/10 active:bg-primary/20 active:scale-95",
        };

        return `${base} ${variantStyles[variant] || variantStyles.default}`;
    };

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${getTriggerClasses()} ${className}`}
                aria-label={`Change language - Current: ${currentLanguage.name}`}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <img
                    src={currentLanguage.flagUrl}
                    alt={`${currentLanguage.name} flag`}
                    className="w-9 h-auto"
                    loading="lazy"
                />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 py-1 min-w-[10rem] bg-surface border border-border rounded-lg shadow-medium overflow-hidden z-50 animate-fade-in">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            onClick={() => handleLanguageChange(language.code)}
                            className={`w-full px-4 py-2.5 transition-colors duration-normal flex items-center gap-3 text-left ${
                                language.code === i18n.language
                                    ? "bg-primary/10"
                                    : "hover:bg-primary/5 active:bg-primary/10"
                            }`}
                            aria-label={`Switch to ${language.name}`}
                            aria-current={
                                language.code === i18n.language
                                    ? "true"
                                    : undefined
                            }
                        >
                            <img
                                src={language.flagUrl}
                                alt={`${language.name} flag`}
                                className="w-9 h-auto flex-shrink-0"
                                loading="lazy"
                            />
                            <span className="text-sm font-body font-medium text-text-contrast flex-1">
                                {language.name}
                            </span>
                            {language.code === i18n.language && (
                                <span
                                    className="w-2 h-2 bg-primary rounded-full flex-shrink-0"
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export { LanguageSwitcher };
