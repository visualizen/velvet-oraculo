import TextureSection from "../TextureSection";
import Ornament from "../Ornament";

const BioSection = () => (
  <TextureSection
    texture="/textures/cream-paper.jpg"
    overlay="rgba(245,239,224,0.93)"
    className="py-20 md:py-28"
  >
    <div className="container mx-auto px-6 max-w-4xl">
      <p className="fade-item font-italianno text-4xl md:text-5xl text-flora-borgonha mb-6 text-center">Quem será sua professora nessa jornada</p>
      <Ornament className="fade-item mb-12 [&_span]:text-flora-borgonha" />

      {/* Photo + Bio Layout */}
      <div className="fade-item flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14">
        {/* Profile Photo — Portrait */}
        <div className="relative flex-shrink-0 group">
          {/* Gold frame border */}
          <div className="absolute -inset-[6px] rounded-sm border border-flora-ouro/40 group-hover:border-flora-ouro/60 transition-colors duration-700" />
          {/* Outer decorative frame */}
          <div className="absolute -inset-3 rounded-sm border border-flora-borgonha/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Gold corner accents */}
          <div className="absolute -top-4 -left-4 w-6 h-6 border-t-2 border-l-2 border-flora-ouro/60" />
          <div className="absolute -top-4 -right-4 w-6 h-6 border-t-2 border-r-2 border-flora-ouro/60" />
          <div className="absolute -bottom-4 -left-4 w-6 h-6 border-b-2 border-l-2 border-flora-ouro/60" />
          <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b-2 border-r-2 border-flora-ouro/60" />

          <div className="relative w-48 h-64 md:w-56 md:h-[340px] rounded-sm overflow-hidden shadow-[0_8px_40px_rgba(100,20,30,0.12)]">
            <img
              src="/images/luisa-perfil.jpg"
              alt="Luísa - Taróloga e professora"
              className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
            />
            {/* Subtle vignette overlay */}
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.12)]" />
            {/* Bottom gradient for name overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
            {/* Name overlay on photo */}
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <p className="font-cinzel text-sm tracking-[0.25em] text-white/90 uppercase">Luísa</p>
            </div>
          </div>
        </div>

        {/* Bio Text */}
        <div className="space-y-6 font-body text-flora-veludo/90 text-lg md:text-xl leading-relaxed italic flex-1 md:pt-2">
          <p>
            Me chamo Luísa, sou taróloga há mais de 7 anos e já realizei mais de 2.000 leituras. O tarô não entrou na minha vida como misticismo, mas como a primeira ferramenta que me fez perguntas que eu nunca tinha me feito.
          </p>
          <p>
            Minha relação com espiritualidade sempre foi intelectual. Eu queria entender o porquê das coisas, não apenas acreditar. O tarô foi o primeiro sistema que uniu profundidade, beleza e autonomia.
          </p>
          <p>
            Eu criei este curso porque acredito que toda pessoa merece ter acesso à sua própria sabedoria interior, sem depender de ninguém para interpretá-la.
          </p>
        </div>
      </div>

      <Ornament className="fade-item mt-12 [&_span]:text-flora-borgonha" />
    </div>
  </TextureSection>
);

export default BioSection;
