import TextureSection from "../TextureSection";
import Ornament from "../Ornament";
import CTAButton from "../CTAButton";

const courseItems = [
  { name: "Módulo 1 — O que é o Tarô", value: 197 },
  { name: "Módulo 2 — Arcanos Maiores: Jornada da Alma", value: 397 },
  { name: "Módulo 3 — Numerologia do Tarô", value: 197 },
  { name: "Módulo 4 — Arcanos Menores (Elementos e Naipes)", value: 297 },
  { name: "Módulo 5 — Simbologia do Tarô", value: 297 },
  { name: "Módulo 6 — Tiragens na Prática", value: 197 },
  { name: "Módulo 7 — Ética e Leitura Responsável", value: 197 },
  { name: "Módulo Bônus — Tarô & Cabala", value: 297 },
];

const bonusItems = [
  { name: "7 Apostilas Completas (124 páginas)", value: 197 },
  { name: "4 Masterclasses Avançadas", value: 297 },
  { name: "Ritual de Iniciação com o Baralho", value: 97 },
  { name: "Aula Aberta: A Jornada do Louco", value: 147 },
];

const communityItems = [
  { name: "Comunidade exclusiva (acesso vitalício)", value: 197 },
];

const STACK_TOTAL = 3211;
const ACTUAL_PRICE = 365;
const INSTALLMENT_PRICE = "37,75";

interface PricingSectionProps {
  onOpenCheckout?: () => void;
}

const ValueRow = ({ name, value }: { name: string; value: number }) => (
  <div className="flex items-center justify-between gap-3 px-3 py-2.5 border-b border-primary/8">
    <div className="flex items-center gap-2.5 min-w-0">
      <span className="text-primary shrink-0 text-xs">✦</span>
      <span className="font-body text-foreground text-sm md:text-base text-left leading-snug">{name}</span>
    </div>
    <span className="font-cinzel text-foreground/40 text-xs md:text-sm shrink-0 line-through">R$ {value}</span>
  </div>
);

const GroupLabel = ({ title }: { title: string }) => (
  <p className="font-editorial italic text-primary text-sm tracking-wider uppercase mb-2 mt-6 first:mt-0">
    {title}
  </p>
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
          ✦ Preço de lançamento — primeira turma ✦
        </p>
        <h2 className="fade-item font-cinzel text-2xl md:text-3xl lg:text-4xl text-foreground mb-3 leading-tight">
          Sua jornada do básico ao avançado
        </h2>

        {/* Dream outcome (Hormozi) */}
        <p className="fade-item font-editorial italic text-foreground/80 text-base md:text-lg mb-3 max-w-lg mx-auto">
          Imagine abrir qualquer baralho, olhar para uma carta que você nunca viu e saber exatamente o que ela está dizendo. Sem consultar livros. Sem depender de ninguém. Com autoridade própria, até para tomar as decisões mais importantes da sua vida.
        </p>
        <p className="fade-item font-body text-foreground/60 text-sm mb-6">
          8 módulos · no seu ritmo · acesso vitalício
        </p>
        <Ornament className="fade-item mb-8" />

        {/* Value stack with prices */}
        <div className="fade-item text-left mb-8">
          <p className="font-cinzel text-foreground/50 text-sm tracking-[0.2em] uppercase mb-4 text-center">
            📦 Tudo o que está incluso
          </p>

          <GroupLabel title="Curso completo" />
          {courseItems.map((item, i) => <ValueRow key={i} {...item} />)}

          <GroupLabel title="Materiais e bônus" />
          {bonusItems.map((item, i) => <ValueRow key={i} {...item} />)}

          <GroupLabel title="Comunidade" />
          {communityItems.map((item, i) => <ValueRow key={i} {...item} />)}

          {/* Total */}
          <div className="flex items-center justify-between gap-4 px-3 py-3 mt-4 border-t-2 border-primary/25">
            <span className="font-cinzel text-foreground text-base tracking-wider">VALOR TOTAL</span>
            <span className="font-cinzel text-foreground/50 text-lg line-through decoration-red-400/40">
              R$ {STACK_TOTAL.toLocaleString("pt-BR")}
            </span>
          </div>
        </div>

        {/* Pricing block */}
        <div className="fade-item mb-8 relative">
          {/* Launch reason why (Kennedy) */}
          <div className="bg-primary/5 border border-primary/15 rounded-sm px-4 py-3 mb-6">
            <p className="font-body text-foreground/70 text-sm leading-relaxed">
              Este é o primeiro acesso público ao Velvet Oráculo. Por isso, quem entra agora garante o preço de lançamento, muito abaixo do valor completo do conteúdo. Quando essa primeira turma fechar, o preço sobe. Sem pegadinha, sem falso gatilho.
            </p>
          </div>

          <p className="font-editorial italic text-foreground/60 text-base mb-1">Você investe hoje:</p>

          {/* Actual price */}
          <p className="font-cinzel text-foreground/60 text-2xl tracking-wide mb-1">12x de</p>
          <p className="font-cinzel text-5xl md:text-6xl text-primary font-bold">R$ {INSTALLMENT_PRICE}</p>
          <p className="font-body text-foreground/60 text-base mt-3">ou R$ {ACTUAL_PRICE} à vista</p>

          {/* Cost comparison */}
          <div className="mt-5 pt-4 border-t border-primary/10">
            <p className="font-body text-foreground/55 text-sm leading-relaxed">
              Uma consulta avulsa de tarô custa em média R$200. Em duas consultas que você não vai mais precisar fazer, o curso já se pagou.
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

            <h3 className="font-cinzel text-lg sm:text-xl text-primary mb-2 tracking-wider">
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
