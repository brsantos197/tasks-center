"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import { useTasks } from "@/hooks/useTasks"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@tasks-center/ui/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@tasks-center/ui/components/ui/chart"
import { ComponentProps, useState } from "react"
import { DatePickerWithRange } from "./date-picker-range"

export const description = "A line chart with a label"

const chartConfig = {
  ideal: {
    label: "Ideal",
    color: "hsl(var(--chart-1))",
  },
  real: {
    label: "Real",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface BurndownChartProps extends ComponentProps<typeof Card> {
  config?: ChartConfig
}
//
export function BurndownChart({ config = chartConfig, ...props }: BurndownChartProps) {
  const [dates, setDates] = useState<Date[]>([])
  const { tasks } = useTasks()
  const calculateIdeal = () => {
    const totalWork = tasks.reduce((acc, curr) => acc + curr.score, 0);
    return dates.reduce<{ day: string; ideal: number; real: number }[]>((acc, day, i) => {
      acc.push({
        day: day.getDate().toString(),
        ideal: totalWork - (totalWork / dates.length) * i,
        real: tasks.reduce((acc, curr) => {
          if (new Date(curr.endDate!).getMilliseconds() <= day.getMilliseconds() && curr.completed) {
            return acc - curr.score
          }
          return acc
        }, totalWork),
      })
      return acc
    }, []);
  };
  
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-2xl mb-4">Gráfico de Burndown</CardTitle>
        <DatePickerWithRange from={new Date()} onSelectDate={(newDates) => {
          setDates(newDates)
        }}/>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <LineChart
            accessibilityLayer
            data={calculateIdeal()}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="ideal"
              type="monotone"
              stroke="var(--color-ideal)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-ideal)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
            <Line
              dataKey="real"
              type="monotone"
              stroke="var(--color-real)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-real)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
