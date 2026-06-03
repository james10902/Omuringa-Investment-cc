import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { AdminMobileNav } from "@/components/admin/mobile-nav";

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader user={user} />
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">{children}</main>
      </div>
      <AdminMobileNav />
    </div>
  );
}
