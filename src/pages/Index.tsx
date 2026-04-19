import StickyNav from "@/components/StickyNav";
import HeroSection from "@/components/sections/HeroSection";
import IdentificationSection from "@/components/sections/IdentificationSection";
import PromiseSection from "@/components/sections/PromiseSection";
import ModulesSection from "@/components/sections/ModulesSection";
import BonusSection from "@/components/sections/BonusSection";
import BioSection from "@/components/sections/BioSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <StickyNav />
    <HeroSection />
    <IdentificationSection />
    <PromiseSection />
    <ModulesSection />
    <BonusSection />
    <BioSection />
    <TestimonialsSection />
    <PricingSection />
    <FAQSection />
    <FinalCTASection />
  </div>
);

export default Index;
