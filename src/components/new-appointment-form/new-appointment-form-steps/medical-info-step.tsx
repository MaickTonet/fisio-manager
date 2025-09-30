'use client'

import { Checkbox } from '@/components/ui-components/checkbox'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-components/form'
import { Input } from '@/components/ui-components/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui-components/select'
import { Switch } from '@/components/ui-components/switch'
import { Textarea } from '@/components/ui-components/textarea'
import { educationLevels } from '@/utils/maps/education-levels-map'
import { useFormContext } from 'react-hook-form'
import { FormData } from '../new-appointment-form'

const commonSymptoms = [
  { id: 'shoulder_pain', label: 'Dores nos ombros' },
  { id: 'back_pain', label: 'Dores nas costas' },
  { id: 'neck_pain', label: 'Dores no pescoço' },
  { id: 'knee_pain', label: 'Dores nos joelhos' },
  { id: 'hip_pain', label: 'Dores no quadril' },
  { id: 'ankle_pain', label: 'Dores no tornozelo' },
  { id: 'muscle_tension', label: 'Tensão muscular' },
  { id: 'joint_stiffness', label: 'Rigidez articular' },
  { id: 'mobility_limitation', label: 'Limitação de mobilidade' },
  { id: 'muscle_weakness', label: 'Fraqueza muscular' },
  { id: 'numbness', label: 'Dormência/formigamento' },
  { id: 'headaches', label: 'Dores de cabeça' },
]

export function MedicalInfoStep() {
  const form = useFormContext<FormData>()

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <FormField
          control={form.control}
          name='education'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Escolaridade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='text-base'>
                    <SelectValue placeholder='Selecione a escolaridade' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {educationLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
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
          name='profession'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profissão Atual</FormLabel>
              <FormControl>
                <Input placeholder='Digite sua profissão' {...field} value={field.value ?? ''} className='text-base' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='clinicalDiagnosis'
          render={({ field }) => (
            <FormItem className='md:col-span-2'>
              <FormLabel>Diagnóstico Clínico (Opcional)</FormLabel>
              <FormDescription>
                Se você possui algum diagnóstico médico relacionado ao motivo da consulta, informe aqui (ex: artrose, bursite, hérnia de disco, etc.)
              </FormDescription>
              <FormControl>
                <Textarea placeholder='Descreva o diagnóstico clínico, se houver...' {...field} className='resize-none text-base' rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className='space-y-4'>
        <FormField
          control={form.control}
          name='symptoms'
          render={() => (
            <FormItem>
              <div className='mb-4'>
                <FormLabel className='text-base font-semibold'>Sintomas (Selecione os que se aplicam)</FormLabel>
                <FormDescription>Marque todos os sintomas que você está apresentando</FormDescription>
              </div>
              <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                {commonSymptoms.map((symptom) => (
                  <FormField
                    key={symptom.id}
                    control={form.control}
                    name='symptoms'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-start space-y-0 space-x-3'>
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(symptom.id)}
                            onCheckedChange={(checked) => {
                              const updatedSymptoms = checked
                                ? [...(field.value || []), symptom.id]
                                : field.value?.filter((value) => value !== symptom.id) || []
                              field.onChange(updatedSymptoms)
                            }}
                          />
                        </FormControl>
                        <FormLabel className='cursor-pointer text-sm font-normal'>{symptom.label}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='symptomsDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição Adicional dos Sintomas (Opcional)</FormLabel>
              <FormDescription>Descreva com mais detalhes seus sintomas, quando começaram, intensidade, etc.</FormDescription>
              <FormControl>
                <Textarea placeholder='Descreva seus sintomas com mais detalhes...' {...field} className='resize-none text-base' rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className='space-y-4 border-t pt-6'>
        <FormField
          control={form.control}
          name='hasInsurance'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base font-medium'>Possui Convênio Médico?</FormLabel>
                <FormDescription>Informe se possui plano de saúde que cubra fisioterapia</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch('hasInsurance') && (
          <FormField
            control={form.control}
            name='insuranceDescription'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição do Convênio</FormLabel>
                <FormDescription>Informe o nome do plano de saúde e se há alguma restrição ou cobertura específica</FormDescription>
                <FormControl>
                  <Textarea placeholder='Ex: Unimed, cobertura para 10 sessões de fisioterapia...' {...field} className='resize-none text-base' rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  )
}
