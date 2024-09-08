"use client"

import * as React from "react"
import { format, setDefaultOptions } from "date-fns"
import { ptBR } from "date-fns/locale";
setDefaultOptions({ locale: ptBR })
import { cn } from "@tasks-center/ui/lib/utils"
import { Button } from "@tasks-center/ui/components/ui/button"
import { Calendar } from "@tasks-center/ui/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@tasks-center/ui/components/ui/popover"
import { CalendarIcon } from "lucide-react"

export interface DatePickerProps extends React.ComponentProps<'div'> {
  placeholder?: string
  defaultDate?: Date
  onSelectDate: (date: Date) => void
}
export function DatePicker({ placeholder, onSelectDate, defaultDate, ...props }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(defaultDate)

  const handleSelectDate = (date?: Date) => {
    if (!date) return
    onSelectDate(date)
    setDate(date)
  }

  React.useEffect(() => {
    setDate(defaultDate)
  }, [defaultDate])

  return (
    <div  {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelectDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
