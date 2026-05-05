import { useEffect } from "react";
import { Link } from "react-router-dom";
import TextureSection from "@/components/TextureSection";
import Ornament from "@/components/Ornament";

const links = [
  {
    label: "Curso: Tarô Essencial e Simbólico",
    description: "8 módulos · 7 apostilas · Acesso vitalício",
    icon: "🃏",
    href: "/",
    isInternal: true,
  },
  {
    label: "Baixar Ebook Grátis",
    description: "A Jornada do Louco. Seu primeiro passo no tarô",
    icon: "📖",
    href: "/ebook",
    isInternal: true,
  },
  {
    label: "Consulte Comigo",
    description: "Descubra o que o oráculo revela sobre seu momento",
    icon: "🗝️",
    href: "/consulta",
    isInternal: true,
  },
];

const LinksPage = () => {
  useEffect(() => {
    document.title = "Velvet Oráculo · Links";
    return () => { document.title = "Curso de Tarot Online · Do Básico ao Avançado · Velvet Oráculo"; };
  }, []);

  return (
  <TextureSection
    texture="/textures/dark-parchment.jpg"
    overlay="rgba(18,8,8,0.68)"
    className="min-h-screen flex items-center justify-center"
  >
    <div className="w-full max-w-md mx-auto px-5 sm:px-6 py-14 sm:py-16 flex flex-col items-center text-shadow-dark safe-padding-x">
      {/* Avatar */}
      <div className="relative mb-5 sm:mb-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary/60 shadow-[0_0_30px_rgba(201,169,110,0.2)]">
          <img
            src="/images/luisa-avatar.jpg"
            alt="Luísa"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-flora-borgonha rounded-full flex items-center justify-center border border-primary/40">
          <span className="text-xs">✦</span>
        </div>
      </div>

      {/* Name & Subtitle */}
      <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground text-center mb-1">
        Velvet Oráculo
      </h1>
      <p className="font-italianno text-2xl sm:text-3xl md:text-4xl text-primary text-center mb-2">
        Sacerdotisa de Si Mesma
      </p>
      <Ornament className="mb-6 sm:mb-8 opacity-60" />

      {/* Links */}
      <div className="w-full space-y-3 sm:space-y-4">
        {links.map((link, index) => {
          const content = (
            <div
              className="group w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 rounded-sm border border-primary/20 bg-white/[0.03] backdrop-blur-sm hover:border-primary/50 hover:bg-white/[0.06] hover:shadow-[0_0_25px_rgba(201,169,110,0.15)] transition-all duration-500 cursor-pointer"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <span className="text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {link.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-cinzel text-foreground text-sm sm:text-base md:text-lg leading-tight tracking-wide">
                  {link.label}
                </p>
                <p className="font-body text-foreground/50 text-sm sm:text-base mt-0.5 truncate">
                  {link.description}
                </p>
              </div>
              <svg
                className="w-4 h-4 text-primary/50 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          );

          if (link.isInternal) {
            return (
              <Link key={index} to={link.href} className="block">
                {content}
              </Link>
            );
          }

          return (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {content}
            </a>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-10 sm:mt-12 text-center">
        <Ornament className="opacity-30 mb-4" />
        <p className="font-body text-foreground/30 text-xs sm:text-sm tracking-[0.2em] uppercase">
          Velvet Oráculo Cartomancia
        </p>
      </div>
    </div>
  </TextureSection>
  );
};

export default LinksPage;
