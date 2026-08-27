export const routes = {
    home: '/',
    sentSuccessfully: '/sent-successfully',
    services: (serviceId: string) => `/services/${serviceId}`,
    servicesPattern: '/services/:serviceId',
    careers: '/careers',
    reservation: '/reservation',
    medicalEquipments: '/medical-equipments',
    medicalEquipmentDetailsPattern: '/medical-equipments/:equipmentId',
    medicalEquipmentDetails: (equipmentId: string) => `/medical-equipments/${equipmentId}`,
    notFound: '*'
}
