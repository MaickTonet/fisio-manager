'use client'

import { Button } from '@/components/ui-components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui-components/card'
import { Input } from '@/components/ui-components/input'
import { useSymptomsDragAndDrop } from '@/hooks/use-symptoms-drag-and-drop'
import { Symptom } from '@/types/symptom-type'
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import FisioAgendaHeaderIcon from '../custom-icons/fisio-agenda-header-icon'
import SymptomsListTableItem from './symptoms-list-table-item'

export default function SymptomsListTable({ initialSymptoms }: { initialSymptoms: Symptom[] }) {
  const { symptoms, newSymptom, setNewSymptom, handleDragEnd, toggleSymptom, addSymptom, deleteSymptom } = useSymptomsDragAndDrop({ initialSymptoms })

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }))

  return (
    <div className='min-h-screen bg-white bg-gradient-to-br px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl'>
        <FisioAgendaHeaderIcon title='Sintomas de Fisioterapia' description='Gerencie os sintomas mais comuns de pacientes' />

        <Card className='mb-6 overflow-hidden border-slate-200 pt-0 shadow-xl'>
          <CardHeader className='border-b border-slate-200 bg-slate-50 pt-6'>
            <CardTitle className='text-xl'>Adicionar Novo Sintoma</CardTitle>
            <CardDescription>Digite o nome do sintoma e pressione Enter ou clique em adicionar</CardDescription>
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='flex flex-col gap-3 sm:flex-row'>
              <div className='flex-1'>
                <Input
                  type='text'
                  placeholder='Ex: Dor muscular...'
                  value={newSymptom}
                  onChange={(e) => setNewSymptom(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSymptom()}
                  className='h-11'
                />
              </div>
              <Button onClick={addSymptom} className='h-11 bg-blue-600 px-6 text-white hover:bg-blue-700' disabled={!newSymptom.trim()}>
                <Plus className='mr-2 h-5 w-5' /> Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className='overflow-hidden border-slate-200 pt-0 shadow-xl'>
          <CardHeader className='border-b border-slate-200 bg-slate-50 pt-6'>
            <CardTitle className='text-xl'>Lista de Sintomas</CardTitle>
            <CardDescription>Arraste para reordenar • Ative ou desative conforme necessário</CardDescription>
          </CardHeader>
          <CardContent className='p-0'>
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
              <SortableContext items={symptoms.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                <div>
                  {symptoms.map((symptom) => (
                    <SymptomsListTableItem key={symptom.id} symptom={symptom} toggleSymptom={toggleSymptom} deleteSymptom={deleteSymptom} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
