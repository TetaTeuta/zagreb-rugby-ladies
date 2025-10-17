import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Accordion = ({ items, className = "" }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        // Only one item can be open at a time
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    index={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openIndex === index}
                    onToggle={toggleItem}
                />
            ))}
        </div>
    );
};

const AccordionItem = ({ index, title, content, isOpen, onToggle }) => {
    return (
        <div className="border border-accent/10 rounded-custom overflow-hidden bg-surface/50">
            <button
                onClick={() => onToggle(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-primary/5 bg-transparent border-none cursor-pointer"
                aria-expanded={isOpen}
            >
                <span className="font-medium text-text">{title}</span>
                <ChevronDown
                    className="h-5 w-5 text-muted"
                    style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform var(--transition-normal)",
                    }}
                />
            </button>
            <div
                style={{
                    maxHeight: isOpen ? "1000px" : "0",
                    overflow: "hidden",
                    transition:
                        "max-height var(--transition-smooth), opacity var(--transition-normal)",
                    opacity: isOpen ? 1 : 0,
                }}
            >
                <div className="px-6 pb-4 text-muted leading-relaxed">
                    {typeof content === "string" ? <p>{content}</p> : content}
                </div>
            </div>
        </div>
    );
};

export { Accordion };
