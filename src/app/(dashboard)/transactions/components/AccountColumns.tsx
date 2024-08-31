import { useOpenAccount } from "@/features/accounts/hooks/useOpenAccount"

import { cn } from "@/lib/utils"

type Props = {
   account: string
   accountId: string
}

const AccountColumns = ({ account, accountId }: Props) => {
   const { onOpen: onOpenAccount } = useOpenAccount()

   const onClick = () => onOpenAccount(accountId)

   return (
      <div
         onClick={onClick}
         className="flex items-center cursor-pointer hover:underline"
      >
         {account}
      </div>
   )
}

export default AccountColumns
