"use client"

import { usePathname } from "next/navigation"
import { Bell, ChevronDown } from "lucide-react"

import { ThemeToggle } from "@/components/ui/ThemeToggle";

const getTitleFromPathname = (pathname: string): string => {
    if (pathname.startsWith("/imoveis")) return "Imóveis";
    if (pathname.startsWith("/contratos/novo")) return "Novo Contrato";
    if (pathname.startsWith("/contratos")) return "Contratos";
    if (pathname.startsWith("/dashboard")) return "Dashboard";
    return "ImovGest";
}

export function Header() {
  const pathname = usePathname()
  const title = getTitleFromPathname(pathname)

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
      <h1 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="p-2 rounded-full hover:bg-[var(--color-surface-raised)]">
          <Bell className="h-5 w-5 text-[var(--color-text-secondary)]" />
        </button>
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--color-surface-raised)] flex items-center justify-center text-sm font-bold">
                LU
            </div>
            <div className="flex flex-col text-sm">
                <span className="font-medium text-[var(--color-text-primary)]">Luan Campos</span>
                <span className="text-xs text-[var(--color-text-secondary)]">luan.campos@email.com</span>
            </div>
            <ChevronDown className="h-4 w-4 text-[var(--color-text-secondary)]" />
        </div>
      </div>
    </header>
  )
}
