import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { ServicesSection } from "@/components/home/services-section";
import { AboutSection } from "@/components/home/about-section";
import { AcademySection } from "@/components/home/academy-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ContactSection } from "@/components/home/contact-section";

export const metadata: Metadata = {
  title: "Omuringa Investment CC | Security & Business Services Namibia",
  description:
    "Professional security services, business support, and security training in Keetmanshoop, Namibia. Omuringa Investment CC — reliable, affordable, and client-focused.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AboutSection />
      <AcademySection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
