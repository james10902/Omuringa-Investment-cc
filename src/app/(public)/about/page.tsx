import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Target, Eye, Heart, ChevronRight } from "lucide-react";
import { COMPANY } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Omuringa Investment CC — a growing Namibian company providing professional security services, business support, and security training.",
};

const values = [
  { icon: "🛡️", title: "Professional", description: "We maintain the highest standards of professionalism in all our services." },
  { icon: "🤝", title: "Reliable", description: "Our clients trust us to deliver consistent, dependable service every time." },
  { icon: "💰", title: "Affordable", description: "We offer competitive pricing without compromising on quality." },
  { icon: "❤️", title: "Client-Focused", description: "Your safety and satisfaction are at the centre of everything we do." },
  { icon: "📈", title: "Growth-Oriented", description: "We continuously improve our services and capabilities." },
  { icon: "✅", title: "Trustworthy", description: "Built on integrity, transparency, and accountability." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero py-20 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/Images/Construction.png"
            alt="Omuringa Investment CC — construction services"
            fill
            className="object-cover opacity-15"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <span className="text-brand-300 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              About Omuringa Investment CC
            </h1>
            <p className="text-brand-200 text-lg leading-relaxed">
              A growing and diversified Namibian company committed to professional security services,
              business support, and quality training.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Company Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Omuringa Investment CC is a growing and reliable company committed to providing
                professional security services. Our mission is to ensure safety, protection, and
                peace of mind for businesses, institutions, and communities across Namibia.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded and led by <strong className="text-brand-700">{COMPANY.director}</strong>,
                Omuringa Investment CC has established itself as a trusted provider of security
                and business services in the Keetmanshoop region and beyond.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We are more than a security company — we are a diversified business offering
                graphic design, events management, accounting, construction, and business
                registration services. Through our subsidiary, <strong className="text-brand-700">Omuringa Security Training Academy</strong>,
                we also invest in developing the next generation of security professionals.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/services" className="btn-primary">
                  Our Services <ChevronRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="btn-secondary">Contact Us</Link>
              </div>
            </div>
            <div className="space-y-4">
              {/* Staff photo */}
              <div className="relative w-full h-52 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/Images/IMG-20260602-WA0023.jpg"
                  alt="Omuringa Investment CC team"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <div className="text-xs text-gold-400 font-semibold uppercase tracking-wider">Our Team</div>
                  <div className="text-sm font-bold">Omuringa Investment CC</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-brand-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Our Mission</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      To ensure safety, protection, and peace of mind for businesses, institutions,
                      and communities through professional, reliable, and affordable security services.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-gold-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Our Vision</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      To be the leading security and business services provider in Namibia,
                      recognised for excellence, integrity, and community impact.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Our Commitment</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      We are committed to continuous improvement, professional training, and
                      building long-term partnerships with our clients and communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              These values guide everything we do at Omuringa Investment CC.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Director photo */}
            <div className="relative w-36 h-36 mx-auto mb-5 rounded-full overflow-hidden border-4 border-brand-100 shadow-xl">
              <Image
                src="/Images/IMG-20260602-WA0022.jpg"
                alt={COMPANY.director}
                fill
                className="object-cover object-top"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{COMPANY.director}</h2>
            <p className="text-brand-700 font-medium mb-4">Director, Omuringa Investment CC</p>
            <p className="text-gray-600 leading-relaxed">
              Under the leadership of {COMPANY.director}, Omuringa Investment CC has grown into
              a trusted provider of security and business services in Namibia. His commitment to
              professionalism, quality, and community development drives the company&apos;s mission
              and vision forward.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3">Partner With Us</h2>
          <p className="text-brand-200 mb-6">
            Whether you need security services, business support, or professional training —
            Omuringa Investment CC is ready to serve you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pricing" className="btn-gold">Request a Quote</Link>
            <Link href="/contact" className="btn-outline-white">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
