import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Controller, useForm, FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '@/src/shared/ui/Button'
import { Toggle } from '@/src/shared/ui/Toggle'
import { Select, SelectItem } from '@/src/shared/ui/Select/Select'
import { DatePickerComponent } from '@/src/shared/ui/DatePicker'
import { Input } from '@/src/shared/ui/Input'
import { Search } from '@/src/shared/ui/Icons/assets/Search'
import { Danger } from '@/src/shared/ui/Icons/assets/Danger'
import { Popup } from '@/src/shared/ui/Popup'
import { Loader } from '@/src/shared/ui/Loader'
import { fetchUserById, updateUser } from '../api/EditUser'

import { User } from '@/src/entities/User/model/type'
import { registrationSchema, RegistrationFormData } from '../lib/registrationSchema'

import cn from 'classnames'
import s from './styles.module.css'

import { UserListLogic } from '../../UserList/lib/UserListLogic'

const EditUser = () => {
  const router = useRouter()
  const { id } = useParams<{ id: string | undefined }>()
  const [user, setUser] = useState<User | null>(null)
  const [popupType, setPopupType] = useState<'success' | 'error' | null>(null)
  const [_error, setError] = useState<string | null>(null)
  const [_isFocused, setIsFocused] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { getUsers } = UserListLogic()

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
    mode: 'onBlur',
  })

  const genderValue = watch('gender')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserById(Number(id))
        setUser(userData)
      } catch (err) {
        setError('Не удалось получить данные')
        toast.error('Не удалось получить данные.')
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    if (user) {
      reset({
        username: `${user.last_name} ${user.first_name}`,
        gender: user.gender,
        role: user.role as 'doctor' | 'nurse' | 'admin',
        dateOfBirth: user.birthdate ? new Date(user.birthdate) : undefined,
      })
    }
  }, [user, reset])

  const onSubmit = async (data: RegistrationFormData) => {
    if (!user) return
    setIsSubmitting(true)

    try {
      const [lastName, firstName] = data.username.split(' ')

      const updatedUser = await updateUser(
        Number(id),
        {
          ...user,
          first_name: firstName || '',
          last_name: lastName || '',
          gender: data.gender,
          role: data.role,
          birthdate: data.dateOfBirth.toISOString(),
        },
        getUsers
      )
      setUser(updatedUser)
      setPopupType('success')
    } catch (err) {
      setPopupType('error')
    } finally {
      setIsSubmitting(false)
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
      const errorMessage =
        errors[firstErrorField]?.message || 'Проверье корректность заполнения полей'
      toast.error(errorMessage)
    }
  }

  return (
    <div className={cn(s.wrapper)}>
      <div className={cn(s.bg)}></div>
      <form onSubmit={handleSubmit(onSubmit, onError)} className={cn(s.form)}>
        <h1 className={cn(s.header)}>Редактировать пользователя</h1>
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
          />
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
                  onBlur={() => field.onBlur()}
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
                onBlur={() => field.onBlur()}
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
          <Button type="submit">{isSubmitting ? <Loader size="s" /> : 'Сохранить'}</Button>
          <Button variant="light" onClick={onCancel} type="button">
            Отменить
          </Button>
        </div>
      </form>

      {popupType === 'success' && (
        <Popup
          type="success"
          onClick={() => {
            setPopupType(null)
            onCancel()
          }}
        />
      )}
      {popupType === 'error' && (
        <Popup
          type="error"
          onClick={() => {
            setPopupType(null)
            onCancel()
          }}
        />
      )}
    </div>
  )
}

export default EditUser
