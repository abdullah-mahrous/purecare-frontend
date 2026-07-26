import { Link } from "react-router";

type ServiceCardProps = {
    title: string;
    description: string;
    to: string;
    icon: string;
};

const ServiceCard = ({ title, description, to, icon }: ServiceCardProps) => {
    return (
        <Link
            to={to}
            className="group flex h-full min-h-43 snap-start flex-col items-center rounded-lg bg-white px-3 py-4 text-center text-primary shadow-[0_12px_26px_rgba(11,74,133,0.12)] ring-1 ring-base-border/70 transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(11,74,133,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-4"
        >
            <img src={icon} alt="service icon" className="size-40"/>

            <h3 className="mt-4 text-sm font-bold leading-tight sm:text-base">
                {title}
            </h3>

            <p className="mt-3 text-xs font-semibold leading-relaxed text-primary/75 line-clamp-2">
                {description}
            </p>
        </Link>
    );
};

export default ServiceCard;
