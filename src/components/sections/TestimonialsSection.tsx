import TextureSection from "../TextureSection";
import Ornament from "../Ornament";

const comments = [
  {
    username: "@isa",
    text: "Seus vídeos são otimossssss ❤️😍",
  },
  {
    username: "@agatha",
    text: "Amiga me apaixonei no seu conteúdo, me ajudou muito, continuaaaaa pelo amor de deusss",
  },
  {
    username: "@g",
    text: "amigaa, vc tem uma dica pra quem tira, para poder se proteger de energias ruins ou obsessores? estou começando recentemente e vc já é minha inspiração!! ❤️",
  },
];

const TestimonialsSection = () => (
  <TextureSection
    texture="/textures/velvet-burgundy.jpg"
    overlay="rgba(18,8,8,0.82)"
    className="py-20 md:py-28"
  >
    <div className="container mx-auto px-6 max-w-5xl text-shadow-dark">
      <h2 className="fade-item font-display text-2xl md:text-3xl text-foreground text-center mb-3">
        O que a comunidade tem dito
      </h2>
      <p className="fade-item font-editorial italic text-foreground/50 text-sm md:text-base text-center mb-4">
        Comentários reais de seguidoras no TikTok @velvetoraculo
      </p>
      <Ornament className="fade-item mb-12" />

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {comments.map((c, i) => (
          <div key={i} className="fade-item p-6 rounded-sm border border-primary/20 bg-background/20 backdrop-blur-sm">
            {/* TikTok-style comment card */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center">
                <span className="text-primary/80 text-xs font-display">
                  {c.username.charAt(1).toUpperCase()}
                </span>
              </div>
              <span className="font-body text-foreground/60 text-sm">{c.username}</span>
            </div>
            <p className="font-body text-foreground/90 text-base leading-relaxed">
              💬 <em>"{c.text}"</em>
            </p>
          </div>
        ))}
      </div>

      {/* Transparency note */}
      <p className="fade-item font-editorial italic text-foreground/40 text-sm text-center max-w-lg mx-auto leading-relaxed">
        Esses são prints reais de comentários públicos no TikTok. Os depoimentos das primeiras alunas do curso serão adicionados aqui conforme a turma avança. Transparência importa pra gente.
      </p>
    </div>
  </TextureSection>
);

export default TestimonialsSection;
