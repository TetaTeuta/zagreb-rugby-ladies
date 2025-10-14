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
                <Button size="lg" variant={variant} asChild>
                    <a href={button.href}>{t(button.textKey)}</a>
                </Button>
            );
        }
        return (
            <Button size="lg" variant={variant} asChild>
                <Link to={button.to}>{t(button.textKey)}</Link>
            </Button>
        );
    };

    return (
        <div className="relative h-[700px] overflow-hidden rounded-custom group cursor-pointer">
            <img
                src={image}
                alt={t(titleKey)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-text-contrast/70 via-text-contrast/30 to-transparent"></div>
            <div className="absolute inset-0 flex items-center">
                <div className="max-w-2xl ml-12 text-text-light">
                    <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                        {t(titleKey)}
                    </h2>
                    <p className="text-xl mb-8 opacity-90 leading-relaxed">
                        {t(descriptionKey)}
                    </p>
                    <div className="flex gap-4">
                        {renderButton(primaryButton, "blue")}
                        {renderButton(secondaryButton, "yellow")}
                    </div>
                </div>
            </div>
        </div>
    );
};
