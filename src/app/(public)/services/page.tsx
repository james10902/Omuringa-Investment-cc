import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Shield, Eye, Users, Calendar, Camera, BookOpen,
  Palette, UtensilsCrossed, Calculator, Building2, FileText, ChevronRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Omuringa Investment CC offers professional security services including static guarding, patrol, event security, and business support services in Namibia.",
};

const securityServices = [
  {
    icon: Shield,
    title: "Static Guarding",
    description: "Professional security guards deployed at buildings, offices, retail stores, and construction sites. Our guards provide a visible deterrent and are trained to respond to incidents professionally.",
    benefits: ["Visible security presence", "Trained and certified guards", "Day and night coverage", "Incident reporting"],
  },
  {
    icon: Eye,
    title: "Access Control & Gate Security",
    description: "Managed access control and gate security to ensure only authorised personnel and vehicles enter your premises. We implement strict access protocols tailored to your requirements.",
    benefits: ["Visitor management", "Vehicle access control", "Shift-based coverage", "Detailed access logs"],
  },
  {
    icon: Users,
    title: "Patrol Services",
    description: "Regular day and night patrol services to monitor your property, deter criminal activity, and respond to incidents. Our patrol officers are equipped and trained for rapid response.",
    benefits: ["Day and night patrols", "Rapid incident response", "Deterrence of criminal activity", "Regular patrol reports"],
  },
  {
    icon: Calendar,
    title: "Event Security Management",
    description: "Comprehensive event security for corporate events, public gatherings, concerts, and private functions. We manage crowd control, access, and emergency response.",
    benefits: ["Crowd management", "VIP protection", "Emergency response", "Pre-event planning"],
  },
  {
    icon: Camera,
    title: "CCTV Monitoring",
    description: "Professional CCTV monitoring services to keep your premises under constant surveillance. We can monitor existing systems or advise on new installations.",
    benefits: ["24/7 monitoring capability", "Incident recording", "Remote monitoring options", "Evidence preservation"],
  },
  {
    icon: BookOpen,
    title: "Security Guard Training",
    description: "In-house security guard training and development to maintain the highest professional standards. All our guards undergo regular training updates.",
    benefits: ["Certified training", "Regular refresher courses", "Professional development", "Standards compliance"],
  },
];

const businessServices = [
  {
    icon: Palette,
    title: "Graphic Design & Printing",
    description: "Professional graphic design and printing services for business cards, brochures, banners, signage, and all your marketing materials.",
    benefits: ["Logo design", "Print materials", "Digital graphics", "Brand identity"],
  },
  {
    icon: UtensilsCrossed,
    title: "Events, Deco & Catering",
    description: "Full-service event planning, decoration, and catering for corporate events, celebrations, and functions of all sizes.",
    benefits: ["Event planning", "Venue decoration", "Catering services", "Full coordination"],
  },
  {
    icon: Calculator,
    title: "Accounting Services",
    description: "Professional bookkeeping, accounting, and financial management support for small and medium businesses in Namibia.",
    benefits: ["Bookkeeping", "Financial statements", "Tax compliance", "Business advisory"],
  },
  {
    icon: Building2,
    title: "Construction",
    description: "Construction and building services for commercial and residential projects. We work with trusted contractors to deliver quality results.",
    benefits: ["Commercial construction", "Residential projects", "Renovations", "Project management"],
  },
  {
    icon: FileText,
    title: "Business Registration",
    description: "Assistance with business registration, compliance, and administrative requirements for new and existing businesses in Namibia.",
    benefits: ["Company registration", "Compliance support", "Documentation", "Administrative assistance"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <span className="text-brand-300 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Our Services</h1>
            <p className="text-brand-200 text-lg leading-relaxed">
              From professional security guarding to business support — Omuringa Investment CC
              delivers reliable, affordable services across Namibia.
            </p>
          </div>
        </div>
      </section>

      {/* Security Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Training image banner */}
          <div className="relative rounded-2xl overflow-hidden h-48 mb-10">
            <Image
              src="/Images/Training.png"
              alt="Professional security training — Omuringa Security Training Academy"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950/80 to-brand-950/40" />
            <div className="absolute inset-0 flex items-center px-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Security Services</h2>
                  <p className="text-brand-200 text-sm mt-0.5">Professional security solutions for businesses and institutions</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityServices.map((service) => (
              <div key={service.title} className="card p-6 hover:shadow-lg hover:border-brand-200 transition-all group">
                <div className="w-12 h-12 bg-brand-50 group-hover:bg-brand-100 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <service.icon className="w-6 h-6 text-brand-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-brand-600 rounded-full flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link href="/pricing" className="text-brand-700 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Request Quote <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Construction image banner */}
          <div className="relative rounded-2xl overflow-hidden h-48 mb-10">
            <Image
              src="/Images/Construction.png"
              alt="Omuringa Investment CC — construction and business services"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950/80 to-brand-950/40" />
            <div className="absolute inset-0 flex items-center px-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Business Support Services</h2>
                  <p className="text-brand-200 text-sm mt-0.5">Additional services to support your business growth</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessServices.map((service) => (
              <div key={service.title} className="card p-6 hover:shadow-lg hover:border-gold-200 transition-all group">
                <div className="w-12 h-12 bg-gold-50 group-hover:bg-gold-100 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <service.icon className="w-6 h-6 text-gold-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-gold-600 rounded-full flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="text-gold-700 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Enquire Now <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3">Need a Custom Solution?</h2>
          <p className="text-brand-200 mb-6">
            Contact us to discuss your specific requirements. We offer flexible, tailored solutions for every client.
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
