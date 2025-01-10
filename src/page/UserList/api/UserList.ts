import { get, post, put, patch, del } from '@/src/shared/api'
import { User } from '@/src/entities/User/model/type'

export type CreateUserRequest = User
export type CreateUserResponse = CreateUserRequest & {
  id: string
  createdAt: string
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await get<{ data: User[] }>({ path: '/users?page=1&per_page=8' })
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export async function createUser(user: User): Promise<CreateUserResponse> {
  try {
    const response = await post<CreateUserRequest, CreateUserResponse>({
      path: '/users',
      body: user,
      config: {},
    })

    if (response.status === 201 || response.status === 200) {
      return response.data
    } else {
      throw new Error(`Ошибка при создании пользователя: ${response.status}`)
    }
  } catch (error) {
    console.error('Ошибка:', error)
    throw error
  }
}
