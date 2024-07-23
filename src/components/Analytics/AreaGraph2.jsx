"use client"

import { TrendingUp } from "lucide-react"
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { addMonths, endOfMonth, format, startOfMonth } from "date-fns"

const chartConfig = {
  reviews: {
    label: "Reviews",
    color: "black",
  },
  updates: {
    label: "Updates",
    color: "gray",
  },
} 

export default function AreaGraph2({projectDetails, rev, upd}) {
    const chartData = []

    let currentDate = startOfMonth(projectDetails.date.from.toDate());
    const endDate = endOfMonth(projectDetails.date.to.toDate());

    console.log(currentDate)

    while (currentDate <= endDate) {
        const month = format(currentDate, "MMMM yyyy");
        const reviews = rev.reduce((acc, review) => {
            if(review.createdAt.toDate().getMonth() === currentDate.getMonth() && review.createdAt.toDate().getFullYear() === currentDate.getFullYear()){
                return acc + 1;
            }
            return acc
        }, 0)
        const updates = upd.reduce((acc, update) => {
            if(update.createdAt.toDate().getMonth() === currentDate.getMonth() && update.createdAt.toDate().getFullYear() === currentDate.getFullYear()){
                return acc + 1;
            }
            return acc
        }, 0)
        chartData.push({
          month,
          reviews,
          updates,
        });
    
        currentDate = addMonths(currentDate, 1);
    }

    console.log(chartData)

    return (
        <Card className="">
        <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
            <CardDescription>
                Page views, shares, updates, and reviews over time.
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
                dataKey="reviews"
                type="natural"
                fill="var(--color-reviews)"
                fillOpacity={0.4}
                stroke="var(--color-reviews)"
                stackId="a"
                />
                <Area
                dataKey="updates"
                type="natural"
                fill="var(--color-updates)"
                fillOpacity={0.4}
                stroke="var(--color-updates)"
                stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
            </ChartContainer>
        </CardContent>
        <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                {format(projectDetails.date.from.toDate(), "MMMM dd, yyyy") + ' - ' + format(projectDetails.date.to.toDate(), "MMMM dd, yyyy")}
                </div>
            </div>
            </div>
        </CardFooter>
        </Card>
    )
}
