import { z } from 'zod'

const file = z.file()
    .max(5 * 1024 * 1024, 'حجم الملف يجب ألا يتجاوز 5 ميجابايت')
    .refine(file => file.type.startsWith('image/') || [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ].includes(file.type), 'نوع الملف غير مدعوم');
const files = (schema: z.ZodArray<typeof file>) => z.preprocess(
    value => typeof FileList !== 'undefined' && value instanceof FileList ? Array.from(value) : value,
    schema,
);

const careerSchema = z.object({
    name: z.string('Phone nubmer must be a string').min(6, 'Name must be at least 6 characters long').max(256, 'Name can not be more than 256 characters long'),
    phoneNumber: z.string('Phone nubmer must be a string').min(4, 'Phone number must be at least 4 characters long').max(20, 'Phone number can not be more than 20 characters long'),
    address: z.string('Address must be a string').min(1, "Address is required"),
    position: z.array(z.string('Position must be a string')).min(1, "You must choose a position to apply to"),
    yoe: z.coerce.number('Years of Experience must be a number').nonnegative('Years of Experience can not be negative'),
    ID: files(z.array(file).min(1, 'صورة البطاقة مطلوبة').max(2, 'يمكنك رفع صورتين للبطاقة كحد أقصى')),
    workId: files(z.array(file).max(1, 'يمكنك رفع ملف واحد فقط للكارنيه')).optional(),
    graduationCerteficate: files(z.array(file).max(1, 'يمكنك رفع ملف واحد فقط لشهادة التخرج')).optional(),
    workPlaces: z.string('Work places must be a string').optional(),
    age: z.coerce.number('Age must be a number').nonnegative('Age can not be negative').optional(),
})
// id, work id (carneh), graduation certificate, places of work
export type CareerFormFields = z.output<typeof careerSchema>;

export default careerSchema