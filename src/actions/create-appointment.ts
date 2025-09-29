'use server'

import { db } from '@/database/database'
import { appointment } from '@/database/schema'
import { auth } from '@/lib/auth'
import { newAppointmentSchema } from '@/types/schemas/new-appointment-schema'
import { headers } from 'next/headers'
import { z } from 'zod'

export async function createAppointment(values: z.infer<typeof newAppointmentSchema>) {
  const parsed = newAppointmentSchema.parse(values)

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  await db.insert(appointment).values({
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
    userId: session?.user.id,
    status: 'new',
  })
}
