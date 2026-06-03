import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Users, Award, MapPin, Phone, Mail, CheckCircle, FileText } from "lucide-react";
import { COMPANY } from "@/lib/utils";
import { TrainingEnquiryForm } from "@/components/home/training-enquiry-form";

export const metadata: Metadata = {
  title: "Security Training Academy",
  description:
    "Omuringa Security Training Academy offers a 3-week intensive security training programme in Keetmanshoop, Namibia. Get certified and start your security career.",
};

const weeks = [
  {
    week: "Week 1",
    title: "Theory & Classroom Learning",
    icon: BookOpen,
    color: "bg-brand-700",
    topics: [
      "Security principles and legislation",
      "Professional conduct and ethics",
      "Communication and report writing",
      "Legal powers and limitations",
      "Emergency procedures",
      "First aid basics",
    ],
  },
  {
    week: "Week 2",
    title: "Advanced Theory & Practical Preparation",
    icon: FileText,
    color: "bg-brand-600",
    topics: [
      "Access control procedures",
      "CCTV and surveillance basics",
      "Crowd management principles",
      "Conflict resolution",
      "Customer service in security",
      "Documentation and evidence",
    ],
  },
  {
    week: "Week 3",
    title: "Physical & Tactical Training",
    icon: Users,
    color: "bg-gold-600",
    topics: [
      "Physical fitness and conditioning",
      "Patrol techniques and procedures",
      "Tactical response training",
      "Defensive techniques",
      "Practical assessments",
      "Final evaluation",
    ],
  },
];

const requirements = [
  { doc: "Comprehensive CV", note: "Updated and detailed" },
  { doc: "Certified Copy of ID", note: "Certified with police stamp" },
  { doc: "School Leaving Certificate", note: "Certified copy required" },
  { doc: "Certificate of Conduct", note: "From Namibian Police" },
  { doc: "Supportive Documents", note: "Any relevant qualifications or references" },
];

export default function AcademyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero py-20 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/Images/Training.png"
            alt="Security training at Omuringa Security Training Academy"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <span className="text-brand-300 font-semibold text-sm uppercase tracking-wider">
              A Subsidiary of Omuringa Investment CC
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Omuringa Security Training Academy
            </h1>
            <p className="text-brand-200 text-lg leading-relaxed mb-6">
              Professional 3-week intensive security training programme in Keetmanshoop, Namibia.
              Get certified and launch your career in security.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register" className="btn-gold">Apply Online Now</Link>
              <a href={`tel:${COMPANY.phoneRaw}`} className="btn-outline-white">
                <Phone className="w-4 h-4" />
                Call to Enquire
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6 mb-14">
            {[
              { icon: BookOpen, title: "3-Week Programme", desc: "Intensive training covering theory, practical, and physical components.", color: "bg-brand-50 text-brand-700" },
              { icon: Award, title: "Certified", desc: "Receive a recognised certificate upon successful completion of the programme.", color: "bg-gold-50 text-gold-700" },
              { icon: Users, title: "Job Placement", desc: "Job placement assistance available for qualifying graduates.", color: "bg-green-50 text-green-700" },
            ].map((item) => (
              <div key={item.title} className="card p-6 text-center">
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Training Programme */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Training Programme Structure</h2>
            <div className="space-y-6">
              {weeks.map((w, i) => (
                <div key={w.week} className="card overflow-hidden">
                  {/* Image for weeks 1 and 3 */}
                  {i === 0 && (
                    <div className="relative h-48 w-full">
                      <Image
                        src="/Images/writing.png"
                        alt="Security training classroom — theory and study"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-brand-950/50" />
                      <div className="absolute bottom-3 left-4 text-white text-sm font-semibold">
                        Theory & Classroom Learning
                      </div>
                    </div>
                  )}
                  {i === 2 && (
                    <div className="relative h-48 w-full">
                      <Image
                        src="/Images/Training.png"
                        alt="Security tactical training — outdoor physical drill"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-brand-950/50" />
                      <div className="absolute bottom-3 left-4 text-white text-sm font-semibold">
                        Physical & Tactical Training
                      </div>
                    </div>
                  )}
                  <div className={`${w.color} p-4 flex items-center gap-4`}>
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <w.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white/80 text-sm font-medium">{w.week}</div>
                      <div className="text-white font-bold text-lg">{w.title}</div>
                    </div>
                    <div className="ml-auto w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                      {i + 1}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {w.topics.map((topic) => (
                        <div key={topic} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-brand-600 flex-shrink-0" />
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certification */}
          <div className="bg-brand-50 border border-brand-200 rounded-2xl p-8 mb-14">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-brand-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Certification & Job Placement</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Upon successful completion of all three weeks of training and passing the final
                  assessment, trainees receive a certificate from Omuringa Security Training Academy.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We also provide <strong>job placement assistance</strong> for qualifying graduates,
                  connecting them with security employers and opportunities in Namibia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements & Enrollment */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Requirements */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Registration Requirements</h2>
              <p className="text-gray-600 mb-6">
                To apply for the training programme, you will need to submit the following documents:
              </p>
              <div className="space-y-3">
                {requirements.map((r) => (
                  <div key={r.doc} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
                    <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{r.doc}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{r.note}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4 italic">
                * All documents must be certified with a police stamp where required.
              </p>
            </div>

            {/* Enrollment Contact */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enrollment Contact</h2>
              <div className="bg-brand-950 rounded-2xl p-8 text-white">
                <h3 className="font-bold text-gold-400 text-lg mb-6">Get in Touch to Enroll</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-white">Training Location</div>
                      <div className="text-brand-300 text-sm">{COMPANY.trainingLocation}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-brand-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-white">Phone / WhatsApp</div>
                      <a href={`tel:${COMPANY.phoneRaw}`} className="text-brand-300 text-sm hover:text-white transition-colors">
                        {COMPANY.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-brand-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-white">Email</div>
                      <a href={`mailto:${COMPANY.email}`} className="text-brand-300 text-sm hover:text-white transition-colors">
                        {COMPANY.email}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/register" className="btn-gold text-center">
                    Apply Online
                  </Link>
                  <a
                    href={`https://wa.me/${COMPANY.phone.replace(/\s+/g, "").replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-[#1ebe5d] transition-colors"
                  >
                    WhatsApp Enquiry
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Enquiry Form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Have a Question?</h2>
            <p className="text-gray-600 mt-2">
              Send us a training enquiry and we&apos;ll get back to you promptly.
            </p>
          </div>
          <div className="card p-8">
            <TrainingEnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
