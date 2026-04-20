import TextureSection from "../TextureSection";
import Ornament from "../Ornament";

const bonuses = [
  {
    icon: "📜",
    title: "7 Apostilas Completas (124 páginas)",
    desc: "Referência permanente cobrindo todos os módulos: simbologia, numerologia, naipes, tiragens, ética e meditações. Para consultar pelo resto da vida.",
  },
  {
    icon: "🎬",
    title: "4 Masterclasses Avançadas",
    desc: null, // Uses custom list below
    topics: [
      { bold: "Tarô e Relacionamentos:", text: "como ler consultas de amor sem virar dependência" },
      { bold: "Tarô Profissional:", text: "como começar a atender com confiança" },
      { bold: "Tarô em Momentos de Crise:", text: "perguntas difíceis e acolhimento" },
      { bold: "Perguntas Sensíveis:", text: "o que responder, o que redirecionar, o que recusar" },
    ],
  },
  {
    icon: "🌙",
    title: "Comunidade Exclusiva",
    desc: "Acesso ao grupo fechado de pessoas que levam espiritualidade, autoconhecimento e estética a sério. Um espaço para praticar, compartilhar leituras e crescer junto.",
  },
  {
    icon: "🗝️",
    title: "Ritual de Iniciação com o Baralho",
    desc: "Um guia completo para criar seu primeiro vínculo com o baralho: limpeza energética, ritual de apresentação e exercício de primeiro contato.",
  },
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
            {b.desc ? (
              <p className="font-body text-foreground/90 text-base leading-relaxed">{b.desc}</p>
            ) : (
              <div className="space-y-2.5">
                <p className="font-body text-foreground/70 text-sm leading-relaxed mb-3">
                  Aulas bônus já gravadas sobre os 4 temas que a comunidade mais pede:
                </p>
                {b.topics?.map((t, j) => (
                  <p key={j} className="font-body text-foreground/90 text-sm leading-relaxed pl-3 border-l-2 border-primary/20">
                    <strong className="text-primary/90">{t.bold}</strong>{" "}{t.text}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bônus Especial de Lançamento */}
      <div className="fade-item text-center p-8 rounded-sm border-2 border-primary/40 bg-primary/5 backdrop-blur-sm">
        <p className="font-display text-base md:text-lg tracking-[0.2em] text-primary mb-3">🌟 BÔNUS ESPECIAL DE LANÇAMENTO</p>
        <h3 className="font-editorial italic text-foreground text-xl md:text-2xl mb-3">
          Aula Aberta: A Jornada do Louco
        </h3>
        <p className="font-body text-foreground/80 text-base leading-relaxed max-w-lg mx-auto">
          Uma aula bônus aberta do Módulo 2, a metáfora central que guia todo o curso. Você começa a experimentar o método já na primeira semana, antes mesmo de mergulhar no curso oficialmente. É a aula que melhor mostra <em className="text-primary/90">por que</em> esse método funciona.
        </p>
      </div>
    </div>
  </TextureSection>
);

export default BonusSection;
