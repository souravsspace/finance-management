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
import { insertAccountSchema } from "@/db/schema"

const formSchema = insertAccountSchema.pick({ name: true })

export type TFormSchema = z.infer<typeof formSchema>

type Props = {
   id?: string
   initialValues?: TFormSchema
   onSubmit: (data: TFormSchema) => void
   onDelete?: () => void
   disabled?: boolean
}

const AccountForm = ({
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
                           placeholder="e.g. Cash, Bank, Credit card"
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
               {id ? "Save changes" : "Create account"}
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
                  Delete account
               </Button>
            )}
         </form>
      </Form>
   )
}

export default AccountForm
