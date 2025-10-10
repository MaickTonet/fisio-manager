'use client'

import { Button } from '@/components/ui-components/button'
import CustomCalendar from '@/components/ui-components/custom-calendar'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-components/form'
import { Input } from '@/components/ui-components/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui-components/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui-components/select'
import { cn } from '@/lib/utils'
import { differenceInYears, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormData } from '../new-appointment-form'

export function PersonalInfoStep() {
  const form = useFormContext<FormData>()
  const birthDate = form.watch('birthDate')

  useEffect(() => {
    if (birthDate) {
      const age = differenceInYears(new Date(), new Date(birthDate))
      form.setValue('age', age)
    }
  }, [birthDate, form])

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <FormField
          control={form.control}
          name='patientName'
          render={({ field }) => (
            <FormItem className='md:col-span-2'>
              <FormLabel>Nome Completo do Paciente</FormLabel>
              <FormControl>
                <Input placeholder='Digite o nome completo' {...field} value={field.value ?? ''} className='text-base' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='birthDate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Nascimento</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant='outline' className={cn('w-full pl-3 text-left text-base font-normal', !field.value && 'text-muted-foreground')}>
                      {field.value ? format(field.value, 'dd/MM/yyyy', { locale: ptBR }) : <span>Selecione uma data</span>}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <CustomCalendar
                    mode='single'
                    selected={field.value ?? undefined}
                    onSelect={(date) => field.onChange(date ?? undefined)}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                    locale={ptBR}
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='age'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Idade</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Idade'
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  className='text-base'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sexo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='text-base'>
                    <SelectValue placeholder='Selecione o sexo' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='masculine'>Masculino</SelectItem>
                  <SelectItem value='feminine'>Feminino</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='maritalStatus'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado Civil</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='text-base'>
                    <SelectValue placeholder='Selecione o estado civil' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='single'>Solteiro(a)</SelectItem>
                  <SelectItem value='married'>Casado(a)</SelectItem>
                  <SelectItem value='divorced'>Divorciado(a)</SelectItem>
                  <SelectItem value='widowed'>Viúvo(a)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
