"use client";

import { useState } from "react";
import { Handshake, Shield, Users, CheckCircle } from "lucide-react";

const benefits = [
  { icon: Shield, title: "Trained Security Personnel", desc: "Access to professionally trained and certified security guards from our academy." },
  { icon: Users, title: "Continuous Support", desc: "Ongoing supervision, support, and performance monitoring of deployed guards." },
  { icon: Handshake, title: "Flexible Arrangements", desc: "Customised partnership agreements tailored to your organisation's needs." },
  { icon: CheckCircle, title: "Safety Assurance", desc: "Comprehensive safety and security partnership with accountability." },
];

export default function PartnershipsPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "PARTNERSHIP", subject: "Partnership Enquiry" }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", company: "", message: "" });
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
            <span className="text-brand-300 font-semibold text-sm uppercase tracking-wider">Partnerships</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Partner With Us</h1>
            <p className="text-brand-200 text-lg leading-relaxed">
              We partner with organisations that need trained security personnel, ongoing support,
              and a reliable security partner in Namibia.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Partner With Omuringa?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Omuringa Investment CC offers partnership opportunities for organisations that need
                reliable, trained security personnel. Through our Security Training Academy, we
                produce certified security professionals ready for deployment.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our partnership model includes continuous support, supervision, and performance
                monitoring to ensure the highest standards are maintained at your premises.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((b) => (
                  <div key={b.title} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <b.icon className="w-5 h-5 text-brand-700" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{b.title}</div>
                      <div className="text-gray-600 text-xs mt-0.5">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-brand-950 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold text-gold-400 mb-4">Partnership Includes</h3>
              <ul className="space-y-3">
                {[
                  "Trained and certified security guards",
                  "Flexible deployment arrangements",
                  "Regular performance reviews",
                  "Continuous training and development",
                  "24/7 management support",
                  "Incident reporting and documentation",
                  "Customised security protocols",
                  "Dedicated account management",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-brand-200 text-sm">
                    <CheckCircle className="w-4 h-4 text-brand-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership form */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Partnership Enquiry</h2>
            <p className="text-gray-600 mb-6">
              Interested in partnering with us? Fill in the form and we&apos;ll be in touch.
            </p>

            {status === "success" ? (
              <div className="text-center py-10">
                <Handshake className="w-16 h-16 text-brand-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Enquiry Received!</h3>
                <p className="text-gray-600 mt-2">
                  Thank you for your interest in partnering with us. We&apos;ll be in touch shortly.
                </p>
                <button onClick={() => setStatus("idle")} className="btn-primary mt-6">
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input type="text" className="form-input" placeholder="Your name"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label">Phone Number *</label>
                    <input type="tel" className="form-input" placeholder="+264 ..."
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <label className="form-label">Email Address *</label>
                  <input type="email" className="form-input" placeholder="your@email.com"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div>
                  <label className="form-label">Organisation / Company *</label>
                  <input type="text" className="form-input" placeholder="Your organisation name"
                    value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
                </div>
                <div>
                  <label className="form-label">Partnership Interest *</label>
                  <textarea className="form-input min-h-[120px] resize-y" rows={4}
                    placeholder="Describe your partnership interest and requirements..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                </div>
                {status === "error" && (
                  <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
                )}
                <button type="submit" className="btn-primary w-full" disabled={status === "loading"}>
                  {status === "loading" ? "Submitting..." : "Submit Partnership Enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
