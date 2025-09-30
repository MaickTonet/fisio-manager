export const educationLevels = [
  { value: 'elementary', label: 'Ensino Fundamental' },
  { value: 'middle', label: 'Ensino Médio' },
  { value: 'high', label: 'Ensino Superior Incompleto' },
  { value: 'technical', label: 'Ensino Técnico' },
  { value: 'undergraduate', label: 'Ensino Superior Completo' },
  { value: 'graduate', label: 'Pós-graduação' },
  { value: 'postgraduate', label: 'Mestrado/Doutorado' },
]

export const educationLevelsMap: Record<string, string> = {
  elementary: 'Ensino Fundamental',
  middle: 'Ensino Médio',
  high: 'Ensino Superior Incompleto',
  technical: 'Ensino Técnico',
  undergraduate: 'Ensino Superior Completo',
  graduate: 'Pós-graduação',
  postgraduate: 'Mestrado/Doutorado',
}
