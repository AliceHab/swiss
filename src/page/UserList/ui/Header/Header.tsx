import cn from 'classnames'
import s from './styles.module.css'

import { Arrows } from '@/src/shared/ui/Icons/assets/Arrows'

type HeaderUsersListProps = {
  onSort: () => void
  sortDirection: boolean
  onSortDate: () => void
  onSortGender: () => void
}

export const HeaderUsersList = ({
  onSort,
  sortDirection,
  onSortDate,
  onSortGender,
}: HeaderUsersListProps) => {
  return (
    <div className={cn(s.wrapper)}>
      <div className={cn(s.name)}>
        <p className={cn(s.text)}>ФИО пользователя</p>
        <button className={cn(s.button, s.alphabet)} onClick={onSort}>
          <span>{sortDirection ? 'По алфавиту Я-А' : 'По алфавиту А-Я'}</span>
          <Arrows color="var(--faint-w-line)" />
        </button>
      </div>
      <p className={cn(s.button, s.email)}>Контактные данные</p>
      <div className={cn(s.date)}>
        <button className={cn(s.button)} onClick={onSortDate}>
          Дата рождения
        </button>
      </div>
      <div className={cn(s.gender)}>
        <button className={cn(s.button)} onClick={onSortGender}>
          Пол
        </button>
      </div>
      <p className={cn(s.role)}>Роль</p>
    </div>
  )
}
