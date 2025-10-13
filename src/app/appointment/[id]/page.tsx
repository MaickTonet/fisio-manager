import { getAppointment } from '@/actions/get-appointments'
import StatusBadge from '@/components/status-badge-map/status-badge'
import { Button } from '@/components/ui-components/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-components/card'
import { auth } from '@/lib/auth'
import { formatDate } from '@/utils/format-date'
import { educationLevelsMap } from '@/utils/maps/education-levels-map'
import { genreMap } from '@/utils/maps/genre-map'
import { maritalStatusMap } from '@/utils/maps/marital-status-map'
import { AlertCircle, ArrowLeft, Briefcase, Calendar, Clock, FileText, Pen, Phone, Printer, Shield, User } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type AppointmentViewPageProps = { params: { id: string } }

export default async function AppointmentViewPage({ params }: AppointmentViewPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) redirect('/login')

  const { id } = await params

  const result = await getAppointment(id)
  const data = result[0]

  if (!data) {
    return <div>Agendamento não encontrado.</div>
  }

  const appointmentData = {
    ...data,
    symptoms: data.symptoms ?? [],
  }

  return (
    <main className='min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-6xl'>
        <header>
          <Card className='mb-6'>
            <CardContent className='p-6'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                <div className='mb-4 flex items-center space-x-4 sm:mb-0'>
                  <Link href='/'>
                    <Button variant='outline' size='sm' className='flex cursor-pointer items-center rounded-xl'>
                      <ArrowLeft className='mr-2 h-4 w-4' />
                      Voltar
                    </Button>
                  </Link>
                  <h1 className='text-2xl font-bold text-gray-900'>{appointmentData.patientName}</h1>
                </div>
                <nav className='flex items-center space-x-3' aria-label='Ações do agendamento'>
                  <Button size='sm' className='flex items-center rounded-xl'>
                    <Pen className='mr-2 h-4 w-4' />
                    Editar
                  </Button>
                  <Link href={`/appointment/${appointmentData.id}/print`} target='_blank'>
                    <Button variant='outline' size='sm' className='flex items-center rounded-xl'>
                      <Printer className='mr-2 h-4 w-4' />
                      Imprimir
                    </Button>
                  </Link>
                </nav>
              </div>
            </CardContent>
          </Card>
        </header>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          <section className='space-y-6 lg:col-span-2'>
            <section aria-labelledby='dados-pessoais'>
              <Card>
                <CardHeader>
                  <CardTitle id='dados-pessoais' className='flex items-center text-lg font-semibold'>
                    <User className='mr-2 h-5 w-5 text-blue-600' />
                    Dados Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div>
                      <dt>Data de Nascimento</dt>
                      <dd>
                        <time>{formatDate(appointmentData.birthDate)}</time>
                      </dd>
                    </div>
                    <div>
                      <dt>Idade</dt>
                      <dd>{appointmentData.age} anos</dd>
                    </div>
                    <div>
                      <dt>Gênero</dt>
                      <dd>{genreMap[appointmentData.gender]}</dd>
                    </div>
                    <div>
                      <dt>Estado Civil</dt>
                      <dd>{maritalStatusMap[appointmentData.maritalStatus]}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </section>

            <section aria-labelledby='info-contato'>
              <Card>
                <CardHeader>
                  <CardTitle id='info-contato' className='flex items-center text-lg font-semibold'>
                    <Phone className='mr-2 h-5 w-5 text-green-600' />
                    Informações de Contato
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div>
                      <dt>Telefone Principal</dt>
                      <dd>{appointmentData.phone}</dd>
                    </div>
                    <div>
                      <dt>Telefone Comercial</dt>
                      <dd>{appointmentData.commercialPhone ?? '-'}</dd>
                    </div>
                    <div className='sm:col-span-2'>
                      <dt>Endereço</dt>
                      <dd>
                        <address className='not-italic'>
                          {appointmentData.address}
                          <br />
                          {appointmentData.neighborhood}, {appointmentData.city} - {appointmentData.state}
                          <br />
                          CEP: {appointmentData.zipCode}
                        </address>
                      </dd>
                    </div>
                    <div className='sm:col-span-2'>
                      <dt className='flex items-center'>
                        <AlertCircle className='mr-1 h-4 w-4 text-orange-500' />
                        Contato de Emergência
                      </dt>
                      <dd>{appointmentData.emergencyContact}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </section>

            <section aria-labelledby='info-profissionais'>
              <Card>
                <CardHeader>
                  <CardTitle id='info-profissionais' className='flex items-center text-lg font-semibold'>
                    <Briefcase className='mr-2 h-5 w-5 text-purple-600' />
                    Informações Profissionais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div>
                      <dt>Educação</dt>
                      <dd>{educationLevelsMap[appointmentData.education]}</dd>
                    </div>
                    <div>
                      <dt>Profissão</dt>
                      <dd>{appointmentData.profession}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </section>

            <section aria-labelledby='info-clinicas'>
              <Card>
                <CardHeader>
                  <CardTitle id='info-clinicas' className='flex items-center text-lg font-semibold'>
                    <FileText className='mr-2 h-5 w-5 text-red-600' />
                    Informações Clínicas
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div>
                    <dt>Diagnóstico Clínico</dt>
                    <dd>{appointmentData.clinicalDiagnosis ?? '-'}</dd>
                  </div>
                  {appointmentData.symptoms.length > 0 && (
                    <div>
                      <dt>Sintomas</dt>
                      <dd>
                        <ul className='flex flex-wrap gap-2'>
                          {appointmentData.symptoms.map((symptom: string, index: number) => (
                            <li key={index} className='inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800'>
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt>Descrição dos Sintomas</dt>
                    <dd>{appointmentData.symptomsDescription ?? '-'}</dd>
                  </div>
                  <div>
                    <dt className='flex items-center'>
                      <Shield className='mr-1 h-4 w-4 text-blue-500' />
                      Plano de Saúde
                    </dt>
                    <dd>
                      {appointmentData.hasInsurance ? (
                        <span className='font-medium text-green-600'>{appointmentData.insuranceDescription}</span>
                      ) : (
                        <span className='text-gray-500'>Não possui plano de saúde</span>
                      )}
                    </dd>
                  </div>
                </CardContent>
              </Card>
            </section>
          </section>

          <aside className='space-y-6'>
            <article aria-labelledby='agendamento'>
              <Card>
                <CardHeader>
                  <CardTitle id='agendamento' className='flex items-center text-lg font-semibold'>
                    <Calendar className='mr-2 h-5 w-5 text-blue-600' />
                    Agendamento
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='border-primary/30 bg-primary/10 rounded-xl border p-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center'>
                        <Calendar className='mr-2 h-5 w-5 text-blue-600' />
                        <span>Data</span>
                      </div>
                      <time>{formatDate(appointmentData.selectedDate)}</time>
                    </div>
                    <div className='mt-3 flex items-center justify-between'>
                      <div className='flex items-center'>
                        <Clock className='mr-2 h-5 w-5 text-blue-600' />
                        <span>Horário</span>
                      </div>
                      <time>{appointmentData.selectedTime}</time>
                    </div>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <dt>Status:</dt>
                    <dd>
                      <StatusBadge status={appointmentData.status} />
                    </dd>
                  </div>
                </CardContent>
              </Card>
            </article>

            <section aria-labelledby='historico'>
              <Card>
                <CardHeader>
                  <CardTitle id='historico' className='text-lg font-semibold'>
                    Histórico
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div className='flex items-start space-x-3'>
                    <div className='mt-2 h-2 w-2 rounded-full bg-green-400'></div>
                    <div className='min-w-0 flex-1'>
                      <p className='text-xs text-gray-500'>
                        <time>{formatDate(appointmentData.updatedAt)}</time>
                      </p>
                      <p className='text-sm text-gray-900'>Última atualização</p>
                    </div>
                  </div>
                  <div className='flex items-start space-x-3'>
                    <div className='mt-2 h-2 w-2 rounded-full bg-blue-400'></div>
                    <div className='min-w-0 flex-1'>
                      <p className='text-xs text-gray-500'>
                        <time>{formatDate(appointmentData.createdAt)}</time>
                      </p>
                      <p className='text-sm text-gray-900'>Agendamento criado</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}
