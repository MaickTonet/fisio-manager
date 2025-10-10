'use client'

import { Button } from '@/components/ui-components/button'
import { Label } from '@/components/ui-components/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui-components/select'
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react'
import { Table } from '@tanstack/react-table'

type PaginationControlsProps<TData> = {
  table: Table<TData>
}

export function DataTablePagination<TData>({ table }: PaginationControlsProps<TData>) {
  return (
    <div className='flex items-center justify-between px-4'>
      <div className='text-muted-foreground hidden flex-1 text-sm lg:flex'>
        {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} linhas selecionada.
      </div>
      <div className='flex w-full items-center gap-8 lg:w-fit'>
        <div className='hidden items-center gap-2 lg:flex'>
          <Label htmlFor='rows-per-page' className='text-sm font-medium'>
            Linhas por página
          </Label>
          <Select value={`${table.getState().pagination.pageSize}`} onValueChange={(value) => table.setPageSize(Number(value))}>
            <SelectTrigger size='sm' className='w-20' id='rows-per-page'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='flex w-fit items-center justify-center text-sm font-medium'>
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </div>

        <div className='ml-auto flex items-center gap-2 lg:ml-0'>
          <Button variant='outline' className='hidden h-8 w-8 p-0 lg:flex' onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
            <span className='sr-only'>Ir para a primeira página</span>
            <IconChevronsLeft />
          </Button>
          <Button variant='outline' className='size-8' size='icon' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <span className='sr-only'>Ir para a página anterior</span>
            <IconChevronLeft />
          </Button>
          <Button variant='outline' className='size-8' size='icon' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <span className='sr-only'>Ir para a próxima página</span>
            <IconChevronRight />
          </Button>
          <Button
            variant='outline'
            className='hidden size-8 lg:flex'
            size='icon'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Ir para a última página</span>
            <IconChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
