"use client"

import * as React from "react"
import { Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { USER_LOGS } from "@/lib/data"

const chartConfig = {
  applied: { label: "Applied", color: "hsl(var(--chart-1))" },
  missed: { label: "Missed", color: "hsl(var(--destructive))" },
};

const processLifetimeData = () => {
    const totalLogs = USER_LOGS.length;
    const appliedCount = USER_LOGS.filter(log => log.status === 'applied').length;
    const missedCount = totalLogs - appliedCount;

    const appliedPercentage = Math.round((appliedCount / totalLogs) * 100);
    const missedPercentage = 100 - appliedPercentage;

    return [
        { name: `Applied (${appliedPercentage}%)`, value: appliedCount, fill: chartConfig.applied.color },
        { name: `Missed (${missedPercentage}%)`, value: missedCount, fill: chartConfig.missed.color },
    ];
};

export function LifetimeStatsChart() {
  const chartData = processLifetimeData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lifetime Wisdom Stats</CardTitle>
        <CardDescription>
          Your overall ratio of applied vs. missed wisdom entries.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
         <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
