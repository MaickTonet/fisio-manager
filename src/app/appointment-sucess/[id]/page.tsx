import { Badge } from '@/components/ui-components/badge'
import { db } from '@/database/database'
import { eq } from 'drizzle-orm'
import { ArrowLeft, Briefcase, Calendar, CheckCircle, Clock, Eye, FileText, GraduationCap, Heart, Mail, MapPin, Phone, Shield, User } from 'lucide-react'
import { notFound } from 'next/navigation'

interface AppointmentSuccessPageProps {
  params: { id: string }
}

export default async function AppointmentSuccessPage({ params }: AppointmentSuccessPageProps) {
  const { id } = params

  const appointment = await db.query.appointments.findFirst({ where: eq(appointment.id, id) })

  if (!appointment) notFound()

  const formatDate = (dateInput: string | Date) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-2xl'>
        {/* Header com animação */}
        <div className='animate-fade-in mb-8 text-center'>
          <div className='animate-bounce-once mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100'>
            <CheckCircle className='h-12 w-12 text-green-600' />
          </div>
          <h1 className='mb-2 text-3xl font-bold text-gray-900 md:text-4xl'>Agendamento Confirmado!</h1>
          <p className='mx-auto max-w-md text-lg text-gray-600'>Seu agendamento foi marcado com sucesso. Você receberá uma confirmação por email.</p>
        </div>

        {/* Card principal com detalhes do agendamento */}
        <div className='mb-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl'>
          {/* Header do card */}
          <div className='bg-gradient-to-r from-blue-600 to-green-600 px-6 py-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-semibold text-white'>Detalhes do Agendamento</h2>
            </div>
          </div>

          {/* Conteúdo do card */}
          <div className='space-y-8 p-6'>
            {/* Informações do Agendamento */}
            <div>
              <h3 className='mb-4 flex items-center text-lg font-semibold text-gray-900'>
                <Calendar className='mr-2 h-5 w-5 text-blue-600' />
                Informações do Agendamento
              </h3>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='flex items-start space-x-3'>
                  <Calendar className='mt-0.5 h-5 w-5 text-green-600' />
                  <div>
                    <p className='text-sm text-gray-500'>Data</p>
                    <p className='font-semibold text-gray-900'>{formatDate(appointment.selectedDate)}</p>
                  </div>
                </div>

                <div className='flex items-start space-x-3'>
                  <Clock className='mt-0.5 h-5 w-5 text-orange-600' />
                  <div>
                    <p className='text-sm text-gray-500'>Horário</p>
                    <p className='font-semibold text-gray-900'>{appointment.selectedTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Separador */}
            <div className='border-t border-gray-100'></div>

            {/* Dados do Paciente */}
            <div>
              <h3 className='mb-4 flex items-center text-lg font-semibold text-gray-900'>
                <User className='mr-2 h-5 w-5 text-blue-600' />
                Dados do Paciente
              </h3>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-3'>
                  <div>
                    <p className='text-sm text-gray-500'>Nome Completo</p>
                    <p className='font-semibold text-gray-900'>{appointment.patientName}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Data de Nascimento</p>
                    <p className='font-semibold text-gray-900'>
                      {formatDate(appointment.birthDate)} ({appointment.age} anos)
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Gênero</p>
                    <p className='font-semibold text-gray-900'>{appointment.gender}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Estado Civil</p>
                    <p className='font-semibold text-gray-900'>{appointment.maritalStatus}</p>
                  </div>
                </div>

                <div className='space-y-3'>
                  <div className='flex items-start space-x-2'>
                    <Phone className='mt-0.5 h-4 w-4 text-blue-600' />
                    <div>
                      <p className='text-sm text-gray-500'>Telefone</p>
                      <p className='font-semibold text-gray-900'>{appointment.phone}</p>
                    </div>
                  </div>
                  <div className='flex items-start space-x-2'>
                    <Phone className='mt-0.5 h-4 w-4 text-green-600' />
                    <div>
                      <p className='text-sm text-gray-500'>Telefone Comercial</p>
                      <p className='font-semibold text-gray-900'>{appointment.commercialPhone}</p>
                    </div>
                  </div>
                  <div className='flex items-start space-x-2'>
                    <Heart className='mt-0.5 h-4 w-4 text-red-600' />
                    <div>
                      <p className='text-sm text-gray-500'>Contato de Emergência</p>
                      <p className='font-semibold text-gray-900'>{appointment.emergencyContact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Separador */}
            <div className='border-t border-gray-100'></div>

            {/* Endereço */}
            <div>
              <h3 className='mb-4 flex items-center text-lg font-semibold text-gray-900'>
                <MapPin className='mr-2 h-5 w-5 text-blue-600' />
                Endereço
              </h3>
              <div className='rounded-lg bg-gray-50 p-4'>
                <p className='font-semibold text-gray-900'>
                  {appointment.address}, {appointment.neighborhood}
                </p>
                <p className='text-gray-700'>
                  {appointment.city} - {appointment.state}, CEP: {appointment.zipCode}
                </p>
              </div>
            </div>

            {/* Separador */}
            <div className='border-t border-gray-100'></div>

            {/* Informações Profissionais */}
            <div>
              <h3 className='mb-4 flex items-center text-lg font-semibold text-gray-900'>
                <Briefcase className='mr-2 h-5 w-5 text-blue-600' />
                Informações Profissionais
              </h3>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='flex items-start space-x-2'>
                  <GraduationCap className='mt-0.5 h-4 w-4 text-purple-600' />
                  <div>
                    <p className='text-sm text-gray-500'>Escolaridade</p>
                    <p className='font-semibold text-gray-900'>{appointment.education}</p>
                  </div>
                </div>
                <div className='flex items-start space-x-2'>
                  <Briefcase className='mt-0.5 h-4 w-4 text-indigo-600' />
                  <div>
                    <p className='text-sm text-gray-500'>Profissão</p>
                    <p className='font-semibold text-gray-900'>{appointment.profession}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Separador */}
            <div className='border-t border-gray-100'></div>

            {/* Informações Clínicas */}
            <div>
              <h3 className='mb-4 flex items-center text-lg font-semibold text-gray-900'>
                <FileText className='mr-2 h-5 w-5 text-blue-600' />
                Informações Clínicas
              </h3>
              <div className='space-y-4'>
                <div>
                  <p className='mb-1 text-sm text-gray-500'>Diagnóstico Clínico</p>
                  <p className='font-semibold text-gray-900'>{appointment.clinicalDiagnosis}</p>
                </div>

                {appointment.symptoms && (
                  <div>
                    <p className='mb-2 text-sm text-gray-500'>Sintomas</p>
                    <div className='mb-2 flex flex-wrap gap-2'>
                      {appointment.symptoms.map((symptom, index) => (
                        <Badge key={index} variant={'secondary'}>
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                    <p className='rounded-lg bg-gray-50 p-3 text-sm text-gray-700'>{appointment.symptomsDescription}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Separador */}
            <div className='border-t border-gray-100'></div>

            {/* Convênio */}
            <div>
              <h3 className='mb-4 flex items-center text-lg font-semibold text-gray-900'>
                <Shield className='mr-2 h-5 w-5 text-blue-600' />
                Convênio
              </h3>
              <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                <div className='mb-2 flex items-center space-x-2'>
                  <CheckCircle className='h-5 w-5 text-green-600' />
                  <span className='font-semibold text-green-800'>Possui Convênio</span>
                </div>
                <p className='text-green-700'>{appointment.insuranceDescription}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instruções importantes */}
        <div className='mb-8 rounded-xl border border-blue-200 bg-blue-50 p-6'>
          <h3 className='mb-3 text-lg font-semibold text-blue-900'>Instruções Importantes</h3>
          <ul className='space-y-2 text-blue-800'>
            <li className='flex items-start space-x-2'>
              <div className='mt-2 h-2 w-2 rounded-full bg-blue-600'></div>
              <span>Chegue com 15 minutos de antecedência</span>
            </li>
            <li className='flex items-start space-x-2'>
              <div className='mt-2 h-2 w-2 rounded-full bg-blue-600'></div>
              <span>Traga documentos de identidade e carteirinha do convênio</span>
            </li>
            <li className='flex items-start space-x-2'>
              <div className='mt-2 h-2 w-2 rounded-full bg-blue-600'></div>
              <span>Use roupas confortáveis para os exercícios</span>
            </li>
          </ul>
        </div>

        {/* Informações de contato */}
        <div className='mb-8 rounded-xl border border-gray-200 bg-gray-50 p-6'>
          <h3 className='mb-4 text-lg font-semibold text-gray-900'>Precisa reagendar ou tem dúvidas?</h3>
          <div className='flex flex-col gap-4 sm:flex-row'>
            <a href='tel:+5511999999999' className='flex items-center space-x-2 text-blue-600 transition-colors hover:text-blue-700'>
              <Phone className='h-4 w-4' />
              <span>(11) 99999-9999</span>
            </a>
            <a href='mailto:agendamento@fisiovida.com.br' className='flex items-center space-x-2 text-blue-600 transition-colors hover:text-blue-700'>
              <Mail className='h-4 w-4' />
              <span>agendamento@fisiovida.com.br</span>
            </a>
          </div>
        </div>

        {/* Botões de ação */}
        <div className='flex flex-col justify-center gap-4 sm:flex-row'>
          <button className='group inline-flex transform items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-xl'>
            <Eye className='mr-2 h-5 w-5 transition-transform group-hover:scale-110' />
            Ver Meus Agendamentos
          </button>

          <button className='group inline-flex transform items-center justify-center rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 shadow-md transition-all duration-200 hover:scale-105 hover:border-gray-400 hover:bg-gray-50 hover:shadow-lg'>
            <ArrowLeft className='mr-2 h-5 w-5 transition-transform group-hover:scale-110' />
            Voltar ao Início
          </button>
        </div>

        {/* Footer */}
        <div className='mt-12 text-center text-sm text-gray-500'>
          <p>© 2025 FisioAgenda. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}
