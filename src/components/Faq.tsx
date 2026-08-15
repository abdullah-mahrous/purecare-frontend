import ChevronIcon from "../assets/icons/ChevronIcon";

const Faq = ({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) => {

    return (
    <div className="flex flex-col text-right rounded-xl border border-gray-200 mb-2">
        <button
            type="button"
            className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-4 text-base font-semibold text-primary transition-colors duration-300 hover:bg-primary/5"
            onClick={onToggle}
            aria-expanded={isOpen}
        >
            <ChevronIcon isOpen={isOpen} />
            <span>{question}</span>
        </button>

        <div
            className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
        >
            <div className="overflow-hidden">
                <div
                    className={`px-4 pb-4 text-base leading-7 text-primary/80 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-2 opacity-0"
                    }`}
                >
                    {answer}
                </div>
            </div>
        </div>
    </div>
);
}

export default Faq;