import { Link } from "react-router";
import { routes } from "../router/routes";

const getPageDirection = () => document.documentElement.dir === "ltr" ? "ltr" : "rtl";

function NotFound() {
    const direction = getPageDirection();

    return (
        <main dir={direction} className="px-4 py-10 text-primary sm:px-6 sm:py-14 lg:px-8">
            <section className="mx-auto max-w-xl rounded-3xl border border-[#E4EEF9] bg-[#F7FBFF] p-8 text-center shadow-[0_12px_30px_rgba(11,74,133,0.07)] sm:p-10">

                <svg
                    className="mx-auto size-14 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                >
                    <path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z" />
                </svg>

                <h1 className="mt-4 text-2xl font-extrabold">المعدة غير موجودة</h1>
                <p className="mt-2 text-sm font-medium leading-relaxed text-body-text sm:text-base">
                    ممكن تكون المعدات دي اتشالت أو الرابط غير صحيح.
                </p>

                <div className="mt-6">
                    <Link
                        to={`/${routes.medicalEquipments}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-base-border bg-white px-4 py-2.5 text-sm font-bold text-primary transition hover:border-primary hover:bg-[#F7FBFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                        <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        العودة إلى المعدات
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default NotFound;