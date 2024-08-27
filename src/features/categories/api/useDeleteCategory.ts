import { client } from "@/lib/hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferResponseType } from "hono"
import { toast } from "sonner"

type ResponseType = InferResponseType<
   (typeof client.api.categories)[":id"]["$delete"]
>

export const useDeleteCategory = (id?: string) => {
   const queryClient = useQueryClient()

   const mutation = useMutation<ResponseType, Error>({
      mutationFn: async () => {
         const res = await client.api.categories[":id"]["$delete"]({
            param: { id },
         })
         return await res.json()
      },
      onSuccess: () => {
         toast.success("Category deleted successfully!")
         queryClient.invalidateQueries({ queryKey: ["categories", { id }] })
         queryClient.invalidateQueries({ queryKey: ["categories"] })

         // TODO: invalidate summary and transactions queries
      },
      onError: () => {
         toast.success("Failed to delete category!")
      },
   })

   return mutation
}
