import Header from "@/components/shared/Header"
import { ReactNode } from "react"

type Props = {
   children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
   return (
      <>
         <Header />
         <main className="px-3 lg:px-14">{children}</main>
      </>
   )
}

export default DashboardLayout
