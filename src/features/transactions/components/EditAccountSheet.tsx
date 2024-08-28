import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
} from "@/components/ui/sheet"
import { Loader2 } from "lucide-react"
import AccountForm, { TFormSchema } from "./TransactionForm"
import useGetAccount from "@/features/accounts/api/useGetAccount"
import { useEditAccount } from "@/features/accounts/api/useEditAccount"
import { useOpenAccount } from "@/features/accounts/hooks/useOpenAccount"
import { useDeleteAccount } from "@/features/accounts/api/useDeleteAccount"
import { useConfirm } from "@/hooks/useConfirm"

const EditAccountSheet = () => {
   const { isOpen, onClose, id } = useOpenAccount()

   const [ConfirmationDialog, confirm] = useConfirm(
      "Are you sure?",
      "You are about to delete this account. This action cannot be undone."
   )

   const accountQuery = useGetAccount(id)
   const editMutation = useEditAccount(id)
   const deleteMutation = useDeleteAccount(id)

   const isPending = editMutation.isPending || deleteMutation.isPending

   const isLoading = accountQuery.isLoading

   const onSubmit = (values: TFormSchema) => {
      editMutation.mutate(
         {
            json: values,
            param: {
               id,
            },
         },
         {
            onSuccess: () => {
               onClose()
            },
         }
      )
   }

   const onDelete = async () => {
      const ok = await confirm()

      if (ok) {
         deleteMutation.mutate(undefined, {
            onSuccess: () => {
               onClose()
            },
         })
      }
   }

   const defaultValues = accountQuery.data
      ? {
           name: accountQuery.data.name,
        }
      : { name: "" }

   return (
      <>
         <ConfirmationDialog />

         <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
               <SheetHeader>
                  <SheetTitle>Edit Account</SheetTitle>
                  <SheetDescription>Edit an existing account.</SheetDescription>
               </SheetHeader>
               {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Loader2 className="size-4 text-muted-foreground animate-spin" />
                  </div>
               ) : (
                  <AccountForm
                     id={id}
                     onSubmit={onSubmit}
                     disabled={isPending}
                     initialValues={defaultValues}
                     onDelete={onDelete}
                  />
               )}
            </SheetContent>
         </Sheet>
      </>
   )
}

export default EditAccountSheet
