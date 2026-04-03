"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Building2, FileText } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Imóveis", href: "/imoveis", icon: Building2 },
    { name: "Contratos", href: "/contratos", icon: FileText },
  ]

  return (
    <aside className="w-64 min-h-screen bg-[var(--color-surface)] border-r border-[var(--color-surface-raised)] p-4">
      <div className="flex items-center gap-2 text-2xl font-bold mb-8 text-[var(--color-text-primary)]">
        <Building2 />
        <span>ImovGest</span>
      </div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-[color:var(--color-accent)_/10] text-[var(--color-info)] border-l-4 border-[var(--color-accent)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-raised)]"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}