"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Save, Send, FileText, Upload, AlertCircle } from "lucide-react";
import Link from "next/link";

const statusConfig: Record<string, { label: string; color: string }> = {
  DRAFT: { label: "Draft", color: "badge-gray" },
  SUBMITTED: { label: "Submitted", color: "badge-blue" },
  UNDER_REVIEW: { label: "Under Review", color: "badge-yellow" },
  APPROVED: { label: "Approved", color: "badge-green" },
  REJECTED: { label: "Rejected", color: "badge-red" },
  MORE_INFO_REQUIRED: { label: "More Info Required", color: "badge-orange" },
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

export default function ApplicationPage() {
  const [form, setForm] = useState<AppData>(empty);
  const [status, setStatus] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState<string[]>([]);

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
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  const isReadOnly = status && !["DRAFT", "MORE_INFO_REQUIRED"].includes(status);

  if (loading) return <div className="text-center py-20 text-gray-500">Loading application...</div>;

  if (submitStatus === "success") {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Application Submitted!</h2>
        <p className="text-gray-600 mt-3 mb-6">
          Your training application has been submitted successfully. Our team will review it and
          you will be notified of any updates via email.
        </p>
        <button onClick={() => setSubmitStatus("idle")} className="btn-primary">
          View Application
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Training Application</h2>
          <p className="text-gray-600 text-sm mt-1">Omuringa Security Training Academy</p>
        </div>
        {status && (
          <span className={`badge ${statusConfig[status]?.color}`}>
            {statusConfig[status]?.label}
          </span>
        )}
      </div>

      {adminNotes && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-yellow-800 text-sm">
          <strong>Note from admin:</strong> {adminNotes}
        </div>
      )}

      {isReadOnly && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-800 text-sm">
          Your application has been submitted and is currently being reviewed. You cannot edit it at this time.
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
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                disabled={!!isReadOnly} required />
            </div>
            <div>
              <label className="form-label">Last Name *</label>
              <input type="text" className="form-input" value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                disabled={!!isReadOnly} required />
            </div>
            <div>
              <label className="form-label">Date of Birth</label>
              <input type="date" className="form-input" value={form.dateOfBirth}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                disabled={!!isReadOnly} />
            </div>
            <div>
              <label className="form-label">Gender</label>
              <select className="form-input" value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                disabled={!!isReadOnly}>
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
                onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                disabled={!!isReadOnly} />
            </div>
            <div>
              <label className="form-label">ID Number *</label>
              <input type="text" className="form-input" value={form.idNumber}
                onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
                disabled={!!isReadOnly} required />
            </div>
            <div>
              <label className="form-label">Phone Number *</label>
              <input type="tel" className="form-input" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                disabled={!!isReadOnly} required />
            </div>
            <div>
              <label className="form-label">Email Address *</label>
              <input type="email" className="form-input" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={!!isReadOnly} required />
            </div>
            <div>
              <label className="form-label">Address</label>
              <input type="text" className="form-input" value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                disabled={!!isReadOnly} />
            </div>
            <div>
              <label className="form-label">City / Town</label>
              <input type="text" className="form-input" value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                disabled={!!isReadOnly} />
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
                onChange={(e) => setForm({ ...form, highestQualification: e.target.value })}
                disabled={!!isReadOnly}>
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
                onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
                disabled={!!isReadOnly} />
            </div>
            <div>
              <label className="form-label">Year Completed</label>
              <input type="text" className="form-input" placeholder="e.g. 2020"
                value={form.yearCompleted}
                onChange={(e) => setForm({ ...form, yearCompleted: e.target.value })}
                disabled={!!isReadOnly} />
            </div>
            <div>
              <label className="form-label">Preferred Start Date</label>
              <input type="date" className="form-input" value={form.preferredStartDate}
                onChange={(e) => setForm({ ...form, preferredStartDate: e.target.value })}
                disabled={!!isReadOnly} />
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
                onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                disabled={!!isReadOnly} required />
            </div>
            <div>
              <label className="form-label">Previous Security / Work Experience</label>
              <textarea className="form-input min-h-[100px] resize-y" rows={3}
                placeholder="Describe any relevant previous experience (optional)"
                value={form.previousExperience}
                onChange={(e) => setForm({ ...form, previousExperience: e.target.value })}
                disabled={!!isReadOnly} />
            </div>
          </div>
        </div>

        {/* Documents Checklist */}
        {!isReadOnly && (
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
        )}

        {/* Actions */}
        {!isReadOnly && (
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={handleSave}
              className="btn-secondary flex items-center gap-2"
              disabled={saveStatus === "saving"}>
              <Save className="w-4 h-4" />
              {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved!" : "Save Draft"}
            </button>
            <button type="submit" className="btn-primary flex items-center gap-2"
              disabled={submitStatus === "loading" || REQUIRED_DOCS.some((d) => !docs.includes(d.type))}>
              <Send className="w-4 h-4" />
              {submitStatus === "loading" ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
