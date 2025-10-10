import { db } from '@/database/database'
import { appointment } from '@/database/schema'
import { addDays, startOfDay } from 'date-fns'
import { and, eq, gte, lt, not } from 'drizzle-orm'
import { NextResponse } from 'next/server'

const ALL_TIMES = [
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
]

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const dateParam = url.searchParams.get('date')
    if (!dateParam) return NextResponse.json({ error: 'Missing date query param' }, { status: 400 })

    const date = new Date(dateParam + 'T00:00:00')
    if (isNaN(date.getTime())) return NextResponse.json({ error: 'Invalid date' }, { status: 400 })

    const start = startOfDay(date)
    const end = addDays(start, 1)

    const rows = await db
      .select({ selectedTime: appointment.selectedTime })
      .from(appointment)
      .where(and(gte(appointment.selectedDate, start), lt(appointment.selectedDate, end), not(eq(appointment.status, 'cancelled'))))

    const bookedTimes = rows.map((r) => r.selectedTime)
    const availableTimes = ALL_TIMES.filter((t) => !bookedTimes.includes(t))

    return NextResponse.json({ availableTimes })
  } catch (err) {
    console.error('Error fetching available times', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
