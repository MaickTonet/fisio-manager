import LoginForm from '@/components/login-form/login-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login | FisioAgenda',
  description: 'Acesse sua conta para gerenciar consultas',
}

export default function LoginPage() {
  return <LoginForm />
}
