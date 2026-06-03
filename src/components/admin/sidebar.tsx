"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { SafeImage } from "@/components/ui/safe-image";
import {
  LayoutDashboard, Users, FileText, MessageSquare, Settings,
  LogOut, ChevronLeft, Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/submissions", label: "Form Submissions", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface Props {
  user: { name: string; email: string; role: string };
}

export function AdminSidebar({ user }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <aside className={cn(
      "bg-gray-900 text-white flex flex-col transition-all duration-300 hidden md:flex",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex-shrink-0 bg-white rounded-lg overflow-hidden">
              <SafeImage src="/Images/Logo.png" alt="Omuringa" fill className="object-contain p-0.5"
                fallbackClassName="w-full h-full bg-brand-700 flex items-center justify-center"
                fallbackContent={<Shield className="w-4 h-4 text-white" />}
              />
            </div>
            <div>
              <div className="font-bold text-xs text-white leading-tight">Admin Panel</div>
              <div className="text-xs text-gray-400 leading-tight">Omuringa</div>
            </div>
          </div>
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
          className="text-gray-400 hover:text-white transition-colors ml-auto">
          <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {!collapsed && (
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-700 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="min-w-0">
              <div className="font-medium text-white text-sm truncate">{user.name}</div>
              <div className="text-gray-400 text-xs truncate capitalize">{user.role.replace("_", " ")}</div>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                ? "bg-brand-700 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white",
              collapsed && "justify-center"
            )}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && item.label}
          </Link>
        ))}

        <Link href="/" target="_blank"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors",
            collapsed && "justify-center"
          )}
          title={collapsed ? "View Website" : undefined}
        >
          <Globe className="w-5 h-5 flex-shrink-0" />
          {!collapsed && "View Website"}
        </Link>
      </nav>

      <div className="p-3 border-t border-gray-700">
        <button onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors w-full",
            collapsed && "justify-center"
          )}>
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
