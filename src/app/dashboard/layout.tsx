import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardMobileNav } from "@/components/dashboard/mobile-nav";

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader user={user} />
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">{children}</main>
      </div>
      <DashboardMobileNav />
    </div>
  );
}
