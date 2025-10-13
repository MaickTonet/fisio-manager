'use client'

import { updateAppointmentStatusAction } from '@/actions/update-appointment-status'
import { statusBadgeMap } from '@/utils/maps/status-badge-map'
import StatusBadge from '../status-badge-map/status-badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui-components/dropdown-menu'

export default function DropdownStatusBadge({ appointmentId, currentStatus }: { appointmentId: string; currentStatus: 'new' | 'assigned' | 'done' }) {
  async function handleStatusChange(newStatus: 'new' | 'assigned' | 'done') {
    if (newStatus === currentStatus) return
    await updateAppointmentStatusAction(appointmentId, newStatus)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='cursor-pointer rounded-xl'>
        <StatusBadge status={currentStatus} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center' className='w-32'>
        {(['new', 'assigned', 'done'] as const).map((status) => (
          <DropdownMenuItem key={status} onClick={() => handleStatusChange(status)}>
            {statusBadgeMap[status]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
