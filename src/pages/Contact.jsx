import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { Input, Textarea, Label, Select } from "../components/ui/Input";
import { Toast } from "../components/ui/Toast";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import trainingData from "../data/training.json";
import { AnimatedSection } from "../components/ui/AnimatedSection";
import { CallToAction } from "../components/ui/CallToAction";
import { Link } from "react-router-dom";
import { SEO } from "../components/ui/SEO";

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(""); // for aria-live
    const { t } = useTranslation();
    const formRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState("success");
    const [toastMessage, setToastMessage] = useState("");

    // Basin endpoint with env override support
    const BASIN_ENDPOINT =
        import.meta.env.VITE_BASIN_ENDPOINT ||
        "https://usebasin.com/f/f286bdaf593f";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formRef.current) return;

        setIsSubmitting(true);
        setSubmitStatus(t("contact.form.sendingStatus"));

        try {
            const formData = new FormData(formRef.current);
            const urlEncodedData = new URLSearchParams();

            // Convert FormData to URLSearchParams for application/x-www-form-urlencoded
            for (const [key, value] of formData.entries()) {
                urlEncodedData.append(key, value);
            }

            const response = await fetch(BASIN_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: urlEncodedData.toString(),
            });

            if (response.ok) {
                setToastType("success");
                setToastMessage(t("contact.form.successMessage"));
                setShowToast(true);
                setSubmitStatus(t("contact.form.successStatus"));
                formRef.current.reset();
            } else {
                throw new Error("Submission failed");
            }
        } catch {
            setToastType("error");
            setToastMessage(t("contact.form.errorMessage"));
            setShowToast(true);
            setSubmitStatus(t("contact.form.errorStatus"));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToastClose = () => {
        setShowToast(false);
    };

    // SEO Configuration
    const pageTitle = "Contact Zagreb Rugby Ladies | Join Our Team";
    const pageDescription =
        "Contact Zagreb Rugby Ladies to join our training sessions. Get training schedule, location details, and reach out with questions. All experience levels welcome in Zagreb, Croatia.";
    const keywords =
        "contact Zagreb Rugby Ladies, join rugby training Zagreb, rugby training schedule Zagreb, rugby team contact Croatia, women's rugby contact, rugby location Zagreb, join women's rugby Croatia";

    // Contact Page Structured Data
    const contactStructuredData = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        mainEntity: {
            "@type": "SportsOrganization",
            name: "Zagreb Rugby Ladies",
            email: trainingData.contact.email,
            telephone: trainingData.contact.phone,
            address: {
                "@type": "PostalAddress",
                streetAddress: trainingData.location.address,
                addressLocality: "Zagreb",
                addressCountry: "HR",
            },
        },
    };

    return (
        <div className="min-h-screen bg-surface">
            <SEO
                title={pageTitle}
                description={pageDescription}
                keywords={keywords}
                canonicalUrl="/contact"
                structuredData={contactStructuredData}
            />

            {/* Hero Section */}
            <div className="relative h-[50svh] overflow-hidden mt-20">
                <div className="absolute inset-0 flex items-center justify-center bg-text-contrast">
                    <img
                        src="src/assets/images/hero/zagreb-rugby-ladies-team.jpg"
                        alt="Zagreb Rugby Ladies team huddle celebrating - Contact us to join"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: "50% 35%" }}
                    />
                    <div className="absolute inset-0 overlay-cinematic-base opacity-[0.8]"></div>
                    <div className="absolute inset-0 overlay-cinematic-sunset"></div>
                    <div className="absolute inset-0 overlay-cinematic-matte"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center max-w-4xl mx-auto px-6 sm:px-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                            {t("contact.hero.title")}
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-none mx-auto">
                            <Button
                                size="lg"
                                variant="blue"
                                asChild
                                className="w-full sm:w-auto"
                            >
                                <Link to="/rugby101">
                                    {t("contact.hero.learnRugby")}
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="yellow"
                                asChild
                                className="w-full sm:w-auto"
                            >
                                <Link to="/team">
                                    {t("contact.hero.meetTeam")}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-16 max-w-7xl mx-auto">
                {/* Intro Section */}

                {/* Contact Form and Info Grid */}
                <AnimatedSection>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Contact Form */}
                        <div className="bg-surface rounded-custom p-8 border border-muted-light hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="mb-6">
                                <Send className="h-10 w-10 text-primary m-6" />
                                <h3 className="text-2xl font-light mb-2 tracking-wide font-hero text-primary text-text-contrast leading-[0.85]">
                                    {t("contact.form.title")}
                                </h3>
                                <p className="text-muted text-sm">
                                    {t("contact.form.subtitle")}
                                </p>
                            </div>

                            {/* Screen reader status announcements */}
                            <div
                                role="status"
                                aria-live="polite"
                                aria-atomic="true"
                                className="sr-only"
                            >
                                {submitStatus}
                            </div>

                            <form
                                ref={formRef}
                                action={BASIN_ENDPOINT}
                                method="POST"
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                {/* Honeypot field for spam prevention */}
                                <input
                                    type="text"
                                    name="bot-field"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    style={{
                                        position: "absolute",
                                        left: "-9999px",
                                        width: "1px",
                                        height: "1px",
                                        opacity: 0,
                                        pointerEvents: "none",
                                    }}
                                    aria-hidden="true"
                                />

                                {/* Name */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="name"
                                        className="text-text-contrast"
                                    >
                                        {t("contact.form.fullName")}{" "}
                                        {t("contact.form.required")}
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder={t(
                                            "contact.form.fullNamePlaceholder"
                                        )}
                                        className="border-border rounded-custom focus:border-primary"
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-text-contrast"
                                    >
                                        {t("contact.form.emailAddress")}{" "}
                                        {t("contact.form.required")}
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder={t(
                                            "contact.form.emailPlaceholder"
                                        )}
                                        className="border-border rounded-custom focus:border-primary"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="phone"
                                        className="text-text-contrast"
                                    >
                                        {t("contact.form.phoneNumber")}
                                    </Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder={t(
                                            "contact.form.phoneOptional"
                                        )}
                                        className="border-border rounded-custom focus:border-primary"
                                    />
                                </div>

                                {/* Reason for Contact */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="reason"
                                        className="text-text-contrast"
                                    >
                                        {t("contact.form.reasonForContact")}{" "}
                                        {t("contact.form.required")}
                                    </Label>
                                    <Select
                                        id="reason"
                                        name="reason"
                                        required
                                        className="border-border rounded-custom focus:border-primary"
                                    >
                                        <option value="">
                                            {t("contact.form.chooseReason")}
                                        </option>
                                        <option value="join">
                                            {t("contact.form.reasons.join")}
                                        </option>
                                        <option value="information">
                                            {t(
                                                "contact.form.reasons.information"
                                            )}
                                        </option>
                                        <option value="sponsor">
                                            {t("contact.form.reasons.sponsor")}
                                        </option>
                                        <option value="press">
                                            {t("contact.form.reasons.press")}
                                        </option>
                                        <option value="other">
                                            {t("contact.form.reasons.other")}
                                        </option>
                                    </Select>
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="message"
                                        className="text-text-contrast"
                                    >
                                        {t("contact.form.message")}{" "}
                                        {t("contact.form.required")}
                                    </Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        required
                                        placeholder={t(
                                            "contact.form.messagePlaceholder"
                                        )}
                                        className="border-border rounded-custom focus:border-primary"
                                    />
                                </div>

                                {/* Consent */}
                                <div className="flex items-start space-x-3">
                                    <input
                                        type="checkbox"
                                        id="consent"
                                        name="consent"
                                        required
                                        className="mt-1 h-4 w-4 rounded border-border rounded-custom text-primary focus:ring-primary"
                                    />
                                    <div className="space-y-1">
                                        <Label
                                            htmlFor="consent"
                                            className="text-sm text-muted"
                                        >
                                            {t("contact.form.consent")}{" "}
                                            {t("contact.form.required")}
                                        </Label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    size="lg"
                                    variant="blue"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? t("contact.form.sending")
                                        : t("contact.form.sendMessage")}
                                </Button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-surface rounded-custom p-8 border border-muted-light hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                                <Phone className="h-8 w-8 text-accent" />
                            </div>
                            <h3 className="text-2xl font-light mb-6 tracking-wide text-primary font-hero text-text-contrast leading-[0.85]">
                                {t("contact.info.title")}
                            </h3>

                            {/* Training Schedule */}
                            <div className="space-y-6 mb-8">
                                <div className="bg-muted-light/50 rounded-lg p-4">
                                    <div className="flex items-center mb-4">
                                        <Clock className="h-5 w-5 text-primary mr-2" />
                                        <h4 className="font-light tracking-wide text-primary font-hero text-text-contrast leading-[0.85]">
                                            {t("contact.info.trainingSchedule")}
                                        </h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {trainingData.schedule.map(
                                            (session, index) => (
                                                <div
                                                    key={index}
                                                    className="text-center bg-surface rounded-custom p-3 border border-border rounded-custom"
                                                >
                                                    <div className="text-xs text-muted uppercase font-medium">
                                                        {session.day}
                                                    </div>
                                                    <div className="text-sm font-bold text-primary">
                                                        {session.time}
                                                    </div>
                                                    <div className="text-xs text-muted">
                                                        {session.type}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="bg-muted-light/50 rounded-lg p-4">
                                    <div className="flex items-center mb-4">
                                        <MapPin className="h-5 w-5 mr-2" />
                                        <h4 className="font-light tracking-wide text-primary font-hero text-text-contrast leading-[0.85]">
                                            {t("contact.info.location")}
                                        </h4>
                                    </div>
                                    <p className="font-medium text-text-contrast mb-1">
                                        {trainingData.location.name}
                                    </p>
                                    <p className="text-sm text-muted">
                                        {trainingData.location.address}
                                    </p>
                                </div>

                                <div className="bg-muted-light/50 rounded-lg p-4">
                                    <h4 className="font-light tracking-wide text-primary font-hero text-text-contrast mb-4 leading-[0.85]">
                                        {t("contact.info.directContact")}
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <Mail className="h-4 w-4 text-primary mr-3" />
                                            <span className="text-muted font-medium">
                                                {trainingData.contact.email}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="h-4 w-4 text-primary mr-3" />
                                            <span className="text-muted font-medium">
                                                {trainingData.contact.phone}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-muted-light/50 rounded-lg p-4">
                                    <h4 className="text-primary font-light tracking-wide text-text-contrast mb-3">
                                        {t("contact.info.whatToExpect")}
                                    </h4>
                                    <ul className="space-y-2 text-sm text-muted">
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-success rounded-full mr-3"></span>
                                            {t(
                                                "contact.info.expectations.response"
                                            )}
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-success rounded-full mr-3"></span>
                                            {t(
                                                "contact.info.expectations.invitation"
                                            )}
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-success rounded-full mr-3"></span>
                                            {t(
                                                "contact.info.expectations.information"
                                            )}
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-success rounded-full mr-3"></span>
                                            {t(
                                                "contact.info.expectations.answers"
                                            )}
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-success rounded-full mr-3"></span>
                                            {t(
                                                "contact.info.expectations.noPressure"
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="text-center">
                                <Button
                                    variant="blue"
                                    asChild
                                    className="w-full sm:w-auto"
                                >
                                    <Link to="/rugby101">
                                        {t("contact.info.rugbyGuide")}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Call to Action */}
                <CallToAction
                    image="src/assets/images/call_to_action/rugby-player-woman-panning-running.jpg"
                    imageAlt="Zagreb Rugby Ladies player running with ball - Contact us today"
                    titleKey="contact.cta.title"
                    descriptionKey="contact.cta.description"
                    primaryButton={{
                        href: `mailto:${trainingData.contact.email}`,
                        textKey: "contact.cta.emailDirect",
                    }}
                    secondaryButton={{
                        to: "/rugby101",
                        textKey: "contact.info.rugbyGuide",
                    }}
                />
            </div>

            {/* Toast Notification */}
            <Toast
                type={toastType}
                title={
                    toastType === "success"
                        ? t("common.success")
                        : t("common.error")
                }
                message={toastMessage}
                isVisible={showToast}
                onClose={handleToastClose}
                duration={5000}
            />
        </div>
    );
};

export default Contact;
