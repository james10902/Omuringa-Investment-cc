"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react";
import { COMPANY } from "@/lib/utils";

export function ContactSection() {
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
    <section className="py-24 bg-brand-950 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-gold-400 font-bold text-xs uppercase tracking-widest mb-3 bg-white/10 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Contact Us</h2>
          <p className="text-brand-300 max-w-xl mx-auto">
            We&apos;re here to help. Reach out for a quote, enquiry, or any information about our services.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info — 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            <a href={`tel:${COMPANY.phone}`}
              className="flex items-center gap-4 p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl transition-all group">
              <div className="w-12 h-12 bg-brand-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Phone / WhatsApp</div>
                <div className="text-gold-400 font-medium mt-0.5">{COMPANY.phone}</div>
                <div className="text-brand-400 text-xs mt-0.5">Tap to call</div>
              </div>
            </a>

            <a href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-4 p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl transition-all group">
              <div className="w-12 h-12 bg-brand-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Email</div>
                <div className="text-gold-400 font-medium mt-0.5 break-all text-sm">{COMPANY.email}</div>
                <div className="text-brand-400 text-xs mt-0.5">Tap to email</div>
              </div>
            </a>

            <div className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
              <div className="w-12 h-12 bg-brand-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Location</div>
                <div className="text-brand-300 mt-0.5 text-sm">{COMPANY.location}</div>
              </div>
            </div>

            <a
              href={`https://wa.me/${COMPANY.phone.replace(/\s+/g, "").replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-2xl transition-colors font-bold shadow-lg shadow-green-900/30"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact form — 3 cols */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-2xl">
            <h3 className="font-extrabold text-gray-900 text-xl mb-6">Send Us a Message</h3>

            {status === "success" ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg">Message Sent!</h4>
                <p className="text-gray-500 mt-2 text-sm">Thank you for contacting us. We&apos;ll get back to you shortly.</p>
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
                  <textarea className="form-input min-h-[110px] resize-y" rows={4}
                    placeholder="Tell us more about your enquiry..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                </div>
                {status === "error" && (
                  <p className="text-red-600 text-sm">Something went wrong. Please try again or contact us directly.</p>
                )}
                <button type="submit" className="btn-primary w-full py-3.5" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
