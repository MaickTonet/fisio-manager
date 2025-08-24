import { Activity } from 'lucide-react'

interface HeaderIconProps {
  title: string
  description: string
}

export default function FisioAgendaHeaderIcon({ title, description }: HeaderIconProps) {
  return (
    <header className='mb-8 text-center'>
      <div className='mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-600'>
        <Activity className='h-8 w-8 text-white' />
      </div>
      <h1 className='mb-2 text-2xl font-bold text-gray-900'>{title}</h1>
      <p className='text-sm text-gray-600'>{description}</p>
    </header>
  )
}
