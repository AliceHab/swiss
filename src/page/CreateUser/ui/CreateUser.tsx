import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Controller, useForm, FieldErrors, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import cn from 'classnames'
import { toast } from 'sonner'

import { Button } from '@/src/shared/ui/Button'
import { Toggle } from '@/src/shared/ui/Toggle'
import { Select, SelectItem } from '@/src/shared/ui/Select/Select'
import { DatePickerComponent } from '@/src/shared/ui/DatePicker'
import { Input } from '@/src/shared/ui/Input'
import { Search } from '@/src/shared/ui/Icons/assets/Search'
import { Danger } from '@/src/shared/ui/Icons/assets/Danger'
import { Popup } from '@/src/shared/ui/Popup'
import { AddNewUserForm } from '@/src/shared/ui/AddNewUser'
import { SearchList } from '@/src/shared/ui/SearchList'
import { fetchUsers } from '../api/CreateUser'
import { createUser } from '../api/CreateUser'

import { User } from '@/src/entities/User/model/type'
import { registrationSchema, RegistrationFormData } from '../lib/registrationSchema'

import s from './styles.module.css'
import { Loader } from '@/src/shared/ui/Loader'

const CreateUser = () => {
  const router = useRouter()

  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [openNewUserModal, setOpenNewUserModal] = useState<boolean>(false)
  const [_error, setError] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [popupType, setPopupType] = useState<'success' | 'error' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onBlur',
  })

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setFocus,
    setValue,
    formState: { errors },
  } = methods

  const usernameValue = watch('username')
  const genderValue = watch('gender')
  const firstNameValue = watch('first_name')
  const lastNameValue = watch('last_name')

  const { ref, onBlur, ...usernameRest } = register('username')

  useEffect(() => {
    if (firstNameValue && lastNameValue) {
      setValue('username', `${lastNameValue} ${firstNameValue}`)
    }
  }, [firstNameValue, lastNameValue, setValue])

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true)
    try {
      const { username, ...dataWithoutUsername } = data
      const submissionData = currentUser
        ? {
            ...dataWithoutUsername,
            email: currentUser.email,
            avatar: currentUser.avatar,
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
          }
        : {
            ...dataWithoutUsername,
          }

      await createUser(submissionData)
      setPopupType('success')
      reset()
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

  useEffect(() => {
    const getUsers = async () => {
      setError(null)
      try {
        const fetchedUsers = await fetchUsers()
        setUsers(fetchedUsers.data)
      } catch (err) {
        setError('Не удалось загрузить пользователей.')
        toast.error('Не удалось загрузить пользователей.')
      }
    }

    getUsers()
  }, [])

  useEffect(() => {
    if (currentUser) {
      reset({
        username: `${currentUser.last_name} ${currentUser.first_name}`,
      })
    }
  }, [currentUser, reset])

  return (
    <div className={cn(s.wrapper)}>
      <div className={cn(s.bg)}></div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit, onError)} className={cn(s.form)}>
          <h1 className={cn(s.header)}>Добавить нового пользователя</h1>
          <div className={cn(s.search)}>
            <p className={cn(s.text)}>Найти в списке</p>
            <Input
              before={
                <Search stroke={!!errors.username ? 'var(--critic-s)' : 'var(--accent-1s)'} />
              }
              after={!!errors.username ? <Danger /> : ''}
              placeholder="Пользователь"
              {...register('username')}
              {...usernameRest}
              ref={ref}
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => {
                onBlur(e)
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setIsFocused(false)
                }
              }}
              error={!!errors.username}
            >
              {usernameValue && isFocused && (
                <SearchList
                  users={users}
                  value={usernameValue}
                  setOpenNewUserModal={setOpenNewUserModal}
                  setCurrentUser={setCurrentUser}
                />
              )}
            </Input>
          </div>

          <div className={cn(s.options)}>
            {/* fix layout bug when opening date-picker */}
            <div>
              <Controller
                control={control}
                name="birthdate"
                render={({ field }) => (
                  <DatePickerComponent
                    placeholder="Дата рождения"
                    onChange={(date: Date | null) => field.onChange(date)}
                    onBlur={() => field.onBlur()}
                    value={field.value}
                    error={!!errors.birthdate}
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
            <Button type="submit">{isSubmitting ? <Loader size="s" /> : 'Добавить'}</Button>
            <Button variant="light" onClick={onCancel} type="button">
              Отменить
            </Button>
          </div>
          {openNewUserModal && <AddNewUserForm setOpenNewUserModal={setOpenNewUserModal} />}
        </form>
      </FormProvider>

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

export default CreateUser
