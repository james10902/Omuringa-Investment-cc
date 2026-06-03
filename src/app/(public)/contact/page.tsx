"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle } from "lucide-react";
import { COMPANY } from "@/lib/utils";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "CONTACT" }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-hero py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <span className="text-brand-300 font-semibold text-sm uppercase tracking-wider">Contact</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Contact Us</h1>
            <p className="text-brand-200 text-lg leading-relaxed">
              We&apos;re here to help. Reach out via phone, email, WhatsApp, or the form below.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Get In Touch</h2>

              <a href={`tel:${COMPANY.phone}`}
                className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-brand-200 hover:shadow-sm transition-all group">
                <div className="w-12 h-12 bg-brand-100 group-hover:bg-brand-200 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                  <Phone className="w-6 h-6 text-brand-700" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Phone / WhatsApp</div>
                  <div className="text-brand-700 font-medium mt-0.5">{COMPANY.phone}</div>
                  <div className="text-gray-500 text-xs mt-1">Tap to call</div>
                </div>
              </a>

              <a href={`mailto:${COMPANY.email}`}
                className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-brand-200 hover:shadow-sm transition-all group">
                <div className="w-12 h-12 bg-brand-100 group-hover:bg-brand-200 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                  <Mail className="w-6 h-6 text-brand-700" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Email</div>
                  <div className="text-brand-700 font-medium mt-0.5 break-all">{COMPANY.email}</div>
                  <div className="text-gray-500 text-xs mt-1">Tap to email</div>
                </div>
              </a>

              <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-brand-700" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Location</div>
                  <div className="text-gray-700 mt-0.5">{COMPANY.location}</div>
                </div>
              </div>

              <a
                href={`https://wa.me/${COMPANY.phone.replace(/\s+/g, "").replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-[#25D366] text-white rounded-xl hover:bg-[#1ebe5d] transition-colors font-semibold w-full"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>

              <div className="bg-brand-50 border border-brand-200 rounded-xl p-4">
                <h3 className="font-semibold text-brand-900 mb-2">Director</h3>
                <p className="text-brand-800 text-sm">{COMPANY.director}</p>
                <p className="text-brand-700 text-sm">{COMPANY.name}</p>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2 card p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Send Us a Message</h2>

              {status === "success" ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                  <p className="text-gray-600 mt-2">
                    Thank you for contacting us. We&apos;ll get back to you as soon as possible.
                  </p>
                  <button onClick={() => setStatus("idle")} className="btn-primary mt-6">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input type="text" className="form-input" placeholder="Your full name"
                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    </div>
                    <div>
                      <label className="form-label">Phone Number</label>
                      <input type="tel" className="form-input" placeholder="+264 ..."
                        value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Email Address *</label>
                    <input type="email" className="form-input" placeholder="your@email.com"
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label">Subject *</label>
                    <input type="text" className="form-input" placeholder="How can we help?"
                      value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label">Message *</label>
                    <textarea className="form-input min-h-[140px] resize-y" rows={5}
                      placeholder="Tell us more about your enquiry..."
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                  </div>
                  {status === "error" && (
                    <p className="text-red-600 text-sm">Something went wrong. Please try again or contact us directly.</p>
                  )}
                  <button type="submit" className="btn-primary w-full" disabled={status === "loading"}>
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
