import { z } from 'zod'

export const registrationSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  gender: z.enum(['male', 'female'], {
    required_error: 'Gender is required',
  }),
  role: z.enum(['doctor', 'nurse', 'admin'], {
    required_error: 'Role is required',
    invalid_type_error: 'Invalid role selection',
  }),
  dateOfBirth: z
    .date({
      required_error: 'Date of birth is required',
      invalid_type_error: 'Invalid date format',
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
        message: 'Пользователь должен быть не младше 18 лет',
      }
    ),
})

export type RegistrationFormData = z.infer<typeof registrationSchema>
