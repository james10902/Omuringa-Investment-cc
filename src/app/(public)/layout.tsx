import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { COMPANY } from "@/lib/utils";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: COMPANY.name,
  description: COMPANY.description,
  url: process.env.NEXT_PUBLIC_APP_URL,
  telephone: COMPANY.phone,
  email: COMPANY.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tseigratse",
    addressLocality: "Keetmanshoop",
    addressCountry: "NA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -26.5833,
    longitude: 18.1333,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Security and Business Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Static Guarding" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Patrol Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Event Security" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Security Training" } },
    ],
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
