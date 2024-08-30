import { client } from "@/lib/hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferResponseType, InferRequestType } from "hono"
import { toast } from "sonner"

type ResponseType = InferResponseType<
   (typeof client.api.accounts)[":id"]["$patch"]
>
type RequestType = InferRequestType<
   (typeof client.api.accounts)[":id"]["$patch"]
>

export const useEditAccount = (id?: string) => {
   const queryClient = useQueryClient()

   const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json }) => {
         const res = await client.api.accounts[":id"]["$patch"]({
            param: { id },
            json,
         })
         return await res.json()
      },
      onSuccess: () => {
         toast.success("Account updated successfully!")
         queryClient.invalidateQueries({ queryKey: ["account", { id }] })
         queryClient.invalidateQueries({ queryKey: ["accounts"] })
         queryClient.invalidateQueries({ queryKey: ["transactions"] })

         // TODO: invalidate summary and transactions queries
      },
      onError: () => {
         toast.success("Failed to edit account!")
      },
   })

   return mutation
}
