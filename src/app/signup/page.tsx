import SignupForm from '@/components/signup-form/signup-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cadastre-se | FisioAgenda',
  description: 'Cadastre-se para acessar o sistema',
}

export default function SignupPage() {
  return <SignupForm />
}
