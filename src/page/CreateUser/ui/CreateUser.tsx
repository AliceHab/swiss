import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Controller, useForm, FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import cn from 'classnames'

import { Button } from '@/src/shared/ui/Button'
import { Toggle } from '@/src/shared/ui/Toggle'
import { Select, SelectItem } from '@/src/shared/ui/Select/Select'
import { DatePickerComponent } from '@/src/shared/ui/DatePicker'
import { Input } from '@/src/shared/ui/Input'
import { Search } from '@/src/shared/ui/Icons/assets/Search'
import { Danger } from '@/src/shared/ui/Icons/assets/Danger'
import { Popup } from '@/src/shared/ui/Popup'
import { SearchList } from '@/src/shared/ui/SearchList'
import { fetchUsers } from '../api/CreateUser'
import { createUser } from '../api/CreateUser'

import { User } from '@/src/entities/User/model/type'
import { registrationSchema, RegistrationFormData } from '../lib/registrationSchema'

import s from './styles.module.css'

const CreateUser = () => {
  const router = useRouter()

  const [users, setUsers] = useState<User[]>([])
  const [_error, setError] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [popupType, setPopupType] = useState<'success' | 'error' | null>(null)

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  })

  const usernameValue = useMemo(() => watch('username'), [watch])
  const genderValue = useMemo(() => watch('gender'), [watch])

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      await createUser(data)
      setPopupType('success')
      reset()
    } catch (err) {
      setPopupType('error')
    }
  }

  const onCancel = () => {
    reset()
    router.back()
  }

  // auto-focus on error input
  const onError = (errors: FieldErrors<RegistrationFormData>) => {
    const firstErrorField = Object.keys(errors)[0] as keyof RegistrationFormData | undefined
    if (firstErrorField) {
      setFocus(firstErrorField)
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      setError(null)
      try {
        const fetchedUsers = await fetchUsers()
        setUsers(fetchedUsers.data)
        console.log('Fetched users:', fetchedUsers)
      } catch (err) {
        setError('Не удалось загрузить пользователей.')
        console.error('Error fetching users:', err)
      }
    }

    getUsers()
  }, [])

  return (
    <div className={cn(s.wrapper)}>
      <div className={cn(s.bg)}></div>
      <form onSubmit={handleSubmit(onSubmit, onError)} className={cn(s.form)}>
        <h1 className={cn(s.header)}>Добавить нового пользователя</h1>
        <div className={cn(s.search)}>
          <p className={cn(s.text)}>Найти в списке</p>
          <Input
            before={<Search stroke={!!errors.username ? 'var(--critic-s)' : 'var(--accent-1s)'} />}
            after={!!errors.username ? <Danger /> : ''}
            placeholder="Пользователь"
            {...register('username')}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            error={!!errors.username}
          >
            {usernameValue && isFocused && (
              <SearchList users={users} value={usernameValue} onClick={handleSubmit(onSubmit)} />
            )}
          </Input>
        </div>

        <div className={cn(s.options)}>
          {/* fix layout bug when opening date-picker */}
          <div>
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field }) => (
                <DatePickerComponent
                  placeholder="Дата рождения"
                  onChange={(date: Date | null) => field.onChange(date)}
                  value={field.value}
                  error={!!errors.dateOfBirth}
                />
              )}
            />
          </div>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Toggle value={field.value} onChange={field.onChange} error={!!errors.gender} />
            )}
          />
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Роль"
                value={field.value}
                onValueChange={field.onChange}
                error={!!errors.role}
              >
                <SelectItem value="doctor">Доктор</SelectItem>
                <SelectItem value="nurse">
                  {genderValue === 'female' ? 'Медсестра' : 'Медбрат'}
                </SelectItem>
                <SelectItem value="admin">Админ</SelectItem>
              </Select>
            )}
          />
        </div>

        <div className={cn(s.buttons)}>
          <Button type="submit">Добавить</Button>
          <Button variant="light" onClick={onCancel} type="button">
            Отменить
          </Button>
        </div>
      </form>

      {popupType === 'success' && <Popup type="success" onClick={() => setPopupType(null)} />}
      {popupType === 'error' && <Popup type="error" onClick={() => setPopupType(null)} />}
    </div>
  )
}

export default CreateUser
