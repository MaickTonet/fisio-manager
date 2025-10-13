'use client'

import { Appointment } from '@/types/appointment-type'
import { formatDate } from '@/utils/format-date'
import { educationLevelsMap } from '@/utils/maps/education-levels-map'
import { genreMap } from '@/utils/maps/genre-map'
import { maritalStatusMap } from '@/utils/maps/marital-status-map'
import { Briefcase, Calendar, FileText, Phone, User } from 'lucide-react'
import { useEffect } from 'react'
import StatusBadge from '../status-badge-map/status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '../ui-components/card'

export default function PrintAppointmentPage({ appointment }: { appointment: Appointment }) {
  useEffect(() => {
    window.print()
  }, [])

  return (
    <main className='bg-white p-8 print:p-0'>
      <style>
        {`
          @media print {
            @page {
              size: A4 portrait;
              margin: 10mm;
            }

            body, html {
              height: 100%;
              overflow: hidden;
            }

            main {
              column-count: 2;
              column-gap: 16px;
              height: 100%;
            }

            section, aside {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .card {
              break-inside: avoid;
              page-break-inside: avoid;
            }
          }
        `}
      </style>

      <header className='mb-4 border-b pb-2 text-center'>
        <h1 className='text-2xl font-bold text-gray-900'>{appointment.patientName}</h1>
        <p className='text-sm text-gray-600'>Ficha de Agendamento</p>
      </header>

      <div>
        <Card className='mb-3 card'>
          <CardHeader>
            <CardTitle className='flex items-center text-lg font-semibold'>
              <User className='mr-2 h-5 w-5 text-blue-600' />
              Dados Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className='grid grid-cols-2 gap-2 text-sm'>
              <div>
                <dt>Data de Nascimento</dt>
                <dd>{formatDate(appointment.birthDate)}</dd>
              </div>
              <div>
                <dt>Idade</dt>
                <dd>{appointment.age} anos</dd>
              </div>
              <div>
                <dt>Gênero</dt>
                <dd>{genreMap[appointment.gender]}</dd>
              </div>
              <div>
                <dt>Estado Civil</dt>
                <dd>{maritalStatusMap[appointment.maritalStatus]}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className='mb-3 card'>
          <CardHeader>
            <CardTitle className='flex items-center text-lg font-semibold'>
              <Phone className='mr-2 h-5 w-5 text-green-600' />
              Contato
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className='grid grid-cols-2 gap-2 text-sm'>
              <div>
                <dt>Telefone</dt>
                <dd>{appointment.phone}</dd>
              </div>
              <div>
                <dt>Telefone Comercial</dt>
                <dd>{appointment.commercialPhone ?? '-'}</dd>
              </div>
              <div className='col-span-2'>
                <dt>Endereço</dt>
                <dd>
                  {appointment.address}
                  <br />
                  {appointment.neighborhood}, {appointment.city} - {appointment.state}
                  <br />
                  CEP: {appointment.zipCode}
                </dd>
              </div>
              <div className='col-span-2'>
                <dt>Contato de Emergência</dt>
                <dd>{appointment.emergencyContact}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className='mb-3 card'>
          <CardHeader>
            <CardTitle className='flex items-center text-lg font-semibold'>
              <Briefcase className='mr-2 h-5 w-5 text-purple-600' />
              Profissional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className='grid grid-cols-2 gap-2 text-sm'>
              <div>
                <dt>Educação</dt>
                <dd>{educationLevelsMap[appointment.education]}</dd>
              </div>
              <div>
                <dt>Profissão</dt>
                <dd>{appointment.profession}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className='mb-3 card'>
          <CardHeader>
            <CardTitle className='flex items-center text-lg font-semibold'>
              <FileText className='mr-2 h-5 w-5 text-red-600' />
              Clínico
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2 text-sm'>
            <div>
              <dt>Diagnóstico</dt>
              <dd>{appointment.clinicalDiagnosis ?? '-'}</dd>
            </div>
            {appointment.symptoms && appointment.symptoms.length > 0 && (
              <div>
                <dt>Sintomas</dt>
                <dd>
                  <ul className='flex flex-wrap gap-1'>
                    {appointment.symptoms.map((s, i) => (
                      <li
                        key={i}
                        className='rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-800'
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
            <div>
              <dt>Descrição dos Sintomas</dt>
              <dd>{appointment.symptomsDescription ?? '-'}</dd>
            </div>
            <div>
              <dt>Plano de Saúde</dt>
              <dd>
                {appointment.hasInsurance ? (
                  <span className='font-medium text-green-600'>
                    {appointment.insuranceDescription}
                  </span>
                ) : (
                  <span className='text-gray-500'>Não possui plano</span>
                )}
              </dd>
            </div>
          </CardContent>
        </Card>

        <Card className='mb-3 card'>
          <CardHeader>
            <CardTitle className='flex items-center text-lg font-semibold'>
              <Calendar className='mr-2 h-5 w-5 text-blue-600' />
              Agendamento
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2 text-sm'>
            <div className='rounded-lg border border-blue-200 p-3'>
              <div className='flex justify-between'>
                <span>Data</span>
                <time>{formatDate(appointment.selectedDate)}</time>
              </div>
              <div className='mt-1 flex justify-between'>
                <span>Horário</span>
                <time>{appointment.selectedTime}</time>
              </div>
            </div>
            <div className='flex items-center gap-x-2'>
              <dt>Status:</dt>
              <dd>
                <StatusBadge status={appointment.status} />
              </dd>
            </div>
          </CardContent>
        </Card>

        <Card className='card'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold'>Histórico</CardTitle>
          </CardHeader>
          <CardContent className='space-y-1 text-sm'>
            <div>
              <strong>Última atualização:</strong> {formatDate(appointment.updatedAt)}
            </div>
            <div>
              <strong>Criado em:</strong> {formatDate(appointment.createdAt)}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
