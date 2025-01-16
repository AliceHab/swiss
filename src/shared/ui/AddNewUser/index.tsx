import React from 'react'
import { useFormContext } from 'react-hook-form'
import cn from 'classnames'

import { Button } from '../Button'
import { Danger } from '@/src/shared/ui/Icons/assets/Danger'
import { Input } from '../Input'

import s from './styles.module.css'

export const AddNewUserForm = ({
  setOpenNewUserModal,
}: {
  setOpenNewUserModal: (arg: boolean) => void
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext()

  const firstName = watch('first_name')
  const lastName = watch('last_name')
  const email = watch('email')
  const avatar = watch('avatar')

  const allFieldsValid =
    firstName && lastName && email && avatar && Object.keys(errors).length === 0
  console.log(allFieldsValid)

  return (
    <div>
      <div className={cn(s.popupOverlay)} onClick={() => setOpenNewUserModal(false)} />
      <div className={cn(s.popupContainer)}>
        <div className={s.popupContent}>
          <Input
            after={!!errors.first_name ? <Danger /> : ''}
            placeholder="Имя"
            {...register('first_name')}
            error={!!errors.username}
          />
          <Input
            after={!!errors.first_name ? <Danger /> : ''}
            placeholder="Фамилия"
            {...register('last_name')}
            error={!!errors.last_name}
          />
          <Input
            after={!!errors.first_name ? <Danger /> : ''}
            placeholder="Почта"
            {...register('email')}
            error={!!errors.email}
          />
          <Input
            after={!!errors.first_name ? <Danger /> : ''}
            placeholder="Ссылка на аватар"
            {...register('avatar')}
            error={!!errors.avatar}
          />

          <Button
            onClick={() => setOpenNewUserModal(false)}
            variant="default"
            className={s.button}
            type="button"
            disabled={!allFieldsValid}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  )
}
