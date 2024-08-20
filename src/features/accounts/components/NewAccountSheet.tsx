import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
} from "@/components/ui/sheet"
import AccountForm, { TFormSchema } from "./AccountForm"
import { useNewAccount } from "@/features/accounts/hooks/useNewAccount"
import { useCreateAccount } from "@/features/accounts/api/useCreateAccount"

const NewAccountSheet = () => {
   const { isOpen, onClose } = useNewAccount()

   const mutation = useCreateAccount()

   const onSubmit = (values: TFormSchema) => {
      mutation.mutate(
         { json: values },
         {
            onSuccess: () => {
               onClose()
            },
         }
      )
   }

   return (
      <Sheet open={isOpen} onOpenChange={onClose}>
         <SheetContent className="space-y-4">
            <SheetHeader>
               <SheetTitle>New Account</SheetTitle>
               <SheetDescription>
                  Create a new account to track your expenses.
               </SheetDescription>
            </SheetHeader>
            <AccountForm
               onSubmit={onSubmit}
               disabled={mutation.isPending}
               initialValues={{ name: "" }}
            />
         </SheetContent>
      </Sheet>
   )
}

export default NewAccountSheet
