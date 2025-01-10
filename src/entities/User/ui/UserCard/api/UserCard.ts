import { del } from '@/src/shared/api'

export async function deleteUser(userId: number): Promise<void> {
  try {
    const response = await del<void>({
      path: `/users/${userId}`,
      config: {},
    })

    if (response.status !== 204) {
      throw new Error(`Ошибка при удалении пользователя: ${response.status}`)
    }
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error)
    throw error
  }
}
