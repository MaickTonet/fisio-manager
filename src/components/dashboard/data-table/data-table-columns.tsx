'use client'

import { Button } from '@/components/ui-components/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui-components/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'

import { ConfirmDeleteAppointmentDialog } from '@/components/confirm-delete-appointment-dialog/confirm-delete-appointment-dialog'
import DropdownStatusBadge from '@/components/dropdown-status-badge/dropdown-status-badget'
import { appointmentSchema } from '@/types/schemas/appointment-schema'
import { educationLevelsMap } from '@/utils/maps/education-levels-map'
import { genreMap } from '@/utils/maps/genre-map'
import { maritalStatusMap } from '@/utils/maps/marital-status-map'
import { IconDotsVertical } from '@tabler/icons-react'
import { ArrowDown, ArrowUp, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { z } from 'zod'

export const columns: ColumnDef<z.infer<typeof appointmentSchema>>[] = [
  {
    id: 'link-to-appointment-page',
    header: 'Acessar',
    cell: ({ row }) => (
      <Link href={`/appointment/${row.original.id}`}>
        <Button variant={'ghost'}>
          <ArrowUpRight className='text-zinc-500' />
        </Button>
      </Link>
    ),
  },
  {
    accessorKey: 'patientName',
    header: ({ column }) => (
      <button className='flex cursor-pointer items-center gap-1 transition-colors hover:text-black/60' onClick={() => column.toggleSorting()}>
        Nome do paciente
        {column.getIsSorted() === 'asc' && <ArrowUp size={16} />}
        {column.getIsSorted() === 'desc' && <ArrowDown size={16} />}
      </button>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <DropdownStatusBadge appointmentId={row.original.id} currentStatus={row.original.status as 'new' | 'assigned' | 'done'} />,
    enableSorting: true,
  },
  {
    accessorKey: 'age',
    header: ({ column }) => (
      <button className='flex cursor-pointer items-center gap-1 transition-colors hover:text-black/60' onClick={() => column.toggleSorting()}>
        Idade
        {column.getIsSorted() === 'asc' && <ArrowUp size={16} />}
        {column.getIsSorted() === 'desc' && <ArrowDown size={16} />}
      </button>
    ),
    cell: ({ row }) => <div className='text-center'>{row.original.age}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'birthDate',
    header: ({ column }) => (
      <button className='flex cursor-pointer items-center gap-1 transition-colors hover:text-black/60' onClick={() => column.toggleSorting()}>
        Data de nascimento
        {column.getIsSorted() === 'asc' && <ArrowUp size={16} />}
        {column.getIsSorted() === 'desc' && <ArrowDown size={16} />}
      </button>
    ),
    cell: ({ row }) => <div className='text-center'>{new Date(row.original.birthDate).toLocaleDateString()}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => (
      <button className='flex cursor-pointer items-center gap-1 transition-colors hover:text-black/60' onClick={() => column.toggleSorting()}>
        Gênero
        {column.getIsSorted() === 'asc' && <ArrowUp size={16} />}
        {column.getIsSorted() === 'desc' && <ArrowDown size={16} />}
      </button>
    ),
    cell: ({ row }) => genreMap[row.original.gender],
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const order = ['Masculino', 'Feminino']
      const a = order.indexOf(genreMap[rowA.original.gender] || '')
      const b = order.indexOf(genreMap[rowB.original.gender] || '')
      return a - b
    },
  },

  { accessorKey: 'maritalStatus', header: 'Estado civil', cell: ({ row }) => maritalStatusMap[row.original.maritalStatus], enableSorting: true },
  { accessorKey: 'phone', header: 'Telefone' },
  { accessorKey: 'commercialPhone', header: 'Telefone comercial' },
  { accessorKey: 'address', header: 'Endereço' },
  { accessorKey: 'neighborhood', header: 'Bairro' },
  { accessorKey: 'city', header: 'Cidade', enableSorting: true },
  { accessorKey: 'state', header: 'Estado', cell: ({ row }) => <div className='text-center'>{row.original.state}</div>, enableSorting: true },
  { accessorKey: 'zipCode', header: 'CEP' },
  { accessorKey: 'education', header: 'Escolaridade', cell: ({ row }) => educationLevelsMap[row.original.education], enableSorting: true },
  {
    accessorKey: 'hasInsurance',
    header: ({ column }) => (
      <button className='flex cursor-pointer items-center gap-1 transition-colors hover:text-black/60' onClick={() => column.toggleSorting()}>
        Possui plano de saúde
        {column.getIsSorted() === 'asc' && <ArrowUp size={16} />}
        {column.getIsSorted() === 'desc' && <ArrowDown size={16} />}
      </button>
    ),
    cell: ({ row }) => <div className='text-center'>{row.original.hasInsurance ? 'Sim' : 'Não'}</div>,
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      return rowA.original.hasInsurance === rowB.original.hasInsurance ? 0 : rowA.original.hasInsurance ? 1 : -1
    },
  },

  {
    accessorKey: 'selectedDate',
    header: ({ column }) => (
      <button className='flex cursor-pointer items-center gap-1 transition-colors hover:text-black/60' onClick={() => column.toggleSorting()}>
        Data da consulta
        {column.getIsSorted() === 'asc' && <ArrowUp size={16} />}
        {column.getIsSorted() === 'desc' && <ArrowDown size={16} />}
      </button>
    ),
    cell: ({ row }) => <div className='text-center'>{new Date(row.original.selectedDate).toLocaleDateString()}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'selectedTime',
    header: ({ column }) => (
      <button className='flex cursor-pointer items-center gap-1 transition-colors hover:text-black/60' onClick={() => column.toggleSorting()}>
        Horário da consulta
        {column.getIsSorted() === 'asc' && <ArrowUp size={16} />}
        {column.getIsSorted() === 'desc' && <ArrowDown size={16} />}
      </button>
    ),
    cell: ({ row }) => <div className='text-center'>{row.original.selectedTime}</div>,
    enableSorting: true,
  },
  {
    id: 'actions',
    header: 'Opções',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon'>
            <IconDotsVertical />
            <span className='sr-only'>Exibir opções</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-32'>
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <Link href={`/appointment/${row.original.id}/print`} target='_blank'>
            <DropdownMenuItem>Imprimir</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <ConfirmDeleteAppointmentDialog appointmentId={row.original.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
