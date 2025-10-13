import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui-components/alert-dialog'
import { Button } from '@/components/ui-components/button'
import { Symptom } from '@/types/symptom-type'
import { Trash2 } from 'lucide-react'

export function ConfirmDeleteSymptomDialog({ symptom, deleteSymptom }: { symptom: Symptom; deleteSymptom: (id: string) => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'destructive'}>
          <Trash2 size={28} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deletar sintoma</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza que deseja excluir o sintoma <strong>{symptom.name}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteSymptom(symptom.id)}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
