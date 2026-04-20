import TextureSection from "../TextureSection";
import Ornament from "../Ornament";

const IdentificationSection = () => (
  <TextureSection
    id="identificacao"
    texture="/textures/cream-paper.jpg"
    overlay="rgba(245,239,224,0.92)"
    className="py-20 md:py-28"
  >
    <div className="container mx-auto px-6 max-w-3xl text-center">
      <h2 className="fade-item font-cinzel text-2xl md:text-3xl lg:text-4xl text-flora-veludo mb-10 leading-tight">
        Você já sentiu que o tarô te chama, mas não sabe por onde começar?
      </h2>
      <Ornament className="fade-item mb-10 [&_span]:text-flora-borgonha" />
      <div className="fade-item space-y-6 text-flora-veludo/95 text-lg md:text-xl font-body leading-relaxed">
        <p>
          Você se interessa por espiritualidade de verdade. Não o tipo superficial que aparece em posts motivacionais, mas o tipo que aprofunda, que questiona, que transforma.
        </p>
        <p>
          Você tentou aprender tarô. Ou teve vontade. Mas então se deparou com listas intermináveis de significados para decorar, e a coisa toda pareceu impossível ou entediante demais.
        </p>
        <p className="italic">
          Ou pior: aprendeu de forma superficial, e hoje não confia na sua própria leitura. Fica dependendo de outras pessoas para interpretar o que você vê.
        </p>
        {/* Seed of curiosity (Sugarman) */}
        <p className="font-editorial italic text-flora-borgonha text-xl md:text-2xl mt-4">
          E se existisse uma forma de ler tarô que não dependesse de decorar nada?
        </p>
      </div>
      <Ornament className="fade-item mt-10 [&_span]:text-flora-borgonha" />
    </div>
  </TextureSection>
);

export default IdentificationSection;
