import z from 'zod'

export const newAppointmentSchema = z.object({
  // Personal Information
  patientName: z.string('Nome do paciente inválido').min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome muito longo'),
  birthDate: z.date({ error: 'Data de nascimento inválida' }),
  age: z.number('Insira uma idade válida').min(1, 'Idade deve ser maior que 0').max(150, 'Idade inválida'),
  gender: z.enum(['masculine', 'feminine'], { error: 'Selecione o sexo' }),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed'], { error: 'Selecione o estado civil' }),

  // Contact Information
  phone: z.string('Telefone inválido').min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  commercialPhone: z.string('Telefone inválido').min(10, 'Telefone deve ter pelo menos 10 dígitos').optional(),
  address: z.string('Insira um endereço válido').min(5, 'Endereço deve ter pelo menos 5 caracteres').max(100, 'Endereço muito longo'),
  neighborhood: z.string('Insira um bairro válido').min(2, 'Bairro deve ter pelo menos 2 caracteres').max(100, 'Bairro muito longo'),
  city: z.string('Insira uma cidade válida').min(2, 'Cidade deve ter pelo menos 2 caracteres').max(100, 'Cidade muito longo'),
  state: z.string().min(1, 'Selecione o estado'),
  zipCode: z
    .string()
    .length(9, 'CEP deve ter 8 dígitos')
    .regex(/^\d{5}-\d{3}$/, 'Formato de CEP inválido'),
  emergencyContact: z.string().min(1, 'Contato de emergência é obrigatório').max(100, 'Contato de emergência muito longo'),

  // Medical Information
  education: z.enum(['elementary', 'middle', 'high', 'technical', 'undergraduate', 'graduate', 'postgraduate'], { error: 'Selecione a escolaridade' }),
  profession: z.string('Insira uma profissão válida').min(1, 'Profissão é obrigatória').max(100, 'Profissão muito longo'),
  clinicalDiagnosis: z.string().max(400, 'Diagnóstico clínico muito longo').optional(),
  symptoms: z.array(z.string()).min(1, 'Selecione pelo menos um sintoma').optional(),
  symptomsDescription: z.string().min(1, 'Descreva seus sintomas').max(100, 'Descreva seus sintomas muito longo').optional(),
  hasInsurance: z.boolean(),
  insuranceDescription: z.string().min(1, 'Descreva o plano de saúde').max(100, 'Descreva o plano de saúde muito longo').optional(),

  // Schedule
  selectedDate: z.date({ error: 'Selecione uma data' }),
  selectedTime: z.string().min(1, 'Selecione um horário'),
})
