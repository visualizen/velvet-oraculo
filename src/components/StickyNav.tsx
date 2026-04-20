import { useState, useEffect } from "react";
import CheckoutModal from "./CheckoutModal";

const StickyNav = () => {
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-primary/10 transition-all duration-300">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <span className="font-display text-sm tracking-[0.2em] text-primary">VELVET ORÁCULO</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="font-display text-sm tracking-[0.15em] px-6 py-2.5 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors animate-cta-glow cursor-pointer"
          >
            QUERO ENTRAR
          </button>
        </div>
      </nav>
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default StickyNav;
