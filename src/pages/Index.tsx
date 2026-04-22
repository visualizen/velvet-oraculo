import { useState } from "react";
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
import FloatingCTA from "@/components/FloatingCTA";
import CheckoutModal from "@/components/CheckoutModal";

const Index = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <IdentificationSection />
      <BioSection />
      <PromiseSection />
      <ModulesSection />
      <BonusSection />
      <TestimonialsSection />
      <PricingSection onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <FAQSection />
      <FinalCTASection />
      <FloatingCTA />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};

export default Index;
