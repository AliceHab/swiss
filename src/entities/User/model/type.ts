export type User = {
  surname: string
  role: string
  gender: 'male' | 'female' | 'Женский' | 'Мужской'
  birthdate: string
  avatar: string
  email?: string
  first_name?: string
  id?: number
  last_name?: string
}