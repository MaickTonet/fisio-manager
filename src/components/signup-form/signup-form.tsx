'use client'

import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import { signupSchema } from '@/types/schemas/signup-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Check, Eye, EyeOff, Lock, Mail, User, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import FisioAgendaHeaderIcon from '../custom-icons/fisio-agenda-header-icon'
import { GoogleIcon } from '../custom-icons/google-icon'
import { Button } from '../ui-components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui-components/card'
import { Input } from '../ui-components/input'
import { Label } from '../ui-components/label'
import { Separator } from '../ui-components/separator'

type SignupFormData = z.infer<typeof signupSchema>

interface PasswordRequirement {
  label: string
  regex: RegExp
  met: boolean
}

export default function SignupForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  })

  const password = watch('password', '')

  const passwordRequirements: PasswordRequirement[] = [
    { label: 'Pelo menos 8 caracteres', regex: /.{8,}/, met: password.length >= 8 },
    { label: 'Uma letra maiúscula', regex: /[A-Z]/, met: /[A-Z]/.test(password) },
    { label: 'Um número', regex: /[0-9]/, met: /[0-9]/.test(password) },
    { label: 'Um caractere especial', regex: /[^A-Za-z0-9]/, met: /[^A-Za-z0-9]/.test(password) },
  ]

  const onSubmit = async (data: SignupFormData) => {
    await authClient.signUp.email(
      { email: data.email, password: data.password, name: data.name },
      { onSuccess: (ctx) => router.push('/dashboard'), onError: (ctx) => alert(ctx.error.message) },
    )
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4'>
      <div className='w-full max-w-md'>
        <FisioAgendaHeaderIcon title='FisioAgenda' description='Crie sua conta para começar a agendar consultas' />

        <Card className='border-0 bg-white/80 shadow-xl backdrop-blur-sm'>
          <CardHeader className='pb-4 text-center'>
            <CardTitle className='text-xl font-semibold text-gray-900'>Criar nova conta</CardTitle>
            <CardDescription className='text-gray-600'>Preencha os dados abaixo para se cadastrar</CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            <Button type='button' variant='outline' className='h-12 w-full cursor-pointer border-gray-200 transition-all duration-200 hover:bg-gray-50'>
              <GoogleIcon />
              Criar conta com Google
            </Button>

            <div className='relative' role='separator' aria-label='ou continue com email'>
              <div className='absolute inset-0 flex items-center'>
                <Separator className='w-full' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-white px-3 font-medium text-gray-500'>Ou cadastre-se com email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' aria-label='Formulário de cadastro'>
              <fieldset className='space-y-2'>
                <Label htmlFor='name' className='text-sm font-medium text-gray-700'>
                  Nome completo
                </Label>
                <div className='relative'>
                  <User className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                  <Input
                    id='name'
                    type='text'
                    placeholder='Seu nome completo'
                    className={cn(
                      'h-12 border-gray-200 pl-10 transition-all duration-200 focus:border-blue-500 focus:ring-blue-500',
                      errors.name && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                    )}
                    {...register('name')}
                  />
                </div>
                {errors.name && <p className='animate-in slide-in-from-left-1 text-sm font-medium text-red-600'>{errors.name.message}</p>}
              </fieldset>

              <fieldset className='space-y-2'>
                <Label htmlFor='email' className='text-sm font-medium text-gray-700'>
                  Email
                </Label>
                <div className='relative'>
                  <Mail className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                  <Input
                    id='email'
                    type='email'
                    placeholder='seu@email.com'
                    className={cn(
                      'h-12 border-gray-200 pl-10 transition-all duration-200 focus:border-blue-500 focus:ring-blue-500',
                      errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                    )}
                    {...register('email')}
                  />
                </div>
                {errors.email && <p className='animate-in slide-in-from-left-1 text-sm font-medium text-red-600'>{errors.email.message}</p>}
              </fieldset>

              <fieldset className='space-y-2'>
                <Label htmlFor='password' className='text-sm font-medium text-gray-700'>
                  Senha
                </Label>
                <div className='relative'>
                  <Lock className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    className={cn(
                      'h-12 border-gray-200 pr-10 pl-10 transition-all duration-200 focus:border-blue-500 focus:ring-blue-500',
                      errors.password && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                    )}
                    {...register('password')}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors duration-200 hover:text-gray-600'
                    aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                  </button>
                </div>

                {password && (
                  <aside className='mt-3 rounded-lg border bg-gray-50 p-3' aria-live='polite'>
                    <p className='mb-2 text-xs font-medium text-gray-700'>Requisitos da senha:</p>
                    <ul className='space-y-1'>
                      {passwordRequirements.map((req, index) => (
                        <li key={index} className='flex items-center space-x-2'>
                          {req.met ? <Check className='h-3 w-3 text-emerald-600' /> : <X className='h-3 w-3 text-gray-400' />}
                          <span className={cn('text-xs', req.met ? 'font-medium text-emerald-600' : 'text-gray-500')}>{req.label}</span>
                        </li>
                      ))}
                    </ul>
                  </aside>
                )}

                {errors.password && <p className='animate-in slide-in-from-left-1 text-sm font-medium text-red-600'>{errors.password.message}</p>}
              </fieldset>

              <fieldset className='space-y-2'>
                <Label htmlFor='confirmPassword' className='text-sm font-medium text-gray-700'>
                  Confirmar senha
                </Label>
                <div className='relative'>
                  <Lock className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                  <Input
                    id='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    className={cn(
                      'h-12 border-gray-200 pr-10 pl-10 transition-all duration-200 focus:border-blue-500 focus:ring-blue-500',
                      errors.confirmPassword && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                    )}
                    {...register('confirmPassword')}
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors duration-200 hover:text-gray-600'
                    aria-label={showConfirmPassword ? 'Esconder confirmação de senha' : 'Mostrar confirmação de senha'}
                  >
                    {showConfirmPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                  </button>
                </div>
                {errors.confirmPassword && <p className='animate-in slide-in-from-left-1 text-sm font-medium text-red-600'>{errors.confirmPassword.message}</p>}
              </fieldset>

              <footer className='rounded-lg bg-gray-50 p-3 text-xs text-gray-600'>
                Ao criar uma conta, você concorda com nossos{' '}
                <Link href='#' className='font-medium text-blue-600 hover:text-blue-800'>
                  Termos de Uso
                </Link>{' '}
                e{' '}
                <Link href='#' className='font-medium text-blue-600 hover:text-blue-800'>
                  Política de Privacidade
                </Link>
                .
              </footer>

              <Button
                type='submit'
                className='h-12 w-full cursor-pointer bg-gradient-to-r from-blue-600 to-emerald-600 font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-emerald-700 hover:shadow-xl'
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <div className='flex items-center space-x-2'>
                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                    <span>Criando conta...</span>
                  </div>
                ) : (
                  <div className='flex items-center space-x-2'>
                    <span>Criar conta</span>
                    <ArrowRight className='h-4 w-4' />
                  </div>
                )}
              </Button>
            </form>

            <div className='border-t border-gray-100 pt-4 text-center'>
              <p className='text-sm text-gray-600'>
                Já tem uma conta?{' '}
                <Link href='/login' className='font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800'>
                  Fazer login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <footer className='mt-8 text-center'>
          <p className='text-xs text-gray-500'>© 2025 FisioAgenda. Todos os direitos reservados.</p>
        </footer>
      </div>
    </main>
  )
}
