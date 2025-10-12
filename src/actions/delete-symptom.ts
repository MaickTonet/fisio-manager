'use server'

import { db } from '@/database/database'
import { symptom } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function deleteSymptomAction(id: string) {
  await db.delete(symptom).where(eq(symptom.id, id))
  revalidatePath('/symptoms')
}
