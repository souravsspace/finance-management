"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import NavButton from "./NavButton"
import { useMedia } from "react-use"
import { NAV_ROUTES } from "@/constants/nav"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

const Navigation = () => {
   const [isOpen, setIsOpen] = useState(false)

   const router = useRouter()
   const pathname = usePathname()
   const isMobile = useMedia("(max-width: 1023px)", false)

   const onClick = (href: string) => {
      router.push(href)
      setIsOpen(false)
   }

   if (isMobile) {
      return (
         <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
               <Button
                  size={"sm"}
                  variant={"outline"}
                  className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0
               focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
               >
                  <Menu className="size-5" />
               </Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-2">
               <nav className="flex flex-col gap-y-2 pt-6">
                  {NAV_ROUTES.map((route) => (
                     <Button
                        key={route.href}
                        variant={
                           route.href === pathname ? "secondary" : "ghost"
                        }
                        onClick={() => onClick(route.href)}
                        className="w-full justify-start"
                     >
                        {route.label}
                     </Button>
                  ))}
               </nav>
            </SheetContent>
         </Sheet>
      )
   }

   return (
      <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
         {NAV_ROUTES.map((route) => (
            <NavButton
               key={route.label}
               route={route}
               isActive={pathname === route.href}
            />
         ))}
      </nav>
   )
}

export default Navigation
