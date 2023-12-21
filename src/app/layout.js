import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "react-hot-toast";

import Providers from '../redux/provider/index'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
            <Toaster position="top-center" reverseOrder={true} />
            {children}
        </body>
      </Providers>
    </html>
  )
}
