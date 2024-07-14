"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    raisedAmount: {
    label: "RaisedAmount",
    color: "black",
  },
} 

export default function AreaGraph() {
    const chartData = [
        { month: "January", raisedAmount: 186 },
        { month: "February", raisedAmount: 305 },
        { month: "March", raisedAmount: 237 },
        { month: "April", raisedAmount: 73 },
        { month: "May", raisedAmount: 209 },
        { month: "June", raisedAmount: 214 },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Donation Amount Over Time</CardTitle>
                <CardDescription>
                Showing total raised amount over time
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                    left: 12,
                    right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                    />
                    <Area
                    dataKey="raisedAmount"
                    type="natural"
                    fill="var(--color-raisedAmount)"
                    fillOpacity={0.4}
                    stroke="var(--color-raisedAmount)"
                    />
                </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month 
                    </div>
                    <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    January - June 2024
                    </div>
                </div>
                </div>
            </CardFooter>
        </Card>
    )
}
