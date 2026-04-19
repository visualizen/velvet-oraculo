import TextureSection from "../TextureSection";
import Ornament from "../Ornament";

const modules = [
  { num: 1, title: "O que é o Tarô", desc: "Quebrando mitos, apagando tabus, e criando um vínculo real com o baralho. Aqui começa a jornada." },
  { num: 2, title: "Os Arcanos Maiores: A Jornada da Alma", desc: "Os 22 arquétipos universais, percorridos através da Jornada do Louco. Você aprende a ler o mapa da sua própria encarnação." },
  { num: 3, title: "Numerologia do Tarô", desc: "A lógica oculta por trás das cartas. Quando você entende os números, destranca leituras que antes pareciam impossíveis." },
  { num: 4, title: "Os Arcanos Menores", desc: "Fogo, água, ar e terra. Os naipes e elementos que descrevem o cotidiano da vida. Você vai entender por que eles não são difíceis, eles são lógicos." },
  { num: 5, title: "Simbologia do Tarô", desc: "Objetos, cores, gestos, direções, animais. A leitura profunda e verdadeiramente intuitiva começa quando você aprende a ver além do óbvio." },
  { num: 6, title: "Tiragens na Prática", desc: "1 carta, 3 cartas, Cruz Simples e como criar suas próprias tiragens. Autonomia total: você vai terminar este módulo lendo tarô de verdade." },
  { num: 7, title: "Ética, Bloqueios e Leitura Responsável", desc: "O que transforma quem lê em profissional de referência. Porque a ética não é uma limitação, é o que constrói sua reputação." },
  { num: 8, title: "Tarô & Cabala", desc: "A Árvore da Vida, os arcanos maiores e a tradição mística por trás das cartas. Para quem quer ir mais fundo do que qualquer curso vai.", bonus: true },
];

const ModulesSection = () => (
  <TextureSection
    texture="/textures/cream-paper.jpg"
    overlay="rgba(237,227,206,0.93)"
    className="py-20 md:py-28"
  >
    <div className="container mx-auto px-6 max-w-5xl">
      <h2 className="fade-item font-display text-2xl md:text-3xl lg:text-4xl text-flora-veludo text-center mb-4 leading-tight">
        8 Módulos. Da gênese à leitura intuitiva.
      </h2>
      <Ornament className="fade-item mb-12 [&_span]:text-flora-borgonha" />

      <div className="grid md:grid-cols-2 gap-6">
        {modules.map((m) => (
          <div
            key={m.num}
            className={`fade-item p-6 rounded-sm border transition-all duration-300 hover:shadow-lg ${
              m.bonus
                ? "border-primary/60 bg-flora-veludo/5 hover:border-primary"
                : "border-flora-borgonha/20 bg-flora-veludo/[0.03] hover:border-flora-borgonha/40"
            }`}
          >
            <div className="flex items-start gap-4">
              <span className={`font-display text-sm tracking-widest mt-1 shrink-0 ${m.bonus ? "text-primary" : "text-flora-borgonha"}`}>
                {m.bonus ? "🎁" : `0${m.num}`}
              </span>
              <div>
                <h3 className="font-editorial text-lg text-flora-veludo mb-2">
                  {m.bonus && <span className="text-primary text-xs font-display tracking-wider mr-2">BÔNUS</span>}
                  {m.title}
                </h3>
                <p className="font-body text-flora-veludo/85 text-base leading-relaxed">{m.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </TextureSection>
);

export default ModulesSection;
