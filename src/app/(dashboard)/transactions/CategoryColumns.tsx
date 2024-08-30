import { useOpenCategory } from "@/features/categories/hooks/useOpenCategory"
import { useOpenTransaction } from "@/features/transactions/hooks/useOpenTransaction"

import { cn } from "@/lib/utils"
import { TriangleAlert } from "lucide-react"

type Props = { id: string; category: string | null; categoryId: string | null }

const CategoryColumns = ({ id, category, categoryId }: Props) => {
   const { onOpen: onOpenCategory } = useOpenCategory()
   const { onOpen: onOpenTransaction } = useOpenTransaction()

   const onClick = () => {
      if (categoryId) {
         onOpenCategory(categoryId)
      } else {
         onOpenTransaction(id)
      }
   }

   return (
      <div
         onClick={onClick}
         className={cn(
            "flex items-center cursor-pointer hover:underline",
            !category && "text-rose-500"
         )}
      >
         {!category && <TriangleAlert className="size-4 mr-2 shrink-0" />}
         {category || "Uncategorized"}
      </div>
   )
}

export default CategoryColumns
