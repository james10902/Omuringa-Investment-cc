"use client";

import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, Trash2, CheckCircle } from "lucide-react";

const DOC_TYPES = [
  { value: "CV", label: "Comprehensive CV" },
  { value: "CERTIFIED_ID", label: "Certified Copy of ID" },
  { value: "SCHOOL_CERTIFICATE", label: "School Leaving Certificate" },
  { value: "CERTIFICATE_OF_CONDUCT", label: "Certificate of Conduct" },
  { value: "SUPPORTIVE_DOCUMENT", label: "Supportive Document" },
  { value: "OTHER", label: "Other Document" },
];

interface Doc {
  id: string;
  name: string;
  type: string;
  fileName: string;
  fileSize: number;
  createdAt: string;
}

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [docType, setDocType] = useState("CV");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDocs = async () => {
    const res = await fetch("/api/documents");
    const data = await res.json();
    setDocs(data.documents || []);
    setLoading(false);
  };

  useEffect(() => { fetchDocs(); }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;
    const file = acceptedFiles[0];
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File size must be under 10MB.");
      return;
    }
    setUploading(true);
    setUploadError("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", docType);
    try {
      const res = await fetch("/api/documents", { method: "POST", body: formData });
      if (res.ok) {
        await fetchDocs();
      } else {
        const data = await res.json();
        setUploadError(data.error || "Upload failed.");
      }
    } catch {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }, [docType]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this document?")) return;
    await fetch(`/api/documents/${id}`, { method: "DELETE" });
    setDocs(docs.filter((d) => d.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const uploadedTypes = docs.map((d) => d.type);
  const requiredTypes = ["CV", "CERTIFIED_ID", "SCHOOL_CERTIFICATE", "CERTIFICATE_OF_CONDUCT"];
  const allUploaded = requiredTypes.every((t) => uploadedTypes.includes(t));

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
        <p className="text-gray-600 text-sm mt-1">Upload your required application documents</p>
      </div>

      {/* Progress */}
      <div className="card p-5">
        <h3 className="font-semibold text-gray-900 mb-3">Required Documents</h3>
        <div className="space-y-2">
          {DOC_TYPES.slice(0, 5).map((dt) => {
            const uploaded = uploadedTypes.includes(dt.value);
            const required = requiredTypes.includes(dt.value);
            return (
              <div key={dt.value} className="flex items-center gap-3">
                <CheckCircle className={`w-5 h-5 flex-shrink-0 ${uploaded ? "text-green-500" : "text-gray-300"}`} />
                <span className={`text-sm ${uploaded ? "text-gray-900" : "text-gray-500"}`}>
                  {dt.label}
                  {required && !uploaded && <span className="text-red-500 ml-1">*</span>}
                </span>
                {uploaded && <span className="badge badge-green ml-auto">Uploaded</span>}
              </div>
            );
          })}
        </div>
        {allUploaded && (
          <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 text-green-800 text-sm">
            ✅ All required documents have been uploaded.
          </div>
        )}
      </div>

      {/* Upload */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Upload Document</h3>
        <div className="mb-4">
          <label className="form-label">Document Type *</label>
          <select className="form-input" value={docType} onChange={(e) => setDocType(e.target.value)}>
            {DOC_TYPES.map((dt) => (
              <option key={dt.value} value={dt.value}>{dt.label}</option>
            ))}
          </select>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-brand-500 bg-brand-50" : "border-gray-300 hover:border-brand-400 hover:bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          {isDragActive ? (
            <p className="text-brand-700 font-medium">Drop the file here...</p>
          ) : (
            <>
              <p className="text-gray-700 font-medium">Drag & drop or click to upload</p>
              <p className="text-gray-500 text-sm mt-1">PDF, JPG, PNG — max 10MB</p>
            </>
          )}
          {uploading && <p className="text-brand-700 mt-2 font-medium">Uploading...</p>}
        </div>
        {uploadError && <p className="text-red-600 text-sm mt-2">{uploadError}</p>}
      </div>

      {/* Uploaded docs */}
      {loading ? (
        <p className="text-gray-500 text-center py-6">Loading documents...</p>
      ) : docs.length > 0 ? (
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Uploaded Documents ({docs.length})</h3>
          <div className="space-y-3">
            {docs.map((doc) => (
              <div key={doc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-8 h-8 text-brand-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">{doc.name}</div>
                  <div className="text-gray-500 text-xs">
                    {DOC_TYPES.find((d) => d.value === doc.type)?.label} • {formatSize(doc.fileSize)}
                  </div>
                </div>
                <button onClick={() => handleDelete(doc.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          No documents uploaded yet.
        </div>
      )}
    </div>
  );
}
