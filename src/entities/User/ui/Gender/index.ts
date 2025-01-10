export function getRandomGender() {
  const genders = ['Мужской', 'Женский']
  const randomIndex = Math.floor(Math.random() * genders.length)
  return genders[randomIndex]
}
