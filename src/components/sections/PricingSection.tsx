import TextureSection from "../TextureSection";
import Ornament from "../Ornament";
import CTAButton from "../CTAButton";

const courseModules = [
  "8 Módulos: do zero à leitura autônoma",
  "Curso Arcanos Maiores (Jornada do Louco)",
  "Curso Arcanos Menores (Elementos e Naipes)",
  "Curso de Numerologia Aplicada ao Tarô",
  "Curso de Interpretação Simbólica",
  "Curso para Criar seu Método de Tiragem",
  "Módulo Bônus: Tarô & Cabala",
];

const materials = [
  "7 Apostilas (124 páginas de referência permanente)",
  "Aulas bônus com temas escolhidos pela comunidade",
];

const community = [
  "Comunidade exclusiva de estudantes",
  "Ritual de Iniciação com o Baralho",
];

const ORIGINAL_PRICE = 997;
const ACTUAL_PRICE = 365;
const INSTALLMENT_PRICE = "35,68";
const DISCOUNT_PERCENT = Math.round(((ORIGINAL_PRICE - ACTUAL_PRICE) / ORIGINAL_PRICE) * 100);

interface PricingSectionProps {
  onOpenCheckout?: () => void;
}

const ValueGroup = ({ title, items }: { title: string; items: string[] }) => (
  <div className="mb-6">
    <p className="font-editorial italic text-primary text-sm tracking-wider uppercase mb-3">
      {title}
    </p>
    {items.map((item, i) => (
      <div key={i} className="flex items-center gap-3 px-3 py-2 border-b border-primary/10">
        <span className="text-primary shrink-0">✦</span>
        <span className="font-body text-foreground text-base text-left">{item}</span>
      </div>
    ))}
  </div>
);

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
          ✦ Preço de lançamento ✦
        </p>
        <h2 className="fade-item font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-3 leading-tight">
          Sua jornada do básico ao avançado
        </h2>

        {/* Dream outcome (Hormozi) */}
        <p className="fade-item font-editorial italic text-foreground/80 text-base md:text-lg mb-3 max-w-lg mx-auto">
          Imagine abrir qualquer baralho, olhar para uma carta que nunca viu e saber exatamente o que ela está dizendo. Sem consultar livros. Sem depender de ninguém.
        </p>
        <p className="fade-item font-body text-foreground/60 text-sm mb-6">
          8 módulos · ~15 min por aula · no seu ritmo · acesso vitalício
        </p>
        <Ornament className="fade-item mb-8" />

        {/* Grouped value stack */}
        <div className="fade-item text-left mb-8">
          <ValueGroup title="Curso completo" items={courseModules} />
          <ValueGroup title="Materiais de apoio" items={materials} />
          <ValueGroup title="Comunidade" items={community} />
        </div>

        {/* Pricing block */}
        <div className="fade-item mb-8 relative">
          {/* Launch reason why (Kennedy) */}
          <div className="bg-primary/5 border border-primary/15 rounded-sm px-4 py-3 mb-6">
            <p className="font-body text-foreground/70 text-sm leading-relaxed">
              Este é o primeiro acesso público ao Velvet Oráculo. Quem entrar agora garante o preço de lançamento. Quando essa turma fechar, o valor volta ao original.
            </p>
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

          {/* Cost comparison (Hormozi Pricing) */}
          <div className="mt-5 pt-4 border-t border-primary/10">
            <p className="font-body text-foreground/55 text-sm leading-relaxed">
              Uma consulta avulsa de tarô custa em média R$200. Em duas consultas que você não vai mais precisar, o curso já se pagou.
            </p>
            <p className="font-editorial italic text-primary/80 text-sm mt-2">
              Menos de R$1 por dia durante um ano.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="fade-item mb-10">
          <CTAButton text="ENTRAR NO PORTAL AGORA" onClick={onOpenCheckout} />
        </div>

        {/* Garantia */}
        <div className="fade-item relative overflow-hidden rounded-md border-2 border-primary/30 backdrop-blur-md bg-[rgba(10,5,15,0.65)]">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          <div className="px-6 sm:px-10 py-8 sm:py-10">
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
            <p className="font-body text-foreground/65 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              Se dentro de 7 dias você sentir que o curso não é para você, por{" "}
              <em className="text-foreground/75">qualquer motivo</em>, devolvemos{" "}
              <strong className="text-primary/90">100% do seu investimento</strong>. Sem perguntas, sem burocracia. Você não tem nada a perder.
            </p>

            {/* Trust details */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 pt-5 border-t border-primary/10">
              <span className="font-body text-foreground/65 text-sm flex items-center gap-1.5">
                <span className="text-primary/60">✦</span> Devolução integral
              </span>
              <span className="font-body text-foreground/65 text-sm flex items-center gap-1.5">
                <span className="text-primary/60">✦</span> Sem perguntas
              </span>
              <span className="font-body text-foreground/65 text-sm flex items-center gap-1.5">
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
