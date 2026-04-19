import { useState, type FormEvent } from "react";
import TextureSection from "../TextureSection";
import Ornament from "../Ornament";

const EBOOK_PDF_URL = "/taro-do-zero-7-dias.pdf";

const NIVEL_OPTIONS = [
  { value: "iniciante", label: "Iniciante", desc: "Estou começando agora" },
  { value: "intermediario", label: "Intermediário", desc: "Já faço leituras simples" },
  { value: "avancado", label: "Avançado", desc: "Leio com frequência e confiança" },
];

const EXPECTATIVA_OPTIONS = [
  { value: "amor", label: "Amor", icon: "♡" },
  { value: "autoconhecimento", label: "Autoconhecimento", icon: "✦" },
  { value: "trabalho", label: "Trabalho", icon: "⚝" },
  { value: "dinheiro", label: "Dinheiro", icon: "◆" },
  { value: "espiritualidade", label: "Espiritualidade", icon: "☽" },
  { value: "decisoes", label: "Tomar decisões", icon: "⊹" },
];

const EbookOptinForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [jaTiraTaro, setJaTiraTaro] = useState<boolean | null>(null);
  const [nivel, setNivel] = useState("");
  const [expectativas, setExpectativas] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleExpectativa = (value: string) => {
    setExpectativas((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const formatWhatsapp = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleWhatsappChange = (value: string) => {
    setWhatsapp(formatWhatsapp(value));
  };

  const isFormValid =
    name.trim() &&
    email.trim() &&
    whatsapp.replace(/\D/g, "").length >= 10 &&
    jaTiraTaro !== null &&
    (jaTiraTaro === false || nivel) &&
    expectativas.length > 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      // TODO: Integrar com Supabase quando credenciais estiverem disponíveis
      // const { error } = await supabase.from("ebook_leads").insert({
      //   name, email, whatsapp,
      //   ja_tira_taro: jaTiraTaro,
      //   nivel: jaTiraTaro ? nivel : null,
      //   expectativas,
      // });
      // if (error) throw error;

      // Simulação temporária
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error && err.message?.includes("duplicate")) {
        setErrorMessage("Este email já está cadastrado. Verifique sua caixa de entrada.");
      } else {
        setErrorMessage("Algo deu errado. Tente novamente.");
      }
    }
  };

  // Shared input classes
  const inputClass =
    "w-full bg-white/[0.04] border border-primary/15 rounded-sm px-4 py-3 text-foreground font-readable text-sm placeholder:text-foreground/20 focus:outline-none focus:border-primary/40 focus:shadow-[0_0_16px_rgba(201,169,110,0.08)] transition-all duration-300";

  const labelClass =
    "block font-readable text-foreground/35 text-[0.7rem] sm:text-xs mb-1.5 tracking-wider uppercase";

  return (
    <TextureSection
      texture="/textures/dark-parchment.jpg"
      overlay="rgba(18,8,8,0.85)"
      className="flex items-center justify-center py-14 sm:py-20 md:py-24"
      id="ebook-form"
    >
      <div className="container mx-auto px-5 sm:px-6 flex flex-col items-center">
        <Ornament className="fade-item mb-6 sm:mb-8 opacity-35" />

        <h2 className="fade-item font-display text-xl sm:text-2xl md:text-[1.75rem] text-foreground text-center mb-2 sm:mb-3">
          Receba seu ebook agora
        </h2>
        <p className="fade-item font-readable text-foreground/45 text-[0.825rem] sm:text-[0.875rem] text-center mb-8 sm:mb-10 max-w-sm leading-relaxed">
          Preencha abaixo e receba o PDF diretamente. Sem enrolação, sem spam.
        </p>

        {/* Form + Thumbnail Layout */}
        <div className="fade-item flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 w-full max-w-2xl">
          {/* Ebook Thumbnail — visual reinforcement */}
          <div className="hidden sm:block flex-shrink-0 w-[120px] md:w-[140px] sticky top-8">
            <div className="rounded-[8px] bg-[#111] p-[3px] shadow-[0_8px_30px_rgba(201,169,110,0.1),0_2px_10px_rgba(0,0,0,0.3)]">
              <div className="rounded-[6px] overflow-hidden">
                <img
                  src="/images/capa-ebook.jpeg"
                  alt="Tarô do Zero em 7 Dias"
                  className="w-full h-auto block"
                />
              </div>
            </div>
            <p className="font-readable text-foreground/20 text-[9px] text-center mt-2 tracking-wider uppercase">
              PDF gratuito
            </p>
          </div>

          {/* Form */}
          <div className="w-full max-w-md flex-1">
            {status === "success" ? (
              /* ── Success State ── */
              <div className="text-center py-10 sm:py-12 px-6 sm:px-8 border border-primary/25 rounded-sm bg-white/[0.03]">
                <span className="text-3xl mb-3 block">✦</span>
                <h3 className="font-display text-lg sm:text-xl text-foreground mb-2">
                  Boas vindas a sua nova jornada!
                </h3>
                <p className="font-readable text-foreground/50 text-sm mb-6">
                  Seu guia está pronto para download.
                </p>
                <a
                  href={EBOOK_PDF_URL}
                  download="Taro-do-Zero-em-7-Dias.pdf"
                  className="inline-block font-cinzel tracking-[0.15em] text-[0.7rem] font-bold px-8 py-3 bg-primary text-primary-foreground rounded-sm border border-primary/50 hover:bg-primary/90 hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(201,169,110,0.25)] transition-all duration-500 animate-cta-glow uppercase"
                >
                  Baixar Ebook
                </a>
                <p className="font-readable text-foreground/25 text-[10px] mt-4 tracking-wider">
                  O download começará automaticamente
                </p>
              </div>
            ) : (
              /* ── Form ── */
              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-5 sm:p-6 border border-primary/15 rounded-sm bg-white/[0.03] backdrop-blur-sm"
              >
                {/* ── Nome ── */}
                <div>
                  <label htmlFor="ebook-name" className={labelClass}>
                    Seu nome
                  </label>
                  <input
                    id="ebook-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Como devemos te chamar?"
                    className={inputClass}
                  />
                </div>

                {/* ── Email ── */}
                <div>
                  <label htmlFor="ebook-email" className={labelClass}>
                    Seu melhor email
                  </label>
                  <input
                    id="ebook-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className={inputClass}
                  />
                </div>

                {/* ── WhatsApp ── */}
                <div>
                  <label htmlFor="ebook-whatsapp" className={labelClass}>
                    WhatsApp
                  </label>
                  <input
                    id="ebook-whatsapp"
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => handleWhatsappChange(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className={inputClass}
                  />
                </div>

                {/* ── Divider ── */}
                <div className="flex items-center gap-3 py-1">
                  <div className="h-px flex-1 bg-primary/8" />
                  <span className="text-primary/25 text-[9px] font-readable tracking-[0.3em] uppercase">
                    sobre você
                  </span>
                  <div className="h-px flex-1 bg-primary/8" />
                </div>

                {/* ── Já tira tarô? ── */}
                <div>
                  <p className={labelClass}>Você já tira tarô?</p>
                  <div className="flex gap-3 mt-1.5">
                    {[
                      { value: true, label: "Sim" },
                      { value: false, label: "Ainda não" },
                    ].map((opt) => (
                      <button
                        key={String(opt.value)}
                        type="button"
                        onClick={() => {
                          setJaTiraTaro(opt.value);
                          if (!opt.value) setNivel("");
                        }}
                        className={`flex-1 py-2.5 rounded-sm border text-sm font-readable transition-all duration-300 cursor-pointer ${
                          jaTiraTaro === opt.value
                            ? "bg-primary/15 border-primary/40 text-foreground shadow-[0_0_12px_rgba(201,169,110,0.08)]"
                            : "bg-white/[0.02] border-primary/10 text-foreground/40 hover:border-primary/20 hover:text-foreground/60"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Nível (condicional) ── */}
                {jaTiraTaro === true && (
                  <div className="animate-fade-in-up" style={{ animationDuration: "0.4s" }}>
                    <p className={labelClass}>Qual seu nível?</p>
                    <div className="space-y-2 mt-1.5">
                      {NIVEL_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setNivel(opt.value)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm border text-left transition-all duration-300 cursor-pointer ${
                            nivel === opt.value
                              ? "bg-primary/12 border-primary/35 shadow-[0_0_12px_rgba(201,169,110,0.06)]"
                              : "bg-white/[0.02] border-primary/8 hover:border-primary/18"
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-all duration-300 flex items-center justify-center ${
                              nivel === opt.value
                                ? "border-primary bg-primary/30"
                                : "border-primary/20"
                            }`}
                          >
                            {nivel === opt.value && (
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            )}
                          </div>
                          <div>
                            <span
                              className={`font-readable text-sm block transition-colors duration-300 ${
                                nivel === opt.value ? "text-foreground" : "text-foreground/50"
                              }`}
                            >
                              {opt.label}
                            </span>
                            <span className="font-readable text-foreground/25 text-[11px]">
                              {opt.desc}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Expectativas ── */}
                <div>
                  <p className={labelClass}>
                    O que você espera com esse ebook?
                  </p>
                  <p className="font-readable text-foreground/20 text-[10px] mb-2.5 tracking-wide">
                    Selecione uma ou mais opções
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {EXPECTATIVA_OPTIONS.map((opt) => {
                      const isSelected = expectativas.includes(opt.value);
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => toggleExpectativa(opt.value)}
                          className={`group relative flex items-center gap-2 px-3.5 py-2.5 rounded-sm border text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                            isSelected
                              ? "bg-primary/12 border-primary/35 shadow-[0_0_12px_rgba(201,169,110,0.06)]"
                              : "bg-white/[0.02] border-primary/8 hover:border-primary/18 hover:bg-white/[0.03]"
                          }`}
                        >
                          {/* Selection indicator glow */}
                          {isSelected && (
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
                          )}
                          <span
                            className={`text-xs relative z-10 transition-all duration-300 ${
                              isSelected ? "text-primary" : "text-foreground/20"
                            }`}
                          >
                            {opt.icon}
                          </span>
                          <span
                            className={`font-readable text-[0.8rem] relative z-10 transition-colors duration-300 ${
                              isSelected ? "text-foreground/90" : "text-foreground/40"
                            }`}
                          >
                            {opt.label}
                          </span>
                          {/* Checkmark */}
                          <span
                            className={`ml-auto text-[10px] relative z-10 transition-all duration-300 ${
                              isSelected
                                ? "text-primary opacity-100 scale-100"
                                : "opacity-0 scale-50"
                            }`}
                          >
                            ✓
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── Error message ── */}
                {errorMessage && (
                  <p className="font-readable text-rose-400/80 text-xs text-center">
                    {errorMessage}
                  </p>
                )}

                {/* ── Submit ── */}
                <button
                  type="submit"
                  disabled={status === "loading" || !isFormValid}
                  className={`w-full font-cinzel tracking-[0.15em] text-[0.7rem] sm:text-xs font-bold px-6 py-3.5 rounded-sm border transition-all duration-500 uppercase ${
                    status === "loading"
                      ? "bg-primary/50 text-primary-foreground/50 border-primary/30 cursor-wait"
                      : !isFormValid
                        ? "bg-primary/20 text-primary-foreground/30 border-primary/10 cursor-not-allowed"
                        : "bg-primary text-primary-foreground border-primary/50 hover:bg-primary/90 hover:translate-y-[-1px] hover:shadow-[0_6px_20px_rgba(201,169,110,0.2)] animate-cta-glow cursor-pointer"
                  }`}
                >
                  {status === "loading" ? "Enviando..." : "Receber Meu Ebook"}
                </button>

                <p className="font-readable text-foreground/18 text-[10px] text-center pt-0.5 tracking-wider">
                  ✦ Sem spam. Enviamos apenas conteúdo de valor. ✦
                </p>
              </form>
            )}
          </div>
        </div>

        <Ornament className="fade-item mt-10 sm:mt-12 opacity-15" />

        {/* Footer */}
        <div className="fade-item flex items-center gap-3 mt-6 sm:mt-8">
          <div className="h-px w-8 bg-primary/10" />
          <p className="font-readable text-foreground/15 text-[10px] tracking-[0.2em] uppercase">
            Velvet Oráculo · 2026
          </p>
          <div className="h-px w-8 bg-primary/10" />
        </div>
      </div>
    </TextureSection>
  );
};

export default EbookOptinForm;
