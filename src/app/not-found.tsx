import Link from "next/link";
import { Shield } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mb-6">
        <Shield className="w-8 h-8 text-brand-700" />
      </div>
      <h1 className="text-6xl font-bold text-brand-800 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/contact" className="btn-secondary">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
