/**
 * Centralized contact configuration
 * All contact information should be accessed through this file
 */

export const contactConfig = {
    email: import.meta.env.VITE_CONTACT_EMAIL || "zrkzagreb@zagreb-rugby.hr",
    phone: import.meta.env.VITE_CONTACT_PHONE || "+385 91 404 2005",
    whatsapp: import.meta.env.VITE_CONTACT_WHATSAPP || "+385 91 404 2005",
};

// Helper functions for formatted links
export const getEmailLink = () => `mailto:${contactConfig.email}`;
export const getPhoneLink = () => `tel:${contactConfig.phone}`;
export const getWhatsAppLink = (message = "") => {
    const phone = contactConfig.whatsapp.replace(/[^0-9]/g, "");
    return `https://wa.me/${phone}${
        message ? `?text=${encodeURIComponent(message)}` : ""
    }`;
};
