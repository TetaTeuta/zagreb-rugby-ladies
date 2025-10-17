import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, Phone, Facebook } from "lucide-react";
import { useTranslation } from "react-i18next";
import trainingData from "../../data/training.json";
import {
    contactConfig,
    getEmailLink,
    getPhoneLink,
} from "../../config/contact";
import { cdn } from "../../lib/cdn";

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const legalLinks = [
        { name: t("footer.privacyPolicy"), href: "/privacy" },
        { name: t("footer.termsOfSale"), href: "/terms" },
    ];

    return (
        <footer className="bg-primary border-t border-text-light/10 mt-auto">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Contact Info - Left Side */}
                    <div>
                        <h3 className="text-sm text-text-light/80 font-light font-hero uppercase tracking-wider mb-6 leading-[0.85]">
                            {t("footer.getInTouch")}
                        </h3>
                        <div className="space-y-3 mb-6">
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-4 w-4 text-text-light/60 mt-1 flex-shrink-0" />
                                <div className="text-sm text-text-light/80">
                                    <p className="text-text-light/80">
                                        {trainingData.location.name}
                                    </p>
                                    <p className="text-text-light/80">
                                        {trainingData.location.address}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-4 w-4 text-text-light/60 flex-shrink-0" />
                                <a
                                    href={getEmailLink()}
                                    className="text-sm text-text-light/80 hover:text-text-light transition-colors"
                                >
                                    {contactConfig.email}
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-4 w-4 text-text-light/60 flex-shrink-0" />
                                <a
                                    href={getPhoneLink()}
                                    className="text-sm text-text-light/80 hover:text-text-light transition-colors"
                                >
                                    {contactConfig.phone}
                                </a>
                            </div>
                        </div>
                        {/* Social Media Icons */}
                        <div className="flex space-x-3 text-text-light/80">
                            <a
                                href="https://www.instagram.com/zagreb_rugby_ladies/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-surface/10 hover:bg-primary hover:text-text-light transition-colors"
                                aria-label={t("footer.ariaLabels.instagram")}
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=100063465023928"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-surface/10 hover:bg-primary hover:text-text-light transition-colors"
                                aria-label={t("footer.ariaLabels.facebook")}
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href={getEmailLink()}
                                className="p-2 rounded-lg bg-surface/10 hover:bg-primary hover:text-text-light transition-colors"
                                aria-label={t("footer.ariaLabels.email")}
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Brand & Description - Right Side */}
                    <div>
                        <Link
                            to="/"
                            className="flex items-center space-x-2 mb-6"
                        >
                            <img
                                src={cdn(
                                    "logos/zagreb-rugby-ladies-logo-vector.png"
                                )}
                                alt={t("footer.logoAlt")}
                                className="h-20 w-20 object-contain"
                            />
                            <span className="text-lg text-text-light/80 font-semibold">
                                {t("footer.teamName")}
                            </span>
                        </Link>
                        <p className="text-sm text-text-light/80 leading-relaxed">
                            {t("footer.description")}
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-text-light/10">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div className="text-sm text-text-light/60">
                            {t("footer.copyright", { year: currentYear })}
                        </div>
                        <div className="flex space-x-6">
                            {legalLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-sm text-text-light/60 hover:text-text-light transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export { Footer };
