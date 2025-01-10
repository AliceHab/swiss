import { useState } from 'react'
import { User } from '@/src/entities/User/model/type'
import { fetchUsers } from '../api/UserList'
import { getRandomDateOfBirth } from '@/src/entities/User/ui/BirthdayDate'
import { getRandomGender } from '@/src/entities/User/ui/Gender'

const STORAGE_KEY = 'userListData'

export const UserListLogic = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [sortDirection, setSortDirection] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase()
    return fullName.includes(searchQuery.toLowerCase())
  })

  const handleLastNameSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      const lastNameA = a?.last_name?.toLowerCase() ?? ''
      const lastNameB = b?.last_name?.toLowerCase() ?? ''
      return sortDirection
        ? lastNameB.localeCompare(lastNameA, 'en')
        : lastNameA.localeCompare(lastNameB, 'en')
    })
    setUsers(sortedUsers)
    setSortDirection((sortDirection) => !sortDirection)
  }

  const handleBirthdateSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      const birthdateA = new Date(a?.birthdate)
      const birthdateB = new Date(b?.birthdate)
      return sortDirection
        ? birthdateB.getFullYear() - birthdateA.getFullYear()
        : birthdateA.getFullYear() - birthdateB.getFullYear()
    })
    setUsers(sortedUsers)
    setSortDirection((sortDirection) => !sortDirection)
  }

  const handleGenderSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      return sortDirection
        ? b.gender.localeCompare(a.gender, 'en')
        : a.gender.localeCompare(b.gender, 'en')
    })
    setUsers(sortedUsers)
    setSortDirection((sortDirection) => !sortDirection)
  }

  const handleDeleteUser = async (userId: number) => {
    try {
      setLoading(true)
      const storedData = localStorage.getItem(STORAGE_KEY)
      if (!storedData) return

      const updatedUsers = users.filter((user) => user.id !== userId)

      setUsers(updatedUsers)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers))
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error)
    } finally {
      setLoading(false)
    }
  }

  const getUsers = async () => {
    try {
      setLoading(true)
      const storedData = localStorage.getItem(STORAGE_KEY)
      if (storedData) {
        setUsers(JSON.parse(storedData))
        setLoading(false)
        return
      }

      const fetchedUsers = await fetchUsers()

      const usersWithDOBAndGender = fetchedUsers.data.map((user: User[]) => ({
        ...user,
        birthdate: getRandomDateOfBirth(), // random date of birth since ReqRes doesn't support
        gender: getRandomGender(),
      }))

      setUsers(usersWithDOBAndGender)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usersWithDOBAndGender))
    } catch (err) {
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  return {
    users,
    loading,
    sortDirection,
    searchQuery,
    handleSearchChange,
    filteredUsers,
    handleLastNameSort,
    handleBirthdateSort,
    handleGenderSort,
    handleDeleteUser,
    getUsers,
  }
}
