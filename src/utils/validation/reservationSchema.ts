import { z } from 'zod'

const reservationSchema = z.object({
    name: z.string('Phone nubmer must be a string').min(6, 'Name must be at least 6 characters long').max(256, 'Name can not be more than 256 characters long'),
    phoneNumber: z.string('Phone nubmer must be a string').min(4, 'Phone number must be at least 4 characters long').max(20, 'Phone number can not be more than 20 characters long'),
    reservationDate: z.string('Reservation date must be a string').min(1, "Reservation date is required"),
    address: z.string('Address must be a string').min(1, "Address is required"),
    age: z.coerce.number('Age must be a number').nonnegative('Age can not be negative').optional(),
    services: z.array(z.string('A service must be a string')).optional(),
    healthIssue: z.string('Health issue must be a string').optional(),
    notes: z.string('Notes must be a string').optional()
})

export type ReservationFormFields = z.infer<typeof reservationSchema>;

export default reservationSchema