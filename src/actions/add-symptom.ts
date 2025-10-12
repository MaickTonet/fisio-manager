'use server'

import { db } from '@/database/database'
import { symptom } from '@/database/schema'
import { Symptom } from '@/types/symptom-type' // garante tipagem consistente
import { revalidatePath } from 'next/cache'

export async function addSymptomAction(name: string): Promise<Symptom> {
  const count = await db.select().from(symptom)

  const [created] = await db
    .insert(symptom)
    .values({
      id: crypto.randomUUID(),
      name,
      active: true,
      symptomIndex: count.length,
    })
    .returning()

  revalidatePath('/symptoms')

  return created
}
