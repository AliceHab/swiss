import cn from 'classnames'

import { Button } from '../Button'
import { AddUser } from '../Icons/assets/AddUser'
import { highlight } from '../../lib/highlightText'

import s from './styles.module.css'
import { User } from '@/src/entities/User/model/type'

export type UsersArray = User[]
type SerchListProps = {
  users: UsersArray
  value: string
  setOpenNewUserModal: () => void
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>
}

export const SearchList = ({
  users,
  value,
  setOpenNewUserModal,
  setCurrentUser,
}: SerchListProps) => {
  const filteredUsers = users.filter((user) => {
    return user.last_name.toLowerCase().includes(value.toLowerCase())
  })

  const STORAGE_KEY = 'userListData'
  const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  console.log(storedUsers, filteredUsers)

  return (
    <ul className={cn(s.list)}>
      {filteredUsers.map((user) => {
        const isBusy = storedUsers.some(
          (storedUser) => String(storedUser.email) === String(user.email)
        )

        return (
          <li
            key={user.id}
            className={cn(s.item, {
              [s.busy]: isBusy,
            })}
            tabIndex={0}
            onMouseDown={() => {
              setCurrentUser(user)
            }}
          >
            {highlight(user.last_name, value)} {user.first_name.charAt(0)}.
          </li>
        )
      })}
      {filteredUsers.length === 0 && (
        <>
          <li className={cn(s.item)}>
            Пользователя с такими параметрами <b>не найден</b>, проверьте правильность написания или
            создайте нового!
          </li>
          <Button
            className={cn(s.addButton)}
            type="button"
            onMouseDown={() => {
              console.log('open')

              setOpenNewUserModal(true)
            }}
          >
            <AddUser />
            <span>Добавить пользователя</span>
          </Button>
        </>
      )}
    </ul>
  )
}
