import { deleteAppointment } from '@/actions/delete-appointment'
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

export function ConfirmDeleteAppointmentDialog({ appointmentId }: { appointmentId: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className='w-full cursor-pointer rounded-xl px-2 py-1.5 text-left text-sm leading-[20px] transition-colors hover:bg-red-100'>
        Deletar
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deletar Agendamento</AlertDialogTitle>
          <AlertDialogDescription>Você tem certeza que deseja excluir o agendamento?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteAppointment(appointmentId)}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
