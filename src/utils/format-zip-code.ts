export function formatZipCode(value: string) {
  const cleaned = value.replace(/\D/g, '')
  return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2')
}
