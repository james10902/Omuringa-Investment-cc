"use client";

import { useState } from "react";
import { CheckCircle, DollarSign } from "lucide-react";

const services = [
  "Static Guarding",
  "Access Control & Gate Security",
  "Patrol Services",
  "Event Security Management",
  "CCTV Monitoring",
  "Security Guard Training",
  "Graphic Design & Printing",
  "Events, Deco & Catering",
  "Accounting Services",
  "Construction",
  "Business Registration",
  "Other / Multiple Services",
];

const factors = [
  { icon: "👥", title: "Number of Guards", desc: "The number of security personnel required affects pricing." },
  { icon: "🕐", title: "Working Hours", desc: "Day shifts, night shifts, or 24-hour coverage have different rates." },
  { icon: "🛡️", title: "Type of Service", desc: "Static guarding, patrol, event security, and other services are priced differently." },
  { icon: "📅", title: "Service Duration", desc: "Short-term, monthly, or long-term contracts offer different pricing structures." },
];

export default function PricingPage() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", company: "",
    service: "", description: "", preferredContact: "phone",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
      if (!formId) {
        setStatus("error");
        return;
      }
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          _subject: `Quote Request: ${form.service}`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", email: "", company: "", service: "", description: "", preferredContact: "phone" });
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
            <span className="text-brand-300 font-semibold text-sm uppercase tracking-wider">Pricing</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Request a Quote</h1>
            <p className="text-brand-200 text-lg leading-relaxed">
              Our pricing is flexible and tailored to your specific needs. Fill in the form below
              and we&apos;ll get back to you with a custom quote.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing factors */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">How We Price Our Services</h2>
            <p className="text-gray-600 mt-2">Pricing depends on several factors to ensure you get the best value.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {factors.map((f) => (
              <div key={f.title} className="card p-5 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 flex items-start gap-4 max-w-3xl mx-auto">
            <DollarSign className="w-6 h-6 text-brand-700 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-brand-900 mb-1">Flexible & Affordable Pricing</h3>
              <p className="text-brand-800 text-sm">
                We believe in transparent, fair pricing. Every quote is customised to your specific
                requirements. Contact us to discuss your needs and we&apos;ll provide a competitive quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request a Custom Quote</h2>
            <p className="text-gray-600 mb-6">Fill in the form below and we&apos;ll respond within 24 hours.</p>

            {status === "success" ? (
              <div className="text-center py-10">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Quote Request Received!</h3>
                <p className="text-gray-600 mt-2">
                  Thank you for your enquiry. We&apos;ll review your requirements and get back to you within 24 hours.
                </p>
                <button onClick={() => setStatus("idle")} className="btn-primary mt-6">
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input type="text" className="form-input" placeholder="Your full name"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label">Phone Number *</label>
                    <input type="tel" className="form-input" placeholder="+264 ..."
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Email Address *</label>
                    <input type="email" className="form-input" placeholder="your@email.com"
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label">Organisation / Company</label>
                    <input type="text" className="form-input" placeholder="Your company name"
                      value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="form-label">Service Required *</label>
                  <select className="form-input" value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })} required>
                    <option value="">Select a service...</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Project / Service Description *</label>
                  <textarea className="form-input min-h-[120px] resize-y" rows={4}
                    placeholder="Describe your requirements — number of guards, hours, location, duration, etc."
                    value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                </div>
                <div>
                  <label className="form-label">Preferred Contact Method *</label>
                  <div className="flex gap-4">
                    {["phone", "email", "whatsapp"].map((method) => (
                      <label key={method} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="preferredContact" value={method}
                          checked={form.preferredContact === method}
                          onChange={(e) => setForm({ ...form, preferredContact: e.target.value })}
                          className="text-brand-700" />
                        <span className="text-sm text-gray-700 capitalize">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {status === "error" && (
                  <p className="text-red-600 text-sm">Something went wrong. Please try again or contact us directly.</p>
                )}
                <button type="submit" className="btn-primary w-full" disabled={status === "loading"}>
                  {status === "loading" ? "Submitting..." : "Submit Quote Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
