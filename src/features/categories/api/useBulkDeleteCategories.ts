import { client } from "@/lib/hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferResponseType, InferRequestType } from "hono"
import { toast } from "sonner"

type ResponseType = InferResponseType<
   (typeof client.api.categories)["bulk-delete"]["$post"]
>
type RequestType = InferRequestType<
   (typeof client.api.categories)["bulk-delete"]["$post"]
>

export const useBulkDeleteCategories = () => {
   const queryClient = useQueryClient()

   const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json }) => {
         const res = await client.api.categories["bulk-delete"]["$post"]({
            json,
         })
         return await res.json()
      },
      onSuccess: () => {
         toast.success("Categories deleted!")
         queryClient.invalidateQueries({ queryKey: ["categories"] })
         queryClient.invalidateQueries({ queryKey: ["summary"] })
      },
      onError: () => {
         toast.success("Failed to delete categories!")
      },
   })

   return mutation
}
