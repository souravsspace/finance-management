import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs"
import HeaderLogo from "./HeaderLogo"
import Navigation from "./Navigation"
import WelcomeMessage from "./WelcomeMessage"

const Header = () => {
   return (
      <header className="bg-gradient-to-b from-blue-700 to-blue-400 px-4 py-8 lg:px-14 pb-36">
         <div className="max-w-screen-2xl mx-auto">
            <div className="w-full flex items-center justify-between mb-14">
               <div className="flex items-center lg:gap-x-16">
                  <HeaderLogo />
                  <Navigation />
               </div>

               <div>
                  <ClerkLoaded>
                     <UserButton />
                  </ClerkLoaded>
                  <ClerkLoading>
                     <div className="size-8 rounded-full bg-gradient-to-b from-red-400 to-green-400" />
                  </ClerkLoading>
               </div>
            </div>
            <WelcomeMessage />
         </div>
      </header>
   )
}

export default Header
