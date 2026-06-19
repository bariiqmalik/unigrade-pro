import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { GradeTableSection } from "@/components/landing/GradeTableSection";
import AdBanner from "@/components/AdBanner"; // Imported your AdBanner component
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schemas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UniGrade Pro — Student Grade Calculator",
  description:
    "Calculate GPA, CGPA, attendance percentage, exam scores and predict required marks. The #1 academic calculator for university students.",
};

export default function HomePage() {
  return (
    <>
      {/* FAQPage schema — primary GEO signal for student question queries */}
      <JsonLd schema={faqSchema} />
      {/* BreadcrumbList — establishes homepage as root entity for AI navigation */}
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://unigrade-pro.vercel.app" },
        ])}
      />

      <HeroSection />

      {/* 728x90 Advertisement Banner placed perfectly here */}
      <AdBanner />

      <FeaturesSection />
      <GradeTableSection />
    </>
  );
}