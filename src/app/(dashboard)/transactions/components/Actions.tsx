"use client"

import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDeleteTransaction } from "@/features/transactions/api/useDeleteTransaction"
import { useOpenTransaction } from "@/features/transactions/hooks/useOpenTransaction"
import { useConfirm } from "@/hooks/useConfirm"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

type ActionsProps = {
   id: string
}

const Actions = ({ id }: ActionsProps) => {
   const { onOpen } = useOpenTransaction()

   const [ConfirmationDialog, confirm] = useConfirm(
      "Are you sure?",
      "You are about to delete this transaction. This action cannot be undone."
   )

   const deleteMutation = useDeleteTransaction(id)

   const onDelete = async () => {
      const ok = await confirm()

      if (ok) {
         deleteMutation.mutate()
      }
   }

   return (
      <>
         <ConfirmationDialog />

         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant={"ghost"} className="size-8 p-0">
                  <MoreHorizontal className="size-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
                  <Edit className="size-4 mr-2" />
                  Edit
               </DropdownMenuItem>
               <DropdownMenuItem
                  disabled={deleteMutation.isPending}
                  onClick={onDelete}
               >
                  <Trash className="size-4 mr-2" />
                  Delete
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   )
}

export default Actions
