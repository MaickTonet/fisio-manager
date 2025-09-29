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
import { Label } from '@/components/ui-components/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui-components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui-components/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui-components/tabs'
import { columns, schema } from './data-table-columns'
import { DataTablePagination } from './data-table-pagination'

type DataTableProps = {
  data: z.infer<typeof schema>[]
}

export function DataTable({ data }: DataTableProps) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
  const [activeTab, setActiveTab] = React.useState<'all' | 'new' | 'assigned' | 'finished'>('all')

  const filteredData = React.useMemo(() => {
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

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
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
            {table
              .getAllColumns()
              .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='rounded-xl capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {/* @ts-ignore */}
                  {flexRender(column.columnDef.header, { column, table })}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <TabsContent value={activeTab} className='relative flex flex-col gap-4 overflow-auto px-4 lg:px-6'>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted sticky top-0 z-10'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
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
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
        <DataTablePagination table={table} />
      </TabsContent>
    </Tabs>
  )
}
