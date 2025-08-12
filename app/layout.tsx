import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ReactQueryProvider from '@/providers/react-query';
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TOOLS APEX - Professional Power Tools & Equipment",
  description:
    "Discover professional-grade power tools, outdoor equipment, and storage solutions at TOOLS APEX. Shop our extensive collection with competitive prices in US dollars.",
  generator: 'TOOLS APEX'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
      {/* <body className={inter.className}>{children}</body> */}
    </html>
  )
}
