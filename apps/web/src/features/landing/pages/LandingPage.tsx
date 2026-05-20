import { LandingNavbar } from "../components/LandingNavbar";
import { HeroSection } from "../components/HeroSection";
import { TrustedBar } from "../components/TrustedBar";
import { CloudSoftwareSection } from "../components/CloudSoftwareSection";
import { WhatIsSection } from "../components/WhatIsSection";
import { PhysicalClassroomSection } from "../components/PhysicalClassroomSection";
import { FeaturesHeader } from "../components/FeaturesHeader";
import { ClassroomUiSection } from "../components/ClassroomUiSection";
import { ToolsForTeachersSection } from "../components/ToolsForTeachersSection";
import { QuizzesSection } from "../components/QuizzesSection";
import { ClassManagementSection } from "../components/ClassManagementSection";
import { FeatureSplit } from "../components/FeatureSplit";
import { IntegrationsSection } from "../components/IntegrationsSection";
import { TestimonialSection } from "../components/TestimonialSection";
import { NewsSection } from "../components/NewsSection";
import { LandingFooter } from "../components/LandingFooter";
import { landingContent } from "../data/content";

/**
 * Public marketing page composed of section components.
 * Sections are ordered to match the reference design 1:1.
 */
export default function LandingPage() {
  const { oneOnOne } = landingContent;

  return (
    <div className="min-h-screen bg-white font-sans text-ink-900">
      <LandingNavbar />
      <main>
        <HeroSection />
        <TrustedBar />
        <CloudSoftwareSection />
        <WhatIsSection />
        <PhysicalClassroomSection />
        <FeaturesHeader />
        <ClassroomUiSection />
        <ToolsForTeachersSection />
        <QuizzesSection />
        <ClassManagementSection />
        <FeatureSplit
          title={oneOnOne.title}
          body={oneOnOne.body}
          image={oneOnOne.image}
          imageAlt={oneOnOne.imageAlt}
        />
        <IntegrationsSection />
        <TestimonialSection />
        <NewsSection />
      </main>
      <LandingFooter />
    </div>
  );
}
