import TextureSection from "../TextureSection";
import Ornament from "../Ornament";
import CTAButton from "../CTAButton";

const transformations = [
  "Ler qualquer carta com confiança, mesmo que nunca tenha visto antes",
  "Fazer leituras para si sem consultar livros ou apps",
  "Criar leituras personalizadas para qualquer situação da sua vida",
  "Usar o tarô como ferramenta real de autoconhecimento e tomada de decisão",
  "Cobrar por leituras, quando e se quiser, com ética e credibilidade",
];

const PromiseSection = () => (
  <TextureSection
    texture="/textures/cartas-fundo.jpeg"
    overlay="rgba(18,8,8,0.82)"
    className="py-20 md:py-28"
  >
    <div className="container mx-auto px-6 max-w-3xl text-center text-shadow-dark">
      <h2 className="fade-item font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-8 leading-tight">
        Aqui você não vai decorar cartas. Vai aprender a linguagem do tarô.
      </h2>
      <Ornament className="fade-item mb-8" />
      <p className="fade-item font-body text-foreground/90 text-lg md:text-xl leading-relaxed mb-12">
        Existe uma diferença fundamental entre conhecer os significados de uma carta e saber ler tarô. Neste curso, eu ensino a segunda coisa. Você vai aprender a olhar para qualquer carta de qualquer baralho e construir uma narrativa com começo, meio e fim, usando símbolo, intuição e estrutura.
      </p>

      <p className="fade-item font-editorial italic text-primary text-lg mb-8">
        Ao terminar o curso, você será capaz de:
      </p>

      <ul className="space-y-4 text-left max-w-xl mx-auto mb-12">
        {transformations.map((item, i) => (
          <li key={i} className="fade-item flex items-start gap-3 text-foreground text-lg font-body">
            <span className="text-primary mt-1 shrink-0">✦</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="fade-item">
        <CTAButton />
      </div>
    </div>
  </TextureSection>
);

export default PromiseSection;
