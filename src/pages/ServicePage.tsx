import { Link, Navigate, useNavigate, useParams } from "react-router";
import BaseBtn from "../components/BaseBtn";
import { contacts, inquiryMessage } from "../services/contactsService";
import { services } from "../services/navService";

function ServicePage() {
    const navigate = useNavigate();
    const { serviceSlug } = useParams();
    const service = services.find((item) => item.slug === serviceSlug);

    if (!service) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className="px-5 py-12 sm:px-8 lg:px-12">
            <section className="mx-auto max-w-3xl rounded-lg bg-white px-5 py-10 text-center shadow-[0_12px_34px_rgba(11,74,133,0.14)] ring-1 ring-base-border/70 sm:px-8">
                <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#eef6ff] text-primary">
                    <span
                        aria-hidden="true"
                        className="block size-11 bg-current"
                        style={{
                            WebkitMask: `url(${service.icon}) center / contain no-repeat`,
                            mask: `url(${service.icon}) center / contain no-repeat`,
                        }}
                    />
                </span>

                <h1 className="mt-6 text-3xl font-extrabold leading-tight text-primary sm:text-4xl">
                    {service.title}
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-relaxed text-primary/80">
                    {service.description} PureCare can arrange trained healthcare support at home across Alexandria.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <BaseBtn className="bg-secondary text-white" clickAction={() => window.location.href = `tel:${contacts.phoneNumber}`}>
                        Call Now
                    </BaseBtn>
                    <BaseBtn className="bg-primary text-white" clickAction={() => navigate("/reservation")}>
                        Request Service
                    </BaseBtn>
                    <BaseBtn className="bg-secondary text-white" clickAction={() => window.open(contacts.whatsappUrl(contacts.whatsappNumber, inquiryMessage), "_blank")}>
                        WhatsApp
                    </BaseBtn>
                </div>

                <Link
                    to="/"
                    className="mt-8 inline-flex text-sm font-bold text-primary transition-colors duration-200 hover:text-secondary"
                >
                    Back to Home
                </Link>
            </section>
        </main>
    );
}

export default ServicePage;
