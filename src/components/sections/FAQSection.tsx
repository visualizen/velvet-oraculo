import TextureSection from "../TextureSection";
import Ornament from "../Ornament";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Preciso ter conhecimento prévio de tarô?", a: "Não. O curso começa do absoluto zero. O Módulo 1 é especificamente projetado para quem nunca teve contato com tarô." },
  { q: "Por quanto tempo terei acesso ao curso?", a: "O acesso é vitalício. Você pode assistir e reassistir quantas vezes quiser, no seu ritmo." },
  { q: "Preciso ter um baralho para começar?", a: "Recomendamos ter um baralho Rider-Waite-Smith para acompanhar o curso, mas não é obrigatório para iniciar. No próprio curso indicamos onde adquirir." },
  { q: "O curso serve para quem quer atender profissionalmente?", a: "Sim. O Módulo 7 aborda ética, bloqueios e leitura responsável. Tudo que você precisa para atender com confiança e credibilidade." },
  { q: "E se eu não gostar do curso?", a: "Você tem 7 dias de garantia incondicional. Se sentir que não é para você, devolvemos 100% do investimento, sem perguntas." },
  { q: "As aulas bônus são gravadas?", a: "Sim! Todas as aulas bônus ficam disponíveis na área de membros para você assistir quando quiser." },
];

const FAQSection = () => (
  <TextureSection
    texture="/textures/cream-paper.jpg"
    overlay="rgba(245,239,224,0.93)"
    className="py-20 md:py-28"
  >
    <div className="container mx-auto px-6 max-w-2xl">
      <h2 className="fade-item font-display text-2xl md:text-3xl text-flora-veludo text-center mb-4">
        Perguntas Frequentes
      </h2>
      <Ornament className="fade-item mb-10 [&_span]:text-flora-borgonha" />

      <Accordion type="single" collapsible className="fade-item">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-flora-borgonha/15">
            <AccordionTrigger className="font-editorial text-flora-veludo text-left text-lg hover:text-flora-borgonha hover:no-underline [&>svg]:text-flora-borgonha">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="font-body text-flora-veludo/85 text-base leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </TextureSection>
);

export default FAQSection;
