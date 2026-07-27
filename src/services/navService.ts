import nurse from '../assets/services/nurse-vector.avif'

export type ServiceInfo = {
    title: string;
    description: string;
    path: string;
    icon: string;
};

export const services: ServiceInfo[] = [
    {
        title: "تمريض منزلي",
        description: "رعاية تمريضية احترافية داخل منزلك لضمان راحتك وسلامتك.",
        path: "/services/nursing",
        icon: nurse,
    },
    {
        title: "زيارة طبيب بالمنزل",
        description: "استشارات طبية وفحص وعلاج في منزلك بكل راحة وأمان.",
        path: "/services/doctor-visit",
        icon: nurse,
    },
    {
        title: "رعاية كبار السن",
        description: "رعاية متكاملة لكبار السن مع الاهتمام باحتياجاتهم اليومية وصحتهم.",
        path: "/services/elderly-care",
        icon: nurse,
    },
    {
        title: "عناية مركزة بالمنزل",
        description: "رعاية طبية متقدمة للحالات الحرجة في بيئة منزلية آمنة.",
        path: "/services/icu",
        icon: nurse,
    },
    {
        title: "تحاليل",
        description: "سحب العينات وإجراء التحاليل الطبية من منزلك بكل سهولة.",
        path: "/services/laboratory",
        icon: nurse,
    },
    {
        title: "تغيير الجروح",
        description: "تنظيف الجروح وتغيير الضمادات بطريقة معقمة لتعزيز سرعة الالتئام.",
        path: "/services/wound-dressing",
        icon: nurse,
    },
];

export const navLinks = [
    { label: "عن الشركة", to: "/about", icon: 'src/assets/icons/about.svg' },
    { label: "احجز الآن", to: "/reservation", icon: 'src/assets/icons/calender.svg' },
    { label: "تأجير معدات طبية", to: "/equipments", icon: 'src/assets/icons/shopping.svg' },
    { label: "انضم لفريق العمل", to: "/careers", icon: 'src/assets/icons/briefcase.svg' },
];
