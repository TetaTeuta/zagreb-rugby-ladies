import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Accordion = ({ items, allowMultiple = false, className = "" }) => {
    const [openItems, setOpenItems] = useState(new Set());

    const toggleItem = (index) => {
        const newOpenItems = new Set(openItems);

        if (newOpenItems.has(index)) {
            newOpenItems.delete(index);
        } else {
            if (!allowMultiple) {
                newOpenItems.clear();
            }
            newOpenItems.add(index);
        }

        setOpenItems(newOpenItems);
    };

    return (
        <div className={["space-y-2", className].join(" ")}>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    index={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openItems.has(index)}
                    onToggle={toggleItem}
                />
            ))}
        </div>
    );
};

const AccordionItem = ({ index, title, content, isOpen, onToggle }) => {
    return (
        <div className="border border-accent/10 rounded-xl overflow-hidden bg-surface/50">
            <button
                onClick={() => onToggle(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                aria-expanded={isOpen}
            >
                <span className="font-medium text-text">{title}</span>
                <ChevronDown
                    className={[
                        "h-5 w-5 text-muted transition-transform duration-200",
                        isOpen ? "rotate-180" : "",
                    ].join(" ")}
                />
            </button>
            {isOpen && (
                <div className="px-6 pb-4">
                    <div className="text-muted leading-relaxed">
                        {typeof content === "string" ? (
                            <p>{content}</p>
                        ) : (
                            content
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export { Accordion };
