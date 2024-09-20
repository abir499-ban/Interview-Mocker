import { Inter } from "next/font/google";
import {neobrutalism} from '@clerk/themes'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({children}) {
  return (
    <ClerkProvider appearance={{baseTheme: neobrutalism}}>
    <html lang="en">
      <body>
        <header>
          
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  </ClerkProvider>
    
  )
}