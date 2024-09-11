"use client"

import { formatDateRange } from "@/lib/utils"
import { useSearchParams } from "next/navigation"

const DataGrid = () => {
   const params = useSearchParams()

   const to = params.get("to") || undefined
   const from = params.get("from") || undefined

   const dataRangeLabel = formatDateRange({ from, to })

   return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
         <div>{dataRangeLabel}</div>
      </div>
   )
}

export default DataGrid
