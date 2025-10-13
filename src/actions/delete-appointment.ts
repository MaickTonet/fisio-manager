'use server'

import { db } from '@/database/database'
import { appointment } from '@/database/schema'
import { auth } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

export async function deleteAppointment(appointmentId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user?.id) {
    throw new Error('Usuário não autenticado.')
  }

  const deleted = await db.delete(appointment).where(eq(appointment.id, appointmentId)).returning({ id: appointment.id })

  if (!deleted.length) {
    throw new Error('Agendamento não encontrado.')
  }

  revalidatePath('/')

  return { success: true, deletedId: deleted[0].id }
}
