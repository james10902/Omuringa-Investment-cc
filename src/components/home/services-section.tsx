import Link from "next/link";
import {
  Shield, Eye, Users, Calendar, Camera, BookOpen,
  Palette, UtensilsCrossed, Calculator, Building2, FileText, ChevronRight
} from "lucide-react";

const securityServices = [
  { icon: Shield, title: "Static Guarding", description: "Professional security guards for buildings, offices, and sites — providing a visible deterrent and rapid response." },
  { icon: Eye, title: "Access Control", description: "Managed gate security and access control systems to ensure only authorised personnel enter your premises." },
  { icon: Users, title: "Patrol Services", description: "Day and night patrol services to monitor your property and respond to incidents promptly." },
  { icon: Calendar, title: "Event Security", description: "Experienced event security management for corporate events, public gatherings, and private functions." },
  { icon: Camera, title: "CCTV Monitoring", description: "Professional CCTV monitoring services to keep your premises under constant surveillance." },
  { icon: BookOpen, title: "Guard Training", description: "In-house security guard training and development to maintain the highest professional standards." },
];

const businessServices = [
  { icon: Palette, title: "Graphic Design & Printing", description: "Professional design and printing for all your business materials." },
  { icon: UtensilsCrossed, title: "Events, Deco & Catering", description: "Full event planning, decoration, and catering services." },
  { icon: Calculator, title: "Accounting Services", description: "Professional bookkeeping and accounting support." },
  { icon: Building2, title: "Construction", description: "Construction and building services for commercial and residential projects." },
  { icon: FileText, title: "Business Registration", description: "Assistance with business registration and compliance in Namibia." },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-brand-700 font-bold text-xs uppercase tracking-widest mb-3 bg-brand-50 px-3 py-1 rounded-full">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Our Services</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            From professional security guarding to business support — Omuringa Investment CC is your all-in-one partner in Namibia.
          </p>
        </div>

        {/* Security Services */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-brand-700 rounded-xl flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900">Security Services</h3>
              <p className="text-gray-500 text-sm">Professional protection for businesses and institutions</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {securityServices.map((service) => (
              <div
                key={service.title}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 hover:border-brand-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 bg-brand-50 group-hover:bg-brand-100 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <service.icon className="w-6 h-6 text-brand-700" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{service.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-4 h-4 text-brand-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Services */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gold-600 rounded-xl flex items-center justify-center shadow-md">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900">Business Support Services</h3>
              <p className="text-gray-500 text-sm">Additional services to grow your business</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {businessServices.map((service) => (
              <div
                key={service.title}
                className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-gold-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 bg-gold-50 group-hover:bg-gold-100 rounded-xl flex items-center justify-center mb-3 transition-colors">
                  <service.icon className="w-5 h-5 text-gold-700" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{service.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center flex flex-wrap justify-center gap-4">
          <Link href="/services" className="btn-primary">
            View All Services
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link href="/pricing" className="btn-secondary">
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
