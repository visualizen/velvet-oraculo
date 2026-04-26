import TextureSection from "../TextureSection";
import Ornament from "../Ornament";
import CTAButton from "../CTAButton";

const FinalCTASection = () => (
  <TextureSection
    texture="/textures/portal-bg.jpg"
    overlay="rgba(5,2,8,0.45)"
    className="py-24 md:py-32"
  >
    <div className="container mx-auto px-6 max-w-2xl text-center text-shadow-dark">
      <Ornament className="fade-item mb-8 opacity-60" />

      <p className="fade-item font-italianno text-4xl md:text-5xl text-primary mb-8">
        O portal está aberto.
      </p>

      <p className="fade-item font-body text-foreground text-lg md:text-xl leading-relaxed mb-12">
        Se você travou no tarô até agora, não é uma falha sua. É uma falha do jeito como o tarô costuma ser ensinado. O tarô não é uma lista de significados. É uma linguagem de símbolos. E quando você aprende a língua, não precisa mais de dicionário.
      </p>

      <div className="fade-item mb-6">
        <CTAButton text="ENTRAR NO PORTAL AGORA" className="text-base md:text-lg px-12 py-5" />
      </div>

      {/* Price info */}
      <div className="fade-item space-y-1">
        <p className="font-body text-foreground/80 text-base">
          Valor completo <span className="line-through text-foreground/40 mr-1">R$3.211</span> → Lançamento: 12x de <span className="text-primary font-cinzel">R$37,75</span> ou R$365 à vista
        </p>
        <p className="font-body text-foreground/60 text-sm">
          Acesso imediato · Garantia de 7 dias · Preço de lançamento
        </p>
      </div>

      <Ornament className="fade-item mt-14 opacity-40" />
      <p className="fade-item font-cinzel text-xs tracking-[0.3em] text-primary/50 mt-8">
        ✦ Velvet Oráculo · Tarô Essencial e Simbólico ✦
      </p>
    </div>
  </TextureSection>
);

export default FinalCTASection;
