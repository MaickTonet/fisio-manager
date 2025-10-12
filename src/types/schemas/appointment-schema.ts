import z from 'zod'

export const appointmentSchema = z.object({
  id: z.string(),
  patientName: z.string(),
  birthDate: z.date(),
  age: z.number(),
  gender: z.string(),
  maritalStatus: z.string(),

  phone: z.string(),
  commercialPhone: z.string().optional(),
  address: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  emergencyContact: z.string(),

  education: z.string(),
  profession: z.string(),
  clinicalDiagnosis: z.string().optional(),
  symptoms: z.array(z.string()),
  symptomsDescription: z.string().optional(),
  hasInsurance: z.boolean(),
  insuranceDescription: z.string().optional(),

  selectedDate: z.date(),
  selectedTime: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),

  userId: z.string().nullable().optional(),
  status: z.string(),
})
