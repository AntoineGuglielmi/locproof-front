export const dateShort = (date: Date | string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    month: 'short',
    year: 'numeric',
  })
}
