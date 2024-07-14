"use client"

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { format } from "date-fns"

const chartConfig = {
  raisedAmount: {
    label: "Raised Amount",
  },
  targetAmount: {
    label: "Target Amount",
    color: "hsl(var(--chart-2))",
  },
}

const Radial = ({projectDetails}) => {
    const { raisedAmount, targetAmount } = projectDetails;

    // Calculate the percentage of the goal reached
    const percentage = Math.min((raisedAmount / targetAmount) * 100, 100);
    // Calculate the end angle based on the percentage
    const endAngle = (percentage / 100) * 360;

    const chartData = [
        { targetAmount, raisedAmount, fill: "var(--color-safari)" },
    ]

    const formattedFromDate = format(projectDetails.date.from.toDate(), "MMMM dd, yyyy");
    const formattedToDate = format(projectDetails.date.to.toDate(), "MMMM dd, yyyy"); 

    return (
        <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
            <CardTitle>Total Amount Donated</CardTitle>
            <CardDescription>{formattedFromDate} - {formattedToDate}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
            <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
            >
            <RadialBarChart
                data={chartData}
                startAngle={0} 
                endAngle={endAngle} 
                innerRadius={100}
                outerRadius={130}
            >
                <PolarGrid
                    gridType="circle"
                    radialLines={true}
                    stroke="none"
                    className="first:fill-muted last:fill-background"
                    polarRadius={[106, 94]}
                />
                <RadialBar dataKey="raisedAmount" background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                        <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-4xl font-bold"
                                >
                                {chartData[0].raisedAmount.toLocaleString() }
                            </tspan>
                            <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                            >
                            Amount Donated
                            </tspan>
                        </text>
                        )
                    }
                    }}
                />
                </PolarRadiusAxis>
            </RadialBarChart>
            </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
                {percentage}% of total target amount of donation achieved
            </div>
            <div className="leading-none text-muted-foreground">
                {targetAmount - raisedAmount} php more to go 
            </div>
        </CardFooter>
        </Card>
    )
}

export default Radial
