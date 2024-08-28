"use client"

import { useMountedState } from "react-use"

import EditSheetAccounts from "@/features/accounts/components/EditAccountSheet"
import NewSheetAccounts from "@/features/accounts/components/NewAccountSheet"

import EditSheetCategories from "@/features/categories/components/EditCategorySheet"
import NewSheetCategories from "@/features/categories/components/NewCategorySheet"

import NewSheetTransaction from "@/features/transactions/components/NewTransactionSheet"
// \import EditSheetTransaction from "@/features/transactions/components/EditTransactionSheet"

const SheetProvider = () => {
   const mounted = useMountedState()

   if (!mounted) return null

   return (
      <>
         <EditSheetAccounts />
         <NewSheetAccounts />

         <EditSheetCategories />
         <NewSheetCategories />

         <NewSheetTransaction />
         {/* <EditSheetTransaction /> */}
      </>
   )
}

export default SheetProvider
