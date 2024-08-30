"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNewTransaction } from "@/features/transactions/hooks/useNewTransaction"
import { Loader2, Plus } from "lucide-react"
import { DataTable } from "@/components/shared/DataTable"
import { columns } from "./columns"
import useGetTransactions from "@/features/transactions/api/useGetTransactions"
import { Skeleton } from "@/components/ui/skeleton"
import { useBulkDeleteTransactions } from "@/features/transactions/api/useBulkDeleteTransactions"

const TransactionsPage = () => {
   const newTransaction = useNewTransaction()
   const deleteTransactions = useBulkDeleteTransactions()

   const transactionsQuery = useGetTransactions()
   const transactions = transactionsQuery.data || []

   const isDisabled =
      transactionsQuery.isLoading || deleteTransactions.isPending

   if (transactionsQuery.isLoading) {
      return (
         <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
               <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-8 w-44" />
               </CardHeader>
               <CardContent>
                  <div className="flex gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                     <Skeleton className="h-8 w-64" />
                     <Skeleton className="h-8 w-40" />
                  </div>
                  <div className="h-[500px] w-full flex items-center justify-center">
                     <Loader2 className="size-6 text-slate-300 animate-spin" />
                  </div>
               </CardContent>
            </Card>
         </div>
      )
   }

   return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
         <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
               <CardTitle className="text-xl line-clamp-1">
                  Transaction History
               </CardTitle>
               <Button size={"sm"} onClick={newTransaction.onOpen}>
                  <Plus className="size-4 mr-2" />
                  Add new
               </Button>
            </CardHeader>
            <CardContent>
               <DataTable
                  columns={columns}
                  data={transactions}
                  filterKey={"payee"}
                  onDelete={(row) => {
                     const ids = row.map((r) => r.original.id)
                     deleteTransactions.mutate({ json: { ids } })
                  }}
                  disabled={isDisabled}
               />
            </CardContent>
         </Card>
      </div>
   )
}

export default TransactionsPage
