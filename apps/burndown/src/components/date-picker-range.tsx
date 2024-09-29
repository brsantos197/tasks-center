"use client"

import * as React from "react"
import { addDays, eachDayOfInterval, format, setDefaultOptions } from "date-fns"
import { ptBR } from "date-fns/locale";
setDefaultOptions({ locale: ptBR })
import { DateRange } from "react-day-picker"

import { cn } from "@tasks-center/ui/lib/utils"
import { Button } from "@tasks-center/ui/components/ui/button"
import { Calendar } from "@tasks-center/ui/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@tasks-center/ui/components/ui/popover"
import { CalendarIcon } from "lucide-react";

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
 from: Date
 to?: Date
 onSelectDate: (date: Date[]) => void
}
export function DatePickerWithRange({
  className,
  from,
  to,
  onSelectDate
}: DatePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from,
    to: to ?? addDays(from, 7),
  })

  React.useEffect(() => {
    if (date) {
      const days = eachDayOfInterval({
        start: date.from!,
        end: date.to!,
      })
      
      onSelectDate(days)
    }
  }, [date, onSelectDate])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
