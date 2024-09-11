"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNewTransaction } from "@/features/transactions/hooks/useNewTransaction"
import { Loader2, Plus } from "lucide-react"
import { DataTable } from "@/components/shared/DataTable"
import { columns } from "./components/columns"
import useGetTransactions from "@/features/transactions/api/useGetTransactions"
import { Skeleton } from "@/components/ui/skeleton"
import { useBulkDeleteTransactions } from "@/features/transactions/api/useBulkDeleteTransactions"
import { useState } from "react"
import UploadButton from "./components/UploadButton"
import ImportCard from "./components/ImportCard"
import { transactions as transactionsSchema } from "@/db/schema"
import { useSelectAccount } from "@/features/accounts/hooks/useSelectAccount"
import { toast } from "sonner"
import { useBulkCreateTransactions } from "@/features/transactions/api/useBulkCreateTransactions"

enum VARIANTS {
   LIST = "list",
   IMPORT = "import",
}

const INITIAL_IMPORT_RESULT = {
   data: [],
   errors: [],
   meta: {},
}

const TransactionsPage = () => {
   const [AccountDialog, confirm] = useSelectAccount()
   const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
   const [importResult, setImportResult] = useState(INITIAL_IMPORT_RESULT)

   const onUpload = (results: typeof INITIAL_IMPORT_RESULT) => {
      setImportResult(results)
      setVariant(VARIANTS.IMPORT)
   }

   const onCancel = () => {
      setImportResult(INITIAL_IMPORT_RESULT)
      setVariant(VARIANTS.LIST)
   }

   const newTransaction = useNewTransaction()
   const createTransactions = useBulkCreateTransactions()
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

   const onSubmitImport = async (
      values: (typeof transactionsSchema.$inferInsert)[]
   ) => {
      const accountId = await confirm()

      if (!accountId) {
         return toast.error("Please select an account to continue.")
      }

      const data = values.map((value) => ({
         ...value,
         accountId: accountId as string,
      }))

      createTransactions.mutate(
         { json: data },
         {
            onSuccess: () => {
               onCancel()
            },
         }
      )
   }

   if (variant === VARIANTS.IMPORT) {
      return (
         <>
            <AccountDialog />
            <ImportCard
               data={importResult.data}
               onCancel={onCancel}
               onSubmit={onSubmitImport}
            />
         </>
      )
   }

   return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
         <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
               <CardTitle className="text-xl line-clamp-1">
                  Transaction History
               </CardTitle>
               <div className="flex flex-col lg:flex-row items-center gap-2">
                  <Button
                     size={"sm"}
                     variant={"secondary"}
                     onClick={newTransaction.onOpen}
                     className="w-full lg:w-auto"
                  >
                     <Plus className="size-4 mr-2" />
                     Add new
                  </Button>
                  <UploadButton onUpload={onUpload} />
               </div>
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
