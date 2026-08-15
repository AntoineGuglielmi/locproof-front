export const dateShort = (date: Date | string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    month: 'short',
    year: 'numeric',
  })
}

export const formatDateForStrapi = (date: Date | string): string => {
  if (typeof date === 'string') {
    return date.slice(0, 10)
  }

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}
