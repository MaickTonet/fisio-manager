'use server'

import { db } from '@/database/database'
import { symptom } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function updateSymptomOrderAction(ids: string[]) {
  const updates = ids.map((id, index) => db.update(symptom).set({ symptomIndex: index }).where(eq(symptom.id, id)))

  await Promise.all(updates)
  revalidatePath('/symptoms')
}
