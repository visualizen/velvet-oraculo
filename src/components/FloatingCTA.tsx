import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Floating "INICIAR JORNADA" CTA button.
 * Appears after scrolling past the hero and disappears when the pricing section is in view.
 * Scrolls to the #preco section on click.
 * Tracks clicks to Supabase for basic analytics.
 */
const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const precoEl = document.getElementById("preco");

      // Show after scrolling past hero (~600px)
      if (scrollY < 600) {
        setVisible(false);
        return;
      }

      // Hide when pricing section is in viewport
      if (precoEl) {
        const rect = precoEl.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setVisible(false);
          return;
        }
      }

      setVisible(true);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    // Track click event (fire-and-forget)
    try {
      supabase.from("analytics_events").insert({
        event: "floating_cta_click",
        page: window.location.pathname,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      }).then(() => {});
    } catch {
      // Silent fail
    }

    const el = document.getElementById("preco");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Iniciar Jornada — ir para seção de preço"
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-50
        font-display tracking-[0.15em] text-sm sm:text-base font-bold
        px-8 sm:px-10 py-4 sm:py-5
        bg-primary text-primary-foreground rounded-full
        border border-primary/50
        shadow-[0_8px_32px_rgba(201,169,110,0.35),0_2px_8px_rgba(0,0,0,0.4)]
        hover:bg-primary/90 hover:shadow-[0_12px_40px_rgba(201,169,110,0.45)]
        transition-all duration-500 animate-cta-glow cursor-pointer
        whitespace-nowrap
        ${visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
        }
      `}
      style={{ transition: "opacity 0.4s ease, transform 0.4s ease" }}
    >
      ✦ INICIAR JORNADA ✦
    </button>
  );
};

export default FloatingCTA;
