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
import * as XLSX from 'xlsx'
import { z } from 'zod'

import { Button } from '@/components/ui-components/button'
import { Calendar } from '@/components/ui-components/calendar'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui-components/dropdown-menu'
import { Input } from '@/components/ui-components/input'
import { Label } from '@/components/ui-components/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui-components/popover'
import { ScrollArea, ScrollBar } from '@/components/ui-components/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui-components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui-components/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui-components/tabs'
import { appointmentSchema } from '@/types/schemas/appointment-schema'
import { format } from 'date-fns'
import { CalendarIcon, Columns3Cog, Download, Search } from 'lucide-react'
import { useEffect } from 'react'
import { columns } from './data-table-columns'
import { DataTablePagination } from './data-table-pagination'

type DataTableProps = {
  data: z.infer<typeof appointmentSchema>[]
}

export function DataTable({ data }: DataTableProps) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [activeTab, setActiveTab] = React.useState<'all' | 'new' | 'assigned' | 'finished'>('all')

  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const [debouncedSearch, setDebouncedSearch] = React.useState('')

  const [statusFilter, setStatusFilter] = React.useState('all')
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')

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
    return filteredByStatus.filter((item) => {
      const matchesSearch =
        !term ||
        item.patientName.toLowerCase().includes(term) ||
        item.city.toLowerCase().includes(term) ||
        item.neighborhood.toLowerCase().includes(term) ||
        item.address.toLowerCase().includes(term)

      // se statusFilter for 'all', não aplica filtro por status
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter

      const itemDate = new Date(item.selectedDate)
      const matchesStart = !startDate || itemDate >= new Date(startDate)
      const matchesEnd = !endDate || itemDate <= new Date(endDate)

      return matchesSearch && matchesStatus && matchesStart && matchesEnd
    })
  }, [filteredByStatus, debouncedSearch, statusFilter, startDate, endDate])

  function handleExportExcel() {
    const worksheet = XLSX.utils.json_to_sheet(filteredData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Agendamentos')
    XLSX.writeFile(workbook, 'agendamentos.xlsx')
  }

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
              <Columns3Cog />
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
                    {/* @ts-expect-error missing required 'header' property from TanStack Table HeaderContext */}
                    {flexRender(column.columnDef.header, { column, table })}
                  </DropdownMenuCheckboxItem>
                ))}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='flex flex-col gap-3 px-4 lg:px-6'>
        <div className='flex flex-wrap items-center gap-3'>
          <div className='flex basis-1/2 flex-col'>
            <Label className='text-muted-foreground text-xs'>Filtrar por</Label>
            <div className='relative'>
              <Search className='text-muted-foreground absolute top-2.5 left-3 h-4 w-4' />
              <Input placeholder='Buscar por paciente' className='pl-9 text-base' ref={searchInputRef} />
            </div>
          </div>

          <div className='flex basis-1/3 items-center gap-2'>
            <div className='flex w-full flex-col'>
              <Label className='text-muted-foreground text-xs'>Data de início</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='outline' className='justify-start text-left font-normal'>
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {startDate ? format(new Date(startDate), 'dd/MM/yyyy') : 'Selecionar'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={startDate ? new Date(startDate) : undefined}
                    onSelect={(date) => setStartDate(date ? date.toISOString() : '')}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className='flex w-full flex-col'>
              <Label className='text-muted-foreground text-xs'>Data de fim</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='outline' className='justify-start text-left font-normal'>
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {endDate ? format(new Date(endDate), 'dd/MM/yyyy') : 'Selecionar'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar mode='single' selected={endDate ? new Date(endDate) : undefined} onSelect={(date) => setEndDate(date ? date.toISOString() : '')} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Button variant='default' onClick={handleExportExcel} className='mt-auto ml-auto bg-emerald-600 hover:bg-emerald-500'>
            <Download />
            Exportar Excel
          </Button>
        </div>
      </div>

      <TabsContent value={activeTab} className='relative flex flex-col gap-4 overflow-auto px-4 lg:px-6'>
        <ScrollArea className='overflow-hidden rounded-lg border'>
          <div>
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
