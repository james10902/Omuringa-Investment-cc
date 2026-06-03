import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = 'force-dynamic';
import { FileText, User, Bell, CheckCircle, Clock, AlertCircle, ChevronRight, Upload, Send, ClipboardList } from "lucide-react";
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
    prisma.document.findMany({ where: { userId: user.id }, select: { type: true } }),
    prisma.notification.count({ where: { userId: user.id, read: false } }),
  ]);

  const statusInfo = application ? statusConfig[application.status] : null;
  const uploadedDocTypes: string[] = documents.map((d) => d.type as string);
  const requiredDocs = ["CV", "CERTIFIED_ID", "SCHOOL_CERTIFICATE", "CERTIFICATE_OF_CONDUCT"];
  const requiredDocsUploaded = requiredDocs.filter((t) => uploadedDocTypes.includes(t));
  const docsComplete = requiredDocsUploaded.length === requiredDocs.length;
  const formComplete = application && application.firstName && application.lastName && application.idNumber && application.motivation;
  const isSubmitted = application && application.status !== "DRAFT";

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
              <div className="text-sm text-gray-500">
                {isSubmitted && statusInfo ? (
                  <span className={`badge ${statusInfo.color} text-xs`}>
                    {statusInfo.label}
                  </span>
                ) : (
                  "Application"
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-gold-700" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{documents.length}</div>
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

      {/* Application Progress */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">
            {isSubmitted ? "Application Status" : "Your Progress"}
          </h3>
          <Link href="/dashboard/application" className="text-brand-700 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            {isSubmitted ? "View Details" : "Go to Application"} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {isSubmitted ? (
          <div className="space-y-4">
            {/* Big status card */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 bg-green-50 border border-green-200 rounded-xl">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-gray-900">Application Submitted</h4>
                  <span className={`badge ${statusInfo?.color}`}>
                    {statusInfo?.label}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Submitted on {application!.submittedAt ? formatDate(application!.submittedAt) : formatDate(application!.updatedAt)}.
                  Our team will review it and notify you of any updates.
                </p>
              </div>
            </div>

            {/* Admin notes */}
            {application!.adminNotes && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                <strong>Note from admin:</strong> {application!.adminNotes}
              </div>
            )}

            {/* Status timeline */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 bg-white border rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Application Received</div>
                  <div className="text-xs text-gray-500">We have your application</div>
                </div>
              </div>
              <div className={`flex items-center gap-3 p-3 border rounded-lg ${application!.status === "UNDER_REVIEW" || application!.status === "APPROVED" || application!.status === "REJECTED" || application!.status === "MORE_INFO_REQUIRED" ? "bg-white" : "bg-gray-50 opacity-70"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${application!.status === "UNDER_REVIEW" || application!.status === "APPROVED" || application!.status === "REJECTED" || application!.status === "MORE_INFO_REQUIRED" ? "bg-blue-100" : "bg-gray-200"}`}>
                  <Clock className={`w-4 h-4 ${application!.status === "UNDER_REVIEW" || application!.status === "APPROVED" || application!.status === "REJECTED" || application!.status === "MORE_INFO_REQUIRED" ? "text-blue-600" : "text-gray-500"}`} />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Under Review</div>
                  <div className="text-xs text-gray-500">Team is reviewing your application</div>
                </div>
              </div>
              <div className={`flex items-center gap-3 p-3 border rounded-lg ${application!.status === "APPROVED" || application!.status === "REJECTED" ? "bg-white" : "bg-gray-50 opacity-70"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${application!.status === "APPROVED" ? "bg-green-100" : application!.status === "REJECTED" ? "bg-red-100" : "bg-gray-200"}`}>
                  {application!.status === "APPROVED" ? <CheckCircle className="w-4 h-4 text-green-600" /> : application!.status === "REJECTED" ? <AlertCircle className="w-4 h-4 text-red-600" /> : <Clock className="w-4 h-4 text-gray-500" />}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Decision</div>
                  <div className="text-xs text-gray-500">{application!.status === "APPROVED" ? "You have been approved!" : application!.status === "REJECTED" ? "Application not successful" : "Awaiting final decision"}</div>
                </div>
              </div>
              <div className={`flex items-center gap-3 p-3 border rounded-lg ${application!.status === "MORE_INFO_REQUIRED" ? "bg-orange-50 border-orange-200" : "bg-gray-50 opacity-70"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${application!.status === "MORE_INFO_REQUIRED" ? "bg-orange-100" : "bg-gray-200"}`}>
                  <AlertCircle className={`w-4 h-4 ${application!.status === "MORE_INFO_REQUIRED" ? "text-orange-600" : "text-gray-500"}`} />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">More Info</div>
                  <div className="text-xs text-gray-500">{application!.status === "MORE_INFO_REQUIRED" ? "Action required — see note above" : "No additional info needed"}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-brand-600 h-2.5 rounded-full transition-all"
                style={{ width: `${[true, !!formComplete, docsComplete, false].filter(Boolean).length * 25}%` }}
              />
            </div>

            {/* Step 1 — Account */}
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 text-sm">Create your account</div>
                <div className="text-xs text-gray-500">Done — you&apos;re logged in as {user.name}</div>
              </div>
            </div>

            {/* Step 2 — Application form */}
            {formComplete ? (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900 text-sm">Fill in your application</div>
                  <div className="text-xs text-gray-500">Personal details completed</div>
                </div>
              </div>
            ) : (
              <Link href="/dashboard/application" className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <ClipboardList className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm">Fill in your application</div>
                  <div className="text-xs text-gray-500">Enter your personal details, education, and motivation</div>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-400" />
              </Link>
            )}

            {/* Step 3 — Documents */}
            {docsComplete ? (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900 text-sm">Upload required documents</div>
                  <div className="text-xs text-gray-500">All 4 required documents uploaded</div>
                </div>
              </div>
            ) : (
              <Link href="/dashboard/documents" className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <Upload className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm">Upload required documents</div>
                  <div className="text-xs text-gray-500">
                    {requiredDocsUploaded.length} of {requiredDocs.length} uploaded — CV, ID, Certificate, Conduct
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-400" />
              </Link>
            )}

            {/* Step 4 — Submit */}
            {formComplete && docsComplete ? (
              <Link href="/dashboard/application" className="flex items-center gap-3 p-3 bg-brand-50 rounded-lg border border-brand-200 hover:bg-brand-100 transition-colors">
                <Send className="w-5 h-5 text-brand-700 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm">Submit your application</div>
                  <div className="text-xs text-gray-500">Everything looks good — ready to submit!</div>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-400" />
              </Link>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 opacity-60">
                <Send className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-500 text-sm">Submit your application</div>
                  <div className="text-xs text-gray-400">Complete the steps above first</div>
                </div>
              </div>
            )}
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
              {isSubmitted ? "Review your submitted application" : application ? "Continue your application" : "Start your application"}
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
