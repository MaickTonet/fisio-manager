'use client'

import { Button } from '@/components/ui-components/button'
import { Checkbox } from '@/components/ui-components/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui-components/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'

import StatusBadge from '@/components/status-badge-map/status-badge'
import { IconDotsVertical } from '@tabler/icons-react'
import Link from 'next/link'
import { z } from 'zod'

export const schema = z.object({
  id: z.string(),
  patientName: z.string(),
  status: z.string(),
  selectedDate: z.date(),
  selectedTime: z.string(),
})

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className='flex items-center justify-center'>
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Selecionar todos'
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex items-center justify-center'>
        <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Selecionar linha' />
      </div>
    ),
  },
  {
    accessorKey: 'patientName',
    header: () => <div className='ml-2'>Nome do paciente</div>,
    cell: ({ row }) => (
      <div className='ml-2 truncate'>
        <Link className='hover:text-primary transition-colors hover:underline' href={`/appointment/${row.original.id}`}>
          {row.original.patientName}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },

  {
    accessorKey: 'selectedDate',
    header: () => <div className='flex items-center justify-center'>Data da consulta</div>,
    cell: ({ row }) => <div className='flex items-center justify-center'>{new Date(row.original.selectedDate).toLocaleDateString()}</div>,
  },
  {
    accessorKey: 'selectedTime',
    header: () => <div className='flex items-center justify-center'>Horário da consulta</div>,
    cell: ({ row }) => <div className='flex items-center justify-center'>{row.original.selectedTime}</div>,
  },
  {
    id: 'actions',
    header: () => <div className='flex items-center justify-center'>Opções</div>,
    cell: () => (
      <div className='flex items-center justify-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='data-[state=open]:bg-muted text-muted-foreground flex size-8' size='icon'>
              <IconDotsVertical />
              <span className='sr-only'>Exibir opções</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-32'>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
]
