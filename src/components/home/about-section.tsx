import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ChevronRight } from "lucide-react";import { COMPANY } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";

const values = [
  "Professional and reliable service delivery",
  "Affordable and flexible pricing",
  "Client-focused approach",
  "Trained and certified security personnel",
  "Commitment to safety and peace of mind",
  "Trusted by businesses and institutions",
];

export function AboutSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Visual panel ── */}
          <div className="relative">
            {/* Main image — construction workers */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[480px]">
              <SafeImage
                src="/Images/Construction.png"
                alt="Omuringa Investment CC — construction services"
                fill
                className="object-cover"
                fallbackClassName="w-full h-full bg-gradient-to-br from-brand-800 to-brand-950 flex items-center justify-center"
/>
              {/* Dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/20 to-transparent" />

              {/* Logo overlay at top */}
              <div className="absolute top-5 left-5 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
                <div className="relative w-10 h-10 bg-white rounded-xl overflow-hidden flex-shrink-0">
                  <SafeImage
                    src="/Images/Logo.png"
                    alt="Omuringa Investment CC"
                    fill
                    className="object-contain p-1"
                    fallbackClassName="w-full h-full bg-brand-700 flex items-center justify-center"
/>
                </div>
                <div>
                  <div className="text-white font-bold text-xs leading-tight">Omuringa Investment CC</div>
                  <div className="text-gold-400 text-xs italic">&ldquo;The eye of all trades&rdquo;</div>
                </div>
              </div>

              {/* Bottom stats */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "Security", sub: "Core Services" },
                    { value: "Training", sub: "Academy" },
                    { value: "Business", sub: "Support" },
                    { value: "Namibia", sub: "Based" },
                  ].map((item) => (
                    <div key={item.value} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 text-center">
                      <div className="text-gold-400 font-bold text-sm">{item.value}</div>
                      <div className="text-brand-300 text-xs mt-0.5">{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Director floating card */}
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 flex items-center gap-3 max-w-[220px]">
              <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-brand-700 font-extrabold text-base">UT</span>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900 leading-tight">{COMPANY.director}</div>
                <div className="text-xs text-brand-600 mt-0.5">Director</div>
                <div className="text-xs text-gray-400 mt-0.5 leading-tight">Omuringa Investment CC</div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Content ── */}
          <div className="lg:pl-4">
            <span className="inline-block text-brand-700 font-bold text-xs uppercase tracking-widest mb-3 bg-brand-50 px-3 py-1 rounded-full">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
              Reliable Security &amp; Business Services from{" "}
              <span className="text-brand-700">Namibia</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-base">
              Omuringa Investment CC is a growing and reliable company committed to providing
              professional security services. Our mission is to ensure safety, protection, and
              peace of mind for businesses, institutions, and communities across Namibia.
            </p>
            <p className="text-gray-600 leading-relaxed mb-7 text-base">
              Through our subsidiary,{" "}
              <strong className="text-brand-700">Omuringa Security Training Academy</strong>,
              we invest in the next generation of security professionals — offering certified
              3-week training programmes in Keetmanshoop.
            </p>

            <ul className="space-y-2.5 mb-8">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{v}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary">
                Learn More
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

