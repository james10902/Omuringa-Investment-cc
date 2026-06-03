import { COMPANY } from "@/lib/utils";
import { MapPin, Phone, Mail, User } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 text-sm mt-1">Business information and configuration</p>
      </div>

      {/* Business Info */}
      <div className="card p-6">
        <h3 className="font-bold text-gray-900 mb-4">Business Information</h3>
        <div className="space-y-4 text-sm">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <User className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-gray-500">Business Name</div>
              <div className="font-medium text-gray-900">{COMPANY.name}</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <User className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-gray-500">Director</div>
              <div className="font-medium text-gray-900">{COMPANY.director}</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Phone className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-gray-500">Phone / WhatsApp</div>
              <div className="font-medium text-gray-900">{COMPANY.phone}</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-gray-500">Email</div>
              <div className="font-medium text-gray-900">{COMPANY.email}</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-gray-500">Location</div>
              <div className="font-medium text-gray-900">{COMPANY.location}</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-gray-500">Training Location</div>
              <div className="font-medium text-gray-900">{COMPANY.trainingLocation}</div>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          To update business information, edit the <code className="bg-gray-100 px-1 rounded">src/lib/utils.ts</code> file and redeploy.
        </p>
      </div>

      {/* Environment */}
      <div className="card p-6">
        <h3 className="font-bold text-gray-900 mb-4">Environment Configuration</h3>
        <p className="text-gray-600 text-sm mb-3">
          The following environment variables must be configured in your <code className="bg-gray-100 px-1 rounded">.env</code> file:
        </p>
        <div className="space-y-2 text-sm font-mono">
          {[
            "DATABASE_URL",
            "NEXTAUTH_SECRET",
            "NEXTAUTH_URL",
            "EMAIL_SERVER_HOST",
            "EMAIL_SERVER_PORT",
            "EMAIL_SERVER_USER",
            "EMAIL_SERVER_PASSWORD",
            "EMAIL_FROM",
            "NEXT_PUBLIC_APP_URL",
          ].map((key) => (
            <div key={key} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <span className="text-brand-700">{key}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
