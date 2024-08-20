import { client } from "@/lib/hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferResponseType, InferRequestType } from "hono"
import { toast } from "sonner"

type ResponseType = InferResponseType<typeof client.api.accounts.$post>
type RequestType = InferRequestType<typeof client.api.accounts.$post>

export const useCreateAccount = () => {
   const queryClient = useQueryClient()

   const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json }) => {
         const res = await client.api.accounts.$post({ json })
         return await res.json()
      },
      onSuccess: () => {
         toast.success("Account created successfully!")
         queryClient.invalidateQueries({ queryKey: ["accounts"] })
      },
      onError: () => {
         toast.success("Failed to create account!")
      },
   })

   return mutation
}
