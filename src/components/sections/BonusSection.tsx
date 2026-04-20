import TextureSection from "../TextureSection";
import Ornament from "../Ornament";

const bonuses = [
  { icon: "📜", title: "7 Apostilas Completas (124 páginas)", desc: "Referência permanente cobrindo todos os módulos: simbologia, numerologia, naipes, tiragens, ética e meditações." },
  { icon: "🎬", title: "Aulas Bônus com Temas Escolhidos por Você", desc: "Aulas extras criadas com base no que a comunidade quer aprender. Você vota nos temas, e nós gravamos conteúdos sob medida para aprofundar o que mais importa pra você." },
  { icon: "🌙", title: "Comunidade Exclusiva", desc: "Acesso ao grupo fechado de pessoas que levam espiritualidade, autoconhecimento e estética a sério. Um espaço para praticar, compartilhar leituras e crescer junto." },
  { icon: "🗝️", title: "Ritual de Iniciação com o Baralho", desc: "Um guia completo para criar seu primeiro vínculo com o baralho: limpeza energética, ritual de apresentação e exercício de primeiro contato." },
];

const BonusSection = () => (
  <TextureSection
    texture="/textures/dark-parchment.jpg"
    overlay="rgba(18,8,8,0.82)"
    className="py-20 md:py-28"
  >
    <div className="container mx-auto px-6 max-w-5xl text-shadow-dark">
      <h2 className="fade-item font-display text-2xl md:text-3xl lg:text-4xl text-foreground text-center mb-4">
        Além do curso, você leva:
      </h2>
      <Ornament className="fade-item mb-12" />

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {bonuses.map((b, i) => (
          <div key={i} className="fade-item p-6 rounded-sm border border-primary/20 bg-background/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
            <div className="text-3xl mb-3">{b.icon}</div>
            <h3 className="font-editorial text-lg text-primary mb-2">{b.title}</h3>
            <p className="font-body text-foreground/90 text-base leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>

      <div className="fade-item text-center p-8 rounded-sm border-2 border-primary/40 bg-primary/5 backdrop-blur-sm">
        <p className="font-display text-base md:text-lg tracking-[0.2em] text-primary mb-3">🌟 BÔNUS ESPECIAL DE LANÇAMENTO</p>
        <p className="font-body text-foreground/90 text-lg">
          Quem se inscrever agora recebe acesso a conteúdos exclusivos e surpresas especiais preparadas com carinho.
        </p>
      </div>
    </div>
  </TextureSection>
);

export default BonusSection;
