/**
 * Функция для определения правильного окончания слова "человек" в зависимости от числа
 * @param count - Число людей
 * @returns - Слово с правильным окончанием
 */
export function declension(count: number): string {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${count} человек`
  }

  if (lastDigit === 1) {
    return `${count} человек`
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} человека`
  } else {
    return `${count} человек`
  }
}
