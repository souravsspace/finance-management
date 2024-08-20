"use client"

import NewAccountSheet from "@/features/accounts/components/NewAccountSheet"
import { useMountedState } from "react-use"

const SheetProvider = () => {
   const mounted = useMountedState()

   if (!mounted) return null

   return (
      <>
         <NewAccountSheet />
      </>
   )
}

export default SheetProvider
