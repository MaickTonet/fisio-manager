'use server'

import { db } from '@/database/database'
import { appointment } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function updateAppointmentStatusAction(id: string, status: 'new' | 'assigned' | 'done', pathToRevalidate: string = '/') {
  await db.update(appointment).set({ status, updatedAt: new Date() }).where(eq(appointment.id, id))
  revalidatePath(pathToRevalidate)
}
