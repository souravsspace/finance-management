import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
} from "@/components/ui/sheet"
import { Loader2 } from "lucide-react"
import CategoryForm, { TFormSchema } from "./CategoryForm"
import useGetCategory from "@/features/categories/api/useGetCategory"
import { useEditCategory } from "@/features/categories/api/useEditCategory"
import { useOpenCategory } from "@/features/categories/hooks/useOpenCategory"
import { useDeleteCategory } from "@/features/categories/api/useDeleteCategory"
import { useConfirm } from "@/hooks/useConfirm"

const EditCategorySheet = () => {
   const { isOpen, onClose, id } = useOpenCategory()

   const [ConfirmationDialog, confirm] = useConfirm(
      "Are you sure?",
      "You are about to delete this category. This action cannot be undone."
   )

   const categoryQuery = useGetCategory(id)
   const editMutation = useEditCategory(id)
   const deleteMutation = useDeleteCategory(id)

   const isPending = editMutation.isPending || deleteMutation.isPending

   const isLoading = categoryQuery.isLoading

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

   const defaultValues = categoryQuery.data
      ? {
           name: categoryQuery.data.name,
        }
      : { name: "" }

   return (
      <>
         <ConfirmationDialog />

         <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
               <SheetHeader>
                  <SheetTitle>Edit Category</SheetTitle>
                  <SheetDescription>
                     Edit an existing category.
                  </SheetDescription>
               </SheetHeader>
               {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Loader2 className="size-4 text-muted-foreground animate-spin" />
                  </div>
               ) : (
                  <CategoryForm
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

export default EditCategorySheet
