'use server'

import { db } from '@/database/database'
import { appointment } from '@/database/schema'
import { desc } from 'drizzle-orm'

export async function getAppointments() {
  return await db.select().from(appointment).orderBy(desc(appointment.createdAt))
}
