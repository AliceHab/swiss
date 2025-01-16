import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'

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

export function UserCard({ user, handleDeleteUser }: UserCardProps) {
  const { id, email, first_name, last_name, avatar, birthdate, gender } = user

  console.log('Rendering UserCard:', user)

  const [isDeleting, setIsDeleting] = useState(false)

  const genderIcon = gender === 'female' ? <Venus /> : <Mars />
  const role = gender === 'female' ? 'Медсестра' : 'Медбрат'
  const genderName = gender === 'female' ? 'Женский' : 'Мужской'

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteUser(id)
      handleDeleteUser(id)
      toast(`${first_name} ${last_name} удален/а`)
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
          <span>{genderName}</span>
        </div>
        <p className={cn(s.text, s.role)}>{role}</p>
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
