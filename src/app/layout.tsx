import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MyMenu from '@/components/molecules/my-menu/my-menu'
import MyFooter from '@/components/molecules/my-footer/my-footer'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nadame Project',
  description: 'Demo Nadame Project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) 
{
  return (
    <html lang="fr">
     <body className={inter.className} style={{ backgroundColor: "#FFF0FB", margin: 0 }}>
        <MyMenu/>
        {children}
        <MyFooter/>
      </body>
    </html> 
  )
}
