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

const chartConfig = {
  Stoicism: { label: "Stoicism", color: "hsl(var(--chart-1))" },
  "Zen Buddhism": { label: "Zen Buddhism", color: "hsl(var(--chart-2))" },
  "Japanese Aesthetics": { label: "Japanese Aesthetics", color: "hsl(var(--chart-3))" },
  "Danger Zone": { label: "Danger Zone", color: "hsl(var(--destructive))" },
};

const processCategoryData = () => {
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

    let dangerCategory = '';
    let maxMissedRate = -1;

    Object.entries(categoryData).forEach(([category, data]) => {
        const missedRate = data.missed / data.total;
        if (missedRate > maxMissedRate) {
            maxMissedRate = missedRate;
            dangerCategory = category;
        }
    });

    const chartData = Object.entries(categoryData).map(([name, value]) => ({
      name,
      value: value.total,
      fill: name === dangerCategory ? chartConfig["Danger Zone"].color : chartConfig[name as keyof typeof chartConfig]?.color,
      isDanger: name === dangerCategory,
    }));
    
    return { chartData, dangerCategory };
};

export function CategoryBreakdownChart() {
  const { chartData, dangerCategory } = processCategoryData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>
          {dangerCategory ? `Pay special attention to ${dangerCategory}, your current "danger zone".` : 'Distribution of your logged wisdom entries across categories.'}
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
