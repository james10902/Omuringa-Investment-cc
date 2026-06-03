import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, FileText, MessageSquare, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [
    totalUsers,
    totalApplications,
    pendingApplications,
    approvedApplications,
    totalSubmissions,
    unreadSubmissions,
    recentApplications,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "TRAINEE" } }),
    prisma.traineeApplication.count(),
    prisma.traineeApplication.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] } } }),
    prisma.traineeApplication.count({ where: { status: "APPROVED" } }),
    prisma.formSubmission.count(),
    prisma.formSubmission.count({ where: { read: false } }),
    prisma.traineeApplication.findMany({
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    }),
  ]);

  const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
    DRAFT: { label: "Draft", color: "badge-gray", icon: Clock },
    SUBMITTED: { label: "Submitted", color: "badge-blue", icon: CheckCircle },
    UNDER_REVIEW: { label: "Under Review", color: "badge-yellow", icon: Clock },
    APPROVED: { label: "Approved", color: "badge-green", icon: CheckCircle },
    REJECTED: { label: "Rejected", color: "badge-red", icon: AlertCircle },
    MORE_INFO_REQUIRED: { label: "More Info Required", color: "badge-orange", icon: AlertCircle },
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 text-sm mt-1">Omuringa Investment CC — Admin Panel</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Registered Users", value: totalUsers, icon: Users, color: "bg-brand-100 text-brand-700", href: "/admin/users" },
          { label: "Total Applications", value: totalApplications, icon: FileText, color: "bg-blue-100 text-blue-700", href: "/admin/applications" },
          { label: "Pending Review", value: pendingApplications, icon: Clock, color: "bg-yellow-100 text-yellow-700", href: "/admin/applications?status=SUBMITTED" },
          { label: "Approved", value: approvedApplications, icon: CheckCircle, color: "bg-green-100 text-green-700", href: "/admin/applications?status=APPROVED" },
        ].map((stat) => (
          <Link key={stat.label} href={stat.href}
            className="card p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Form submissions alert */}
      {unreadSubmissions > 0 && (
        <Link href="/admin/submissions"
          className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl hover:bg-yellow-100 transition-colors">
          <MessageSquare className="w-5 h-5 text-yellow-700" />
          <span className="text-yellow-800 font-medium">
            {unreadSubmissions} unread form submission{unreadSubmissions > 1 ? "s" : ""} — click to review
          </span>
        </Link>
      )}

      {/* Recent Applications */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Recent Applications</h3>
          <Link href="/admin/applications" className="text-brand-700 text-sm font-medium hover:underline">
            View All
          </Link>
        </div>

        {recentApplications.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">No applications yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Applicant</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Name</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Status</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Updated</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => {
                  const s = statusConfig[app.status];
                  return (
                    <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-3">
                        <div className="font-medium text-gray-900">{app.user.name}</div>
                        <div className="text-gray-500 text-xs">{app.user.email}</div>
                      </td>
                      <td className="py-3 px-3 text-gray-700">
                        {app.firstName} {app.lastName}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`badge ${s?.color}`}>{s?.label}</span>
                      </td>
                      <td className="py-3 px-3 text-gray-500">{formatDate(app.updatedAt)}</td>
                      <td className="py-3 px-3">
                        <Link href={`/admin/applications/${app.id}`}
                          className="text-brand-700 font-medium hover:underline">
                          Review
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
