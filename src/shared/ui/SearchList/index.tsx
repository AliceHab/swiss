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
  onClick: () => void
}

export const SearchList = ({ users, value, onClick }: SerchListProps) => {
  const filteredUsers = users.filter((user) => {
    return user.last_name.toLowerCase().includes(value.toLowerCase())
  })

  return (
    <ul className={cn(s.list)}>
      {filteredUsers.map((user) => (
        <li key={user.id} className={cn(s.item)}>
          {highlight(user.last_name, value)} {user.first_name.charAt(0)}.
        </li>
      ))}
      {filteredUsers.length === 0 && (
        <>
          <li className={cn(s.item)}>
            Пользователя с такими параметрами <b>не найден</b>, проверьте правильность написания или
            создайте нового!
          </li>
          <Button
            className={cn(s.addButton)}
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              onClick()
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
