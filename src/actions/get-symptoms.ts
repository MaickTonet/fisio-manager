'use server'

import { db } from '@/database/database'
import { symptom } from '@/database/schema'
import { eq } from 'drizzle-orm'

export async function getSymptoms() {
  return await db.query.symptom.findMany({
    orderBy: (s, { asc }) => [asc(s.symptomIndex)],
  })
}

export async function getActiveSymptoms() {
  return await db.select().from(symptom).where(eq(symptom.active, true)).orderBy(symptom.symptomIndex)
}
