import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AnimatedSection } from "../components/ui/AnimatedSection";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Terms = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-surface-elevated">
            {/* Hero Section */}
            <div className="bg-primary py-16 sm:py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-text-light mb-4 tracking-wide font-hero leading-[0.85]">
                        {t("terms.hero.title")}
                    </h1>
                    <p className="text-lg text-text-light/80">
                        {t("terms.hero.subtitle")}
                    </p>
                    <p className="text-sm text-text-light/60 mt-4">
                        {t("terms.hero.lastUpdated")}:{" "}
                        {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
                <AnimatedSection className="space-y-8">
                    {/* Introduction */}
                    <section className="prose prose-lg max-w-none">
                        <p className="text-lg text-muted leading-relaxed">
                            {t("terms.introduction")}
                        </p>
                    </section>

                    {/* Copyright */}
                    <section className="bg-surface rounded-custom p-6 border border-border">
                        <h2 className="text-2xl font-light text-primary mb-4 tracking-wide">
                            {t("terms.copyright.title")}
                        </h2>
                        <p className="text-muted mb-4">
                            {t("terms.copyright.description")}
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted">
                            <li>{t("terms.copyright.items.photos")}</li>
                            <li>{t("terms.copyright.items.design")}</li>
                            <li>{t("terms.copyright.items.text")}</li>
                            <li>{t("terms.copyright.items.logos")}</li>
                        </ul>
                    </section>

                    {/* Acceptable Use */}
                    <section className="bg-surface rounded-custom p-6 border border-border">
                        <h2 className="text-2xl font-light text-primary mb-4 tracking-wide">
                            {t("terms.acceptableUse.title")}
                        </h2>
                        <p className="text-muted mb-4">
                            {t("terms.acceptableUse.description")}
                        </p>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-text mb-2">
                                    {t("terms.acceptableUse.permitted.title")}
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-muted">
                                    <li>
                                        {t(
                                            "terms.acceptableUse.permitted.items.view"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "terms.acceptableUse.permitted.items.share"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "terms.acceptableUse.permitted.items.contact"
                                        )}
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-text mb-2">
                                    {t("terms.acceptableUse.prohibited.title")}
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-muted">
                                    <li>
                                        {t(
                                            "terms.acceptableUse.prohibited.items.copy"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "terms.acceptableUse.prohibited.items.modify"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "terms.acceptableUse.prohibited.items.commercial"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "terms.acceptableUse.prohibited.items.scrape"
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Photos and Images */}
                    <section className="bg-surface rounded-custom p-6 border border-border">
                        <h2 className="text-2xl font-light text-primary mb-4 tracking-wide">
                            {t("terms.photos.title")}
                        </h2>
                        <p className="text-muted">
                            {t("terms.photos.description")}
                        </p>
                    </section>

                    {/* Disclaimer */}
                    <section className="bg-surface rounded-custom p-6 border border-border">
                        <h2 className="text-2xl font-light text-primary mb-4 tracking-wide">
                            {t("terms.disclaimer.title")}
                        </h2>
                        <p className="text-muted">
                            {t("terms.disclaimer.description")}
                        </p>
                    </section>

                    {/* Changes to Terms */}
                    <section className="bg-surface rounded-custom p-6 border border-border">
                        <h2 className="text-2xl font-light text-primary mb-4 tracking-wide">
                            {t("terms.changes.title")}
                        </h2>
                        <p className="text-muted">
                            {t("terms.changes.description")}
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="bg-primary/5 rounded-custom p-6 border border-primary/20">
                        <h2 className="text-2xl font-light text-primary mb-4 tracking-wide">
                            {t("terms.contact.title")}
                        </h2>
                        <p className="text-muted mb-4">
                            {t("terms.contact.description")}
                        </p>
                        <div className="flex items-center gap-2 text-primary">
                            <Mail className="h-5 w-5" />
                            <a
                                href="mailto:team@zagreb-rugby-ladies.hr"
                                className="hover:underline"
                            >
                                team@zagreb-rugby-ladies.hr
                            </a>
                        </div>
                    </section>

                    {/* Back to Home */}
                    <div className="text-center pt-8">
                        <Link
                            to="/"
                            className="text-primary hover:text-primary-dark transition-colors"
                        >
                            ← {t("terms.backToHome")}
                        </Link>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
};

export default Terms;
