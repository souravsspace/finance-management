import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogHeader,
   DialogContent,
   DialogFooter,
   DialogTitle,
   DialogDescription,
} from "@/components/ui/dialog"
import { useRef, useState } from "react"
import useGetAccounts from "../api/useGetAccounts"
import { useCreateAccount } from "../api/useCreateAccount"
import Select from "@/components/shared/Select"

export const useSelectAccount = (): [() => JSX.Element, () => unknown] => {
   const accountQuery = useGetAccounts()
   const accountMutation = useCreateAccount()
   const onCreateAccount = (name: string) =>
      accountMutation.mutate({
         json: {
            name,
         },
      })
   const accountOpts = (accountQuery.data ?? []).map((account) => ({
      value: account.id,
      label: account.name,
   }))

   const [promise, setPromise] = useState<{
      resolve: (value: string | undefined) => void
   } | null>(null)
   const selectValue = useRef<string>()

   const confirm = () =>
      new Promise((resolve, reject) => {
         setPromise({ resolve })
      })

   const handleClose = () => setPromise(null)

   const handleConfirm = () => {
      promise?.resolve(selectValue.current)
      handleClose()
   }

   const handleCancel = () => {
      promise?.resolve(undefined)
      handleClose()
   }

   const AccountDialog = () => (
      <Dialog open={promise !== null}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Select Account</DialogTitle>
               <DialogDescription>
                  Please select an account to continue.
               </DialogDescription>
            </DialogHeader>
            <Select
               placeholder="Select an account"
               options={accountOpts}
               onCreate={onCreateAccount}
               onChange={(value) => (selectValue.current = value)}
               disabled={accountMutation.isPending || accountQuery.isLoading}
            />
            <DialogFooter>
               <Button onClick={handleCancel} variant={"outline"}>
                  Cancel
               </Button>
               <Button onClick={handleConfirm}>Confirm</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )

   return [AccountDialog, confirm]
}
