import Link from "next/link";
import { ChevronRight, Phone, MapPin, Shield, GraduationCap, Briefcase } from "lucide-react";
import { COMPANY } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-hero overflow-hidden">
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Content ── */}
          <div className="text-white">
            {/* Logo + badge */}
            <div className="flex items-center gap-3 mb-8">
              <div className="relative w-14 h-14 flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/20">
                <SafeImage
                  src="/Images/Logo.png"
                  alt="Omuringa Investment CC"
                  fill
                  className="object-contain p-1.5"
                  priority
                  fallbackClassName="w-full h-full bg-brand-700 flex items-center justify-center"
                  fallbackContent={<Shield className="w-7 h-7 text-white" />}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white font-bold text-sm leading-tight">Omuringa Investment CC</span>
                <span className="inline-flex items-center gap-1.5 bg-gold-600/20 border border-gold-500/40 rounded-full px-3 py-0.5 text-xs text-gold-300 font-medium">
                  <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" />
                  Trusted Security Partner in Namibia
                </span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
              Professional{" "}
              <span className="text-gold-400">Security</span>{" "}
              &amp;{" "}
              <span className="text-gold-400">Business</span>{" "}
              Solutions
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-brand-300 mt-2">
                in Namibia
              </span>
            </h1>

            <p className="text-brand-200 text-lg leading-relaxed mb-10 max-w-lg">
              Reliable security services, professional business support, and certified
              security training — all from one trusted Namibian company.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/pricing" className="btn-gold text-base py-3.5 px-8 shadow-lg shadow-gold-900/30">
                Request a Quote
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link href="/academy" className="btn-outline-white text-base py-3.5 px-8">
                Enroll in Training
              </Link>
              <Link href="/contact" className="btn-outline-white text-base py-3.5 px-8">
                Contact Us
              </Link>
            </div>

            {/* Contact info */}
            <div className="flex flex-wrap gap-5 text-sm text-brand-300 border-t border-white/10 pt-6">
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-gold-400" />
                {COMPANY.phone}
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400" />
                {COMPANY.location}
              </span>
            </div>
          </div>

          {/* ── RIGHT: Image grid ── */}
          <div className="hidden lg:flex flex-col gap-3">
            {/* Top row: two images side by side */}
            <div className="grid grid-cols-2 gap-3">
              {/* Classroom */}
              <div className="relative rounded-2xl overflow-hidden h-52 group shadow-2xl">
                <SafeImage
                  src="/Images/writing.png"
                  alt="Security training classroom"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  fallbackClassName="w-full h-full bg-gradient-to-br from-brand-800 to-brand-950 flex items-center justify-center"
                  fallbackContent={
                    <div className="text-center text-white p-4">
                      <GraduationCap className="w-10 h-10 text-gold-400 mx-auto mb-2" />
                      <div className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Week 1 & 2</div>
                      <div className="text-sm font-bold mt-1">Theory Training</div>
                    </div>
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-0.5">Week 1 & 2</div>
                  <div className="text-sm font-bold text-white">Theory Training</div>
                </div>
              </div>

              {/* Tactical */}
              <div className="relative rounded-2xl overflow-hidden h-52 group shadow-2xl">
                <SafeImage
                  src="/Images/Training.png"
                  alt="Security tactical training"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  fallbackClassName="w-full h-full bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center"
                  fallbackContent={
                    <div className="text-center text-white p-4">
                      <Shield className="w-10 h-10 text-gold-400 mx-auto mb-2" />
                      <div className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-0.5">Week 3</div>
                      <div className="text-sm font-bold">Tactical Training</div>
                    </div>
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-0.5">Week 3</div>
                  <div className="text-sm font-bold text-white">Tactical Training</div>
                </div>
              </div>
            </div>

            {/* Bottom: wide construction image */}
            <div className="relative rounded-2xl overflow-hidden h-44 group shadow-2xl">
              <SafeImage
                src="/Images/Construction.png"
                alt="Construction services — Omuringa Investment CC"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                fallbackClassName="w-full h-full bg-gradient-to-r from-brand-900 to-brand-800 flex items-center justify-center"
                fallbackContent={
                  <div className="flex items-center gap-4 text-white px-6">
                    <Briefcase className="w-10 h-10 text-gold-400 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-0.5">Business Services</div>
                      <div className="text-sm font-bold">Construction &amp; More</div>
                      <div className="text-xs text-brand-300 mt-0.5">Graphic Design · Events · Accounting · Registration</div>
                    </div>
                  </div>
                }
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-950/80 via-brand-950/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                <div>
                  <div className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-0.5">Business Services</div>
                  <div className="text-sm font-bold text-white">Construction &amp; More</div>
                </div>
                <Link href="/services" className="text-xs text-gold-400 font-semibold hover:text-gold-300 transition-colors flex items-center gap-1">
                  View All <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-3 mt-1">
              {[
                { value: "6+", label: "Security Services" },
                { value: "3-Week", label: "Training Programme" },
                { value: "100%", label: "Certified Graduates" },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 text-center">
                  <div className="text-xl font-extrabold text-gold-400">{s.value}</div>
                  <div className="text-xs text-brand-300 mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 80L1440 80L1440 20C1200 70 960 80 720 80C480 80 240 50 0 20L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
