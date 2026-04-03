"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Building2, FileText } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Imóveis", href: "/imoveis", icon: Building2 },
    { name: "Contratos", href: "/contratos", icon: FileText },
  ];

  return (
    <aside className="w-60 min-h-screen bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col">
      <div className="flex items-center gap-3 h-16 px-4 border-b border-[var(--color-border)]">
        <div className="bg-zinc-800 p-2 rounded-lg">
          <Building2 className="h-6 w-6 text-[var(--color-accent)]" />
        </div>
        <span className="text-xl font-bold text-[var(--color-text-primary)]">
          ImovGest
        </span>
      </div>
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname.startsWith(item.href)
                    ? "bg-[var(--color-accent)] text-white"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-raised)]"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}