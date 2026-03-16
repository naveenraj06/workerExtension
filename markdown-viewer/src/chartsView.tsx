"use client"

import { ChartContainer, type ChartConfig, Lists, ListsItem } from "@workerextension/ui"
import { useMemo } from "react"
import { useLoaderData } from "react-router"
import { Bar, BarChart } from "recharts"
import {PageViewRenderer} from "./utils/modules"



export function ChartExample() {
    const pageSchema = useLoaderData()
    console.log("🚀 ~ ChartExample ~ pageSchema:", pageSchema)

    return <PageViewRenderer layout={pageSchema.layout} />
}
