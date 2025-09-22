'use client'

import { newAppointmentSchema } from '@/types/schemas/new-appointment-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, ChevronLeft, ChevronRight, Clock, FileText, User } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '../ui-components/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui-components/card'
import { Progress } from '../ui-components/progress'
import { ContactInfoStep } from './new-appointment-form-steps/contact-info-step'
import { MedicalInfoStep } from './new-appointment-form-steps/medical-info-step'
import { PersonalInfoStep } from './new-appointment-form-steps/personal-info-step'
import { ScheduleStep } from './new-appointment-form-steps/schedule-step'

export type FormData = z.infer<typeof newAppointmentSchema>

const steps = [
  {
    id: 1,
    title: 'Informações Pessoais',
    icon: User,
    description: 'Dados básicos do paciente',
  },
  {
    id: 2,
    title: 'Informações de Contato',
    icon: FileText,
    description: 'Endereço e contatos',
  },
  {
    id: 3,
    title: 'Informações Médicas',
    icon: Calendar,
    description: 'Histórico e sintomas',
  },
  {
    id: 4,
    title: 'Agendamento',
    icon: Clock,
    description: 'Data e horário',
  },
]

export function NewAppointmentForm() {
  const [currentStep, setCurrentStep] = useState(1)

  const form = useForm<FormData>({
    resolver: zodResolver(newAppointmentSchema),
    defaultValues: {
      hasInsurance: false,
      symptoms: [],
      birthDate: undefined,
    },
    mode: 'onChange',
  })

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep)
    const isValid = await form.trigger(fieldsToValidate)

    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
    // Here you would typically send the data to your backend
    alert('Agendamento realizado com sucesso!')
  }

  const getFieldsForStep = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 1:
        return ['patientName', 'birthDate', 'age', 'gender', 'maritalStatus']
      case 2:
        return ['phone', 'address', 'neighborhood', 'city', 'state', 'zipCode', 'emergencyContact']
      case 3:
        return ['education', 'profession', 'symptoms']
      case 4:
        return ['selectedDate', 'selectedTime']
      default:
        return []
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep />
      case 2:
        return <ContactInfoStep />
      case 3:
        return <MedicalInfoStep />
      case 4:
        return <ScheduleStep />
      default:
        return null
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <FormProvider {...form}>
      <Card className='mx-auto w-full max-w-4xl shadow-2xl'>
        <CardHeader className='pb-4'>
          <div className='mb-4 flex items-center justify-between'>
            <CardTitle className='text-2xl font-bold text-gray-900'>{steps[currentStep - 1]?.title}</CardTitle>
            <div className='text-sm text-gray-500'>
              {currentStep} de {steps.length}
            </div>
          </div>

          <Progress value={progress} className='mb-6' />

          <div className='hidden justify-between md:flex'>
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center space-y-2 ${
                    step.id === currentStep ? 'text-primary' : step.id < currentStep ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`rounded-full p-2 ${
                      step.id === currentStep ? 'bg-primary text-white' : step.id < currentStep ? 'bg-green-100 text-green-600' : 'bg-gray-100'
                    }`}
                  >
                    <Icon className='h-5 w-5' />
                  </div>
                  <div className='text-center'>
                    <div className='text-sm font-medium'>{step.title}</div>
                    <div className='hidden text-xs text-gray-500 lg:block'>{step.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardHeader>

        <CardContent className='space-y-6'>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {renderStep()}

            <div className='flex flex-wrap justify-between gap-y-4 border-t pt-6'>
              <Button type='button' variant='outline' onClick={previousStep} disabled={currentStep === 1} className='flex items-center space-x-2 w-full sm:w-fit'>
                <ChevronLeft className='h-4 w-4' />
                <span>Anterior</span>
              </Button>

              {currentStep < 4 ? (
                <Button type='button' onClick={nextStep} className='flex items-center space-x-2 w-full sm:w-fit'>
                  <span>Próximo</span>
                  <ChevronRight className='h-4 w-4' />
                </Button>
              ) : (
                <Button type='submit' className='flex w-full items-center space-x-2 bg-green-600 hover:bg-green-700 sm:w-fit'>
                  <Calendar className='h-4 w-4' />
                  <span>Confirmar Agendamento</span>
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  )
}
