import TextureSection from "../TextureSection";
import Ornament from "../Ornament";

const testimonials = [
  { name: "Mariana L.", city: "São Paulo", quote: "O tarô deixou de ser um mistério e se tornou minha linguagem.", text: "Eu já tinha feito outros cursos, mas nenhum me ensinou a realmente ler. Com o Velvet Oráculo, aprendi a confiar na minha intuição." },
  { name: "Camila R.", city: "Belo Horizonte", quote: "A melhor decisão que tomei esse ano.", text: "A abordagem simbólica mudou completamente minha relação com as cartas. Hoje leio com confiança e profundidade." },
  { name: "Juliana S.", city: "Porto Alegre", quote: "Finalmente sinto que o tarô é meu.", text: "Eu tentei aprender sozinha e sempre travava. O curso destravou algo em mim. Agora as cartas fazem sentido." },
];

const TestimonialsSection = () => (
  <TextureSection
    texture="/textures/velvet-burgundy.jpg"
    overlay="rgba(18,8,8,0.82)"
    className="py-20 md:py-28"
  >
    <div className="container mx-auto px-6 max-w-5xl text-shadow-dark">
      <h2 className="fade-item font-display text-2xl md:text-3xl text-foreground text-center mb-4">
        O que dizem nossos estudantes
      </h2>
      <Ornament className="fade-item mb-12" />

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="fade-item p-6 rounded-sm border border-primary/20 bg-background/20 backdrop-blur-sm">
            <p className="font-italianno text-2xl text-primary mb-4">❝</p>
            <p className="font-editorial italic text-primary/90 text-lg md:text-xl mb-4">{t.quote}</p>
            <p className="font-body text-foreground/90 text-base leading-relaxed mb-6">{t.text}</p>
            <div className="border-t border-primary/20 pt-4">
              <p className="font-display text-sm tracking-widest text-foreground/90">{t.name}</p>
              <p className="font-body text-foreground/60 text-sm">{t.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </TextureSection>
);

export default TestimonialsSection;
