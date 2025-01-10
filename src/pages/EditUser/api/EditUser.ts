import { get, patch } from '@/src/shared/api'
import { User } from '@/src/entities/User/model/type'

const STORAGE_KEY = 'userListData'

export type EditUserRequest = User
export type EditUserResponse = EditUserRequest & {
  updatedAt: string
}

export const fetchUserById = async (id: number): Promise<User> => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY)
    if (storedData) {
      const users = JSON.parse(storedData)
      const user = users.find((u: User) => u.id === id)
      if (user) {
        return user
      }
    }

    const response = await get<User>({ path: `/users/${id}` })
    const user = response.data

    const users = storedData ? JSON.parse(storedData) : []
    users.push(user)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))

    return user
  } catch (error) {
    console.error(`Ошибка получения пользователя ${id}:`, error)
    throw error
  }
}

export const updateUser = async (
  id: number,
  userData: EditUserRequest
): Promise<EditUserResponse> => {
  try {
    const response = await patch<EditUserRequest, EditUserResponse>({
      path: `/users/${id}`,
      body: userData,
      config: {},
    })

    if (response.status === 200) {
      const storedData = localStorage.getItem(STORAGE_KEY)
      if (storedData) {
        const users = JSON.parse(storedData)
        const userIndex = users.findIndex((u: User) => u.id === id)
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...userData }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
        }
      }

      return response.data
    } else {
      throw new Error(`Ошибка при обновлении пользователя ${id}: ${response.status}`)
    }
  } catch (error) {
    console.error(`Ошибка при обновлении пользователя  ${id}:`, error)
    throw error
  }
}
