'use server'

import { db } from '@/database/database'
import { appointments } from '@/database/schema'
import { newAppointmentSchema } from '@/types/schemas/new-appointment-schema'
import { z } from 'zod'

export async function createAppointment(values: z.infer<typeof newAppointmentSchema>) {
  const parsed = newAppointmentSchema.parse(values)

  await db.insert(appointments).values({
    id: crypto.randomUUID(),
    patientName: parsed.patientName,
    birthDate: parsed.birthDate,
    age: parsed.age,
    gender: parsed.gender,
    maritalStatus: parsed.maritalStatus,
    phone: parsed.phone,
    commercialPhone: parsed.commercialPhone,
    address: parsed.address,
    neighborhood: parsed.neighborhood,
    city: parsed.city,
    state: parsed.state,
    zipCode: parsed.zipCode,
    emergencyContact: parsed.emergencyContact,
    education: parsed.education,
    profession: parsed.profession,
    clinicalDiagnosis: parsed.clinicalDiagnosis,
    symptoms: parsed.symptoms ?? [],
    symptomsDescription: parsed.symptomsDescription,
    hasInsurance: parsed.hasInsurance,
    insuranceDescription: parsed.insuranceDescription,
    selectedDate: parsed.selectedDate,
    selectedTime: parsed.selectedTime,
    createdAt: new Date(),
    updatedAt: new Date(),
    // se quiser associar ao usuário logado:
    // userId: session?.user.id,
  })
}
