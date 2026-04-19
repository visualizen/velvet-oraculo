import TextureSection from "../TextureSection";
import Ornament from "../Ornament";
import CTAButton from "../CTAButton";

const HeroSection = () => (
  <TextureSection
    texture="/textures/dark-parchment.jpg"
    overlay="rgba(18,8,8,0.82)"
    className="min-h-screen flex items-center justify-center"
  >
    <div className="container mx-auto px-6 py-20 md:py-32 text-center max-w-4xl flex flex-col items-center text-shadow-dark">
      <p className="fade-item font-editorial italic text-primary text-sm md:text-base tracking-[0.3em] uppercase mb-6">
        Velvet Oráculo · Tarô Essencial e Simbólico
      </p>
      <Ornament className="fade-item mb-8" />
      <h1 className="fade-item font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8">
        Acesse o portal para se tornar mestre do seu próprio oráculo.
      </h1>
      <p className="fade-item font-editorial italic text-foreground/90 text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed">
        Aprenda a ler tarô de forma profunda, simbólica e intuitiva. Sem decorar significados, sem precisar de dom especial, sem misticismo vazio.
      </p>
      <p className="fade-item font-body text-foreground/80 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
        Para quem quer se conhecer e ler com autonomia.
      </p>
      <div className="fade-item">
        <CTAButton />
      </div>
      <Ornament className="fade-item mt-12 opacity-50" />
    </div>
  </TextureSection>
);

export default HeroSection;
