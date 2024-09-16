import { client } from "@/lib/hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferResponseType, InferRequestType } from "hono"
import { toast } from "sonner"

type ResponseType = InferResponseType<
   (typeof client.api.transactions)["bulk-create"]["$post"]
>
type RequestType = InferRequestType<
   (typeof client.api.transactions)["bulk-create"]["$post"]
>

export const useBulkCreateTransactions = () => {
   const queryClient = useQueryClient()

   const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json }) => {
         const res = await client.api.transactions["bulk-create"]["$post"]({
            json,
         })
         return await res.json()
      },
      onSuccess: () => {
         toast.success("Transactions created!")
         queryClient.invalidateQueries({ queryKey: ["transactions"] })
         queryClient.invalidateQueries({ queryKey: ["summary"] })
      },
      onError: () => {
         toast.success("Failed to create transactions!")
      },
   })

   return mutation
}
