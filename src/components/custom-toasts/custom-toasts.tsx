import { UserCheck, UserRoundX } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

const baseToastStyle = 'flex items-center gap-x-2 rounded-xl px-3 py-2.5 text-sm font-semibold shadow-md text-white'

export function SuccessToast({ label }: { label: string }) {
  return (
    <div className={twMerge(baseToastStyle, 'bg-green-600')}>
      <UserCheck />
      <p>{label}</p>
    </div>
  )
}

export function ErrorToast({ label }: { label: string }) {
  return (
    <div className={twMerge(baseToastStyle, 'bg-red-600')}>
      <UserRoundX />
      <p>{label}</p>
    </div>
  )
}
