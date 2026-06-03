import type { Metadata } from "next";
import { COMPANY } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | Omuringa Investment CC",
  description:
    "Terms of Use for Omuringa Investment CC — the rules and conditions governing use of our website and trainee portal.",
};

export default function TermsPage() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Terms of Use</h1>
          <p className="text-gray-500 text-sm">Last updated: January 2025</p>
          <p className="text-gray-600 mt-4 leading-relaxed">
            Please read these Terms of Use carefully before using the {COMPANY.name} website and
            trainee portal. By accessing or using our services, you agree to be bound by these
            terms.
          </p>
        </div>

        <div className="space-y-8 text-gray-700">
          {/* 1 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm">
              By accessing or using the {COMPANY.name} website and trainee portal (collectively,
              &ldquo;the Service&rdquo;), you confirm that you are at least 18 years of age, have
              read and understood these Terms of Use, and agree to be bound by them. If you do not
              agree to these terms, you must not use the Service.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Use of the Service</h2>
            <p className="mb-3 text-sm">You agree to use the Service only for lawful purposes. You must not:</p>
            <ul className="space-y-2 text-sm list-none">
              {[
                "Provide false, misleading, or fraudulent information in your application or account",
                "Attempt to gain unauthorised access to any part of the Service or its systems",
                "Upload malicious files, viruses, or harmful content",
                "Use the Service to harass, threaten, or harm any person",
                "Attempt to reverse-engineer, scrape, or copy any part of the Service",
                "Use another person's account or impersonate any individual or organisation",
                "Submit multiple applications under different accounts",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Account Registration</h2>
            <p className="text-sm mb-3">
              To access the trainee portal, you must register for an account. You agree to:
            </p>
            <ul className="space-y-2 text-sm list-none">
              {[
                "Provide accurate, current, and complete information during registration",
                "Maintain and promptly update your account information",
                "Keep your password confidential and not share it with others",
                "Notify us immediately of any unauthorised use of your account",
                "Accept responsibility for all activities that occur under your account",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-700 flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Training Applications</h2>
            <p className="text-sm mb-3">
              Submitting a training application does not guarantee acceptance into the programme.
              {COMPANY.academy} reserves the right to:
            </p>
            <ul className="space-y-2 text-sm list-none">
              {[
                "Accept or reject any application at its sole discretion",
                "Request additional information or documentation",
                "Cancel or postpone training programmes due to operational requirements",
                "Revoke an accepted application if false information is discovered",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-700 flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Uploaded Documents</h2>
            <p className="text-sm">
              By uploading documents to the portal, you confirm that you have the right to share
              those documents and that they are genuine and unaltered. You grant {COMPANY.name} the
              right to use these documents solely for the purpose of evaluating your training
              application. We will not share your documents with third parties without your consent,
              except as required by law.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Intellectual Property</h2>
            <p className="text-sm">
              All content on this website — including text, images, logos, graphics, and design — is
              the property of {COMPANY.name} and is protected by applicable intellectual property
              laws. You may not reproduce, distribute, modify, or create derivative works from any
              content without our prior written permission.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Disclaimer of Warranties</h2>
            <p className="text-sm">
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
              warranties of any kind, either express or implied. We do not warrant that the Service
              will be uninterrupted, error-free, or free of viruses or other harmful components. We
              reserve the right to modify, suspend, or discontinue the Service at any time without
              notice.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Limitation of Liability</h2>
            <p className="text-sm">
              To the fullest extent permitted by law, {COMPANY.name} shall not be liable for any
              indirect, incidental, special, or consequential damages arising from your use of or
              inability to use the Service, including but not limited to loss of data, loss of
              revenue, or loss of opportunity.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Account Termination</h2>
            <p className="text-sm">
              We reserve the right to suspend or terminate your account at any time if we believe
              you have violated these Terms of Use, provided false information, or engaged in
              conduct that is harmful to other users or to {COMPANY.name}. You may also request
              deletion of your account by contacting us.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Governing Law</h2>
            <p className="text-sm">
              These Terms of Use are governed by and construed in accordance with the laws of the
              Republic of Namibia. Any disputes arising from these terms shall be subject to the
              exclusive jurisdiction of the courts of Namibia.
            </p>
          </div>

          {/* 11 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Changes to These Terms</h2>
            <p className="text-sm">
              We may update these Terms of Use from time to time. Changes will be posted on this
              page with an updated date. Your continued use of the Service after any changes
              constitutes your acceptance of the revised terms.
            </p>
          </div>

          {/* 12 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">12. Contact Us</h2>
            <p className="text-sm mb-3">
              If you have any questions about these Terms of Use, please contact us:
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
                <a href={`tel:${COMPANY.phone}`} className="text-brand-700 hover:underline">
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
          <Link href="/privacy" className="text-brand-700 hover:underline font-medium">
            Privacy Policy
          </Link>
          <Link href="/contact" className="text-brand-700 hover:underline font-medium">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
