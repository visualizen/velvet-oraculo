import { useEffect, useRef, useState } from "react";
import TextureSection from "../TextureSection";
import Ornament from "../Ornament";
import CTAButton from "../CTAButton";

const valueStack = [
  { item: "8 Módulos Completos", value: "R$ 497" },
  { item: "Material de apoio (124 páginas)", value: "R$ 197" },
  { item: "Aulas Bônus", value: "R$ 297" },
  { item: "Comunidade Exclusiva", value: "R$ 197" },
  { item: "Curso Arcanos Maiores", value: "R$ 300" },
  { item: "Curso Arcanos Menores", value: "R$ 300" },
  { item: "Curso de Numerologia", value: "R$ 300" },
  { item: "Curso Interpretação Simbólica", value: "R$ 300" },
  { item: "Curso para Criar Método de Tiragem", value: "R$ 300" },
  { item: "Módulo Bônus: Tarô & Cabala", value: "R$ 97" },
];

const ORIGINAL_PRICE = 997;
const ACTUAL_PRICE = 365;
const INSTALLMENT_PRICE = "35,68";
const DISCOUNT_PERCENT = Math.round(((ORIGINAL_PRICE - ACTUAL_PRICE) / ORIGINAL_PRICE) * 100);

interface PricingSectionProps {
  onOpenCheckout?: () => void;
}

const PricingSection = ({ onOpenCheckout }: PricingSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  // Auto-open checkout modal 2s after user scrolls to this section
  useEffect(() => {
    if (!onOpenCheckout) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          const timer = setTimeout(() => {
            onOpenCheckout();
          }, 2000);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.3 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [onOpenCheckout, hasTriggered]);

  return (
    <TextureSection
      id="preco"
      texture="/textures/cartas-fundo.jpeg"
      overlay="rgba(18,8,8,0.82)"
      className="py-20 md:py-28"
    >
      <div ref={sectionRef} className="container mx-auto px-6 max-w-2xl text-center text-shadow-dark">
        {/* Discount badge */}
        <div className="fade-item flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/15 border border-red-400/25">
            <span className="text-red-400 text-sm font-bold font-display tracking-wider animate-pulse">
              🔥 {DISCOUNT_PERCENT}% OFF
            </span>
          </div>
        </div>

        <p className="fade-item font-editorial italic text-primary text-sm tracking-[0.3em] uppercase mb-4">
          Oferta especial de lançamento
        </p>
        <h2 className="fade-item font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-8">
          Tudo que está incluído
        </h2>
        <Ornament className="fade-item mb-8" />

        <div className="fade-item space-y-3 mb-8">
          {valueStack.map((v, i) => (
            <div key={i} className="flex justify-between items-center px-4 py-2 border-b border-primary/10">
              <span className="font-body text-foreground text-base text-left">{v.item}</span>
              <span className="font-body text-foreground/60 line-through text-sm">{v.value}</span>
            </div>
          ))}
        </div>

        {/* Pricing block with discount */}
        <div className="fade-item mb-6 relative">
          {/* Original price struck through */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="font-body text-foreground/40 text-sm line-through">Valor total: R$ 2.785</span>
          </div>

          <p className="font-editorial italic text-primary text-lg mb-3">Por apenas</p>

          {/* Original price with strikethrough */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="font-display text-foreground/35 text-2xl line-through decoration-red-400/60 decoration-2">
              R$ {ORIGINAL_PRICE}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm bg-red-500/20 border border-red-400/30 text-red-400 font-display text-xs tracking-wider font-bold">
              -{DISCOUNT_PERCENT}%
            </span>
          </div>

          {/* Actual price */}
          <p className="font-display text-foreground/60 text-2xl tracking-wide mb-1">12x de</p>
          <p className="font-display text-5xl md:text-6xl text-primary font-bold">R$ {INSTALLMENT_PRICE}</p>
          <p className="font-body text-foreground/60 text-base mt-3">ou R$ {ACTUAL_PRICE} à vista</p>
        </div>

        <div className="fade-item mb-8">
          <CTAButton text="ENTRAR NO PORTAL AGORA" onClick={onOpenCheckout} />
        </div>

        <div className="fade-item p-4 rounded-sm border border-primary/20 bg-primary/5">
          <p className="font-editorial italic text-primary text-sm">🛡️ Garantia incondicional de 7 dias</p>
          <p className="font-body text-foreground/70 text-sm mt-1">
            Se por qualquer motivo você sentir que o curso não é para você, devolvemos 100% do seu investimento.
          </p>
        </div>
      </div>
    </TextureSection>
  );
};

export default PricingSection;
