import { type ServiceDetails } from "../services/services.service.ts";

const ServiceInfo = ({ details }: { details: ServiceDetails[] }) => {

    return (
        <div className="mt-4 shadow p-4 rounded-2xl">
            {details.map(detail => (
                <div className="flex items-center gap-4 sm:justify-center sm:px-4 bg-white px-4 py-5 border-b border-gray-200 last:border-b-0" key={detail.title}>
                    <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#eef6ff]">
                        <img src={detail.icon} alt={detail.title} aria-hidden="true" className="size-10" />
                    </span>

                    <div className="min-w-0">
                        <p className="text-lg font-extrabold leading-tight">{detail.title}</p>
                        <p className="mt-1 text-sm font-semibold text-heading-text/75">{detail.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ServiceInfo;