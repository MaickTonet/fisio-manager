import clsx from 'clsx'
import { Check, Clock, User } from 'lucide-react'
import { ReactNode } from 'react'
import { statusBadgeMap } from '../../utils/maps/status-badge-map'
import { Badge } from '../ui-components/badge'

const statusBadgeIconMap: Record<string, ReactNode> = {
  new: <Clock />,
  assigned: <User />,
  done: <Check className='text-white' />,
}

const statusBadgeColorMap: Record<string, string> = {
  new: 'bg-white text-black',
  assigned: 'bg-blue-600 text-white border-none',
  done: 'bg-green-600 text-white border-none',
}

export default function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant={status === 'new' ? 'outline' : 'default'}
      className={clsx('flex items-center justify-center gap-x-1.5 px-1.5', statusBadgeColorMap[status])}
    >
      {statusBadgeIconMap[status]}
      {statusBadgeMap[status]}
    </Badge>
  )
}
