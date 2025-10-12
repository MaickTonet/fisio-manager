import { getActiveSymptoms } from '@/actions/get-symptoms'
import FisioAgendaHeaderIcon from '@/components/custom-icons/fisio-agenda-header-icon'
import { NewAppointmentForm } from '@/components/new-appointment-form/new-appointment-form'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Agendar Consulta | FisioAgenda',
  description: 'Preencha os dados para agendar sua consulta',
}

export default async function NewAppointmentPage() {
  const symptoms = await getActiveSymptoms()

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8'>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-8 text-center'>
          <Link href='/'>
            <FisioAgendaHeaderIcon title='FisioAgenda' description='Preencha os dados para agendar sua consulta' />
          </Link>
        </div>
        <NewAppointmentForm symptoms={symptoms} />
      </div>
    </div>
  )
}
