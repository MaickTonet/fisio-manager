'use client'

import { IconChevronDown, IconLayoutColumns } from '@tabler/icons-react'
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import * as React from 'react'
import { z } from 'zod'

import { Button } from '@/components/ui-components/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui-components/dropdown-menu'
import { Input } from '@/components/ui-components/input'
import { Label } from '@/components/ui-components/label'
import { ScrollArea, ScrollBar } from '@/components/ui-components/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui-components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui-components/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui-components/tabs'
import { appointmentSchema } from '@/types/schemas/appointment-schema'
import { Search } from 'lucide-react'
import { useEffect } from 'react'
import { columns } from './data-table-columns'
import { DataTablePagination } from './data-table-pagination'

type DataTableProps = {
  data: z.infer<typeof appointmentSchema>[]
}

export function DataTable({ data }: DataTableProps) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
  const [activeTab, setActiveTab] = React.useState<'all' | 'new' | 'assigned' | 'finished'>('all')
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const [debouncedSearch, setDebouncedSearch] = React.useState('')
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    patientName: true,
    status: true,
    age: true,
    birthDate: false,
    gender: true,
    maritalStatus: false,
    phone: true,
    commercialPhone: false,
    address: false,
    neighborhood: false,
    city: false,
    state: false,
    zipCode: false,
    hasInsurance: true,
    emergencyContact: false,
    education: false,
    profession: false,
    clinicalDiagnosis: false,
    symptoms: false,
    symptomsDescription: false,
    insuranceDescription: false,
    selectedDate: true,
    selectedTime: true,
  })

  const filteredByStatus = React.useMemo(() => {
    switch (activeTab) {
      case 'new':
        return data.filter((item) => item.status === 'new')
      case 'assigned':
        return data.filter((item) => item.status === 'assigned')
      case 'finished':
        return data.filter((item) => item.status === 'done')
      default:
        return data
    }
  }, [activeTab, data])

  useEffect(() => {
    const input = searchInputRef.current
    if (!input) return

    let timeout: NodeJS.Timeout

    const handleInput = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setDebouncedSearch(input.value.toLowerCase())
      }, 300)
    }

    input.addEventListener('input', handleInput)
    return () => input.removeEventListener('input', handleInput)
  }, [])

  const filteredData = React.useMemo(() => {
    const term = debouncedSearch.toLowerCase()
    if (!term) return filteredByStatus
    return filteredByStatus.filter(
      (item) => item.patientName.toLowerCase().includes(term),
      // item.city.toLowerCase().includes(term) ||
      // item.neighborhood.toLowerCase().includes(term) ||
      // item.address.toLowerCase().includes(term),
    )
  }, [filteredByStatus, debouncedSearch])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
    },
    enableSortingRemoval: true,
    getRowId: (row) => row.id.toString(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as typeof activeTab)} className='w-full flex-col gap-6'>
      <div className='flex items-center justify-between px-4 lg:px-6'>
        <Label htmlFor='view-selector' className='sr-only'>
          View
        </Label>
        <Select value={activeTab} onValueChange={(val) => setActiveTab(val as typeof activeTab)}>
          <SelectTrigger className='flex w-fit @4xl/main:hidden' size='sm' id='view-selector'>
            <SelectValue placeholder='Select a view' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Todos</SelectItem>
            <SelectItem value='new'>Novos</SelectItem>
            <SelectItem value='assigned'>Atribuídos</SelectItem>
            <SelectItem value='finished'>Finalizados</SelectItem>
          </SelectContent>
        </Select>

        <TabsList className='hidden @4xl/main:flex'>
          <TabsTrigger value='all'>Todos</TabsTrigger>
          <TabsTrigger value='new'>Novos</TabsTrigger>
          <TabsTrigger value='assigned'>Atribuídos</TabsTrigger>
          <TabsTrigger value='finished'>Finalizados</TabsTrigger>
        </TabsList>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm' className='rounded-xl'>
              <IconLayoutColumns />
              <span className='hidden lg:inline'>Customizar colunas</span>
              <span className='lg:hidden'>Colunas</span>
              <IconChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-56 rounded-xl'>
            <ScrollArea className='h-72'>
              {table
                .getAllColumns()
                .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='mr-3 cursor-pointer rounded-xl'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {/* @ts-ignore */}
                    {flexRender(column.columnDef.header, { column, table })}
                  </DropdownMenuCheckboxItem>
                ))}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='px-4 lg:px-6'>
        <div className='relative w-full'>
          <Search className='text-muted-foreground absolute top-2.5 left-3 h-4 w-4' />
          <Input placeholder='Buscar por nome, cidade, bairro ou endereço...' className='pl-9 text-base' ref={searchInputRef} />
        </div>
      </div>

      <TabsContent value={activeTab} className='relative flex flex-col gap-4 overflow-auto px-4 lg:px-6'>
        <ScrollArea className='overflow-hidden rounded-lg border'>
          <div className=''>
            <Table>
              <TableHeader className='bg-muted sticky top-0 z-10'>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead className='px-6' key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell className='px-6' key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                      Sem resultados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
        <DataTablePagination table={table} />
      </TabsContent>
    </Tabs>
  )
}
