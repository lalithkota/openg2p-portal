import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@components/navagation/Header'
import Footer from '@/components/navagation/Footer'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Self service portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body  className={`${inter.className} bg-pink container mx-auto p-4`}>
        <Header/>
        {children}
        <Footer/>
        </body>     
    </html>
  )
}
