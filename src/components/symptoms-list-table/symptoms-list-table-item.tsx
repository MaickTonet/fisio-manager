'use client'

import { Label } from '@/components/ui-components/label'
import { Switch } from '@/components/ui-components/switch'
import { Symptom } from '@/types/symptom-type'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { AlertDialogDemo } from '../confirm-delete-symptom-dialog/confirm-delete-symptom-dialog'

interface SymptomsListTableItemProps {
  symptom: Symptom
  toggleSymptom: (id: string) => void
  deleteSymptom: (id: string) => void
}

export default function SymptomsListTableItem({ symptom, toggleSymptom, deleteSymptom }: SymptomsListTableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: symptom.id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center justify-between border-b border-slate-200 p-5 transition-colors last:border-b-0 hover:bg-slate-50 ${
        isDragging ? 'bg-slate-100 opacity-50' : ''
      }`}
    >
      <div className='flex flex-1 items-center gap-4'>
        <button className='cursor-grab touch-none text-slate-400 hover:text-slate-600 active:cursor-grabbing' {...attributes} {...listeners}>
          <GripVertical className='h-5 w-5' />
        </button>
        <div className={`h-2 w-2 rounded-full ${symptom.active ? 'bg-green-500' : 'bg-slate-400'}`} />
        <Label htmlFor={`switch-${symptom.id}`} className={`cursor-pointer text-base font-medium ${symptom.active ? 'text-slate-900' : 'text-slate-500'}`}>
          {symptom.name}
        </Label>
      </div>

      <div className='flex items-center gap-3'>
        <span className={`rounded-full px-3 py-1 text-sm font-medium ${symptom.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
          {symptom.active ? 'Ativo' : 'Inativo'}
        </span>
        <Switch id={`switch-${symptom.id}`} checked={symptom.active} onCheckedChange={() => toggleSymptom(symptom.id)} />

        <AlertDialogDemo symptom={symptom} deleteSymptom={deleteSymptom} />
      </div>
    </div>
  )
}
