'use client'

import { Button } from '@/components/ui-components/button'
import { Calendar } from '@/components/ui-components/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-components/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-components/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui-components/popover'
import { cn } from '@/lib/utils'
import { genreMap } from '@/utils/maps/genre-map'
import { format, isWeekend, startOfDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, CheckCircle2, Clock, Info, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormData } from '../new-appointment-form'

export function ScheduleStep() {
  const form = useFormContext<FormData>()
  const selectedDate = form.watch('selectedDate')
  const selectedTime = form.watch('selectedTime')

  const [availableTimes, setAvailableTimes] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(false)

  const isDateAvailable = (date: Date) => !isWeekend(date) && date >= startOfDay(new Date())

  useEffect(() => {
    let mounted = true

    async function loadTimes() {
      if (!selectedDate) {
        if (mounted) setAvailableTimes(null)
        return
      }

      setLoading(true)
      try {
        const dateParam = format(selectedDate, 'yyyy-MM-dd')
        const res = await fetch(`/api/appointments/available?date=${dateParam}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (mounted) setAvailableTimes(json.availableTimes ?? [])
        if (mounted && (!json.availableTimes || !json.availableTimes.includes(selectedTime))) {
          form.setValue('selectedTime', '')
        }
      } catch {
        if (mounted) setAvailableTimes([])
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadTimes()
    return () => {
      mounted = false
    }
  }, [selectedDate])

  return (
    <div className='space-y-6'>
      <FormField
        control={form.control}
        name='selectedDate'
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel>Data da Consulta</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button variant='outline' className={cn('h-12 w-full pl-3 text-left text-base font-normal', !field.value && 'text-muted-foreground')}>
                    {field.value ? format(field.value, 'dd/MM/yyyy', { locale: ptBR }) : <span>Selecione uma data</span>}
                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date)
                    form.setValue('selectedTime', '')
                  }}
                  disabled={(date) => !isDateAvailable(date)}
                  initialFocus
                  locale={ptBR}
                  fromYear={new Date().getFullYear()}
                  toYear={new Date().getFullYear() + 1}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedDate && (
        <FormField
          control={form.control}
          name='selectedTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário da Consulta</FormLabel>
              <FormControl>
                <div className='space-y-2'>
                  {loading && <p className='text-sm text-gray-500'>Carregando horários...</p>}

                  {!loading && availableTimes?.length === 0 && (
                    <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                      <p className='text-sm text-yellow-800'>Não há horários disponíveis para esta data.</p>
                    </div>
                  )}

                  {availableTimes && availableTimes.length > 0 && (
                    <div className='grid grid-cols-3 gap-2 sm:grid-cols-4'>
                      {availableTimes.map((time) => (
                        <Button
                          key={time}
                          type='button'
                          variant={field.value === time ? 'default' : 'outline'}
                          className={cn('h-12 text-sm', field.value === time && 'bg-primary text-primary-foreground')}
                          onClick={() => field.onChange(time)}
                        >
                          <Clock className='mr-1 h-3 w-3' />
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {!selectedDate && (
        <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
          <p className='text-sm text-gray-600'>Selecione uma data para ver os horários disponíveis</p>
        </div>
      )}

      {selectedDate && selectedTime && (
        <Card className='mt-6 border border-green-200 bg-green-50'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-lg font-semibold text-green-700'>
              <CheckCircle2 className='h-5 w-5' /> Agendamento Selecionado
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2 text-sm text-green-800'>
            <p className='flex items-center gap-2'>
              <User className='h-4 w-4' /> <span>Paciente:</span> {form.getValues('patientName')}
            </p>
            <p className='flex items-center gap-2'>
              <CalendarIcon className='h-4 w-4' /> <span>Data de Nascimento:</span>{' '}
              {form.getValues('birthDate') ? format(form.getValues('birthDate'), 'dd/MM/yyyy', { locale: ptBR }) : '-'}
            </p>
            <p className='flex items-center gap-2'>
              <Clock className='h-4 w-4' /> <span>Idade:</span> {form.getValues('age')}
            </p>
            <p className='flex items-center gap-2'>
              <Info className='h-4 w-4' /> <span>Sexo:</span> {genreMap[form.getValues('gender')]}
            </p>

            <p className='flex items-center gap-2'>
              <Info className='h-4 w-4' /> <span>Telefone:</span> {form.getValues('phone')}
            </p>

            <p className='flex items-center gap-2'>
              <CalendarIcon className='h-4 w-4' /> <span>Data da Consulta:</span> {format(selectedDate, 'dd/MM/yyyy', { locale: ptBR })}
            </p>
            <p className='flex items-center gap-2'>
              <Clock className='h-4 w-4' /> <span>Horário da Consulta:</span> {selectedTime}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
