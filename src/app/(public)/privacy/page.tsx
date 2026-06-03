import type { Metadata } from "next";
import { COMPANY } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Omuringa Investment CC",
  description:
    "Privacy Policy for Omuringa Investment CC — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: January 2025</p>
          <p className="text-gray-600 mt-4 leading-relaxed">
            {COMPANY.name} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your
            privacy. This policy explains how we collect, use, store, and protect your personal
            information when you use our website and trainee portal.
          </p>
        </div>

        <div className="space-y-8 text-gray-700">
          {/* 1 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p className="mb-3">We collect information in the following ways:</p>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Account Registration</h3>
                <p className="text-sm">
                  When you create an account, we collect your full name, email address, phone number,
                  and a securely hashed password.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Training Application</h3>
                <p className="text-sm">
                  When you submit a training application, we collect personal details including your
                  date of birth, gender, nationality, ID number, address, educational background,
                  motivation statement, and preferred start date.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Uploaded Documents</h3>
                <p className="text-sm">
                  We collect documents you upload, including your CV, certified copy of ID, school
                  leaving certificate, certificate of conduct, and any supporting documents.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Contact Forms</h3>
                <p className="text-sm">
                  When you submit a contact, quote request, partnership, or training enquiry form,
                  we collect your name, email, phone number, company name (if applicable), and
                  message.
                </p>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <ul className="space-y-2 text-sm list-none">
              {[
                "To process and review your training application",
                "To communicate with you about your application status and updates",
                "To send you notifications about important changes to your account",
                "To respond to your enquiries, quote requests, and contact form submissions",
                "To send password reset emails when requested",
                "To maintain the security and integrity of our platform",
                "To comply with legal and regulatory obligations",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-700 flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm font-medium text-gray-900">
              We do not sell, rent, or share your personal information with third parties for
              marketing purposes.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Document Security</h2>
            <p className="mb-3 text-sm">
              Uploaded documents are stored on our secure server and are only accessible to
              authorised administrators reviewing your application. Documents are not publicly
              accessible and are not indexed by search engines.
            </p>
            <p className="text-sm">
              We implement appropriate technical and organisational measures to protect your
              documents against unauthorised access, loss, or disclosure.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Password and Account Security</h2>
            <p className="text-sm">
              Your password is hashed using bcrypt with 12 rounds and is never stored in plain text.
              We use HTTP-only session cookies to maintain your login session, which are not
              accessible via JavaScript. Session tokens expire after 7 days of inactivity.
              Password reset tokens expire after 1 hour and can only be used once.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Cookies</h2>
            <p className="text-sm">
              We use a single HTTP-only session cookie (<code className="bg-gray-100 px-1 rounded text-xs">session_token</code>)
              to keep you logged in. This cookie is essential for the portal to function and does not
              track you across other websites. We do not use advertising or analytics cookies.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data Retention</h2>
            <p className="text-sm">
              We retain your personal data for as long as your account is active or as needed to
              provide our services. Application data and uploaded documents are retained for the
              duration of the application process and for a reasonable period thereafter for
              administrative and legal purposes. You may request deletion of your account and
              associated data by contacting us directly.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Your Rights</h2>
            <p className="mb-3 text-sm">You have the right to:</p>
            <ul className="space-y-2 text-sm list-none">
              {[
                "Access the personal information we hold about you",
                "Request correction of inaccurate or incomplete information",
                "Request deletion of your personal data (subject to legal obligations)",
                "Withdraw consent where processing is based on consent",
                "Lodge a complaint with the relevant data protection authority",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-700 flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Third-Party Services</h2>
            <p className="text-sm">
              We use Gmail SMTP (Google) to send transactional emails such as registration
              confirmations, application status updates, and password reset links. These emails are
              sent on our behalf and your email address is used solely for this purpose.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Changes to This Policy</h2>
            <p className="text-sm">
              We may update this Privacy Policy from time to time. Any changes will be posted on
              this page with an updated date. We encourage you to review this policy periodically.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact Us</h2>
            <p className="text-sm mb-3">
              For any privacy-related questions, requests, or concerns, please contact us:
            </p>
            <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 space-y-2 text-sm">
              <div>
                <span className="font-semibold text-gray-900">{COMPANY.name}</span>
              </div>
              <div>
                <span className="text-gray-500">Director: </span>
                <span className="text-gray-900">{COMPANY.director}</span>
              </div>
              <div>
                <span className="text-gray-500">Email: </span>
                <a href={`mailto:${COMPANY.email}`} className="text-brand-700 hover:underline">
                  {COMPANY.email}
                </a>
              </div>
              <div>
                <span className="text-gray-500">Phone: </span>
                <a href={`tel:${COMPANY.phoneRaw}`} className="text-brand-700 hover:underline">
                  {COMPANY.phone}
                </a>
              </div>
              <div>
                <span className="text-gray-500">Location: </span>
                <span className="text-gray-900">{COMPANY.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap gap-4 text-sm">
          <Link href="/terms" className="text-brand-700 hover:underline font-medium">
            Terms of Use
          </Link>
          <Link href="/contact" className="text-brand-700 hover:underline font-medium">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
