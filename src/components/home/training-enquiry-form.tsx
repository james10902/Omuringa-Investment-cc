"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export function TrainingEnquiryForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
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
          _subject: "Training Enquiry – Omuringa Security Training Academy",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
        <h3 className="font-bold text-gray-900 text-lg">Enquiry Sent!</h3>
        <p className="text-gray-600 text-sm mt-1">
          We&apos;ll get back to you shortly about the training programme.
        </p>
        <button onClick={() => setStatus("idle")} className="btn-primary mt-4 text-sm py-2">
          Send Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            className="form-input"
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="form-label">Phone Number *</label>
          <input
            type="tel"
            className="form-input"
            placeholder="+264 ..."
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
        </div>
      </div>
      <div>
        <label className="form-label">Email Address *</label>
        <input
          type="email"
          className="form-input"
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="form-label">Your Enquiry *</label>
        <textarea
          className="form-input min-h-[100px] resize-y"
          rows={3}
          placeholder="Ask us anything about the training programme..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
      </div>
      {status === "error" && (
        <p className="text-red-600 text-sm">
          Something went wrong. Please try again or contact us directly.
        </p>
      )}
      <button
        type="submit"
        className="btn-primary w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
