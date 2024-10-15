"use client"

import {SearchCheck,SearchX  } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export const description = "A bar chart showing prediction percentages"

interface PredictionProps {
  predictions: {
    BAD: string;
    GOOD: string;
  }
}

const chartConfig = {
  BAD: {
    label: "Bad",
    color: "hsl(var(--destructive))",
  },
  GOOD: {
    label: "Good",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function DataChart({ predictions }: PredictionProps) {
  const chartData = [
    { category: "Bad", value: parseFloat(predictions.BAD) || 0 },
    { category: "Good", value: parseFloat(predictions.GOOD) || 0 },
  ];
  
const totalPercentage = chartData.reduce((sum, item) => sum + item.value, 0);
const highestValue = Math.max(chartData[0].value, chartData[1].value);
const trend = totalPercentage >= 100 ? "up" : "down";

  return (
    <div>
        <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Prediction Results</CardTitle>
        <CardDescription>Good vs Bad Predictions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={350} height={300} data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {payload[0].name}
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {payload[0].value}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar
              dataKey="value"
              fill="var(--color-GOOD)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <Badge className="flex gap-2 font-medium leading-none">
          
          {trend === "up" ? "Good Onion" : "Bad Onion"} by {highestValue}% {" "}
          {trend === "up" ? (
            <SearchCheck className="h-4 w-4 text-success" />
          ) : (
            <SearchX className="h-4 w-4 text-destructive" />
          )}
        </Badge>
        <div className="leading-none text-muted-foreground">
          Showing prediction results
        </div>
      </CardFooter>
    </Card>
    <Separator/>
    
    </div>
  )
}