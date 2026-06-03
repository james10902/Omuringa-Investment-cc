"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, FileText, MessageSquare, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Home", icon: LayoutDashboard },
  { href: "/admin/applications", label: "Apps", icon: FileText },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/submissions", label: "Forms", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminMobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gray-900 border-t border-gray-700 flex items-center justify-around px-2 py-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-medium transition-colors min-w-[48px]",
            pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
              ? "text-brand-400"
              : "text-gray-400 hover:text-white"
          )}
        >
          <item.icon className="w-5 h-5" />
          {item.label}
        </Link>
      ))}
      <button
        onClick={handleLogout}
        className="flex flex-col items-center gap-0.5 px-2 py-1 text-xs font-medium text-gray-400 hover:text-red-400 min-w-[48px]"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </nav>
  );
}
