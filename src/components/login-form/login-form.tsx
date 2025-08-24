'use client'

import { Button } from '@/components/ui-components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui-components/card'
import { Input } from '@/components/ui-components/input'
import { Label } from '@/components/ui-components/label'
import { Separator } from '@/components/ui-components/separator'
import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import { loginSchema } from '@/types/schemas/login-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import FisioAgendaHeaderIcon from '../custom-icons/fisio-agenda-header-icon'
import { GoogleIcon } from '../custom-icons/google-icon'

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema), mode: 'onChange' })

  const onSubmit = async (data: LoginFormData) => {
    await authClient.signIn.email(
      { email: data.email, password: data.password },
      { onSuccess: (ctx) => router.push('/profile'), onError: (ctx) => alert(ctx.error.message) },
    )
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4'>
      <section className='w-full max-w-md'>
        <FisioAgendaHeaderIcon title='FisioAgenda' description='Acesse sua conta para gerenciar consultas' />

        <Card className='border-0 bg-white/80 shadow-xl backdrop-blur-sm'>
          <CardHeader className='pb-4 text-center'>
            <CardTitle>
              <h2 className='text-xl font-semibold text-gray-900'>Entrar na sua conta</h2>
            </CardTitle>
            <CardDescription className='text-gray-600'>Digite suas credenciais para acessar o sistema</CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            <Button type='button' variant='outline' className='h-12 w-full cursor-pointer border-gray-200 transition-colors duration-200 hover:bg-gray-50'>
              <GoogleIcon />
              Continuar com Google
            </Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <Separator className='w-full' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-white px-3 font-medium text-gray-500'>Ou continue com email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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
                  >
                    {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                  </button>
                </div>
                {errors.password && <p className='animate-in slide-in-from-left-1 text-sm font-medium text-red-600'>{errors.password.message}</p>}
              </fieldset>

              <div className='text-right'>
                <Link href='#' className='text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800'>
                  Esqueceu sua senha?
                </Link>
              </div>

              <Button
                type='submit'
                className='h-12 w-full cursor-pointer bg-gradient-to-r from-blue-600 to-emerald-600 font-medium text-white shadow-lg transition-colors duration-200 hover:from-blue-700 hover:to-emerald-700'
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <div className='flex items-center space-x-2'>
                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                    <span>Entrando...</span>
                  </div>
                ) : (
                  <div className='flex items-center space-x-2'>
                    <span>Entrar</span>
                    <ArrowRight className='h-4 w-4' />
                  </div>
                )}
              </Button>
            </form>

            <footer className='border-t border-gray-100 pt-4 text-center'>
              <p className='text-sm text-gray-600'>
                Não tem uma conta?{' '}
                <Link href='/signup' className='font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800'>
                  Criar conta
                </Link>
              </p>
            </footer>
          </CardContent>
        </Card>

        <footer className='mt-8 text-center'>
          <p className='text-xs text-gray-500'>© 2025 FisioAgenda. Todos os direitos reservados.</p>
        </footer>
      </section>
    </main>
  )
}
