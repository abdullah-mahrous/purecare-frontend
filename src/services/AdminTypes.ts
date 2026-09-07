export type Tab =
    | 'website'
    | 'services'
    | 'faqs'
    | 'testimonials'
    | 'equipment'
    | 'reservations'
    | 'careers';

export type CollectionRecord = Record<string, unknown> & { id: string };

export type DetailKind = 'included-services' | 'targeted-customers';