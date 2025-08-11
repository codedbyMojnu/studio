"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, subMonths, subYears, startOfYear, endOfYear, eachMonthOfInterval } from 'date-fns';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { USER_LOGS, GLOBAL_WISDOM_ENTRIES } from "@/lib/data"
import { LogEntry } from "@/lib/types";

const processData = (logs: LogEntry[], period: 'monthly' | 'yearly') => {
  if (period === 'monthly') {
    const now = new Date();
    const lastMonth = startOfMonth(subMonths(now, 0));
    const interval = eachDayOfInterval({ start: lastMonth, end: now });

    return interval.map(day => {
      const dateString = format(day, 'yyyy-MM-dd');
      const dayLogs = logs.filter(log => log.date === dateString);
      return {
        date: format(day, 'MMM d'),
        applied: dayLogs.filter(log => log.status === 'applied').length,
        missed: dayLogs.filter(log => log.status === 'missed').length,
      };
    });
  } else { // yearly
    const now = new Date();
    const lastYear = startOfYear(subYears(now, 0));
    const interval = eachMonthOfInterval({ start: lastYear, end: now });
    
    return interval.map(month => {
      const monthString = format(month, 'yyyy-MM');
      const monthLogs = logs.filter(log => log.date.startsWith(monthString));
      return {
        date: format(month, 'MMM'),
        applied: monthLogs.filter(log => log.status === 'applied').length,
        missed: monthLogs.filter(log => log.status === 'missed').length,
      };
    });
  }
}

const chartConfig = {
  applied: {
    label: "Applied",
    color: "hsl(var(--primary))",
  },
  missed: {
    label: "Missed",
    color: "hsl(var(--destructive))",
  },
} satisfies React.ComponentProps<typeof ChartContainer>["config"];

export function WisdomChart() {
    const [period, setPeriod] = React.useState<'monthly' | 'yearly'>('monthly');
    const chartData = processData(USER_LOGS, period);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wisdom Progress</CardTitle>
        <CardDescription>Your applied and missed wisdom entries over time.</CardDescription>
      </CardHeader>
      <CardContent>
         <Tabs defaultValue="monthly" onValueChange={(value) => setPeriod(value as 'monthly' | 'yearly')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
         </Tabs>
        <ChartContainer config={chartConfig} className="h-[250px] w-full mt-4">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis allowDecimals={false} />
            <Tooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="applied" fill="var(--color-applied)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="missed" fill="var(--color-missed)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
