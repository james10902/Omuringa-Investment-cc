import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = 'force-dynamic';
import { FileText, User, Bell, CheckCircle, Clock, AlertCircle, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  DRAFT: { label: "Draft", color: "badge-gray", icon: Clock },
  SUBMITTED: { label: "Submitted", color: "badge-blue", icon: CheckCircle },
  UNDER_REVIEW: { label: "Under Review", color: "badge-yellow", icon: Clock },
  APPROVED: { label: "Approved", color: "badge-green", icon: CheckCircle },
  REJECTED: { label: "Rejected", color: "badge-red", icon: AlertCircle },
  MORE_INFO_REQUIRED: { label: "More Info Required", color: "badge-orange", icon: AlertCircle },
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [application, documents, notifications] = await Promise.all([
    prisma.traineeApplication.findUnique({ where: { userId: user.id } }),
    prisma.document.count({ where: { userId: user.id } }),
    prisma.notification.count({ where: { userId: user.id, read: false } }),
  ]);

  const statusInfo = application ? statusConfig[application.status] : null;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Welcome */}
      <div className="bg-hero rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold">Welcome back, {user.name.split(" ")[0]}!</h2>
        <p className="text-brand-200 mt-1">
          Omuringa Security Training Academy — Trainee Portal
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-brand-700" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {application ? "1" : "0"}
              </div>
              <div className="text-sm text-gray-500">Application</div>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-gold-700" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{documents}</div>
              <div className="text-sm text-gray-500">Documents</div>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{notifications}</div>
              <div className="text-sm text-gray-500">Notifications</div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Status */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Application Status</h3>
          <Link href="/dashboard/application" className="text-brand-700 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View Details <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {application ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className={`badge ${statusInfo?.color}`}>
                {statusInfo?.label}
              </span>
              <span className="text-sm text-gray-500">
                Last updated: {formatDate(application.updatedAt)}
              </span>
            </div>
            {application.adminNotes && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                <strong>Note from admin:</strong> {application.adminNotes}
              </div>
            )}
            {application.status === "DRAFT" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                Your application is saved as a draft. Complete and submit it to begin the review process.
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">You haven&apos;t started your training application yet.</p>
            <Link href="/dashboard/application" className="btn-primary">
              Start Application
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/dashboard/application"
          className="card p-5 hover:shadow-md transition-shadow flex items-center gap-4 group">
          <div className="w-12 h-12 bg-brand-100 group-hover:bg-brand-200 rounded-xl flex items-center justify-center transition-colors">
            <FileText className="w-6 h-6 text-brand-700" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">Training Application</div>
            <div className="text-sm text-gray-500">
              {application ? "View or update your application" : "Start your application"}
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
        </Link>

        <Link href="/dashboard/documents"
          className="card p-5 hover:shadow-md transition-shadow flex items-center gap-4 group">
          <div className="w-12 h-12 bg-gold-100 group-hover:bg-gold-200 rounded-xl flex items-center justify-center transition-colors">
            <FileText className="w-6 h-6 text-gold-700" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">Documents</div>
            <div className="text-sm text-gray-500">Upload required documents</div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
        </Link>

        <Link href="/dashboard/profile"
          className="card p-5 hover:shadow-md transition-shadow flex items-center gap-4 group">
          <div className="w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-xl flex items-center justify-center transition-colors">
            <User className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">My Profile</div>
            <div className="text-sm text-gray-500">Update your personal details</div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
        </Link>

        <Link href="/dashboard/notifications"
          className="card p-5 hover:shadow-md transition-shadow flex items-center gap-4 group">
          <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center transition-colors">
            <Bell className="w-6 h-6 text-blue-700" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">Notifications</div>
            <div className="text-sm text-gray-500">
              {notifications > 0 ? `${notifications} unread` : "No new notifications"}
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
        </Link>
      </div>
    </div>
  );
}
