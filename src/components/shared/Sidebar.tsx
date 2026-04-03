"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Home, FileText } from "lucide-react" // Using lucide-react for icons

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Imóveis",
      href: "/imoveis",
      icon: Home,
    },
    {
      name: "Contratos",
      href: "/contratos",
      icon: FileText,
    },
  ]

  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <div className="text-2xl font-bold mb-6">Gestão Imobiliária</div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.href} className="mb-2">
              <Link href={item.href} legacyBehavior>
                <a
                  className={cn(
                    "flex items-center p-2 rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-gray-700 text-blue-300"
                      : "hover:bg-gray-700"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}