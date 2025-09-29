import { LoaderCircle } from 'lucide-react'

export default function LoadingSpinner() {
  return (
    <div className='flex h-screen items-center justify-around overflow-clip'>
      <LoaderCircle size={60} className='text-primary animate-spin' />
    </div>
  )
}
