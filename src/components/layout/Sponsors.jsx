import { useTranslation } from "react-i18next";

import buzzLogo from "../../assets/images/sponsors/buzz_logo.png";
import divlabLogo from "../../assets/images/sponsors/divlab_logo.png";
import funkyGeorgeLogo from "../../assets/images/sponsors/funky_george_logo.png";
import gressLogo from "../../assets/images/sponsors/gress_logo.png";
import medvedgradLogo from "../../assets/images/sponsors/medvedgrad_logo.png";
import muringLogo from "../../assets/images/sponsors/muring_logo.png";
import simtecLogo from "../../assets/images/sponsors/simtec_logo.png";
import submarineLogo from "../../assets/images/sponsors/submarine_logo.png";

const Sponsors = () => {
    const { t } = useTranslation();

    const sponsors = [
        {
            name: "Buzz",
            logo: buzzLogo,
        },
        {
            name: "DivLab",
            logo: divlabLogo,
        },
        {
            name: "Funky George",
            logo: funkyGeorgeLogo,
        },
        {
            name: "Gress",
            logo: gressLogo,
        },
        {
            name: "Medvedgrad",
            logo: medvedgradLogo,
        },
        {
            name: "Muring",
            logo: muringLogo,
        },
        {
            name: "Simtec",
            logo: simtecLogo,
        },
        {
            name: "Submarine",
            logo: submarineLogo,
        },
    ];

    return (
        <section className="bg-background py-12 sm:py-16 lg:py-20 border-t border-text-dark/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl text-text-dark font-light font-hero uppercase tracking-wider mb-8 sm:mb-12 text-center">
                    {t("footer.ourSponsors")}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center justify-items-center">
                    {sponsors.map((sponsor) => (
                        <div
                            key={sponsor.name}
                            className={`flex items-center justify-center ${sponsor.borderRadius} bg-white shadow-sm hover:shadow-lg transition-all rounded-custom duration-300 w-full h-36 sm:h-40 group overflow-hidden`}
                        >
                            <img
                                src={sponsor.logo}
                                alt={`${sponsor.name} logo`}
                                className="w-[90%] h-[90%] object-contain transition-all duration-300 group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Sponsors };
