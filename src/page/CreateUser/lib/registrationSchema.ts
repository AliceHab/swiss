import { z } from 'zod'

export const registrationSchema = z.object({
  username: z.string().min(1, 'Укажите имя'),
  gender: z.enum(['male', 'female'], {
    required_error: 'Укажите пол',
  }),
  role: z.enum(['doctor', 'nurse', 'admin'], {
    required_error: 'Укажить роль',
  }),
  birthdate: z
    .date({
      required_error: 'Укажите дату рождения',
      invalid_type_error: 'Введен неверный формат даты',
    })
    .refine(
      (date) => {
        if (!date) return false
        const today = new Date()
        const ageDiff = today.getFullYear() - date.getFullYear()
        const monthDiff = today.getMonth() - date.getMonth()
        const dayDiff = today.getDate() - date.getDate()

        let age = ageDiff
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--
        }

        return age >= 18
      },
      {
        message: 'Пользователь должен быть старше 18 лет',
      }
    ),

  first_name: z.string().optional(),
  last_name: z.string().optional(),
  avatar: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true
      try {
        const url = new URL(val)
        return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url.pathname)
      } catch {
        return false
      }
    }),
  email: z.string().email().optional(),
})

export type RegistrationFormData = z.infer<typeof registrationSchema>
