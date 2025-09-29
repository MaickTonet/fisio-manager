import { Toaster } from '@/components/ui-components/sonner'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='pt-BR'>
      <body className={`${inter.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
