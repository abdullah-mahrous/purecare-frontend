import type { EquipmentIconName } from "../../services/equipment.service";

type EquipmentIconProps = {
    name: EquipmentIconName;
    className?: string;
    title?: string;
};

/** Local Material-style pictograms used until the API supplies product imagery. */
function EquipmentIcon({ name, className = "", title }: EquipmentIconProps) {
    const iconContent = (() => {
        switch (name) {
            case "grid":
                return <path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z" />;
            case "wheelchair":
                return (
                    <>
                        <circle cx="15.5" cy="4.5" r="2" />
                        <path d="M10 7h4.5v5H18a4 4 0 1 1-3.7 5.5M10 7l-2 5h4.5l2.5 7h2.2l-1.7-5H19v-2h-6l-1-3H10zM8 13a5 5 0 1 0 6.3 6.8" />
                    </>
                );
            case "hospital-bed":
                return (
                    <>
                        <path d="M4 5v14m0-6h16v6m-10-6V9h5a5 5 0 0 1 5 5M7 13V9h3v4M2 19h4m12 0h4" />
                        <path d="M6 16h14" />
                    </>
                );
            case "oxygen-concentrator":
                return (
                    <>
                        <rect x="6" y="3" width="12" height="18" rx="3" />
                        <path d="M10 7h4m-2 3v4m-2 5h4" />
                        <circle cx="12" cy="16" r="1" />
                    </>
                );
            case "nebulizer":
                return (
                    <>
                        <path d="M7 13h8a3 3 0 0 1 3 3v4H6v-4a3 3 0 0 1 1-3Z" />
                        <path d="M10 13V7h4v6m-2-6V3m0 0h4m-4 0H8m6 12h1m-6 2h6" />
                        <path d="M6 16H3a2 2 0 0 0-2 2v1m17-3h2a3 3 0 0 1 3 3" />
                    </>
                );
            case "walker":
                return (
                    <>
                        <path d="M7 3v18m10-18v18M7 7h10M7 15h10" />
                        <path d="M5 21h4m6 0h4M7 3h3m4 0h3" />
                    </>
                );
            case "patient-monitor":
                return (
                    <>
                        <rect x="3" y="4" width="18" height="14" rx="2" />
                        <path d="M6 11h2l1.5-3 2.5 6 1.5-3H18M9 21h6m-3-3v3" />
                    </>
                );
            case "commode-chair":
                return (
                    <>
                        <path d="M7 4h10v6H7zM6 10h12v5H6zM8 15l-1 6m9-6l1 6M9 4V2h6v2" />
                        <path d="M9 12h6" />
                    </>
                );
            case "air-mattress":
                return (
                    <>
                        <path d="M3 15c1.5-3 3-3 4.5 0c1.5-3 3-3 4.5 0c1.5-3 3-3 4.5 0c1.5-3 3-3 4.5 0v4H3z" />
                        <path d="M3 19h18M5 12V8h14v4M7 8V5h10v3" />
                    </>
                );
            case "suction-machine":
                return (
                    <>
                        <rect x="6" y="9" width="12" height="11" rx="2" />
                        <path d="M10 9V5h5a3 3 0 0 1 3 3v1M9 14h2m3 0h1m-6 6v2m6-2v2" />
                        <circle cx="14.5" cy="14" r="1" />
                    </>
                );
            case "lungs":
                return <path d="M11 4v7L8.8 7.5C8 6.3 6.4 6 5.3 6.9C3.8 8.1 3 10.1 3 12.2V18h6v-5l2 2v5h2v-5l2-2v5h6v-5.8c0-2.1-.8-4.1-2.3-5.3c-1.1-.9-2.7-.6-3.5.6L13 11V4z" />;
            case "heart":
                return <path d="M12 20.5 4.8 14A5 5 0 0 1 12 7.1A5 5 0 0 1 19.2 14zM4 12h3l1.5-3 2.5 6 1.5-3H20" />;
            case "more":
                return <path d="M5 12a1.8 1.8 0 1 0 0 .01M12 12a1.8 1.8 0 1 0 0 .01M19 12a1.8 1.8 0 1 0 0 .01" />;
        }
    })();

    return (
        <svg
            aria-hidden={title ? undefined : true}
            className={className}
            fill="none"
            role={title ? "img" : undefined}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
        >
            {title && <title>{title}</title>}
            {iconContent}
        </svg>
    );
}

export default EquipmentIcon;
