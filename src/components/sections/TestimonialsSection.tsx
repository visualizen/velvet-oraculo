import TextureSection from "../TextureSection";
import Ornament from "../Ornament";

const comments = [
  {
    username: "isa",
    initial: "I",
    color: "bg-pink-400",
    text: "Seus vídeos são otimossssss ❤️😍",
    likes: 47,
  },
  {
    username: "agatha",
    initial: "A",
    color: "bg-violet-400",
    text: "Amiga me apaixonei no seu conteúdo, me ajudou muito, continuaaaaa pelo amor de deusss",
    likes: 132,
  },
  {
    username: "g",
    initial: "G",
    color: "bg-teal-400",
    text: "amigaa, vc tem uma dica pra quem tira, para poder se proteger de energias ruins ou obsessores? estou começando recentemente e vc já é minha inspiração!! ❤️",
    likes: 89,
  },
];

const TikTokComment = ({ comment }: { comment: typeof comments[0] }) => (
  <div className="fade-item bg-white rounded-xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-black/[0.04] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow duration-300">
    {/* Header: avatar + username */}
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-9 h-9 rounded-full ${comment.color} flex items-center justify-center shadow-sm`}>
        <span className="text-white text-sm font-bold">{comment.initial}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[#161823] text-sm font-semibold">@{comment.username}</span>
        <span className="text-[#161823]/30 text-xs">·</span>
        <span className="text-[#161823]/40 text-xs">2 sem</span>
      </div>
    </div>

    {/* Comment text */}
    <p className="text-[#161823] text-[15px] leading-relaxed font-normal" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
      {comment.text}
    </p>

    {/* Footer: like count */}
    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-black/[0.04]">
      <div className="flex items-center gap-1.5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#161823]/30">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
        </svg>
        <span className="text-[#161823]/40 text-xs font-medium">{comment.likes}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-[#161823]/25">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[#161823]/30 text-xs">Responder</span>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => (
  <TextureSection
    texture="/textures/cream-paper.jpg"
    overlay="rgba(245,239,224,0.93)"
    className="py-20 md:py-28"
  >
    <div className="container mx-auto px-6 max-w-5xl">
      <h2 className="fade-item font-cinzel text-2xl md:text-3xl text-flora-veludo text-center mb-3">
        O que a comunidade tem dito
      </h2>
      <p className="fade-item font-editorial italic text-flora-veludo/50 text-sm md:text-base text-center mb-2">
        Comentários reais de seguidoras no TikTok @velvetoraculo
      </p>
      <Ornament className="fade-item mb-12 [&_span]:text-flora-borgonha" />

      <div className="grid md:grid-cols-3 gap-5 mb-10">
        {comments.map((c, i) => (
          <TikTokComment key={i} comment={c} />
        ))}
      </div>

      {/* Transparency note */}
      <p className="fade-item font-editorial italic text-flora-veludo/40 text-sm text-center max-w-lg mx-auto leading-relaxed">
        Esses são comentários reais de seguidoras no TikTok. Os depoimentos das primeiras alunas do curso serão adicionados conforme a turma avança. Transparência importa pra gente.
      </p>
    </div>
  </TextureSection>
);

export default TestimonialsSection;
