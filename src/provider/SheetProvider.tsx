"use client"

import { useMountedState } from "react-use"

import EditAccountSheetAccounts from "@/features/accounts/components/EditAccountSheet"
import NewAccountSheetAccounts from "@/features/accounts/components/NewAccountSheet"

import EditAccountSheetCategories from "@/features/categories/components/EditCategorySheet"
import NewAccountSheetCategories from "@/features/categories/components/NewCategorySheet"

const SheetProvider = () => {
   const mounted = useMountedState()

   if (!mounted) return null

   return (
      <>
         <EditAccountSheetAccounts />
         <NewAccountSheetAccounts />

         <EditAccountSheetCategories />
         <NewAccountSheetCategories />
      </>
   )
}

export default SheetProvider
