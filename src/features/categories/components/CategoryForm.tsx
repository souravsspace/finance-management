import { Trash } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { insertCategoriesSchema } from "@/db/schema"

const formSchema = insertCategoriesSchema.pick({ name: true })

export type TFormSchema = z.infer<typeof formSchema>

type Props = {
   id?: string
   initialValues?: TFormSchema
   onSubmit: (data: TFormSchema) => void
   onDelete?: () => void
   disabled?: boolean
}

const CategoryForm = ({
   onSubmit,
   disabled,
   id,
   initialValues,
   onDelete,
}: Props) => {
   const form = useForm<TFormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: initialValues,
   })

   const handleSubmit = (values: TFormSchema) => {
      onSubmit(values)
   }

   const handleDelete = () => {
      onDelete?.()
   }

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="pt-4 space-y-4"
         >
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Name</FormLabel>
                     <FormControl>
                        <Input
                           disabled={disabled}
                           placeholder="e.g. Food, Travel, etc."
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button
               size={"sm"}
               type="submit"
               className="w-full"
               disabled={disabled}
            >
               {id ? "Save changes" : "Create category"}
            </Button>

            {!!id && (
               <Button
                  type="button"
                  size={"sm"}
                  className="w-full"
                  disabled={disabled}
                  onClick={handleDelete}
                  variant={"outline"}
               >
                  <Trash className="size-4 mr-2" />
                  Delete category
               </Button>
            )}
         </form>
      </Form>
   )
}

export default CategoryForm
