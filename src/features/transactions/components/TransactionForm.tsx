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
import { insertTransactionsSchema } from "@/db/schema"
import Select from "@/components/shared/Select"
import DatePicker from "@/components/shared/DatePicker"
import { Textarea } from "@/components/ui/textarea"
import AmountInput from "@/components/shared/AmountInput"
import { convertAmountToMilliunits } from "@/lib/utils"

const formSchema = z.object({
   date: z.coerce.date(),
   accountId: z.string(),
   categoryId: z.string().nullable().optional(),
   payee: z.string(),
   amount: z.string(),
   notes: z.string().nullable().optional(),
})

const apiSchema = insertTransactionsSchema.omit({ id: true })

export type TFormSchema = z.infer<typeof formSchema>
type TApiFormSchema = z.infer<typeof apiSchema>

type Props = {
   id?: string
   initialValues?: TFormSchema
   onSubmit: (data: TApiFormSchema) => void
   onDelete?: () => void
   disabled?: boolean
   categoryOptions: { label: string; value: string }[]
   accountOptions: { label: string; value: string }[]
   onCreateCategory: (name: string) => void
   onCreateAccount: (name: string) => void
}

const TransactionForm = ({
   onSubmit,
   disabled,
   id,
   initialValues,
   onDelete,
   accountOptions,
   categoryOptions,
   onCreateAccount,
   onCreateCategory,
}: Props) => {
   const form = useForm<TFormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: initialValues,
   })

   const handleSubmit = (values: TFormSchema) => {
      const amount = parseFloat(values.amount)
      const amountInMilliunits = convertAmountToMilliunits(amount)

      onSubmit({
         ...values,
         amount: amountInMilliunits,
      })
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
               name="date"
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <DatePicker
                           value={field.value}
                           onChange={field.onChange}
                           disabled={disabled}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="accountId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Account</FormLabel>
                     <FormControl>
                        <Select
                           placeholder="Select an account"
                           options={accountOptions}
                           onCreate={onCreateAccount}
                           onChange={field.onChange}
                           value={field.value}
                           disabled={disabled}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="categoryId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Category</FormLabel>
                     <FormControl>
                        <Select
                           placeholder="Select an category"
                           options={categoryOptions}
                           onCreate={onCreateCategory}
                           onChange={field.onChange}
                           value={field.value}
                           disabled={disabled}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="payee"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Payee</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Add a payee"
                           disabled={disabled}
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="amount"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Amount</FormLabel>
                     <FormControl>
                        <AmountInput
                           {...field}
                           placeholder="0.00"
                           disabled={disabled}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="notes"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Notes</FormLabel>
                     <FormControl>
                        <Textarea
                           {...field}
                           value={field.value ?? ""}
                           placeholder="Optional notes"
                           disabled={disabled}
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
               {id ? "Save changes" : "Create transaction"}
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
                  Delete transaction
               </Button>
            )}
         </form>
      </Form>
   )
}

export default TransactionForm
