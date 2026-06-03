import Link from "next/link";
import { Phone, Mail, MapPin, Shield, MessageCircle } from "lucide-react";
import { COMPANY } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";

const services = [
  "Static Guarding",
  "Access Control",
  "Patrol Services",
  "Event Security",
  "CCTV Monitoring",
  "Security Training",
];

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/academy", label: "Training Academy" },
  { href: "/pricing", label: "Request a Quote" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-white">
      {/* CTA Strip */}
      <div className="bg-brand-800 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">Ready to secure your business?</h3>
            <p className="text-brand-200 text-sm mt-1">
              Contact us today for a free consultation and custom quote.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/pricing" className="btn-gold text-sm py-2.5 px-5">
              Request a Quote
            </Link>
            <a
              href={`https://wa.me/${COMPANY.phone.replace(/\s+/g, "").replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white text-sm py-2.5 px-5"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 flex-shrink-0 bg-white rounded-xl overflow-hidden">
                <SafeImage
                  src="/Images/Logo.png"
                  alt="Omuringa Investment CC"
                  fill
                  className="object-contain p-0.5"
                  fallbackClassName="w-full h-full bg-brand-700 flex items-center justify-center"
/>
              </div>
              <div>
                <div className="font-bold text-white text-sm leading-tight">
                  Omuringa Investment CC
                </div>
                <div className="text-xs text-gold-400 leading-tight italic">
                  The eye of all trades
                </div>
              </div>
            </div>
            <p className="text-brand-300 text-sm leading-relaxed mb-4">
              {COMPANY.description}
            </p>
            <div className="space-y-2">
              <a
                href={`tel:${COMPANY.phone}`}
                className="flex items-center gap-2 text-brand-300 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2 text-brand-300 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                {COMPANY.email}
              </a>
              <div className="flex items-start gap-2 text-brand-300 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                {COMPANY.location}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Security Services</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s} className="text-brand-300 text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Training Academy */}
          <div>
            <h4 className="font-semibold text-white mb-4">Training Academy</h4>
            <p className="text-brand-300 text-sm mb-3">
              Omuringa Security Training Academy offers professional 3-week intensive security training with certification.
            </p>
            <div className="space-y-2 text-sm text-brand-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                {COMPANY.trainingLocation}
              </div>
              <a
                href={`tel:${COMPANY.phone}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                {COMPANY.phone}
              </a>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/academy" className="btn-primary text-sm py-2 text-center">
                Learn More
              </Link>
              <Link href="/register" className="btn-outline-white text-sm py-2 text-center">
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-brand-400">
          <p>
            &copy; {year} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

