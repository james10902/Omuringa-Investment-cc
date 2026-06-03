"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface Props {
  user: { name: string; email: string; role: string };
}

export function AdminHeader({ user }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="font-semibold text-gray-900">Admin Dashboard</h1>
        <p className="text-xs text-gray-500">Omuringa Investment CC</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-xs text-gray-500 capitalize">{user.role.replace(/_/g, " ")}</div>
        </div>
        <div className="w-9 h-9 bg-brand-100 rounded-full flex items-center justify-center">
          <span className="text-brand-700 font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
        </div>
        <button onClick={handleLogout}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Logout">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
