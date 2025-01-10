import { useEffect } from 'react'
import Link from 'next/link'
import { PlusIcon } from '@radix-ui/react-icons'
import cn from 'classnames'

import { Button } from '@/src/shared/ui/Button'
import { Input } from '@/src/shared/ui/Input'
import { Loader } from '@/src/shared/ui/Loader'
import { HeaderUsersList } from './Header/Header'
import { UserCard } from '@/src/entities/User/ui/UserCard'

import s from './styles.module.css'
import { declension } from '@/src/entities/User/ui/Declension'

import { UserListLogic } from '../lib/UserListLogic'

const UserList = () => {
  const {
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
  } = UserListLogic()

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className={cn(s.page)}>
      <header className={cn(s.wrapper)}>
        <div className={cn(s.header)}>
          <h1 className={cn(s.h1)}>Пользователи клиники</h1>
          <p className={cn(s.h1, s.count)}>{declension(users.length)}</p>
          <Link href="/create-user" className={cn(s.button)}>
            <Button variant="green" size="small">
              <div className={cn(s.icon)}>
                <PlusIcon />
              </div>
              <span>Добавить нового пользователя</span>
            </Button>
          </Link>
        </div>
        <div className={cn(s.toolbar)}>
          <Input value={searchQuery} onChange={handleSearchChange} placeholder="Поиск..." />
          <HeaderUsersList
            onSort={handleLastNameSort}
            onSortDate={handleBirthdateSort}
            onSortGender={handleGenderSort}
            sortDirection={sortDirection}
          />
        </div>
      </header>
      <main className={cn(s.list)}>
        {loading ? (
          <Loader />
        ) : (
          filteredUsers.map((card) => (
            <UserCard user={card} key={card.id} handleDeleteUser={handleDeleteUser} />
          ))
        )}
      </main>
    </div>
  )
}

export default UserList
