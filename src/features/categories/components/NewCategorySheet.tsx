import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
} from "@/components/ui/sheet"
import CategoryForm, { TFormSchema } from "./CategoryForm"
import { useNewCategory } from "@/features/categories/hooks/useNewCategory"
import { useCreateCategory } from "@/features/categories/api/useCreateCategory"

const NewCategorySheet = () => {
   const { isOpen, onClose } = useNewCategory()

   const mutation = useCreateCategory()

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
               <SheetTitle>New Category</SheetTitle>
               <SheetDescription>
                  Create a new category to track your expenses.
               </SheetDescription>
            </SheetHeader>
            <CategoryForm
               onSubmit={onSubmit}
               disabled={mutation.isPending}
               initialValues={{ name: "" }}
            />
         </SheetContent>
      </Sheet>
   )
}

export default NewCategorySheet
