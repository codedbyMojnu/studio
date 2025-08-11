
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
import { GLOBAL_WISDOM_ENTRIES, USER_LOGS } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

const chartConfig = {
  Stoicism: { label: "Stoicism", color: "hsl(var(--chart-1))" },
  "Zen Buddhism": { label: "Zen Buddhism", color: "hsl(var(--chart-2))" },
  "Japanese Aesthetics": { label: "Japanese Aesthetics", color: "hsl(var(--chart-3))" },
  "Danger Zone": { label: "Danger Zone", color: "hsl(var(--destructive))" },
};

export const processCategoryData = () => {
    const categoryData: { [key: string]: { applied: number; missed: number; total: number } } = {};

    USER_LOGS.forEach(log => {
        const wisdom = GLOBAL_WISDOM_ENTRIES.find(w => w.id === log.wisdomId);
        if (wisdom) {
            if (!categoryData[wisdom.category]) {
                categoryData[wisdom.category] = { applied: 0, missed: 0, total: 0 };
            }
            categoryData[wisdom.category][log.status]++;
            categoryData[wisdom.category].total++;
        }
    });

    const dangerCategories: string[] = [];

    const chartData = Object.entries(categoryData).map(([category, data]) => {
        const appliedRate = data.total > 0 ? data.applied / data.total : 0;
        const isDanger = appliedRate < 0.8;
        if (isDanger) {
            dangerCategories.push(category);
        }

        return {
          name: category,
          value: data.total,
          applied: data.applied,
          missed: data.missed,
          appliedRate: Math.round(appliedRate * 100),
          fill: isDanger ? chartConfig["Danger Zone"].color : chartConfig[category as keyof typeof chartConfig]?.color,
        };
    });
    
    return { chartData, dangerCategories };
};

export function CategoryBreakdownChart() {
  const { chartData, dangerCategories } = processCategoryData();
  const dangerZoneText = dangerCategories.length > 0
    ? `Pay special attention to: ${dangerCategories.join(', ')}.`
    : 'All categories are above the 80% applied threshold. Great job!';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>
            {dangerZoneText}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, name, props) => (
                    <div className="flex flex-col">
                      <span>Total Logs: {props.payload.value}</span>
                      <span>Applied: {props.payload.applied} ({props.payload.appliedRate}%)</span>
                      <span>Missed: {props.payload.missed}</span>
                    </div>
                  )}
                />
              }
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
         <div className="flex flex-wrap justify-center gap-2 mt-4">
            {Object.entries(chartConfig).map(([key, value]) => {
                if(key === 'Danger Zone') return null;
                const data = chartData.find(d => d.name === key);
                if (!data) return null;
                return (
                    <Badge key={key} variant="outline" className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{backgroundColor: data.fill}}></span>
                        {value.label} ({data.appliedRate}%)
                    </Badge>
                )
            })}
        </div>
      </CardContent>
    </Card>
  )
}
