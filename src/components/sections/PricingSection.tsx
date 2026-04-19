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
  return (
    <TextureSection
      id="preco"
      texture="/textures/cartas-fundo.jpeg"
      overlay="rgba(18,8,8,0.82)"
      className="py-20 md:py-28"
    >
      <div className="container mx-auto px-6 max-w-2xl text-center text-shadow-dark">

        {/* Section title */}
        <p className="fade-item font-editorial italic text-primary text-sm tracking-[0.3em] uppercase mb-4">
          ✦ Oferta especial de lançamento ✦
        </p>
        <h2 className="fade-item font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-3 leading-tight">
          Sua jornada do básico ao avançado
        </h2>
        <p className="fade-item font-editorial italic text-foreground/60 text-base md:text-lg mb-6">
          Tudo que está incluído no portal
        </p>
        <Ornament className="fade-item mb-8" />

        {/* Value stack */}
        <div className="fade-item space-y-3 mb-10">
          {valueStack.map((v, i) => (
            <div key={i} className="flex justify-between items-center px-4 py-2 border-b border-primary/10">
              <span className="font-body text-foreground text-base text-left">{v.item}</span>
              <span className="font-body text-foreground/60 line-through text-sm">{v.value}</span>
            </div>
          ))}
        </div>

        {/* Pricing block with discount */}
        <div className="fade-item mb-8 relative">
          {/* Total value struck through */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="font-body text-foreground/40 text-sm line-through">Valor total: R$ 2.785</span>
          </div>

          <p className="font-editorial italic text-primary text-lg mb-3">Por apenas</p>

          {/* Original price with strikethrough + discount badge */}
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

        {/* CTA */}
        <div className="fade-item mb-10">
          <CTAButton text="ENTRAR NO PORTAL AGORA" onClick={onOpenCheckout} />
        </div>

        {/* ═══════════════════════════════════════════════════════════
            GARANTIA DE 7 DIAS — Bloco grande, visível, com confiança
           ═══════════════════════════════════════════════════════════ */}
        <div className="fade-item relative overflow-hidden rounded-md border-2 border-primary/30 backdrop-blur-md bg-[rgba(10,5,15,0.65)]">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          <div className="px-6 sm:px-10 py-8 sm:py-10">
            {/* Shield icon */}
            <div className="flex justify-center mb-4">
              <div
                className="w-16 h-16 rounded-full border-2 border-primary/40 flex items-center justify-center"
                style={{
                  background: "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)",
                }}
              >
                <span className="text-3xl">🛡️</span>
              </div>
            </div>

            <h3 className="font-display text-lg sm:text-xl text-primary mb-2 tracking-wider">
              GARANTIA TOTAL DE 7 DIAS
            </h3>
            <Ornament className="mb-4 opacity-40" />
            <p className="font-editorial italic text-foreground/80 text-base sm:text-lg leading-relaxed mb-3 max-w-md mx-auto">
              Risco zero para você começar.
            </p>
            <p className="font-body text-foreground/60 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              Se dentro de 7 dias você sentir que o curso não é para você — por{" "}
              <em className="text-foreground/75">qualquer motivo</em> — devolvemos{" "}
              <strong className="text-primary/90">100% do seu investimento</strong>. Sem perguntas, sem burocracia. Você não tem nada a perder.
            </p>

            {/* Trust details */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 pt-5 border-t border-primary/10">
              <span className="font-body text-foreground/45 text-xs sm:text-sm flex items-center gap-1.5">
                <span className="text-primary/60">✦</span> Devolução integral
              </span>
              <span className="font-body text-foreground/45 text-xs sm:text-sm flex items-center gap-1.5">
                <span className="text-primary/60">✦</span> Sem perguntas
              </span>
              <span className="font-body text-foreground/45 text-xs sm:text-sm flex items-center gap-1.5">
                <span className="text-primary/60">✦</span> Pagamento seguro via Kiwify
              </span>
            </div>
          </div>
        </div>
      </div>
    </TextureSection>
  );
};

export default PricingSection;
