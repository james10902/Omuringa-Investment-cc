import Link from "next/link";
import { Shield } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 flex flex-col">
      {/* Header */}
      <header className="py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-3 w-fit group">
            <div className="relative w-10 h-10 flex-shrink-0 bg-white rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
              <SafeImage
                src="/Images/Logo.png"
                alt="Omuringa Investment CC"
                fill
                className="object-contain p-1"
                priority
                fallbackClassName="w-full h-full bg-brand-700 flex items-center justify-center"
/>
            </div>
            <div>
              <div className="font-bold text-white text-sm leading-tight">Omuringa Investment CC</div>
              <div className="text-xs text-gold-400 leading-tight italic">The eye of all trades</div>
            </div>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center py-8 px-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-brand-400 border-t border-white/10">
        <p>&copy; {new Date().getFullYear()} Omuringa Investment CC. All rights reserved.</p>
      </footer>
    </div>
  );
}

