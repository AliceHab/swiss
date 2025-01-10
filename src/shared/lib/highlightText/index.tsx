export const highlight = (text: string, query: string) => {
  if (!query) return text

  const regex = new RegExp(`(${query})`, 'i')
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <b key={index} className="highlight">
            {part}
          </b>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  )
}
