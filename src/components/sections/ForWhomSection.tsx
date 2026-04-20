import TextureSection from "../TextureSection";
import Ornament from "../Ornament";

const forYou = [
  "Você quer aprender tarô de forma profunda, sem precisar decorar listas",
  "Você já tentou estudar por conta e se frustrou com a quantidade de informação solta",
  "Você quer usar o tarô como ferramenta real de autoconhecimento",
  "Você sonha em cobrar por leituras, quando se sentir segura, com ética",
  "Você valoriza espiritualidade com profundidade, não misticismo vazio",
];

const notForYou = [
  "Você quer prever o futuro de outras pessoas",
  "Você quer decorar 78 cartas em 30 dias e começar a cobrar amanhã",
  "Você busca rituais de magia, amarrações ou trabalhos específicos",
  "Você não está disposta a praticar. O tarô se aprende fazendo",
];

const ForWhomSection = () => (
  <TextureSection
    texture="/textures/dark-parchment.jpg"
    overlay="rgba(18,8,8,0.82)"
    className="py-20 md:py-28"
  >
    <div className="container mx-auto px-6 max-w-3xl text-center text-shadow-dark">
      <h2 className="fade-item font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 leading-tight">
        Esse curso é para você?
      </h2>
      <Ornament className="fade-item mb-6" />
      <p className="fade-item font-editorial italic text-foreground/70 text-base md:text-lg mb-12 max-w-lg mx-auto">
        Ser honesta sobre isso importa. Esse curso funciona pra quem busca um tipo específico de relação com o tarô. Veja se é a sua.
      </p>

      <div className="grid md:grid-cols-2 gap-8 text-left">
        {/* For you */}
        <div className="fade-item">
          <p className="font-editorial italic text-primary text-sm md:text-base tracking-wider uppercase mb-5">
            ✦ Esse curso é para você se:
          </p>
          <ul className="space-y-3.5">
            {forYou.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 font-body text-foreground text-sm md:text-base leading-relaxed">
                <span className="text-primary shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not for you */}
        <div className="fade-item">
          <p className="font-editorial italic text-foreground/50 text-sm md:text-base tracking-wider uppercase mb-5">
            ✦ Esse curso não é para você se:
          </p>
          <ul className="space-y-3.5">
            {notForYou.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 font-body text-foreground/60 text-sm md:text-base leading-relaxed">
                <span className="text-foreground/30 shrink-0 mt-0.5">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </TextureSection>
);

export default ForWhomSection;
