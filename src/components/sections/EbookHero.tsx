import TextureSection from "../TextureSection";
import Ornament from "../Ornament";

interface EbookHeroProps {
  onOpenModal: () => void;
}

const EbookHero = ({ onOpenModal }: EbookHeroProps) => (
  <TextureSection
    texture="/textures/velvet-burgundy.jpg"
    overlay="rgba(31,21,48,0.88)"
    className="min-h-screen flex items-center justify-center overflow-hidden"
    id="ebook-hero"
  >
    <div className="container mx-auto px-5 sm:px-6 py-14 sm:py-16 md:py-24 lg:py-28">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 xl:gap-20 max-w-6xl mx-auto">

        {/* Left — Device Mockup with Floating Animation */}
        <div className="fade-item flex-shrink-0 w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] relative order-1">
          {/* Floating sparkle particles */}
          {[
            { top: "8%", left: "6%", delay: "0s", size: 4 },
            { top: "22%", right: "10%", delay: "0.8s", size: 3 },
            { top: "55%", left: "3%", delay: "1.6s", size: 5 },
            { top: "72%", right: "6%", delay: "2.4s", size: 3 },
            { top: "38%", left: "12%", delay: "0.4s", size: 4 },
            { top: "85%", right: "15%", delay: "1.2s", size: 3 },
          ].map((spark, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary animate-sparkle z-20 pointer-events-none"
              style={{
                top: spark.top,
                left: spark.left,
                right: spark.right,
                width: spark.size,
                height: spark.size,
                animationDelay: spark.delay,
              }}
            />
          ))}

          {/* Main glow behind devices */}
          <div className="absolute inset-0 animate-mockup-glow z-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(201,169,110,0.2) 0%, rgba(201,169,110,0.06) 45%, transparent 70%)",
              }}
            />
          </div>

          {/* Device container — tablet + phone */}
          <div className="relative z-10 flex items-end justify-center">
            {/* Tablet Frame */}
            <div className="animate-float-tablet relative">
              <div className="relative w-[180px] sm:w-[220px] md:w-[240px] lg:w-[260px] rounded-[14px] sm:rounded-[16px] bg-[#111] p-[5px] sm:p-[6px] shadow-[0_20px_70px_rgba(201,169,110,0.12),0_6px_24px_rgba(0,0,0,0.45)]">
                <div className="rounded-[10px] sm:rounded-[12px] overflow-hidden bg-[#2B1A3D]">
                  <img
                    src="/images/capa-ebook.jpeg"
                    alt="Tarô do Zero em 7 Dias - Tablet"
                    className="w-full h-auto block"
                    loading="eager"
                  />
                </div>
              </div>
              {/* Tablet reflection */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[65%] h-3 rounded-full bg-primary/8 blur-xl" />
            </div>

            {/* Phone Frame */}
            <div className="animate-float-phone relative -ml-6 sm:-ml-8 md:-ml-10 mb-4 sm:mb-6">
              <div className="relative w-[72px] sm:w-[88px] md:w-[96px] lg:w-[105px] rounded-[10px] sm:rounded-[14px] bg-[#111] p-[3px] sm:p-[4px] shadow-[0_16px_50px_rgba(201,169,110,0.18),0_4px_18px_rgba(0,0,0,0.5)]">
                {/* Notch */}
                <div className="absolute top-[4px] sm:top-[5px] left-1/2 -translate-x-1/2 w-[36%] h-[2px] sm:h-[3px] bg-[#111] rounded-full z-10" />
                <div className="rounded-[8px] sm:rounded-[11px] overflow-hidden bg-[#2B1A3D]">
                  <img
                    src="/images/capa-ebook.jpeg"
                    alt="Tarô do Zero em 7 Dias - Mobile"
                    className="w-full h-auto block"
                    loading="eager"
                  />
                </div>
              </div>
              {/* Phone reflection */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[55%] h-2 rounded-full bg-primary/8 blur-lg" />
            </div>
          </div>

          {/* Multi-device badge */}
          <div className="text-center mt-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-sm border border-primary/12 bg-white/[0.02]">
              <span className="text-primary text-[9px] sm:text-[10px]">✦</span>
              <span className="font-readable text-primary/60 text-[9px] sm:text-[10px] tracking-wider">
                Leia no celular, tablet ou computador
              </span>
              <span className="text-primary text-[9px] sm:text-[10px]">✦</span>
            </div>
          </div>
        </div>

        {/* Right — Copy */}
        <div className="flex-1 text-center lg:text-left max-w-xl order-2">
          <p className="fade-item font-cinzel text-primary/50 text-[0.6rem] sm:text-[0.65rem] tracking-[0.4em] uppercase mb-4 sm:mb-5">
            ✦ Velvet Oráculo ✦
          </p>

          <h1 className="fade-item font-editorial text-[1.65rem] sm:text-[2.25rem] md:text-5xl text-foreground leading-[1.08] mb-2 sm:mb-3">
            Tarô{" "}
            <em className="text-primary" style={{ fontStyle: "italic" }}>
              do Zero
            </em>
            <br />
            em 7 Dias
          </h1>

          <p className="fade-item font-italianno text-xl sm:text-2xl md:text-3xl text-primary/80 mb-4 sm:mb-5">
            Da primeira carta à leitura completa
          </p>

          <Ornament className="fade-item mb-5 sm:mb-6 lg:mx-0 mx-auto opacity-40" />

          <p className="fade-item font-readable text-foreground/60 text-[0.85rem] sm:text-[0.9rem] leading-[1.7] mb-5 sm:mb-6 tracking-[0.005em]">
            Um guia honesto para começar a ler as cartas com confiança
            e as primeiras perguntas certas para fazer ao oráculo.
            Sem decorar significados, sem misticismo vazio.
          </p>

          {/* Benefits */}
          <ul className="fade-item space-y-2 sm:space-y-2.5 mb-7 sm:mb-8">
            {[
              "Os 22 Arcanos Maiores explicados de forma simbólica e prática",
              "Como fazer sua primeira leitura de 3 cartas com confiança",
              "Exercícios diários para destravar sua intuição em 7 dias",
            ].map((benefit, i) => (
              <li key={i} className="flex items-start gap-2 sm:gap-2.5">
                <span className="text-primary text-[9px] sm:text-[10px] mt-[5px] sm:mt-1.5 flex-shrink-0">✦</span>
                <span className="font-readable text-foreground/65 text-[0.8rem] sm:text-[0.85rem] leading-[1.6]">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button — opens modal */}
          <div className="fade-item flex flex-col items-center lg:items-start gap-2.5">
            <button
              onClick={onOpenModal}
              className="inline-block font-cinzel tracking-[0.18em] sm:tracking-[0.22em] text-[0.68rem] sm:text-[0.75rem] font-bold px-7 sm:px-9 py-3 sm:py-3.5 bg-primary text-primary-foreground rounded-sm border border-primary/50 hover:bg-primary/90 hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(201,169,110,0.25)] transition-all duration-500 animate-cta-glow cursor-pointer uppercase"
            >
              Baixar Guia Gratuito
            </button>
            <span className="font-readable text-foreground/20 text-[10px] sm:text-[11px] tracking-[0.08em]">
              ✦ 100% gratuito · sem spam ✦
            </span>
          </div>
        </div>
      </div>
    </div>
  </TextureSection>
);

export default EbookHero;
