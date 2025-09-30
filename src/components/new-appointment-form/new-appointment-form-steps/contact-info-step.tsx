'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-components/form'
import { Input } from '@/components/ui-components/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui-components/select'
import { useZipCodeSearch } from '@/hooks/use-search-city-by-zip-code'
import { brazilianStates } from '@/utils/brazilian-states'
import { formatPhone } from '@/utils/format-phone'
import { formatZipCode } from '@/utils/format-zip-code'
import { useFormContext } from 'react-hook-form'
import { FormData } from '../new-appointment-form'

export function ContactInfoStep() {
  const form = useFormContext<FormData>()
  const { zipCodeCity, zipCodeError, searchCityByZipCode } = useZipCodeSearch(form.getValues, form.setValue)

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  placeholder='(49) 99999-9999'
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value)
                    field.onChange(formatted)
                  }}
                  maxLength={15}
                  className='text-base'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='commercialPhone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone Comercial (Opcional)</FormLabel>
              <FormControl>
                <Input
                  placeholder='(49) 99999-9999'
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value)
                    field.onChange(formatted)
                  }}
                  maxLength={15}
                  className='text-base'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem className='md:col-span-2'>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder='Rua, número, complemento' {...field} value={field.value ?? ''} className='text-base' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='neighborhood'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input placeholder='Nome do bairro' {...field} value={field.value ?? ''} className='text-base' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='city'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input placeholder='Nome da cidade' {...field} value={field.value ?? ''} className='text-base' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='state'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='text-base'>
                    <SelectValue placeholder='Selecione o estado' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {brazilianStates.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='zipCode'
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input
                  placeholder='00000-000'
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => {
                    const formatted = formatZipCode(e.target.value)
                    field.onChange(formatted)
                    searchCityByZipCode(formatted)
                  }}
                  maxLength={9}
                  className='text-base'
                />
              </FormControl>
              {zipCodeCity && <p className='text-sm text-green-600'>Cidade encontrada: {zipCodeCity}</p>}
              {zipCodeError && <p className='text-sm text-red-600'>{zipCodeError}</p>}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='emergencyContact'
          render={({ field }) => (
            <FormItem className='md:col-span-2'>
              <FormLabel>Contato de Emergência</FormLabel>
              <FormControl>
                <Input placeholder='Nome e telefone do contato de emergência' {...field} value={field.value ?? ''} className='text-base' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
