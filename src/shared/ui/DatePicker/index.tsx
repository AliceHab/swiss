import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ru from 'date-fns/locale/ru'

import { Calendar } from '../Icons/assets/Calendar'
import './styles.css'

registerLocale('ru', ru)
setDefaultLocale('ru')

type DatePickerComponentProps = {
  placeholder: string
  value: Date | null
  onChange: (date: Date | null) => void
  error?: boolean
  onBlur?: () => void
}

export const DatePickerComponent = ({
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}: DatePickerComponentProps) => {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      toggleCalendarOnIconClick
      showIcon
      onBlur={onBlur}
      icon={<Calendar stroke={error ? 'var(--critic-s)' : 'var(--accent-1s)'} />}
      placeholderText={placeholder}
      dateFormat="dd.MM.yyyy"
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      className={error ? 'error' : ''}
    />
  )
}
