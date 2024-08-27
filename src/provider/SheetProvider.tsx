"use client"

import { useMountedState } from "react-use"

import EditSheetAccounts from "@/features/accounts/components/EditAccountSheet"
import NewSheetAccounts from "@/features/accounts/components/NewAccountSheet"

import EditSheetCategories from "@/features/categories/components/EditCategorySheet"
import NewSheetCategories from "@/features/categories/components/NewCategorySheet"

const SheetProvider = () => {
   const mounted = useMountedState()

   if (!mounted) return null

   return (
      <>
         <EditSheetAccounts />
         <NewSheetAccounts />

         <EditSheetCategories />
         <NewSheetCategories />
      </>
   )
}

export default SheetProvider
