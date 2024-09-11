import { client } from "@/lib/hono"
import { convertAmountFromMilliunits } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

const useGetSummary = () => {
   const params = useSearchParams()

   const from = params.get("from") || ""
   const to = params.get("to") || ""
   const accountId = params.get("accountId") || ""

   const query = useQuery({
      // TODO: Check if params are needed in the queryKey

      queryKey: ["summary", { from, to, accountId }],
      queryFn: async () => {
         const res = await client.api.summary.$get({
            query: { from, to, accountId },
         })

         if (!res.ok) throw new Error("Failed to fetch summary!")

         const { data } = await res.json()
         return {
            ...data,
            incomeAmount: convertAmountFromMilliunits(data.incomeAmount),
            expensesAmount: convertAmountFromMilliunits(data.expensesAmount),
            remainingAmount: convertAmountFromMilliunits(data.remainingAmount),
            categories: data.categories.map((category) => ({
               ...category,
               value: convertAmountFromMilliunits(category.value),
            })),
            days: data.days.map((day) => ({
               ...day,
               income: convertAmountFromMilliunits(day.income),
               expenses: convertAmountFromMilliunits(day.expenses),
            })),
         }
      },
   })

   return query
}

export default useGetSummary
