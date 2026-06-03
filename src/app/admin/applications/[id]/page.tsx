"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle, XCircle, Clock, AlertCircle, Save } from "lucide-react";
import { formatDate } from "@/lib/utils";

const statusOptions = [
  { value: "SUBMITTED", label: "Submitted", color: "badge-blue" },
  { value: "UNDER_REVIEW", label: "Under Review", color: "badge-yellow" },
  { value: "APPROVED", label: "Approved", color: "badge-green" },
  { value: "REJECTED", label: "Rejected", color: "badge-red" },
  { value: "MORE_INFO_REQUIRED", label: "More Info Required", color: "badge-orange" },
];

const DOC_TYPES: Record<string, string> = {
  CV: "Comprehensive CV",
  CERTIFIED_ID: "Certified Copy of ID",
  SCHOOL_CERTIFICATE: "School Leaving Certificate",
  CERTIFICATE_OF_CONDUCT: "Certificate of Conduct",
  SUPPORTIVE_DOCUMENT: "Supportive Document",
  OTHER: "Other Document",
};

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [app, setApp] = useState<any>(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/applications/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setApp(data.application);
        setStatus(data.application?.status || "");
        setNotes(data.application?.adminNotes || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, adminNotes: notes }),
    });
    if (res.ok) {
      const data = await res.json();
      setApp(data.application);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;
  if (!app) return <div className="text-center py-20 text-gray-500">Application not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/applications" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Application Review</h2>
          <p className="text-gray-600 text-sm">{app.user.name} — {app.user.email}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main details */}
        <div className="lg:col-span-2 space-y-5">
          {/* Personal */}
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 mb-4">Personal Details</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {[
                ["Full Name", `${app.firstName} ${app.lastName}`],
                ["Date of Birth", app.dateOfBirth ? formatDate(app.dateOfBirth) : "—"],
                ["Gender", app.gender || "—"],
                ["Nationality", app.nationality || "—"],
                ["ID Number", app.idNumber || "—"],
                ["Phone", app.phone || "—"],
                ["Email", app.email || "—"],
                ["Address", app.address || "—"],
                ["City", app.city || "—"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-gray-500 text-xs">{label}</div>
                  <div className="font-medium text-gray-900 mt-0.5">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 mb-4">Education</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {[
                ["Highest Qualification", app.highestQualification || "—"],
                ["School / Institution", app.schoolName || "—"],
                ["Year Completed", app.yearCompleted || "—"],
                ["Preferred Start Date", app.preferredStartDate ? formatDate(app.preferredStartDate) : "—"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-gray-500 text-xs">{label}</div>
                  <div className="font-medium text-gray-900 mt-0.5">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivation */}
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 mb-3">Motivation</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{app.motivation || "—"}</p>
            {app.previousExperience && (
              <>
                <h4 className="font-semibold text-gray-900 mt-4 mb-2">Previous Experience</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{app.previousExperience}</p>
              </>
            )}
          </div>

          {/* Documents */}
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 mb-4">Uploaded Documents ({app.documents?.length || 0})</h3>
            {app.documents?.length === 0 ? (
              <p className="text-gray-500 text-sm">No documents uploaded.</p>
            ) : (
              <div className="space-y-2">
                {app.documents?.map((doc: any) => (
                  <div key={doc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-brand-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm truncate">{doc.name}</div>
                      <div className="text-gray-500 text-xs">{DOC_TYPES[doc.type] || doc.type}</div>
                    </div>
                    <a href={doc.filePath} target="_blank" rel="noopener noreferrer"
                      className="text-brand-700 text-xs font-medium hover:underline">
                      View
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Status management */}
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="font-bold text-gray-900 mb-4">Application Status</h3>
            <div className="space-y-3">
              <div>
                <label className="form-label">Update Status</label>
                <select className="form-input" value={status} onChange={(e) => setStatus(e.target.value)}>
                  {statusOptions.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Admin Notes</label>
                <textarea className="form-input min-h-[100px] resize-y text-sm" rows={4}
                  placeholder="Add notes for the applicant..."
                  value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
              <button onClick={handleSave} className="btn-primary w-full flex items-center justify-center gap-2"
                disabled={saving}>
                {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> :
                  <><Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}</>}
              </button>
            </div>
          </div>

          <div className="card p-5 text-sm space-y-2">
            <h4 className="font-semibold text-gray-900">Application Info</h4>
            <div>
              <span className="text-gray-500">Submitted:</span>{" "}
              <span className="text-gray-900">{app.submittedAt ? formatDate(app.submittedAt) : "Not submitted"}</span>
            </div>
            <div>
              <span className="text-gray-500">Last Updated:</span>{" "}
              <span className="text-gray-900">{formatDate(app.updatedAt)}</span>
            </div>
            <div>
              <span className="text-gray-500">Reviewed By:</span>{" "}
              <span className="text-gray-900">{app.reviewedBy || "—"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
