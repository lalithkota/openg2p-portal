import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@app/[lang]/components/navigation/Header'
import Footer from '@app/[lang]/components/navigation/Footer'
const inter = Inter({ subsets: ['latin'] })
import { Locale, i18n } from '@/i18n.config'

export const metadata: Metadata = {
  title: 'Self service portal',
}
export async function generateStaticParams() {
  return i18n.locales.map(locale =>({lang:locale}))
  
}

export default function RootLayout({
  children ,params}: {
  children: React.ReactNode,
  params:{ lang:Locale}
}) {
  return (
    <html lang={params.lang}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className= "bg-bgc" >
        <Header  />
        {children}
        <Footer lang={params.lang} />
      </body>
    </html>
  )
}
