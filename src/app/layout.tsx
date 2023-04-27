import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Risk Viz',
  description: 'Risk Visualization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar></Navbar>
      {children}
      </body>
    </html>
  )
}
