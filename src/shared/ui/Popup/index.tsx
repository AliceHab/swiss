import React from 'react'
import Image from 'next/image'

import { Button } from '../Button'

import cn from 'classnames'
import s from './styles.module.css'

export type PopupProps = {
  type: 'delete' | 'error' | 'success'
  name?: string
  onClick: () => void
  onCancel?: () => void
}

const DeletePopup = ({
  onClick,
  name,
  onCancel,
}: {
  onClick: () => void
  name: string
  onCancel: () => void
}) => (
  <div className={s.popupContent}>
    <Image
      src="/images/DeletePopup.png"
      alt="Удаление пользователя"
      className={s.image}
      width={80}
      height={80}
    />
    <p className={s.errorText}>Вы хотите удалить пользователя:</p>
    <p className={s.errorName}>{name}</p>
    <div className={cn(s.button, s.buttonsDelete)}>
      <Button onClick={onClick} size="xs" className={s.delete_button}>
        Удалить
      </Button>
      <Button onClick={onCancel} size="xs" className={s.cancelDelete_button}>
        Отменить
      </Button>
    </div>
  </div>
)

const ServerErrorPopup = ({ onClick }: { onClick: () => void }) => (
  <div className={s.popupContent}>
    <Image
      src="/images/ErrorPopup.png"
      alt="Ошибка на сервере"
      className={s.image}
      width={270}
      height={160}
    />
    <p className={s.text}>Произошла ошибка на сервере</p>
    <Button onClick={onClick} variant="light" className={s.button}>
      Закрыть
    </Button>
  </div>
)

const SuccessPopup = ({ onClick }: { onClick: () => void }) => (
  <div className={s.popupContent}>
    <Image
      src="/images/SuccessPopup.png"
      alt="Успешно"
      className={s.image}
      width={80}
      height={80}
    />
    <p className={s.text}>Данные успешно сохранены</p>
    <Button onClick={onClick} variant="default" className={s.button}>
      Закрыть
    </Button>
  </div>
)

export const Popup = ({ type, onClick, onCancel, name }: PopupProps) => {
  const renderContent = () => {
    switch (type) {
      case 'delete':
        return <DeletePopup onClick={onClick} name={name} onCancel={onCancel} />
      case 'error':
        return <ServerErrorPopup onClick={onClick} />
      case 'success':
        return <SuccessPopup onClick={onClick} />
      default:
        return null
    }
  }

  return (
    <div>
      <div className={cn(s.popupOverlay)} onClick={onClick} />
      <div className={cn(s.popupContainer)}>{renderContent()}</div>
    </div>
  )
}
