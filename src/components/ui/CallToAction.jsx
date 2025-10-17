import { Button } from "./Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const CallToAction = ({
    image,
    titleKey,
    descriptionKey,
    primaryButton,
    secondaryButton,
}) => {
    const { t } = useTranslation();

    const renderButton = (button, variant) => {
        if (button.href) {
            return (
                <Button
                    size="lg"
                    variant={variant}
                    asChild
                    className="w-full sm:w-auto"
                >
                    <a href={button.href}>{t(button.textKey)}</a>
                </Button>
            );
        }
        return (
            <Button
                size="lg"
                variant={variant}
                asChild
                className="w-full sm:w-auto"
            >
                <Link to={button.to}>{t(button.textKey)}</Link>
            </Button>
        );
    };

    return (
        <div className="relative h-[700px] sm:h-[700px] overflow-hidden rounded-custom group cursor-pointer">
            <img
                src={image}
                alt={t(titleKey)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-text-contrast/70 via-text-contrast/30 to-transparent"></div>
            <div className="absolute inset-0 flex items-center">
                <div className="max-w-2xl mx-6 sm:ml-12 text-text-light">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-light mb-4 sm:mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                        {t(titleKey)}
                    </h2>
                    <p className="text-base sm:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed">
                        {t(descriptionKey)}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md sm:max-w-none">
                        {renderButton(primaryButton, "blue")}
                        {renderButton(secondaryButton, "yellow")}
                    </div>
                </div>
            </div>
        </div>
    );
};
