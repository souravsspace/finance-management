import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import QueryProvider from "@/provider/QueryProdivers"
import SheetProvider from "@/provider/SheetProvider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
   title: "Finance",
   description: "Finance is a simple finance management app.",
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <ClerkProvider>
         <html lang="en">
            <body className={inter.className}>
               <QueryProvider>
                  <SheetProvider />
                  <Toaster />
                  {children}
               </QueryProvider>
            </body>
         </html>
      </ClerkProvider>
   )
}
