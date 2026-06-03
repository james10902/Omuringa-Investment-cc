"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, User, FileText, Bell, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/dashboard/application", label: "Apply", icon: FileText },
  { href: "/dashboard/documents", label: "Docs", icon: FileText },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/notifications", label: "Alerts", icon: Bell },
];

export function DashboardMobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 flex items-center justify-around px-2 py-2 safe-area-pb">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-medium transition-colors min-w-[48px]",
            pathname === item.href
              ? "text-brand-700"
              : "text-gray-500 hover:text-brand-600"
          )}
        >
          <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-brand-700" : "text-gray-400")} />
          {item.label}
        </Link>
      ))}
      <button
        onClick={handleLogout}
        className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-medium text-gray-500 hover:text-red-600 min-w-[48px]"
      >
        <LogOut className="w-5 h-5 text-gray-400" />
        Logout
      </button>
    </nav>
  );
}
