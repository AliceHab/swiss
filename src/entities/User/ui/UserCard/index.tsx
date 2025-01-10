import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import cn from 'classnames'

import s from './styles.module.css'
import { Venus } from '@/src/shared/ui/Icons/assets/Venus'
import { Edit } from '@/src/shared/ui/Icons/assets/Edit'
import { Delete } from '@/src/shared/ui/Icons/assets/Delete'
import { Mars } from '@/src/shared/ui/Icons/assets/Mars'
import { deleteUser } from './api/UserCard'
import { Popup } from '@/src/shared/ui/Popup'
import { User } from '../../model/type'

type UserCardProps = {
  user: User
  handleDeleteUser: (id: number) => void
}

export function UserCard({
  user: { id, email, first_name, last_name, avatar, birthdate, gender },
  handleDeleteUser,
}: UserCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const genderIcon = gender === 'Женский' ? <Venus /> : <Mars />
  const role = gender === 'Женский' ? 'Медсестра' : 'Медбрат'

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteUser(id)
      handleDeleteUser(id)
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const formattedDate = !isNaN(Date.parse(birthdate))
    ? new Date(birthdate).toLocaleDateString('ru-RU')
    : 'Загрузка...'

  return (
    <>
      <li className={cn(s.card)}>
        <Image
          src={avatar}
          alt={`${first_name} ${last_name}`}
          className={s.image}
          width={44}
          height={44}
        />
        <p className={cn(s.text, s.name)}>{`${first_name} ${last_name}`}</p>
        <div className={cn(s.email)}>
          <a href={`mailto:${email}`} className={cn(s.text, s.emailText)}>
            {email}
          </a>
        </div>
        <p className={cn(s.text, s.date)}>{formattedDate || 'Загрузка...'}</p>
        <div className={cn(s.text, s.gender)}>
          {genderIcon}
          <span>{gender}</span>
        </div>
        <p className={cn(s.text, s.role)}> {gender === 'Женский' ? 'Медсестра' : 'Медбрат'}</p>
        <div className={cn(s.buttons)}>
          <Link className={cn(s.button)} href={`/edit-user/${id}`}>
            <button>
              <Edit stroke="var(--base-sl)" />
            </button>
          </Link>
          <button
            className={cn(s.button)}
            onClick={() => setIsDeleting(true)}
            disabled={isDeleting}
          >
            <Delete stroke="var(--base-sl)" />
          </button>
        </div>
      </li>
      {isDeleting && (
        <Popup
          type="delete"
          onClick={handleDelete}
          onCancel={() => setIsDeleting(false)}
          name={`${last_name} ${first_name}`}
        />
      )}
    </>
  )
}
