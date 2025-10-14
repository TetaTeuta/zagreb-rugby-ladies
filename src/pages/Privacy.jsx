import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AnimatedSection } from "../components/ui/AnimatedSection";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Privacy = () => {
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
                        {t("privacy.hero.title")}
                    </h1>
                    <p className="text-lg text-text-light/80">
                        {t("privacy.hero.subtitle")}
                    </p>
                    <p className="text-sm text-text-light/60 mt-4">
                        {t("privacy.hero.lastUpdated")}:{" "}
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
                            {t("privacy.introduction")}
                        </p>
                    </section>

                    {/* Data Collection */}
                    <section className="bg-surface rounded-custom p-6 border border-border">
                        <h2 className="text-2xl font-light text-primary mb-4 tracking-wide">
                            {t("privacy.dataCollection.title")}
                        </h2>
                        <p className="text-muted mb-4">
                            {t("privacy.dataCollection.description")}
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted">
                            <li>{t("privacy.dataCollection.items.name")}</li>
                            <li>{t("privacy.dataCollection.items.email")}</li>
                            <li>{t("privacy.dataCollection.items.phone")}</li>
                            <li>{t("privacy.dataCollection.items.message")}</li>
                        </ul>
                    </section>

                    {/* How We Use Data */}
                    <section className="bg-surface rounded-custom p-6 border border-border">
                        <h2 className="text-2xl font-light text-primary mb-4 tracking-wide">
                            {t("privacy.dataUse.title")}
                        </h2>
                        <p className="text-muted mb-4">
                            {t("privacy.dataUse.description")}
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted">
                            <li>{t("privacy.dataUse.items.respond")}</li>
                            <li>{t("privacy.dataUse.items.communicate")}</li>
                            <li>{t("privacy.dataUse.items.improve")}</li>
                        </ul>
                    </section>

                    {/* Data Storage */}
                    <section className="bg-surface rounded-custom p-6 border border-border">
                        <h2 className="text-2xl font-light text-primary mb-4 tracking-wide">
                            {t("privacy.dataStorage.title")}
                        </h2>
                        <p className="text-muted">
                            {t("privacy.dataStorage.description")}
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section className="bg-surface rounded-custom p-6 border border-border">
                        <h2 className="text-2xl font-light text-primary mb-4 tracking-wide">
                            {t("privacy.rights.title")}
                        </h2>
                        <p className="text-muted mb-4">
                            {t("privacy.rights.description")}
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted">
                            <li>{t("privacy.rights.items.access")}</li>
                            <li>{t("privacy.rights.items.rectification")}</li>
                            <li>{t("privacy.rights.items.erasure")}</li>
                            <li>{t("privacy.rights.items.objection")}</li>
                            <li>{t("privacy.rights.items.portability")}</li>
                        </ul>
                    </section>

                    {/* Cookies */}
                    <section className="bg-surface rounded-custom p-6 border border-border">
                        <h2 className="text-2xl font-light text-primary mb-4 tracking-wide">
                            {t("privacy.cookies.title")}
                        </h2>
                        <p className="text-muted">
                            {t("privacy.cookies.description")}
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="bg-primary/5 rounded-custom p-6 border border-primary/20">
                        <h2 className="text-2xl font-light text-primary mb-4 tracking-wide">
                            {t("privacy.contact.title")}
                        </h2>
                        <p className="text-muted mb-4">
                            {t("privacy.contact.description")}
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
                            ← {t("privacy.backToHome")}
                        </Link>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
};

export default Privacy;
