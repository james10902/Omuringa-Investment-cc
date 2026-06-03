"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Save, Send, Upload, AlertCircle, Pencil, Eye, FileText } from "lucide-react";
import Link from "next/link";

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  DRAFT: { label: "Draft", color: "text-gray-700", bg: "bg-gray-100", border: "border-gray-200" },
  SUBMITTED: { label: "Submitted", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
  UNDER_REVIEW: { label: "Under Review", color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" },
  APPROVED: { label: "Approved", color: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
  REJECTED: { label: "Rejected", color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
  MORE_INFO_REQUIRED: { label: "More Info Required", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
};

interface AppData {
  firstName: string; lastName: string; dateOfBirth: string; gender: string;
  nationality: string; idNumber: string; phone: string; email: string;
  address: string; city: string; highestQualification: string; schoolName: string;
  yearCompleted: string; motivation: string; previousExperience: string; preferredStartDate: string;
}

const empty: AppData = {
  firstName: "", lastName: "", dateOfBirth: "", gender: "", nationality: "",
  idNumber: "", phone: "", email: "", address: "", city: "",
  highestQualification: "", schoolName: "", yearCompleted: "",
  motivation: "", previousExperience: "", preferredStartDate: "",
};

const REQUIRED_DOCS = [
  { type: "CV", label: "Comprehensive CV" },
  { type: "CERTIFIED_ID", label: "Certified Copy of ID" },
  { type: "SCHOOL_CERTIFICATE", label: "School Leaving Certificate" },
  { type: "CERTIFICATE_OF_CONDUCT", label: "Certificate of Conduct" },
];

function formatDateDisplay(dateStr: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-NA", { year: "numeric", month: "long", day: "numeric" });
}

export default function ApplicationPage() {
  const [form, setForm] = useState<AppData>(empty);
  const [status, setStatus] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState<string | null>(null);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/application").then((r) => r.json()),
      fetch("/api/documents").then((r) => r.json()),
    ])
      .then(([appData, docData]) => {
        if (appData.application) {
          setForm({ ...empty, ...appData.application });
          setStatus(appData.application.status);
          setAdminNotes(appData.application.adminNotes);
          setSubmittedAt(appData.application.submittedAt);
        }
        setDocs((docData.documents || []).map((d: any) => d.type));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, action: "save" }),
      });
      if (res.ok) {
        const data = await res.json();
        setStatus(data.application.status);
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");
    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, action: "submit" }),
      });
      if (res.ok) {
        const data = await res.json();
        setStatus(data.application.status);
        setSubmittedAt(data.application.submittedAt);
        setSubmitStatus("success");
        setEditMode(false);
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Failed to submit. Please check all required fields.");
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  const canEdit = !status || status === "DRAFT" || status === "MORE_INFO_REQUIRED";
  const isSubmitted = status && status !== "DRAFT";
  const s = status ? statusConfig[status] : null;

  if (loading) return <div className="text-center py-20 text-gray-500">Loading application...</div>;

  // =================== SUCCESS SCREEN ===================
  if (submitStatus === "success") {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Application Submitted!</h2>
        <p className="text-gray-600 mt-3 mb-6 max-w-md mx-auto">
          Your training application has been submitted successfully. Our team will review it and
          you will be notified of any updates via email.
        </p>
        <button onClick={() => setSubmitStatus("idle")} className="btn-primary">
          View My Application
        </button>
      </div>
    );
  }

  // =================== REVIEW MODE (submitted or viewing) ===================
  if (isSubmitted && !editMode) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Application</h2>
            <p className="text-gray-600 text-sm mt-1">Omuringa Security Training Academy</p>
          </div>
          <div className="flex items-center gap-3">
            {status && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${s?.bg} ${s?.color} border ${s?.border}`}>
                {status === "APPROVED" && <CheckCircle className="w-4 h-4" />}
                {status === "SUBMITTED" && <Send className="w-4 h-4" />}
                {s?.label}
              </span>
            )}
            {status === "MORE_INFO_REQUIRED" && (
              <button onClick={() => setEditMode(true)} className="btn-secondary text-sm flex items-center gap-1.5">
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Admin notes */}
        {adminNotes && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-yellow-800 text-sm">
            <strong>Note from admin:</strong> {adminNotes}
          </div>
        )}

        {/* Submitted info */}
        {submittedAt && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-800 text-sm flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Submitted on {formatDateDisplay(submittedAt)}. You can review your details below.
          </div>
        )}

        {/* Personal Details */}
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 mb-4">Personal Details</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {[ ["First Name", form.firstName], ["Last Name", form.lastName], ["Date of Birth", formatDateDisplay(form.dateOfBirth)], ["Gender", form.gender || "—"], ["Nationality", form.nationality || "—"], ["ID Number", form.idNumber], ["Phone", form.phone], ["Email", form.email], ["Address", form.address || "—"], ["City / Town", form.city || "—"] ].map(([label, value]) => (
              <div key={label as string}>
                <div className="text-gray-500 text-xs">{label}</div>
                <div className="font-medium text-gray-900 mt-0.5">{value as string}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 mb-4">Education</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {[ ["Highest Qualification", form.highestQualification || "—"], ["School / Institution", form.schoolName || "—"], ["Year Completed", form.yearCompleted || "—"], ["Preferred Start Date", formatDateDisplay(form.preferredStartDate)] ].map(([label, value]) => (
              <div key={label as string}>
                <div className="text-gray-500 text-xs">{label}</div>
                <div className="font-medium text-gray-900 mt-0.5">{value as string}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivation */}
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 mb-4">Motivation & Experience</h3>
          <div className="space-y-4 text-sm">
            <div>
              <div className="text-gray-500 text-xs mb-1">Motivation for Applying</div>
              <p className="text-gray-900 leading-relaxed">{form.motivation || "—"}</p>
            </div>
            {form.previousExperience && (
              <div>
                <div className="text-gray-500 text-xs mb-1">Previous Experience</div>
                <p className="text-gray-900 leading-relaxed">{form.previousExperience}</p>
              </div>
            )}
          </div>
        </div>

        {/* Documents */}
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 mb-4">Uploaded Documents</h3>
          <div className="space-y-2">
            {REQUIRED_DOCS.map((doc) => {
              const uploaded = docs.includes(doc.type);
              return (
                <div key={doc.type} className={`flex items-center gap-3 p-3 rounded-lg border ${uploaded ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}>
                  {uploaded ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                  <span className={`text-sm ${uploaded ? "text-gray-900" : "text-gray-500"}`}>{doc.label}</span>
                  {uploaded && <span className="text-xs text-green-700 font-medium ml-auto">Uploaded</span>}
                </div>
              );
            })}
          </div>
          <Link href="/dashboard/documents" className="btn-secondary text-sm inline-flex items-center gap-2 mt-4">
            <FileText className="w-4 h-4" />
            View Documents
          </Link>
        </div>
      </div>
    );
  }

  // =================== EDIT MODE ===================
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isSubmitted ? "Edit Application" : "Training Application"}
          </h2>
          <p className="text-gray-600 text-sm mt-1">Omuringa Security Training Academy</p>
        </div>
        {isSubmitted && (
          <button onClick={() => setEditMode(false)} className="btn-secondary text-sm flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            Back to Review
          </button>
        )}
      </div>

      {adminNotes && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-yellow-800 text-sm">
          <strong>Note from admin:</strong> {adminNotes}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 mb-4">Personal Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">First Name *</label>
              <input type="text" className="form-input" value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
            </div>
            <div>
              <label className="form-label">Last Name *</label>
              <input type="text" className="form-input" value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
            </div>
            <div>
              <label className="form-label">Date of Birth</label>
              <input type="date" className="form-input" value={form.dateOfBirth}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} />
            </div>
            <div>
              <label className="form-label">Gender</label>
              <select className="form-input" value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="form-label">Nationality</label>
              <input type="text" className="form-input" placeholder="e.g. Namibian"
                value={form.nationality}
                onChange={(e) => setForm({ ...form, nationality: e.target.value })} />
            </div>
            <div>
              <label className="form-label">ID Number *</label>
              <input type="text" className="form-input" value={form.idNumber}
                onChange={(e) => setForm({ ...form, idNumber: e.target.value })} required />
            </div>
            <div>
              <label className="form-label">Phone Number *</label>
              <input type="tel" className="form-input" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            </div>
            <div>
              <label className="form-label">Email Address *</label>
              <input type="email" className="form-input" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <label className="form-label">Address</label>
              <input type="text" className="form-input" value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <div>
              <label className="form-label">City / Town</label>
              <input type="text" className="form-input" value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 mb-4">Education</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Highest Qualification</label>
              <select className="form-input" value={form.highestQualification}
                onChange={(e) => setForm({ ...form, highestQualification: e.target.value })}>
                <option value="">Select...</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 12">Grade 12 (NSSC)</option>
                <option value="Certificate">Certificate</option>
                <option value="Diploma">Diploma</option>
                <option value="Degree">Degree</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="form-label">School / Institution Name</label>
              <input type="text" className="form-input" value={form.schoolName}
                onChange={(e) => setForm({ ...form, schoolName: e.target.value })} />
            </div>
            <div>
              <label className="form-label">Year Completed</label>
              <input type="text" className="form-input" placeholder="e.g. 2020"
                value={form.yearCompleted}
                onChange={(e) => setForm({ ...form, yearCompleted: e.target.value })} />
            </div>
            <div>
              <label className="form-label">Preferred Start Date</label>
              <input type="date" className="form-input" value={form.preferredStartDate}
                onChange={(e) => setForm({ ...form, preferredStartDate: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 mb-4">Motivation & Experience</h3>
          <div className="space-y-4">
            <div>
              <label className="form-label">Motivation for Applying *</label>
              <textarea className="form-input min-h-[120px] resize-y" rows={4}
                placeholder="Why do you want to become a security officer? What motivates you?"
                value={form.motivation}
                onChange={(e) => setForm({ ...form, motivation: e.target.value })} required />
            </div>
            <div>
              <label className="form-label">Previous Security / Work Experience</label>
              <textarea className="form-input min-h-[100px] resize-y" rows={3}
                placeholder="Describe any relevant previous experience (optional)"
                value={form.previousExperience}
                onChange={(e) => setForm({ ...form, previousExperience: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Documents Checklist */}
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 mb-4">Required Documents</h3>
          <p className="text-gray-600 text-sm mb-4">
            You must upload all 4 documents before submitting your application.
          </p>
          <div className="space-y-2 mb-4">
            {REQUIRED_DOCS.map((doc) => {
              const uploaded = docs.includes(doc.type);
              return (
                <div key={doc.type} className={`flex items-center gap-3 p-3 rounded-lg border ${uploaded ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}>
                  {uploaded ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${uploaded ? "text-gray-900" : "text-gray-500"}`}>
                    {doc.label}
                  </span>
                  {uploaded && <span className="text-xs text-green-700 font-medium ml-auto">Uploaded</span>}
                </div>
              );
            })}
          </div>
          <Link href="/dashboard/documents" className="btn-secondary text-sm inline-flex items-center gap-2">
            <Upload className="w-4 h-4" />
            {docs.length === 0 ? "Upload Documents" : "Manage Documents"}
          </Link>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleSave}
            className="btn-secondary flex items-center gap-2"
            disabled={saveStatus === "saving"}>
            <Save className="w-4 h-4" />
            {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved!" : "Save Draft"}
          </button>
          {!isSubmitted && (
            <button type="submit" className="btn-primary flex items-center gap-2"
              disabled={submitStatus === "loading" || REQUIRED_DOCS.some((d) => !docs.includes(d.type))}>
              <Send className="w-4 h-4" />
              {submitStatus === "loading" ? "Submitting..." : "Submit Application"}
            </button>
          )}
          {status === "MORE_INFO_REQUIRED" && (
            <button type="submit" className="btn-primary flex items-center gap-2"
              disabled={submitStatus === "loading" || REQUIRED_DOCS.some((d) => !docs.includes(d.type))}>
              <Send className="w-4 h-4" />
              {submitStatus === "loading" ? "Submitting..." : "Resubmit Application"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
