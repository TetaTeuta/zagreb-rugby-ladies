import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input, Textarea, Label, Select } from "../components/ui/Input";
import { Toast } from "../components/ui/Toast";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import trainingData from "../data/training.json";
import { AnimatedSection } from "../components/ui/AnimatedSection";
import { CallToAction } from "../components/ui/CallToAction";
import { Link } from "react-router-dom";

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState("success");
    const [toastMessage, setToastMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("Form submitted:", data);

            setToastType("success");
            setToastMessage(
                "Thank you! We'll get back to you within 24 hours."
            );
            setShowToast(true);
            reset();
        } catch {
            setToastType("error");
            setToastMessage(
                "Something went wrong. Please try again or email us directly."
            );
            setShowToast(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToastClose = () => {
        setShowToast(false);
    };

    return (
        <div className="min-h-screen bg-surface">
            {/* Hero Section */}
            <div className="relative h-[50svh] overflow-hidden mt-20">
                <div className="absolute inset-0 flex items-center justify-center bg-text-contrast">
                    <img
                        src="src/assets/images/hero/zagreb-rugby-ladies-team.jpg"
                        alt="Contact hero image"
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
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button size="lg" variant="blue" asChild>
                                <Link to="/rugby101">
                                    {t("contact.hero.learnRugby")}
                                </Link>
                            </Button>
                            <Button size="lg" variant="yellow" asChild>
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
                        <div className="bg-surface rounded-xl p-8 border border-muted-light hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <Send className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-light mb-2 tracking-wide font-hero text-text-contrast leading-[0.85]">
                                    SEND US A MESSAGE
                                </h3>
                                <p className="text-muted text-sm">
                                    Fill out the form below and we'll get back
                                    to you as soon as possible.
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                {/* Name */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="name"
                                        className="text-text-contrast"
                                    >
                                        Full Name *
                                    </Label>
                                    <Input
                                        id="name"
                                        {...register("name", {
                                            required: "Please enter your name",
                                        })}
                                        error={!!errors.name}
                                        placeholder="Your full name"
                                        className="border-border focus:border-primary"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-error">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-text-contrast"
                                    >
                                        Email Address *
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        {...register("email", {
                                            required: "Please enter your email",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message:
                                                    "Please enter a valid email address",
                                            },
                                        })}
                                        error={!!errors.email}
                                        placeholder="your.email@example.com"
                                        className="border-border focus:border-primary"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-error">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="phone"
                                        className="text-text-contrast"
                                    >
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        {...register("phone")}
                                        placeholder="+385 99 123 4567 (optional)"
                                        className="border-border focus:border-primary"
                                    />
                                </div>

                                {/* Reason for Contact */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="reason"
                                        className="text-text-contrast"
                                    >
                                        Reason for Contact *
                                    </Label>
                                    <Select
                                        id="reason"
                                        {...register("reason", {
                                            required: "Please select a reason",
                                        })}
                                        error={!!errors.reason}
                                        className="border-border focus:border-primary"
                                    >
                                        <option value="">
                                            Choose a reason...
                                        </option>
                                        <option value="join">
                                            I want to join training
                                        </option>
                                        <option value="information">
                                            I need more information
                                        </option>
                                        <option value="sponsor">
                                            Sponsorship inquiry
                                        </option>
                                        <option value="press">
                                            Press/Media
                                        </option>
                                        <option value="other">Other</option>
                                    </Select>
                                    {errors.reason && (
                                        <p className="text-sm text-error">
                                            {errors.reason.message}
                                        </p>
                                    )}
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="message"
                                        className="text-text-contrast"
                                    >
                                        Message *
                                    </Label>
                                    <Textarea
                                        id="message"
                                        rows={4}
                                        {...register("message", {
                                            required: "Please enter a message",
                                        })}
                                        error={!!errors.message}
                                        placeholder="Tell us about yourself, your experience level, questions you have..."
                                        className="border-border focus:border-primary"
                                    />
                                    {errors.message && (
                                        <p className="text-sm text-error">
                                            {errors.message.message}
                                        </p>
                                    )}
                                </div>

                                {/* Consent */}
                                <div className="flex items-start space-x-3">
                                    <input
                                        type="checkbox"
                                        id="consent"
                                        className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                                        {...register("consent", {
                                            required:
                                                "Please agree to our privacy policy",
                                        })}
                                    />
                                    <div className="space-y-1">
                                        <Label
                                            htmlFor="consent"
                                            className="text-sm text-muted"
                                        >
                                            I agree to the privacy policy and
                                            consent to my data being processed
                                            for the purpose of responding to my
                                            inquiry. *
                                        </Label>
                                        {errors.consent && (
                                            <p className="text-sm text-error">
                                                {errors.consent.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    size="lg"
                                    variant="blue"
                                    className="w-full"
                                    loading={isSubmitting}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Sending..."
                                        : "Send Message"}
                                </Button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-surface rounded-xl p-8 border border-muted-light hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                                <Phone className="h-8 w-8 text-accent" />
                            </div>
                            <h3 className="text-2xl font-light mb-6 tracking-wide font-hero text-text-contrast leading-[0.85]">
                                GET IN TOUCH
                            </h3>

                            {/* Training Schedule */}
                            <div className="space-y-6 mb-8">
                                <div className="bg-muted-light/50 rounded-lg p-4">
                                    <div className="flex items-center mb-4">
                                        <Clock className="h-5 w-5 text-primary mr-2" />
                                        <h4 className="font-light tracking-wide font-hero text-text-contrast leading-[0.85]">
                                            TRAINING SCHEDULE
                                        </h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {trainingData.schedule.map(
                                            (session, index) => (
                                                <div
                                                    key={index}
                                                    className="text-center bg-surface rounded-custom p-3 border border-border"
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
                                        <MapPin className="h-5 w-5 text-primary mr-2" />
                                        <h4 className="font-light tracking-wide font-hero text-text-contrast leading-[0.85]">
                                            LOCATION
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
                                    <h4 className="font-light tracking-wide font-hero text-text-contrast mb-4 leading-[0.85]">
                                        DIRECT CONTACT
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
                                    <h4 className="font-bold text-text-contrast mb-3">
                                        What to Expect
                                    </h4>
                                    <ul className="space-y-2 text-sm text-muted">
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-success rounded-full mr-3"></span>
                                            Response within 24 hours
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-success rounded-full mr-3"></span>
                                            Invitation to attend a trial
                                            training
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-success rounded-full mr-3"></span>
                                            Information about what to bring
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-success rounded-full mr-3"></span>
                                            Answers to all your questions
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-success rounded-full mr-3"></span>
                                            No pressure—just friendly advice!
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="text-center">
                                <Button variant="blue" asChild>
                                    <Link to="/rugby101">Rugby 101 Guide</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Call to Action */}
                <CallToAction
                    image="src/assets/images/call_to_action/rugby-player-woman-panning-running.jpg"
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
                title={toastType === "success" ? "Message Sent!" : "Error"}
                message={toastMessage}
                isVisible={showToast}
                onClose={handleToastClose}
                duration={5000}
            />
        </div>
    );
};

export default Contact;
