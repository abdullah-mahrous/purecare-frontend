export const contacts = {
    emergencyNumber: '+201212900739',
    phoneNumber: "+201556585858",
    whatsappNumber: '+201556585858',
    whatsappUrl: (number: string, message: string): string => `https://wa.me/${number}?text=${message}`,
    facebook: '',
    instagram: '',
    tiktook: '',
};

export const inquiryMessage = encodeURIComponent(
    "Hello! I'd like to inquire about your home nursing services."
);
