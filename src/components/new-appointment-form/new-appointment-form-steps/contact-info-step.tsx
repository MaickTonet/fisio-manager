'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-components/form'
import { Input } from '@/components/ui-components/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui-components/select'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormData } from '../new-appointment-form'

const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]

export function ContactInfoStep() {
  const form = useFormContext<FormData>()
  const [zipCodeCity, setZipCodeCity] = useState<string>('')
  const [zipCodeError, setZipCodeError] = useState<string>('')

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/)
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
  }

  const formatZipCode = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2')
  }

  const searchCityByZipCode = async (zipCode: string) => {
    const cleanZipCode = zipCode.replace(/\D/g, '')
    if (cleanZipCode.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanZipCode}/json/`)
        const data = await response.json()

        if (data.erro) {
          setZipCodeError('CEP não encontrado')
          setZipCodeCity('')
        } else {
          setZipCodeError('')
          setZipCodeCity(data.localidade)
          // Auto-fill city and state if they're empty
          if (!form.getValues('city')) {
            form.setValue('city', data.localidade)
          }
          if (!form.getValues('state')) {
            form.setValue('state', data.uf)
          }
          if (!form.getValues('neighborhood')) {
            form.setValue('neighborhood', data.bairro || '')
          }
        }
      } catch (error) {
        setZipCodeError('Erro ao buscar CEP')
        setZipCodeCity('')
      }
    } else {
      setZipCodeCity('')
      setZipCodeError('')
    }
  }

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
