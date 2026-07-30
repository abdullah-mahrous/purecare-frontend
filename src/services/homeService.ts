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

export const testimonials = [
    {
        name: "مدام/ عفاف",
        image: "src/assets/female-testemonial.png",
        text: "تجربتي مع بيوركير كانت رائعة! لقد ساعدوني في العثور على أفضل المنتجات للعناية بالبشرة، وكانت خدمة العملاء ممتازة. أوصي بشدة باستخدامهم لأي شخص يبحث عن منتجات عالية الجودة وموثوقة.",
    },
    {
        name: "دكتور/ ياسر",
        image: "src/assets/male-testemonial.png",
        text: "لقد كانت تجربتي مع بيوركير ممتازة! المنتجات التي اشتريتها كانت فعالة وآمنة، وخدمة العملاء كانت سريعة ومفيدة. سأستمر في التسوق معهم بالتأكيد.",
    },
    {
        name: "أستاذة/ ليلى",
        image: "src/assets/female-testemonial.png",
        text: "أنا سعيدة جدًا بتجربتي مع بيوركير! لقد وجدت منتجات رائعة للعناية بالبشرة، وكانت عملية الشراء سهلة وسريعة. أوصي بشدة بهذا المتجر لأي شخص يبحث عن منتجات عالية الجودة.",
    },
];

export const faqs = [
    {
        question: "ما هي خدمات بيوركير؟",
        answer: "بيوركير تقدم مجموعة متنوعة من الخدمات الصحية، بما في ذلك التمريض المنزلي، زيارة الطبيب بالمنزل， رعاية كبار السن، العناية المركزة بالمنزل، التحاليل الطبية، وتغيير الجروح.",
    },
    {
        question: "كيف يمكنني حجز خدمة؟",
        answer: "يمكنك حجز خدمة من خلال زيارة صفحة الحجز على موقعنا الإلكتروني، أو الاتصال بفريق خدمة العملاء لدينا لتقديم المساعدة في الحجز.",
    },
    {
        question: "هل تقدمون خدمات في جميع المناطق؟",
        answer: "نعم، نحن نقدم خدماتنا في معظم المناطق. يرجى التواصل معنا لمعرفة ما إذا كانت خدماتنا متاحة في منطقتك.",
    },
    {
        question: "ما هي ساعات العمل؟",
        answer: "نحن نقدم خدماتنا على مدار الساعة طوال أيام الأسبوع لضمان تلبية احتياجات عملائنا في أي وقت.",
    },
    {
        question: "هل يمكنني تعديل أو إلغاء الحجز؟",
        answer: "نعم، يمكنك تعديل أو إلغاء الحجز من خلال الاتصال بفريق خدمة العملاء لدينا. يرجى ملاحظة أن هناك سياسات محددة للتعديل والإلغاء، لذا يُفضل التواصل معنا في أقرب وقت ممكن.",
    },
];