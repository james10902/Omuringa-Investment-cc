"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { SafeImage } from "@/components/ui/safe-image";
import { LayoutDashboard, User, FileText, Bell, LogOut, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/application", label: "My Application", icon: FileText },
  { href: "/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/dashboard/profile", label: "My Profile", icon: User },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
];

interface Props {
  user: { name: string; email: string; role: string };
}

export function DashboardSidebar({ user }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <aside className={cn(
      "bg-brand-950 text-white flex flex-col transition-all duration-300 hidden md:flex",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-4 border-b border-brand-800 flex items-center justify-between">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex-shrink-0 bg-white rounded-lg overflow-hidden">
              <SafeImage src="/Images/Logo.png" alt="Omuringa" fill className="object-contain p-0.5"
                fallbackClassName="w-full h-full bg-brand-700 flex items-center justify-center"
                fallbackContent={<Shield className="w-4 h-4 text-white" />}
              />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs text-white leading-tight truncate">Omuringa</div>
              <div className="text-xs text-brand-400 leading-tight">Portal</div>
            </div>
          </Link>
        )}
        {collapsed && (
          <div className="relative w-8 h-8 flex-shrink-0 bg-white rounded-lg overflow-hidden mx-auto">
            <SafeImage src="/Images/Logo.png" alt="Omuringa" fill className="object-contain p-0.5"
              fallbackClassName="w-full h-full bg-brand-700 flex items-center justify-center"
              fallbackContent={<Shield className="w-4 h-4 text-white" />}
            />
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)}
          className="text-brand-400 hover:text-white transition-colors ml-auto">
          <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* User info */}
      {!collapsed && (
        <div className="p-4 border-b border-brand-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-700 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="min-w-0">
              <div className="font-medium text-white text-sm truncate">{user.name}</div>
              <div className="text-brand-400 text-xs truncate">{user.email}</div>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-brand-700 text-white"
                : "text-brand-300 hover:bg-brand-800 hover:text-white",
              collapsed && "justify-center"
            )}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && item.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-brand-800">
        <button onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-brand-300 hover:bg-brand-800 hover:text-white transition-colors w-full",
            collapsed && "justify-center"
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
