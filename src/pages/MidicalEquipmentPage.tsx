import PhoneIcon from "../assets/icons/PhoneIcon";
import WhatsappIcon from "../assets/icons/WhatsappIcon";
import EquipmentCard from "../components/equipment/EquipmentCard";
import EquipmentIcon from "../components/equipment/EquipmentIcon";
import medicalCareImage from "../assets/medical-care.png";
import medicalStaffImage from "../assets/medical-staff.png";
import { contacts } from "../services/contactsService";
import { equipmentCategories, equipmentItems } from "../services/equipment.service";

const getPageDirection = () => document.documentElement.dir === "ltr" ? "ltr" : "rtl";

function PriceRangeFilter() {
    return (
        <section className="mt-5 border-t border-[#E4EEF9] pt-5">
            <h2 className="text-sm font-extrabold text-primary">
                نطاق السعر اليومي
            </h2>

            <div className="mt-4" aria-label="النطاق من 50 إلى 500 جنيه مصري في اليوم">
                <div className="relative h-1.5 rounded-full bg-[#DCE5F0]">
                    <span className="absolute inset-y-0 start-0 end-0 rounded-full bg-secondary" />
                    <span className="absolute top-1/2 start-0 size-4 -translate-y-1/2 rounded-full border-2 border-secondary bg-white" />
                    <span className="absolute top-1/2 end-0 size-4 -translate-y-1/2 rounded-full border-2 border-secondary bg-white" />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs font-bold text-body-text">
                    <span><bdi>50</bdi> ج.م</span>
                    <span><bdi>500</bdi> ج.م</span>
                </div>
            </div>
        </section>
    );
}

function EquipmentFilters({ compact = false }: { compact?: boolean }) {
    return (
        <section className={compact ? "" : "rounded-2xl border border-[#E4EEF9] bg-white p-4 shadow-[0_8px_22px_rgba(11,74,133,0.05)]"}>
            <h2 className="text-base font-extrabold text-primary">
                التصنيفات
            </h2>

            <div className={compact ? "mt-3 flex gap-3 overflow-x-auto pb-2" : "mt-3 space-y-1"}>
                {equipmentCategories.map((category) => {
                    const isAllCategory = category.id === "all";

                    return (
                        <div
                            key={category.id}
                            className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold ${
                                isAllCategory
                                    ? "bg-secondary/10 text-secondary ring-1 ring-secondary/15"
                                    : "text-primary"
                            } ${compact ? "min-w-29 flex-col justify-center py-3 text-center" : "w-full"}`}
                        >
                            <EquipmentIcon name={category.icon} className="size-6 shrink-0" />
                            <span className={compact ? "leading-snug" : "text-start"}>{category.label}</span>
                        </div>
                    );
                })}
            </div>

            {!compact && <PriceRangeFilter />}
        </section>
    );
}

function MedicalEquipmentPage() {
    const direction = getPageDirection();

    return (
        <main dir={direction} className="overflow-x-hidden py-4 text-primary sm:py-6 lg:py-8">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <section className="relative overflow-hidden rounded-3xl border border-[#E4EEF9] bg-[linear-gradient(135deg,#F8FBFF_0%,#EAF4FF_100%)]" aria-labelledby="equipment-page-title">
                    <div className="absolute -end-16 -top-16 size-56 rounded-full bg-secondary/8 blur-3xl" />

                    <div className="relative flex flex-col items-center gap-2 px-5 pb-4 pt-7 sm:px-8 sm:pt-9 md:flex-row md:gap-8 md:px-10 md:py-8">
                        <div className="min-w-0 flex-1 text-start">
                            <p className="text-sm font-bold text-secondary sm:text-base">كل اللي تحتاجه لرعاية مريحة في البيت</p>
                            <h1 id="equipment-page-title" className="mt-2 max-w-lg text-3xl font-extrabold leading-tight text-primary sm:text-4xl lg:text-5xl">
                                تأجير المعدات <span className="text-secondary">الطبية</span>
                            </h1>
                            <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-body-text sm:text-base lg:text-lg">
                                معدات طبية موثوقة تساعدك تهتم براحتك ورعاية اللي بتحبهم من البيت.
                            </p>
                        </div>

                        <img
                            src={medicalCareImage}
                            alt="فريق رعاية طبية منزلية"
                            className="w-full max-w-64 shrink-0 object-contain sm:max-w-76 md:max-w-90"
                        />
                    </div>
                </section>

                <div role="search" aria-label="البحث في المعدات" className="mt-4 flex items-center gap-3 rounded-2xl border border-[#DCE5F0] bg-white px-4 py-4 text-body-text shadow-[0_6px_18px_rgba(11,74,133,0.04)] sm:mt-5 sm:px-5">
                    <svg aria-hidden="true" className="size-6 shrink-0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="6.5" />
                        <path d="m16 16 4 4" />
                    </svg>
                    <span className="text-sm font-semibold sm:text-base">ابحث عن معدات...</span>
                </div>

                <div className="mt-6 lg:hidden">
                    <EquipmentFilters compact />
                    <PriceRangeFilter />
                </div>

                <section className="mt-7 grid gap-6 lg:grid-cols-[14.5rem_minmax(0,1fr)] lg:items-start lg:gap-8" aria-labelledby="equipment-list-title">
                    <aside className="hidden lg:block">
                        <EquipmentFilters />
                    </aside>

                    <div className="min-w-0">
                        <div className="mb-4 text-start">
                            <h2 id="equipment-list-title" className="text-lg font-extrabold text-primary sm:text-xl">
                                المعدات للإيجار
                            </h2>
                            <p className="mt-1 text-sm font-medium text-body-text">
                                عرض كل <bdi>{equipmentItems.length}</bdi> معدات
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
                            {equipmentItems.map((equipment) => (
                                <EquipmentCard key={equipment.id} equipment={equipment} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mt-8 overflow-hidden rounded-3xl border border-[#DCE5F0] bg-[#F7FBFF] px-4 py-5 shadow-[0_10px_26px_rgba(11,74,133,0.05)] sm:mt-10 sm:px-7 sm:py-6" aria-labelledby="equipment-help-title">
                    <div className="flex flex-col items-center gap-4 text-start sm:flex-row sm:gap-6">
                        <img src={medicalStaffImage} alt="فريق بيور كير الطبي" className="w-32 shrink-0 object-contain sm:w-40" />

                        <div className="min-w-0 flex-1">
                            <h2 id="equipment-help-title" className="text-xl font-extrabold leading-snug text-primary sm:text-2xl">
                                محتاج مساعدة في اختيار المعدات المناسبة؟
                            </h2>
                            <p className="mt-2 text-sm font-medium leading-relaxed text-body-text sm:text-base">
                                فريقنا جاهز يساعدك تختار المعدات المناسبة لاحتياجاتك.
                            </p>
                        </div>

                        <div className="grid w-full gap-2 sm:w-auto sm:min-w-56">
                            <a href={`tel:${contacts.phoneNumber}`} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-bold text-primary shadow-[0_4px_12px_rgba(11,74,133,0.06)] transition hover:bg-primary hover:text-white">
                                <PhoneIcon className="size-5 shrink-0" />
                                <span dir="ltr">{contacts.phoneNumber}</span>
                            </a>
                            <a href={`https://wa.me/${contacts.whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2.5 text-sm font-bold text-white shadow-[0_4px_12px_rgba(45,190,115,0.2)] transition hover:bg-secondary/90">
                                <WhatsappIcon className="size-5 shrink-0" />
                                <span>تواصل عبر واتساب</span>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default MedicalEquipmentPage;
