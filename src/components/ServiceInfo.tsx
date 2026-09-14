import { type ServiceDetails } from "../services/services.service.ts";
import { localized, type Language } from "../i18n";

const ServiceInfo = ({ details, language }: { details: ServiceDetails[] | undefined; language: Language }) => {

    return (
        <div data-gsap-stagger className="mt-4 shadow p-4 rounded-2xl">
            {details?.map(detail => (
                <div data-gsap-item className="flex items-center gap-4 sm:px-4 bg-white px-4 py-5 border-b border-gray-200 last:border-b-0" key={detail.titleAr}>
                    <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#eef6ff]">
                        <img src={detail.iconUrl} alt={localized(detail, "title", language)} aria-hidden="true" className="size-10" />
                    </span>

                    <div className="min-w-0">
                        <p className="text-lg font-extrabold leading-tight">{localized(detail, "title", language)}</p>
                        <p className="mt-1 text-sm font-semibold text-heading-text/75">{localized(detail, "description", language)}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ServiceInfo;
