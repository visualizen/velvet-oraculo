import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

interface CTAButtonProps {
  text?: string;
  className?: string;
  /** If set, scrolls to this anchor instead of opening the checkout modal */
  scrollTo?: string;
  /** Custom click handler — overrides default behavior */
  onClick?: () => void;
}

const CTAButton = ({ text = "QUERO ENTRAR NO PORTAL", className = "", scrollTo, onClick }: CTAButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`inline-block font-cinzel tracking-[0.15em] text-sm md:text-base font-bold px-10 py-4 bg-primary text-primary-foreground rounded-sm border border-primary/50 hover:bg-primary/90 transition-all duration-300 animate-cta-glow [text-shadow:none] cursor-pointer ${className}`}
      >
        {text}
      </button>
      {!scrollTo && !onClick && (
        <CheckoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default CTAButton;
