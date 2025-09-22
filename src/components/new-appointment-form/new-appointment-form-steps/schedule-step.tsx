'use client'

import { Button } from '@/components/ui-components/button'
import { Calendar } from '@/components/ui-components/calendar'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-components/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui-components/popover'
import { cn } from '@/lib/utils'
import { addDays, format, isWeekend, startOfDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Clock } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { FormData } from '../new-appointment-form'

const availableTimes = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
]

// Mock unavailable times for demonstration
const unavailableTimes: Record<string, string[]> = {
  [format(addDays(new Date(), 1), 'yyyy-MM-dd')]: ['09:00', '10:30', '15:00'],
  [format(addDays(new Date(), 2), 'yyyy-MM-dd')]: ['14:00', '14:30', '16:00'],
  [format(addDays(new Date(), 3), 'yyyy-MM-dd')]: ['08:00', '11:30', '17:00'],
}

export function ScheduleStep() {
  const form = useFormContext<FormData>()
  const selectedDate = form.watch('selectedDate')
  const selectedTime = form.watch('selectedTime')

  const isDateAvailable = (date: Date) => {
    // Don't allow weekends and dates in the past
    return !isWeekend(date) && date >= startOfDay(new Date())
  }

  const getAvailableTimesForDate = (date: Date | null) => {
    if (!date) return []

    const dateString = format(date, 'yyyy-MM-dd')
    const unavailableForDate = unavailableTimes[dateString] || []

    return availableTimes.filter((time) => !unavailableForDate.includes(time))
  }

  const availableTimesForSelectedDate = getAvailableTimesForDate(selectedDate)

  return (
    <div className='space-y-6'>
      <div className='mb-6 text-center'>
        <h3 className='mb-2 text-lg font-semibold text-gray-900'>Escolha a data e horário para sua consulta</h3>
        <p className='text-gray-600'>Atendimentos de segunda a sexta-feira, das 8h às 18h</p>
      </div>

      <div className='grid grid-cols-1 gap-8'>
        <div className='space-y-4'>
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
                        // Clear selected time when date changes
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
            <div className='rounded-lg bg-blue-50 p-4'>
              <div className='flex items-center space-x-2 text-blue-800'>
                <CalendarIcon className='h-4 w-4' />
                <span className='font-medium'>Data selecionada: {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
              </div>
            </div>
          )}
        </div>

        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='selectedTime'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário da Consulta</FormLabel>
                <FormControl>
                  <div className='space-y-2'>
                    {selectedDate ? (
                      availableTimesForSelectedDate.length > 0 ? (
                        <div className='grid grid-cols-3 gap-2 sm:grid-cols-4'>
                          {availableTimesForSelectedDate.map((time) => (
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
                      ) : (
                        <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                          <p className='text-sm text-yellow-800'>Não há horários disponíveis para esta data. Por favor, selecione outra data.</p>
                        </div>
                      )
                    ) : (
                      <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
                        <p className='text-sm text-gray-600'>Selecione uma data para ver os horários disponíveis</p>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedTime && (
            <div className='rounded-lg bg-green-50 p-4'>
              <div className='flex items-center space-x-2 text-green-800'>
                <Clock className='h-4 w-4' />
                <span className='font-medium'>Horário selecionado: {selectedTime}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedDate && selectedTime && (
        <div className='mt-8 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-green-50 p-6'>
          <h4 className='mb-2 font-semibold text-gray-900'>Resumo do Agendamento</h4>
          <div className='space-y-1 text-gray-700'>
            <p>
              <strong>Data:</strong> {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </p>
            <p>
              <strong>Horário:</strong> {selectedTime}
            </p>
            <p className='mt-2 text-sm text-gray-600'>Por favor, chegue com 15 minutos de antecedência.</p>
          </div>
        </div>
      )}
    </div>
  )
}
