export const routes = {
    home: '/',
    services: (serviceId: string) => `/services/:${serviceId}`,
    careers: 'careers',
    reservation: 'reservation',
    medicalEquipment: 'medical-equipment'
}
