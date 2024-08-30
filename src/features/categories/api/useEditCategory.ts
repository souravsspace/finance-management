import { client } from "@/lib/hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferResponseType, InferRequestType } from "hono"
import { toast } from "sonner"

type ResponseType = InferResponseType<
   (typeof client.api.categories)[":id"]["$patch"]
>
type RequestType = InferRequestType<
   (typeof client.api.categories)[":id"]["$patch"]
>

export const useEditCategory = (id?: string) => {
   const queryClient = useQueryClient()

   const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json }) => {
         const res = await client.api.categories[":id"]["$patch"]({
            param: { id },
            json,
         })
         return await res.json()
      },
      onSuccess: () => {
         toast.success("Category updated successfully!")
         queryClient.invalidateQueries({ queryKey: ["category", { id }] })
         queryClient.invalidateQueries({ queryKey: ["categories"] })
         queryClient.invalidateQueries({ queryKey: ["transactions"] })

         // TODO: invalidate summary
      },
      onError: () => {
         toast.success("Failed to edit category!")
      },
   })

   return mutation
}
