'use server'

import { db } from '@/database/database'
import { symptom } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function toggleSymptomAction(id: string, active: boolean) {
  await db.update(symptom).set({ active }).where(eq(symptom.id, id))
  revalidatePath('/symptoms')
}
