import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, Phone, Facebook } from "lucide-react";
import trainingData from "../../data/training.json";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const legalLinks = [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Sale", href: "/terms" },
    ];

    return (
        <footer className="bg-primary border-t border-text-light/10 mt-auto">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Contact Info - Left Side */}
                    <div>
                        <h3 className="text-sm text-text-light/80 font-light font-hero uppercase tracking-wider mb-6 leading-[0.85]">
                            GET IN TOUCH
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
                                    href={`mailto:${trainingData.contact.email}`}
                                    className="text-sm text-text-light/80 hover:text-text-light transition-colors"
                                >
                                    {trainingData.contact.email}
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-4 w-4 text-text-light/60 flex-shrink-0" />
                                <a
                                    href={`tel:${trainingData.contact.phone}`}
                                    className="text-sm text-text-light/80 hover:text-text-light transition-colors"
                                >
                                    {trainingData.contact.phone}
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
                                aria-label="Follow us on Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=100063465023928"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-surface/10 hover:bg-primary hover:text-text-light transition-colors"
                                aria-label="Follow us on Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="mailto:team@zagreb-rugby-ladies.hr"
                                className="p-2 rounded-lg bg-surface/10 hover:bg-primary hover:text-text-light transition-colors"
                                aria-label="Send us an email"
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
                                src="src/assets/images/logos/logo_vector.png"
                                alt="Zagreb Rugby Ladies Logo"
                                className="h-10 w-10 object-contain"
                            />
                            <span className="text-lg text-text-light/80 font-semibold">
                                Zagreb Rugby Ladies
                            </span>
                        </Link>
                        <p className="text-sm text-text-light/80 leading-relaxed">
                            Empowering girls and young women through rugby. Join
                            our inclusive team where courage meets community,
                            and every player discovers their strength.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-text-light/10">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div className="text-sm text-text-light/60">
                            © {currentYear} Zagreb Rugby Ladies. All rights
                            reserved. Developed by iTee, obrt za programiranje.
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
