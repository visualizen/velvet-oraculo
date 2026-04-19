import TextureSection from "../TextureSection";
import Ornament from "../Ornament";
import CTAButton from "../CTAButton";

const FinalCTASection = () => (
  <TextureSection
    texture="/textures/portal-bg.png"
    overlay="rgba(5,2,8,0.45)"
    className="py-24 md:py-32"
  >
    <div className="container mx-auto px-6 max-w-2xl text-center text-shadow-dark">
      <Ornament className="fade-item mb-8 opacity-60" />

      <p className="fade-item font-italianno text-4xl md:text-5xl text-primary mb-8">
        O portal está aberto.
      </p>

      <p className="fade-item font-body text-foreground text-lg md:text-xl leading-relaxed mb-12">
        Essa não é uma falha sua. É uma falha do jeito como o tarô costuma ser ensinado. O tarô não é uma lista de significados. É uma linguagem de símbolos. E quando você aprende a língua, não precisa mais de dicionário.
      </p>

      <div className="fade-item mb-6">
        <CTAButton text="ENTRAR NO PORTAL AGORA" className="text-base md:text-lg px-12 py-5" />
      </div>

      <p className="fade-item font-body text-foreground/60 text-sm">
        12x de R$35,68 · ou R$365 à vista · Acesso imediato · Garantia de 7 dias
      </p>

      <Ornament className="fade-item mt-14 opacity-40" />
      <p className="fade-item font-display text-xs tracking-[0.3em] text-primary/50 mt-8">
        ✦ Velvet Oráculo · Tarô Essencial e Simbólico ✦
      </p>
    </div>
  </TextureSection>
);

export default FinalCTASection;
