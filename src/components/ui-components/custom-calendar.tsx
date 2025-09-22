'use client'

import { Calendar } from '@/components/ui-components/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui-components/select'
import { ComponentProps, useState } from 'react'
import type { DayPickerSingleProps } from 'react-day-picker'
import { DropdownNavProps, DropdownProps } from 'react-day-picker'

type CustomCalendarProps = Omit<ComponentProps<typeof Calendar>, 'mode'> & DayPickerSingleProps

export default function CustomCalendar({
  mode = 'single',
  selected,
  onSelect,
  captionLayout = 'dropdown',
  fromYear,
  toYear,
  className,
  ...props
}: CustomCalendarProps) {
  const [internalDate, setInternalDate] = useState<Date | undefined>(selected ?? new Date())

  const handleSelect: CustomCalendarProps['onSelect'] = (selectedDate, selectedDay, activeModifiers, e) => {
    setInternalDate(selectedDate)
    onSelect?.(selectedDate, selectedDay, activeModifiers, e)
  }

  const handleCalendarChange = (_value: string | number, _e: React.ChangeEventHandler<HTMLSelectElement>) => {
    const _event = {
      target: { value: String(_value) },
    } as React.ChangeEvent<HTMLSelectElement>
    _e(_event)
  }

  return (
    <Calendar
      mode={mode}
      selected={selected ?? internalDate}
      onSelect={handleSelect}
      captionLayout={captionLayout}
      fromYear={fromYear}
      toYear={toYear}
      className={`rounded-md border p-2 ${className ?? ''}`}
      classNames={{ month_caption: 'mx-0' }}
      hideNavigation
      components={{
        DropdownNav: (props: DropdownNavProps) => <div className='flex w-full items-center gap-2'>{props.children}</div>,
        Dropdown: (props: DropdownProps) => (
          <Select
            value={String(props.value)}
            onValueChange={(value) => {
              if (props.onChange) {
                handleCalendarChange(value, props.onChange)
              }
            }}
          >
            <SelectTrigger className='h-8 w-fit font-medium first:grow'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='max-h-[min(26rem,var(--radix-select-content-available-height))]'>
              {props.options?.map((option) => (
                <SelectItem key={option.value} value={String(option.value)} disabled={option.disabled}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ),
      }}
      {...props}
    />
  )
}
