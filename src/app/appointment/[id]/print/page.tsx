import { getAppointment } from '@/actions/get-appointments'
import PrintAppointmentPage from '@/components/print-appointment-page/print-appointment-page'
import { auth } from '@/lib/auth'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Imprimir | FisioAgenda',
  description: 'Imprimir agendamento',
}

type AppointmentPrintPageProps = { params: { id: string } }

export default async function PrintPage({ params }: AppointmentPrintPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) redirect('/login')

  const { id } = await params

  const result = await getAppointment(id)
  const data = result[0]

  if (!data) {
    return <div>Agendamento não encontrado.</div>
  }

  return <PrintAppointmentPage appointment={data} />
}
