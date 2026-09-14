const ChevronIcon = ({ isOpen, size=5 }: { isOpen: boolean, size?: number }) => (
    <svg
        aria-hidden="true"
        className={`size-${size} shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "rotate-180" : ""}`}
        viewBox="0 0 24 24"
    >
        <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z" />
    </svg>
);

export default ChevronIcon;