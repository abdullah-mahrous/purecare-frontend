import { apiRequest } from "./api.ts";
import { type faq } from "./homeService.ts";

export type ServiceDetails = {
    icon: string;
    title: string;
    description: string;
};

type ServicePerks = {
    rate: number;
    customersCount: number;
    responseTime: string;
};

export type Service = {
    id: string;
    name: string;
    description: string;
    img: string;
    perks: ServicePerks;
    targetedCustomers: ServiceDetails[];
    includedServices: ServiceDetails[];
    faq: faq[];
};

export async function fetchServices() {
    // const data = await apiRequest('services');

    // return data.data;
    return services;
}

export const services: Service[] = [
    {
        id: "1",
        name: "تمريض منزلي",
        description: "رعاية تمريضية احترافية داخل منزلك لضمان راحتك وسلامتك.",
        img: "/src/assets/services/nurse-vector.avif",
        perks: {
            rate: 4.9,
            customersCount: 500,
            responseTime: "30 - 60 دقيقة",
        },
        targetedCustomers: [
            {
                icon: "/src/assets/icons/people.svg",
                title: "الأسر والمرضى المنزليون",
                description: "لمن يحتاج إلى رعاية طبية شخصية في بيئة مألوفة وهادئة.",
            },
            {
                icon: "/src/assets/icons/heart-pulse.svg",
                title: "الحالات المزمنة",
                description: "لمن يحتاج إلى متابعة منتظمة لمرض السكري، الضغط، أو غيرها.",
            },
            {
                icon: "/src/assets/icons/shield-check.svg",
                title: "بعد الجراحة أو العلاج",
                description: "لمن يحتاج إلى دعم بعد العملية أو خلال فترة التعافي.",
            },
            {
                icon: "/src/assets/icons/clock.svg",
                title: "المرضى الذين يحتاجون متابعة مستمرة",
                description: "لمن يرغب في متابعة يومية مع فريق متخصص دون مغادرة المنزل.",
            },
        ],
        includedServices: [
            {
                icon: "/src/assets/icons/heart-pulse.svg",
                title: "متابعة العلامات الحيوية",
                description: "قياس الضغط، درجة الحرارة، ومعدل نبضات القلب بشكل دوري.",
            },
            {
                icon: "/src/assets/icons/chat.svg",
                title: "مساندة يومية",
                description: "مساعدة في الرعاية اليومية وتقديم التعليم الصحّي المناسب.",
            },
            {
                icon: "/src/assets/icons/calender.svg",
                title: "تنظيم مواعيد العلاج",
                description: "مراقبة الالتزام بالخطة العلاجية وتحديد المواعيد اللازمة.",
            },
            {
                icon: "/src/assets/icons/shield-check.svg",
                title: "تحديث طبي مستمر",
                description: "تقييم الحالة بشكل دوري وإبلاغ الأسرة أو الطبيب عن التقدم.",
            },
        ],
        faq: [
            {
                question: "هل خدمات التمريض المنزلي متاحة طوال اليوم؟",
                answer: "نعم، يتم ترتيب الخدمة حسب احتياج الحالة مع توافر فريق متخصص على مدار اليوم.",
            },
            {
                question: "هل يمكن حجز الخدمة فورًا؟",
                answer: "نعم، يمكن حجز الخدمة في أقرب وقت ممكن حسب التوفر في منطقتك.",
            },
            {
                question: "هل الفريق يلتزم بجدول الرعاية؟",
                answer: "نعم، يتم توضيح خطة الرعاية والتوقيت مع العميل قبل بدء الخدمة.",
            },
        ],
    },
    {
        id: "2",
        name: "زيارة طبيب بالمنزل",
        description: "استشارات طبية وفحص وعلاج في منزلك بكل راحة وأمان.",
        img: "/src/assets/services/medical-care-amico.png",
        perks: {
            rate: 4.8,
            customersCount: 420,
            responseTime: "20 - 45 دقيقة",
        },
        targetedCustomers: [
            {
                icon: "/src/assets/icons/people.svg",
                title: "المرضى ذوي الحركة المحدودة",
                description: "لمن يصعب عليه زيارة العيادة أو المستشفى في ظروفه الحالية.",
            },
            {
                icon: "/src/assets/icons/heart-pulse.svg",
                title: "الأطفال وكبار السن",
                description: "لمن يحتاج إلى تقييم طبي في بيئة مريحة وآمنة.",
            },
            {
                icon: "/src/assets/icons/headset.svg",
                title: "المرضى الذين يحتاجون استشارة عاجلة",
                description: "لمن يرغب في الحصول على رأي طبي سريع دون انتظار طويل.",
            },
            {
                icon: "/src/assets/icons/shield.svg",
                title: "الحالات التي تحتاج متابعة منزلية",
                description: "لمن يحتاج إلى تقييم متكرر ومتابعة بعد العلاج أو التشخيص.",
            },
        ],
        includedServices: [
            {
                icon: "/src/assets/icons/heart-pulse.svg",
                title: "الفحص الطبي الأولي",
                description: "تقييم الحالة الصحية والتعرف على الأعراض وتحديد الأسباب.",
            },
            {
                icon: "/src/assets/icons/chat.svg",
                title: "التشخيص وإرشاد العلاج",
                description: "تقديم التعليمات الطبية وتوضيح الخطوات العلاجية المناسبة.",
            },
            {
                icon: "/src/assets/icons/calender.svg",
                title: "متابعة المواعيد",
                description: "تحديد مواعيد المتابعة المتكررة حسب الحالة الطبية.",
            },
            {
                icon: "/src/assets/icons/phone-outline.svg",
                title: "تواصل مباشر مع الفريق",
                description: "سهولة التواصل لاستفسارات إضافية بعد الزيارة.",
            },
        ],
        faq: [
            {
                question: "هل يتم تقديم التشخيص من خلال الزيارة المنزلية؟",
                answer: "نعم، يتم تقييم المريض وفحصه أولاً، ثم توجيه العلاج المناسب أو إحالة الحالة عند الحاجة.",
            },
            {
                question: "هل الزيارة مناسبة للحالات المزمنة؟",
                answer: "نعم، يمكن تنظيم زيارات متكررة لحالات مثل الضغط أو السكري أو متابعة التعافي.",
            },
            {
                question: "هل تحتاج إلى تجهيز خاص قبل الزيارة؟",
                answer: "عادة لا، لكننا نطلب فقط توفير مساحة مناسبة للفحص وتقديم الرعاية.",
            },
        ],
    },
    {
        id: "3",
        name: "رعاية كبار السن",
        description: "رعاية متكاملة لكبار السن مع الاهتمام باحتياجاتهم اليومية وصحتهم.",
        img: "/src/assets/services/nurse-vector.avif",
        perks: {
            rate: 4.9,
            customersCount: 650,
            responseTime: "25 - 50 دقيقة",
        },
        targetedCustomers: [
            {
                icon: "/src/assets/icons/people-community.svg",
                title: "كبار السن في المنزل",
                description: "لمن يحتاج إلى رعاية يومية مع مراعاة الاحتياجات الشخصية والصحية.",
            },
            {
                icon: "/src/assets/icons/person.svg",
                title: "العائلات المهتمة برفاهية المريض",
                description: "لمن يريد ترك مسؤولية الرعاية لفريق متخصص يضمن السلامة والراحة.",
            },
            {
                icon: "/src/assets/icons/shield-check.svg",
                title: "الأشخاص المصابين بأمراض مزمنة",
                description: "لمن يحتاج إلى متابعة دقيقة للأنشطة اليومية وتقديم الدعم الطبي.",
            },
            {
                icon: "/src/assets/icons/clock.svg",
                title: "الحالات التي تحتاج رعاية متكررة",
                description: "لمن يفضل وجود رعاية ثابتة وداعمة في المنزل على مدار اليوم.",
            },
        ],
        includedServices: [
            {
                icon: "/src/assets/icons/people.svg",
                title: "دعم يومي وتوجيه",
                description: "مساعدة في الأنشطة اليومية والاهتمام الشخصي بشكل محترف.",
            },
            {
                icon: "/src/assets/icons/heart-pulse.svg",
                title: "مراقبة الحالة الصحية",
                description: "التأكد من الالتزام بالخطة العلاجية وتقييم الأعراض.",
            },
            {
                icon: "/src/assets/icons/chat.svg",
                title: "تواصل مستمر مع العائلة",
                description: "إبلاغ الأسرة بالتطورات المهمة في حالة المريض.",
            },
            {
                icon: "/src/assets/icons/shield.svg",
                title: "بيئة آمنة وهادئة",
                description: "توفير دعم يساعد على تقليل التوتر وتحسين الراحة النفسية.",
            },
        ],
        faq: [
            {
                question: "هل الخدمة تشمل المساعدة في الأنشطة اليومية؟",
                answer: "نعم، يشمل فريق الرعاية الدعم في الأنشطة اليومية حسب احتياج كل مريض.",
            },
            {
                question: "هل يمكن تقديم الخدمة لبضعة ساعات فقط؟",
                answer: "نعم، يمكن تخصيص الخدمة حسب عدد الساعات المطلوبة في الخطة المناسبة لك.",
            },
            {
                question: "هل يعمل الفريق مع الأسرة؟",
                answer: "نعم، نحرص على التنسيق المستمر مع العائلة لضمان أفضل مستوى من الرعاية.",
            },
        ],
    },
    {
        id: "4",
        name: "عناية مركزة بالمنزل",
        description: "رعاية طبية متقدمة للحالات الحرجة في بيئة منزلية آمنة.",
        img: "/src/assets/services/medical-care-amico.png",
        perks: {
            rate: 4.9,
            customersCount: 280,
            responseTime: "15 - 30 دقيقة",
        },
        targetedCustomers: [
            {
                icon: "/src/assets/icons/heart-pulse.svg",
                title: "الحالات الحرجة بعد الخروج من المستشفى",
                description: "لمن يحتاج إلى متابعة طبية دقيقة في المنزل بعد العلاج أو الجراحة.",
            },
            {
                icon: "/src/assets/icons/shield-check.svg",
                title: "مرضى الرعاية المركزة",
                description: "لمن يحتاج إلى رعاية متقدمة مع متابعة مستمرة للعلامات الحيوية.",
            },
            {
                icon: "/src/assets/icons/lightning.svg",
                title: "الحالات الطارئة المنتظمة",
                description: "لمن يحتاج إلى استجابة سريعة وتقييم مستمر لضمان الاستقرار.",
            },
            {
                icon: "/src/assets/icons/chat.svg",
                title: "العائلات التي تحتاج دعمًا فنيًا مستمرًا",
                description: "لمن يرغب في رعاية متقدمة مع تنسيق أمني ودعم مباشر.",
            },
        ],
        includedServices: [
            {
                icon: "/src/assets/icons/heart-pulse.svg",
                title: "مراقبة العلامات الحيوية",
                description: "مراقبة مستوى الأكسجين، الضغط، والسكر، ومؤشرات الحالة العامة.",
            },
            {
                icon: "/src/assets/icons/shield-check.svg",
                title: "رعاية متقدمة وآمنة",
                description: "توفير احتياطات السلامة بحسب خطة الطبيب المعتمد.",
            },
            {
                icon: "/src/assets/icons/headset.svg",
                title: "تواصل طبي فوري",
                description: "استجابة سريعة للتغيرات أو التدهور المحتمل في الحالة.",
            },
            {
                icon: "/src/assets/icons/calender.svg",
                title: "متابعة مستمرة",
                description: "رفع تقارير دورية للطاقم الطبي المعني لتقييم الحالة.",
            },
        ],
        faq: [
            {
                question: "هل هذه الخدمة مناسبة بعد الخروج من المستشفى؟",
                answer: "نعم، وهي مخصصة لمن يحتاج إلى متابعة حرجة في المنزل مع الالتزام بخطة المعالجة.",
            },
            {
                question: "هل يتطلب الفريق أدوات متخصصة؟",
                answer: "وفقاً للحالة، يتم تجهيز الخطة الطبية المناسبة مع متابعة الطبيب المعالج.",
            },
            {
                question: "هل الخدمة متاحة في أي وقت؟",
                answer: "نعم، يمكن طلبها حسب الحاجة مع تنسيق فوري من فريقنا.",
            },
        ],
    },
    {
        id: "5",
        name: "تحاليل",
        description: "سحب العينات وإجراء التحاليل الطبية من منزلك بكل سهولة.",
        img: "/src/assets/services/nurse-vector.avif",
        perks: {
            rate: 4.7,
            customersCount: 360,
            responseTime: "30 - 90 دقيقة",
        },
        targetedCustomers: [
            {
                icon: "/src/assets/icons/services.svg",
                title: "المرضى الذين يحتاجون اختبارًا منزليًا",
                description: "لمن يفضل أخذ العينات في المنزل لتوفير الوقت والجهد.",
            },
            {
                icon: "/src/assets/icons/people.svg",
                title: "الأسر والنساء الحوامل",
                description: "لمن يحتاج إلى خدمات تحليل مرنة ومريحة في المنزل.",
            },
            {
                icon: "/src/assets/icons/clock.svg",
                title: "الحالات التي تحتاج متابعة سريعة",
                description: "لمن يحتاج إلى نتائج سريعة لتحديد العلاج أو متابعة الحالة.",
            },
            {
                icon: "/src/assets/icons/shield-check.svg",
                title: "المراجعات الدورية",
                description: "لمن يلتزم بفحوصات دورية ومتابعة منتظمة للصحة العامة.",
            },
        ],
        includedServices: [
            {
                icon: "/src/assets/icons/phone-outline.svg",
                title: "حجز سهل",
                description: "تحديد الموعد والاتصال لتحديد نوع التحليل المطلوب.",
            },
            {
                icon: "/src/assets/icons/services.svg",
                title: "سحب عينة في المنزل",
                description: "فني متخصص يلتقط العينة وفق البروتوكول الطبي.",
            },
            {
                icon: "/src/assets/icons/clock.svg",
                title: "استلام سريع للنتائج",
                description: "تسليم النتائج في الوقت المناسب حسب نوع التحليل.",
            },
            {
                icon: "/src/assets/icons/shield-check.svg",
                title: "ملاحظات طبية دقيقة",
                description: "مراجعة النتائج مع فريق متخصص عند الحاجة.",
            },
        ],
        faq: [
            {
                question: "هل يمكن سحب العينات في المنزل؟",
                answer: "نعم، يتم تجهيز الخدمة من خلال فني مختص ويُسحب العينة داخل منزلك.",
            },
            {
                question: "هل يوجد تحليل خاص للمرضى المنزليين؟",
                answer: "نعم، يمكن تحديد النوع المطلوب حسب طلب الطبيب أو الحالة الصحية.",
            },
            {
                question: "كم يستغرق الحصول على النتيجة؟",
                answer: "يعتمد على نوع التحليل، لكننا نسعى لتسليم النتائج في أسرع وقت ممكن.",
            },
        ],
    },
    {
        id: "6",
        name: "تغيير الجروح",
        description: "تنظيف الجروح وتغيير الضمادات بطريقة معقمة لتعزيز سرعة الالتئام.",
        img: "/src/assets/services/medical-care-amico.png",
        perks: {
            rate: 4.8,
            customersCount: 310,
            responseTime: "20 - 40 دقيقة",
        },
        targetedCustomers: [
            {
                icon: "/src/assets/icons/shield-check.svg",
                title: "المرضى بعد الجراحة",
                description: "لمن يحتاج إلى متابعة الجرح وتغيير الضمادة في المنزل.",
            },
            {
                icon: "/src/assets/icons/heart-pulse.svg",
                title: "المرضى المصابين بالقرح أو الجروح المزمنة",
                description: "لمن يحتاج إلى رعاية متخصصة ومراقبة مستمرة للشفاء.",
            },
            {
                icon: "/src/assets/icons/people.svg",
                title: "المرضى الذين يفضلون العناية المنزلية",
                description: "لمن يريد متابعة العناية مع الراحة والخصوصية في المنزل.",
            },
            {
                icon: "/src/assets/icons/clock.svg",
                title: "الحالات التي تحتاج متابعة دورية",
                description: "لمن يحتاج إلى تغيير ضماد بشكل منتظم أثناء فترة الالتئام.",
            },
        ],
        includedServices: [
            {
                icon: "/src/assets/icons/shield-check.svg",
                title: "تنظيف الجرح بشكل آمن",
                description: "إزالة الأوساخ والمواد الملوثة بشكل متبع للإجراءات المعقمة.",
            },
            {
                icon: "/src/assets/icons/heart-pulse.svg",
                title: "تغيير الضماد المناسب",
                description: "اختيار نوع الضمادة الملائمة للجرح ومرحلة الشفاء.",
            },
            {
                icon: "/src/assets/icons/chat.svg",
                title: "إرشادات الرعاية المنزلية",
                description: "توجيه المريض أو الأسرة حول العناية المناسبة في المنزل.",
            },
            {
                icon: "/src/assets/icons/phone-outline.svg",
                title: "متابعة الحالة",
                description: "تقييم تطور الجرح وتحديد المواعيد التالية حسب التقدم.",
            },
        ],
        faq: [
            {
                question: "هل يتم تغيير الضماد في المنزل؟",
                answer: "نعم، يتم تنفيذ هذه الخدمة بواسطة فريق مدرب مع الالتزام بالمعايير المعقمة.",
            },
            {
                question: "هل هذه الخدمة مناسبة للجروح المزمنة؟",
                answer: "نعم، يمكن تقديم الرعاية اللازمة للجرح مع متابعة التقدم والالتئام.",
            },
            {
                question: "هل يوجد تعليمات بعد تغيير الضماد؟",
                answer: "نعم، سنشرح لك كيفية العناية المناسبة بالجرح في البيت ومتى يلزم المتابعة.",
            },
        ],
    },
];
