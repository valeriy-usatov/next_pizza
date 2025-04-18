import { z } from 'zod';

const phoneMaskRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: 'Имя должно содержать не менее 2-х символов' }),
  lastName: z.string().min(2, { message: 'Фамилия должна содержать не менее 2-х символов' }),
  email: z.string().email({ message: 'Введите корректную почту' }),
  phone: z
  .string()
  .regex(phoneMaskRegex, {
    message: 'Введите корректный номер в формате'
  }),
  address: z.string().min(5, { message: 'Введите корректный адрес' }),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
