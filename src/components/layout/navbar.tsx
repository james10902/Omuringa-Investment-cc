"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, Shield } from "lucide-react";
import Image from "next/image";
import { SafeImage } from "@/components/ui/safe-image";
import { cn, COMPANY } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/academy", label: "Training Academy" },
  { href: "/pricing", label: "Get a Quote" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top contact bar */}
      <div className="bg-brand-950 text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${COMPANY.phone}`}
              className="flex items-center gap-1.5 hover:text-brand-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {COMPANY.phone}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-1.5 hover:text-brand-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              {COMPANY.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-brand-300 transition-colors">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-brand-700 hover:bg-brand-600 px-3 py-1 rounded text-white transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white shadow-md border-b border-gray-100"
            : "bg-white shadow-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex-shrink-0 rounded-xl overflow-hidden ring-1 ring-brand-200 group-hover:ring-brand-400 transition-all">
                <SafeImage
                  src="/Images/Logo.png"
                  alt="Omuringa Investment CC"
                  fill
                  className="object-contain"
                  priority
                  fallbackClassName="w-full h-full bg-brand-700 flex items-center justify-center"
                  fallbackContent={<Shield className="w-5 h-5 text-white" />}
                />
              </div>
              <div>
                <div className="font-bold text-brand-900 text-sm leading-tight">
                  Omuringa Investment CC
                </div>
                <div className="text-xs text-brand-600 leading-tight hidden sm:block">
                  The eye of all trades
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-brand-50 text-brand-800"
                      : "text-gray-700 hover:bg-gray-50 hover:text-brand-700"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-brand-700 transition-colors">
                Login
              </Link>
              <Link href="/register" className="btn-primary text-sm py-2 px-4">
                Register
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-brand-50 text-brand-800"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-brand-700 font-medium"
                >
                  <Phone className="w-4 h-4" />
                  {COMPANY.phone}
                </a>
                <Link href="/login" className="btn-secondary text-sm py-2 text-center">
                  Login
                </Link>
                <Link href="/register" className="btn-primary text-sm py-2 text-center">
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
