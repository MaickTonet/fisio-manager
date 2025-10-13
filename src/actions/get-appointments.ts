'use server'

import { db } from '@/database/database'
import { appointment } from '@/database/schema'
import { desc, eq } from 'drizzle-orm'

export async function getAppointments() {
  return await db.select().from(appointment).orderBy(desc(appointment.createdAt))
}

export async function getAppointment(id: string) {
  return await db.select().from(appointment).where(eq(appointment.id, id))
}
