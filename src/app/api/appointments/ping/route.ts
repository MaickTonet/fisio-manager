import { db } from '@/database/database'
import { appointment } from '@/database/schema'
import { NextResponse } from 'next/server'

export async function GET() {
  await db.select().from(appointment).limit(1)
  return NextResponse.json({ message: 'job done successfully' })
}
