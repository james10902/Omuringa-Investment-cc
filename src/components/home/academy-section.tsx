import Link from "next/link";
import { BookOpen, Award, Users, MapPin, ChevronRight, GraduationCap, Shield } from "lucide-react";
import { COMPANY } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";

export function AcademySection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block text-brand-700 font-bold text-xs uppercase tracking-widest mb-3 bg-brand-50 px-3 py-1 rounded-full">
            Training Division
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Omuringa Security Training Academy
          </h2>
          <p className="text-brand-600 font-medium mb-2">A subsidiary of Omuringa Investment CC</p>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            Our 3-week intensive programme equips candidates with the knowledge, skills, and
            certification needed to work as professional security officers in Namibia.
          </p>
        </div>

        {/* ── Training images: two side by side ── */}
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {/* Classroom */}
          <div className="relative rounded-3xl overflow-hidden h-72 group shadow-xl">
            <SafeImage
              src="/Images/writing.png"
              alt="Security training classroom — students studying theory"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              fallbackClassName="w-full h-full bg-gradient-to-br from-brand-800 to-brand-950 flex items-center justify-center"
/>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/30 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="bg-brand-700 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                Week 1 &amp; 2
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-brand-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="text-lg font-bold text-white">Theory &amp; Classroom Learning</div>
              </div>
              <p className="text-brand-300 text-sm leading-relaxed">
                Security principles, legal frameworks, communication, and professional conduct.
              </p>
            </div>
          </div>

          {/* Tactical */}
          <div className="relative rounded-3xl overflow-hidden h-72 group shadow-xl">
            <SafeImage
              src="/Images/Training.png"
              alt="Security tactical training — outdoor physical drill"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              fallbackClassName="w-full h-full bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center"
/>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/30 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="bg-gold-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                Week 3
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-gold-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="text-lg font-bold text-white">Physical &amp; Tactical Training</div>
              </div>
              <p className="text-brand-300 text-sm leading-relaxed">
                Patrol techniques, access control, defensive skills, and emergency response.
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom: info grid ── */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Certification card */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-1">Certification</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Receive a recognised certificate upon successful completion of all three weeks.
              </p>
            </div>
          </div>

          {/* Location card */}
          <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-1">Training Location</div>
              <p className="text-gray-600 text-sm leading-relaxed">{COMPANY.trainingLocation}</p>
              <a href={`tel:${COMPANY.phoneRaw}`} className="text-brand-700 text-sm font-medium hover:underline mt-1 block">
                {COMPANY.phone}
              </a>
            </div>
          </div>

          {/* Job placement card */}
          <div className="bg-gold-50 border border-gold-200 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-gold-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-1">Job Placement</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Job placement assistance available for qualifying graduates.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/academy" className="btn-primary">
            Academy Details
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link href="/register" className="btn-gold">
            Apply Online Now
          </Link>
        </div>
      </div>
    </section>
  );
}

