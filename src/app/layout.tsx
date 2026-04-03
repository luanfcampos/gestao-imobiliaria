import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/shared/Sidebar" // Import Sidebar

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema de Gestão Imobiliária",
  description: "Sistema 100% frontend para gestão imobiliária",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <Sidebar /> {/* Sidebar component */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
