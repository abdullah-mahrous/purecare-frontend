export const routes = {
    home: '/',
    sentSuccessfully: '/sent-successfully',
    services: (serviceId: string) => `/services/:${serviceId}`,
    careers: 'careers',
    reservation: 'reservation',
    medicalEquipment: 'medical-equipment',
    medicalEquipmentDetailsPattern: 'medical-equipment/:equipmentId',
    medicalEquipmentDetails: (equipmentId: string) => `/medical-equipment/${equipmentId}`,
}
