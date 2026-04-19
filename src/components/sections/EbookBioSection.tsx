import TextureSection from "../TextureSection";
import Ornament from "../Ornament";

interface EbookBioSectionProps {
  onOpenModal: () => void;
}

const EbookBioSection = ({ onOpenModal }: EbookBioSectionProps) => (
  <TextureSection
    texture="/textures/velvet-burgundy.jpg"
    overlay="rgba(31,21,48,0.92)"
    className="py-14 sm:py-20 md:py-24"
    id="ebook-bio"
  >
    <div className="container mx-auto px-5 sm:px-6 max-w-3xl">
      {/* Section Header */}
      <p className="fade-item font-cinzel text-primary/40 text-[0.6rem] sm:text-[0.62rem] tracking-[0.4em] uppercase text-center mb-3">
        ✦ Sobre a Autora ✦
      </p>
      <h2 className="fade-item font-editorial italic text-xl sm:text-2xl md:text-[1.75rem] text-foreground text-center mb-3">
        Quem vai te guiar nessa jornada
      </h2>
      <Ornament className="fade-item mb-8 sm:mb-10 opacity-35" />

      {/* Photo + Bio Layout */}
      <div className="fade-item flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 md:gap-10">
        {/* Profile Photo — Portrait */}
        <div className="relative flex-shrink-0 group">
          {/* Gold frame */}
          <div className="absolute -inset-[5px] rounded-sm border border-primary/25 group-hover:border-primary/45 transition-colors duration-700" />
          {/* Outer subtle frame */}
          <div className="absolute -inset-2.5 rounded-sm border border-primary/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative w-32 h-44 sm:w-36 sm:h-52 md:w-44 md:h-[260px] rounded-sm overflow-hidden shadow-[0_4px_24px_rgba(201,169,110,0.08)]">
            <img
              src="/images/luisa-perfil.jpg"
              alt="Luísa, taróloga e autora"
              className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
            />
            {/* Subtle vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_24px_rgba(0,0,0,0.2)]" />
            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/45 to-transparent" />
            {/* Name on photo */}
            <div className="absolute bottom-2.5 left-0 right-0 text-center">
              <p className="font-cinzel text-[0.6rem] tracking-[0.25em] text-white/85 uppercase">Luísa</p>
              <p className="font-italianno text-base text-white/55">Taróloga</p>
            </div>
          </div>
        </div>

        {/* Bio Text */}
        <div className="space-y-3 sm:space-y-4 flex-1 text-center md:text-left">
          {/* Opening quote */}
          <blockquote className="font-editorial italic text-foreground/50 text-[0.9rem] sm:text-base leading-[1.65] border-l-2 border-primary/20 pl-4 md:pl-5 mb-1 text-left">
            "O tarô não entrou na minha vida como misticismo, mas como a primeira ferramenta que me fez perguntas que eu nunca tinha me feito."
          </blockquote>

          <p className="font-readable text-foreground/60 text-[0.82rem] sm:text-[0.875rem] leading-[1.75]">
            Me chamo Luísa, sou taróloga há mais de 7 anos. Minha relação com espiritualidade sempre foi intelectual.
            Eu queria entender o porquê das coisas, não apenas acreditar. O tarô foi o primeiro sistema que uniu profundidade, beleza e autonomia.
          </p>
          <p className="font-readable text-foreground/55 text-[0.82rem] sm:text-[0.875rem] leading-[1.75]">
            Eu criei este guia porque acredito que toda pessoa merece ter acesso à sua própria sabedoria interior,
            sem depender de ninguém para interpretá-la.
          </p>

          {/* Signature */}
          <div className="pt-3 border-t border-primary/8">
            <p className="font-script text-lg sm:text-xl text-primary/40">com carinho, Luísa</p>
          </div>
        </div>
      </div>

      {/* CTA — second chance */}
      <div className="fade-item flex flex-col items-center mt-10 sm:mt-14 gap-2">
        <button
          onClick={onOpenModal}
          className="inline-block font-cinzel tracking-[0.18em] sm:tracking-[0.22em] text-[0.68rem] sm:text-[0.72rem] font-bold px-7 sm:px-8 py-3 sm:py-3.5 bg-transparent text-primary border border-primary/30 rounded-sm hover:bg-primary/10 hover:border-primary/50 transition-all duration-500 cursor-pointer uppercase"
        >
          Baixar Guia Gratuito
        </button>
        <span className="font-readable text-foreground/15 text-[9px] tracking-[0.08em]">
          ✦ 100% gratuito ✦
        </span>
      </div>

      <Ornament className="fade-item mt-10 sm:mt-12 opacity-15" />

      {/* Footer */}
      <div className="fade-item flex items-center justify-center gap-3 mt-6">
        <div className="h-px w-8 bg-primary/8" />
        <p className="font-readable text-foreground/12 text-[9px] tracking-[0.2em] uppercase">
          Velvet Oráculo · 2026
        </p>
        <div className="h-px w-8 bg-primary/8" />
      </div>
    </div>
  </TextureSection>
);

export default EbookBioSection;
