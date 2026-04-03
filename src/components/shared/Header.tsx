"use client"

import { usePathname } from "next/navigation"
import { Bell } from "lucide-react"

// Mapeia o path para um título amigável
const getTitleFromPathname = (pathname: string): string => {
  if (pathname.startsWith("/imoveis")) return "Imóveis"
  if (pathname.startsWith("/contratos")) return "Contratos"
  if (pathname.startsWith("/dashboard")) return "Dashboard"
  return "ImovGest"
}

export function Header() {
  const pathname = usePathname()
  const title = getTitleFromPathname(pathname)

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-[var(--color-surface)] border-b border-[var(--color-surface-raised)]">
      <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">{title}</h1>
      <button className="p-2 rounded-full hover:bg-[var(--color-surface-raised)]">
        <Bell className="h-5 w-5 text-[var(--color-text-secondary)]" />
      </button>
    </header>
  )
}
