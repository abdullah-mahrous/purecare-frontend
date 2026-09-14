import { Link } from "react-router";

type ServiceCardProps = {
    title: string;
    description: string;
    path: string;
    icon: string;
};

const ServiceCard = ({ title, description, path, icon }: ServiceCardProps) => {
    return (
        <Link
            to={path}
            className="group flex h-[19rem] snap-start flex-col items-center rounded-lg bg-white px-3 py-4 text-center text-primary shadow-[0_8px_8px_rgba(11,74,133,0.12)] ring-1 ring-base-border/70 transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(11,74,133,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-4"
        >
            <div className="flex h-40 w-full shrink-0 items-center justify-center">
                <img src={icon} alt="service icon" className="h-full w-full object-contain" />
            </div>

            <h3 className="mt-4 font-bold leading-tight">
                {title}
            </h3>

            <p className="mt-3 line-clamp-3 text-sm font-semibold leading-relaxed text-primary/80">
                {description}
            </p>
        </Link>
    );
};

export default ServiceCard;
