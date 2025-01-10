export function getRandomDateOfBirth(minAge: number = 18, maxAge: number = 65): Date {
  const currentDate = new Date()

  const startYear = currentDate.getFullYear() - maxAge
  const endYear = currentDate.getFullYear() - minAge

  const year = getRandomInt(startYear, endYear)
  const month = getRandomInt(0, 11) // Месяцы от 0 до 11
  const day = getRandomInt(1, daysInMonth(year, month))

  return new Date(year, month, day)
}

/**
 * Returns a random integer between min and max (inclusive).
 * @param {number} min
 * @param {number} max
 * @returns {number} a random integer
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * returns the number of days in the specified month and year.
 * @param {number} year Year.
 * @param {number} month Month (0-11).
 * @returns {number} number of days.
 */
function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}
