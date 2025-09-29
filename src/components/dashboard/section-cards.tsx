import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui-components/card'
import { Appointment } from '@/types/appointment-type'
import { Calendar, ChartNoAxesColumnIncreasing, CircleCheckBig, Clock } from 'lucide-react'

export function SectionCards({ appointments }: { appointments: Appointment[] }) {
  const pendingAppointments = appointments.filter((a) => a.status === 'new').length
  const completedAppointments = appointments.filter((a) => a.status === 'done').length
  const totalAppointments = appointments.length

  const currentMonthAppointments = appointments.filter((a) => {
    const now = new Date()
    const date = new Date(a.selectedDate)
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length

  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
      <Card className='@container/card h-fit'>
        <CardHeader>
          <CardDescription className='flex items-center gap-x-2'>
            <Clock size={20} />
            <p>Agendamentos pendentes</p>
          </CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>{pendingAppointments}</CardTitle>
        </CardHeader>
      </Card>

      <Card className='@container/card h-fit'>
        <CardHeader>
          <CardDescription className='flex items-center gap-x-2'>
            <Calendar size={20} />
            <p>Agendamentos este mês</p>
          </CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>{currentMonthAppointments}</CardTitle>
        </CardHeader>
      </Card>

      <Card className='@container/card h-fit'>
        <CardHeader>
          <CardDescription className='flex items-center gap-x-2'>
            <CircleCheckBig size={20} />
            <p>Agendamentos finalizados</p>
          </CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>{completedAppointments}</CardTitle>
        </CardHeader>
      </Card>

      <Card className='@container/card h-fit'>
        <CardHeader>
          <CardDescription className='flex items-center gap-x-2'>
            <ChartNoAxesColumnIncreasing size={20} />
            <p>Total de agendamentos</p>
          </CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>{totalAppointments}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
