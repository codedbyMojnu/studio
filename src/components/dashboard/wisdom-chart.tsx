"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { format, eachDayOfInterval, eachMonthOfInterval, startOfYear, endOfYear, startOfMonth, endOfMonth, parse } from 'date-fns';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { USER_LOGS } from "@/lib/data"
import { LogEntry } from "@/lib/types";

const getAvailableYears = (logs: LogEntry[]): number[] => {
  const years = new Set(logs.map(log => new Date(log.date).getFullYear()));
  return Array.from(years).sort((a, b) => b - a);
};

const getAvailableMonths = (logs: LogEntry[], year: number): string[] => {
  const months = new Set(
    logs
      .filter(log => new Date(log.date).getFullYear() === year)
      .map(log => format(new Date(log.date), 'MMM yyyy'))
  );
  return Array.from(months).sort((a,b) => parse(a, 'MMM yyyy', new Date()).getTime() - parse(b, 'MMM yyyy', new Date()).getTime());
};

const processData = (logs: LogEntry[], filterType: 'yearly' | 'monthly', selectedDate: string) => {
  if (filterType === 'yearly') {
    const year = parseInt(selectedDate, 10);
    const yearStart = startOfYear(new Date(year, 0, 1));
    const yearEnd = endOfYear(new Date(year, 11, 31));
    const interval = eachMonthOfInterval({ start: yearStart, end: yearEnd });
    
    return interval.map(month => {
      const monthString = format(month, 'yyyy-MM');
      const monthLogs = logs.filter(log => log.date.startsWith(monthString));
      return {
        date: format(month, 'MMM'),
        applied: monthLogs.filter(log => log.status === 'applied').length,
        missed: monthLogs.filter(log => log.status === 'missed').length,
      };
    });
  } else { // monthly
    const monthDate = parse(selectedDate, 'MMM yyyy', new Date());
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    const interval = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return interval.map(day => {
      const dateString = format(day, 'yyyy-MM-dd');
      const dayLogs = logs.filter(log => log.date === dateString);
      return {
        date: format(day, 'd'),
        applied: dayLogs.filter(log => log.status === 'applied').length,
        missed: dayLogs.filter(log => log.status === 'missed').length,
      };
    });
  }
};


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
    const [filterType, setFilterType] = React.useState<'yearly' | 'monthly'>('yearly');
    
    const availableYears = getAvailableYears(USER_LOGS);
    const [selectedYear, setSelectedYear] = React.useState<number>(availableYears[0] || new Date().getFullYear());

    const availableMonths = getAvailableMonths(USER_LOGS, selectedYear);
    const [selectedMonth, setSelectedMonth] = React.useState<string>(availableMonths[availableMonths.length - 1] || format(new Date(), 'MMM yyyy'));

    const chartData = processData(USER_LOGS, filterType, filterType === 'yearly' ? selectedYear.toString() : selectedMonth);
    
    const handleYearChange = (yearString: string) => {
        const year = parseInt(yearString, 10);
        setSelectedYear(year);
        // Reset month selection when year changes
        const newAvailableMonths = getAvailableMonths(USER_LOGS, year);
        setSelectedMonth(newAvailableMonths[newAvailableMonths.length - 1] || format(new Date(year, 0, 1), 'MMM yyyy'));
    }

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <CardTitle>Wisdom Progress</CardTitle>
          <CardDescription>Your applied and missed wisdom entries over time.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
           <Select value={filterType} onValueChange={(value) => setFilterType(value as 'yearly' | 'monthly')}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedYear.toString()} onValueChange={handleYearChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map(year => <SelectItem key={year} value={year.toString()}>{year}</SelectItem>)}
              </SelectContent>
            </Select>
            {filterType === 'monthly' && (
                 <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableMonths.map(month => <SelectItem key={month} value={month}>{month}</SelectItem>)}
                    </SelectContent>
                 </Select>
            )}
        </div>
      </CardHeader>
      <CardContent>
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
