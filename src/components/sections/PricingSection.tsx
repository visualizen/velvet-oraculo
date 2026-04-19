import TextureSection from "../TextureSection";
import Ornament from "../Ornament";
import CTAButton from "../CTAButton";

const valueStack = [
  { item: "8 Módulos Completos", value: "R$ 497" },
  { item: "Material de apoio (124 páginas)", value: "R$ 197" },
  { item: "Aulas Bônus", value: "R$ 297" },
  { item: "Comunidade Exclusiva", value: "R$ 197" },
  { item: "Curso Arcanos Maiores", value: "R$ 300" },
  { item: "Curso Arcanos Menores", value: "R$ 300" },
  { item: "Curso de Numerologia", value: "R$ 300" },
  { item: "Curso Interpretação Simbólica", value: "R$ 300" },
  { item: "Curso para Criar Método de Tiragem", value: "R$ 300" },
  { item: "Módulo Bônus: Tarô & Cabala", value: "R$ 97" },
];

const PricingSection = () => (
  <TextureSection
    id="preco"
    texture="/textures/cartas-fundo.jpeg"
    overlay="rgba(18,8,8,0.82)"
    className="py-20 md:py-28"
  >
    <div className="container mx-auto px-6 max-w-2xl text-center text-shadow-dark">
      <p className="fade-item font-editorial italic text-primary text-sm tracking-[0.3em] uppercase mb-4">
        Oferta especial de lançamento
      </p>
      <h2 className="fade-item font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-8">
        Tudo que está incluído
      </h2>
      <Ornament className="fade-item mb-8" />

      <div className="fade-item space-y-3 mb-8">
        {valueStack.map((v, i) => (
          <div key={i} className="flex justify-between items-center px-4 py-2 border-b border-primary/10">
            <span className="font-body text-foreground text-base text-left">{v.item}</span>
            <span className="font-body text-foreground/60 line-through text-sm">{v.value}</span>
          </div>
        ))}
      </div>

      <div className="fade-item mb-6">
        <p className="font-body text-foreground/60 text-sm line-through mb-1">Valor total: R$ 2.785</p>
        <p className="font-editorial italic text-primary text-lg mb-2">Por apenas</p>
        <p className="font-body text-foreground/60 text-sm tracking-wide mb-1">12x de</p>
        <p className="font-display text-5xl md:text-6xl text-primary font-bold">R$ 35,68</p>
        <p className="font-body text-foreground/60 text-base mt-3">ou R$ 365 à vista</p>
      </div>

      <div className="fade-item mb-8">
        <CTAButton text="ENTRAR NO PORTAL AGORA" />
      </div>

      <div className="fade-item p-4 rounded-sm border border-primary/20 bg-primary/5">
        <p className="font-editorial italic text-primary text-sm">🛡️ Garantia incondicional de 7 dias</p>
        <p className="font-body text-foreground/70 text-sm mt-1">
          Se por qualquer motivo você sentir que o curso não é para você, devolvemos 100% do seu investimento.
        </p>
      </div>
    </div>
  </TextureSection>
);

export default PricingSection;
