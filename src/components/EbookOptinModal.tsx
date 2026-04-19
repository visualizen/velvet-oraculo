import { useState, useEffect, useCallback, type FormEvent } from "react";

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

const STEP_HOOKS = [
  {
    eyebrow: "✦ Passo 1 de 3",
    text: "Mais de 2.000 mulheres já baixaram este guia e começaram a ler tarô com confiança.",
  },
  {
    eyebrow: "✦ Passo 2 de 3",
    text: "Entender seu momento nos ajuda a te enviar conteúdos complementares personalizados.",
  },
  {
    eyebrow: "✦ Passo 3 de 3",
    text: "Último passo. Saber o que você busca nos ajuda a criar cada vez mais conteúdo de valor.",
  },
];

interface EbookOptinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ─────────────────────────── Inline error label ─────────────────────────── */
const FieldError = ({ msg }: { msg?: string }) => {
  if (!msg) return null;
  return (
    <p className="font-readable text-rose-400 text-xs mt-2 pl-1 font-medium">
      ↑ {msg}
    </p>
  );
};

/* ════════════════════════════════════════════════════════════════════════════ */

const EbookOptinModal = ({ isOpen, onClose }: EbookOptinModalProps) => {
  const [step, setStep] = useState(0);
  const [animClass, setAnimClass] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [jaTiraTaro, setJaTiraTaro] = useState<boolean | null>(null);
  const [nivel, setNivel] = useState("");
  const [expectativas, setExpectativas] = useState<string[]>([]);
  const [nivelVisible, setNivelVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Inline validation
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [shakeButton, setShakeButton] = useState(false);

  /* ── Side effects ── */

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStep(0);
        setAnimClass("");
        setNivelVisible(false);
        setFieldErrors({});
        setShakeButton(false);
        setStatus("idle");
        setErrorMessage("");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (jaTiraTaro === true) {
      const t = setTimeout(() => setNivelVisible(true), 50);
      return () => clearTimeout(t);
    }
    setNivelVisible(false);
    setNivel("");
  }, [jaTiraTaro]);

  /* ── Clear individual errors on correction ── */
  const clearError = useCallback((key: string) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  useEffect(() => { if (name.trim()) clearError("name"); }, [name, clearError]);
  useEffect(() => { if (/\S+@\S+\.\S+/.test(email)) clearError("email"); }, [email, clearError]);
  useEffect(() => { if (whatsapp.replace(/\D/g, "").length >= 10) clearError("whatsapp"); }, [whatsapp, clearError]);
  useEffect(() => { if (jaTiraTaro !== null) clearError("taro"); }, [jaTiraTaro, clearError]);
  useEffect(() => { if (nivel) clearError("nivel"); }, [nivel, clearError]);
  useEffect(() => { if (expectativas.length > 0) clearError("expectativas"); }, [expectativas, clearError]);

  /* ── Handlers ── */

  const toggleExpectativa = useCallback((value: string) => {
    setExpectativas((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }, []);

  const formatWhatsapp = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  /* ── Validation ── */

  const isStep1Valid = name.trim().length > 0 && /\S+@\S+\.\S+/.test(email) && whatsapp.replace(/\D/g, "").length >= 10;
  const isStep2Valid = jaTiraTaro !== null && (jaTiraTaro === false || nivel.length > 0);
  const isStep3Valid = expectativas.length > 0;
  const canAdvance = step === 0 ? isStep1Valid : step === 1 ? isStep2Valid : isStep3Valid;

  const validateAndFocus = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    if (step === 0) {
      if (!name.trim()) errors.name = "Preencha seu nome";
      else if (!email.trim()) errors.email = "Preencha seu email";
      else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email inválido";
      else if (whatsapp.replace(/\D/g, "").length < 10) errors.whatsapp = "WhatsApp incompleto";
    } else if (step === 1) {
      if (jaTiraTaro === null) errors.taro = "Selecione uma opção acima";
      else if (jaTiraTaro && !nivel) errors.nivel = "Selecione seu nível";
    } else if (step === 2) {
      if (expectativas.length === 0) errors.expectativas = "Selecione pelo menos uma opção";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setShakeButton(true);
      setTimeout(() => setShakeButton(false), 600);

      const firstKey = Object.keys(errors)[0];
      const focusMap: Record<string, string> = {
        name: "ebook-name",
        email: "ebook-email",
        whatsapp: "ebook-whatsapp",
      };
      if (focusMap[firstKey]) {
        const el = document.getElementById(focusMap[firstKey]);
        el?.focus();
      }
      return false;
    }
    return true;
  }, [step, name, email, whatsapp, jaTiraTaro, nivel, expectativas]);

  /* ── Step transitions ── */

  const animateTransition = useCallback((dir: "forward" | "backward", cb: () => void) => {
    setAnimClass(dir === "forward" ? "opacity-0 -translate-x-4" : "opacity-0 translate-x-4");
    setTimeout(() => {
      cb();
      setFieldErrors({});
      setAnimClass(dir === "forward" ? "opacity-0 translate-x-4" : "opacity-0 -translate-x-4");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimClass("opacity-100 translate-x-0");
        });
      });
    }, 200);
  }, []);

  const goForward = useCallback(() => {
    if (!validateAndFocus()) return;
    animateTransition("forward", () => setStep((s) => s + 1));
  }, [validateAndFocus, animateTransition]);

  const goBack = useCallback(() => {
    animateTransition("backward", () => setStep((s) => s - 1));
  }, [animateTransition]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateAndFocus()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      // TODO: Integrar com Supabase
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      animateTransition("forward", () => setStep(3));
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error && err.message?.includes("duplicate")) {
        setErrorMessage("Este email já está cadastrado.");
      } else {
        setErrorMessage("Algo deu errado. Tente novamente.");
      }
    }
  };

  /* ── Shared classes ── */

  const inputBase =
    "w-full bg-white/[0.04] border rounded-sm px-4 py-3 text-foreground font-readable text-sm placeholder:text-foreground/20 focus:outline-none transition-colors duration-200";

  const inputNormal =
    `${inputBase} border-primary/15 focus:border-primary/40 focus:shadow-[0_0_16px_rgba(201,169,110,0.08)]`;

  const inputError =
    `${inputBase} !border-rose-400/70 shadow-[0_0_20px_rgba(244,63,94,0.15)] animate-[errorPulse_1.5s_ease-in-out_infinite] focus:!border-rose-400 focus:shadow-[0_0_24px_rgba(244,63,94,0.2)]`;

  const labelClass =
    "block font-readable text-foreground/35 text-[0.7rem] sm:text-xs mb-1.5 tracking-wider uppercase";

  if (!isOpen) return null;

  /* ════════════════════════════════ RENDER ════════════════════════════════ */

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal wrapper — scrollable on small screens */}
      <div className="fixed inset-0 z-50 overflow-y-auto pointer-events-none">
        <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ebook-modal-title"
            className="pointer-events-auto w-full max-w-md relative bg-[#1a1229] border border-primary/15 rounded-sm shadow-[0_25px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(201,169,110,0.05)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-foreground/30 hover:text-foreground/60 transition-colors duration-300 z-20 cursor-pointer"
              aria-label="Fechar"
              type="button"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 px-5 sm:px-6 pt-5 sm:pt-6 pb-0">
              <div className="flex-shrink-0 w-[52px] sm:w-[60px]">
                <div className="rounded-[6px] bg-[#111] p-[2px] shadow-[0_4px_16px_rgba(201,169,110,0.08)]">
                  <div className="rounded-[5px] overflow-hidden">
                    <img src="/images/capa-ebook.jpeg" alt="Tarô do Zero em 7 Dias" className="w-full h-auto block" />
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 id="ebook-modal-title" className="font-editorial italic text-base sm:text-lg text-foreground leading-tight">
                  Receba seu guia gratuito
                </h2>
                <p className="font-readable text-foreground/30 text-[11px] sm:text-xs mt-0.5">
                  Tarô do Zero em 7 Dias
                </p>
              </div>
            </div>

            {/* Progress bar */}
            {step < 3 && (
              <div className="px-5 sm:px-6 pt-4" aria-label={`Passo ${step + 1} de 3`}>
                <div className="flex gap-1.5" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={3}>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`h-[3px] flex-1 rounded-full transition-all duration-500 ${
                        i < step ? "bg-primary/60" : i === step ? "bg-primary/40" : "bg-primary/10"
                      }`}
                    >
                      {i === step && (
                        <div
                          className="h-full rounded-full bg-primary/60 transition-all duration-500"
                          style={{ width: canAdvance ? "100%" : "30%" }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─────────────────────── Form ─────────────────────── */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (step < 2) goForward();
                else handleSubmit(e);
              }}
              noValidate
              className="px-5 sm:px-6 py-5 sm:py-6"
            >
              {/* Animated content wrapper */}
              <div className={`transition-all duration-200 ease-out ${animClass}`}>

                {/* ══ Success ══ */}
                {step === 3 && (
                  <div className="text-center py-6 sm:py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/15 flex items-center justify-center">
                      <span className="text-2xl text-primary">✦</span>
                    </div>
                    <h3 className="font-editorial italic text-xl sm:text-2xl text-foreground mb-2">
                      Boas vindas a sua nova jornada!
                    </h3>
                    <p className="font-readable text-foreground/50 text-sm mb-6 leading-relaxed">
                      Seu guia está pronto para download.
                      <br />
                      <span className="text-foreground/30">Boa jornada com as cartas.</span>
                    </p>
                    <a
                      href={EBOOK_PDF_URL}
                      download="Taro-do-Zero-em-7-Dias.pdf"
                      className="inline-block font-cinzel tracking-[0.15em] text-[0.7rem] font-bold px-8 py-3 bg-primary text-primary-foreground rounded-sm border border-primary/50 hover:bg-primary/90 hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(201,169,110,0.25)] transition-all duration-500 animate-cta-glow uppercase"
                    >
                      Baixar Ebook
                    </a>
                    <p className="font-readable text-foreground/20 text-[10px] mt-4 tracking-wider">
                      O download começará automaticamente
                    </p>
                  </div>
                )}

                {/* ══ Form Steps ══ */}
                {step < 3 && (
                  <>
                    {/* Step hook */}
                    <div className="mb-5 sm:mb-6 flex items-start gap-3 px-1">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-0.5">
                        <img src="/images/capa-ebook.jpeg" alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-readable text-primary/50 text-[10px] tracking-[0.15em] uppercase mb-0.5">
                          {STEP_HOOKS[step]?.eyebrow}
                        </p>
                        <p className="font-readable text-foreground/40 text-[0.78rem] leading-[1.55] italic">
                          {STEP_HOOKS[step]?.text}
                        </p>
                      </div>
                    </div>

                    {/* Fields */}
                    <div className="space-y-4">

                      {/* ── Step 1: Contact ── */}
                      {step === 0 && (
                        <>
                          <div>
                            <label htmlFor="ebook-name" className={labelClass}>Seu nome</label>
                            <input
                              id="ebook-name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Como devemos te chamar?"
                              className={fieldErrors.name ? inputError : inputNormal}
                            />
                            <FieldError msg={fieldErrors.name} />
                          </div>
                          <div>
                            <label htmlFor="ebook-email" className={labelClass}>Seu melhor email</label>
                            <input
                              id="ebook-email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="seu@email.com"
                              className={fieldErrors.email ? inputError : inputNormal}
                            />
                            <FieldError msg={fieldErrors.email} />
                          </div>
                          <div>
                            <label htmlFor="ebook-whatsapp" className={labelClass}>WhatsApp</label>
                            <input
                              id="ebook-whatsapp"
                              type="tel"
                              value={whatsapp}
                              onChange={(e) => setWhatsapp(formatWhatsapp(e.target.value))}
                              placeholder="(11) 99999-9999"
                              className={fieldErrors.whatsapp ? inputError : inputNormal}
                            />
                            <FieldError msg={fieldErrors.whatsapp} />
                          </div>
                        </>
                      )}

                      {/* ── Step 2: Tarot Experience ── */}
                      {step === 1 && (
                        <>
                          {/* Já tira tarô? */}
                          <fieldset className="border-0 p-0 m-0">
                            <legend className={labelClass}>Você já tira tarô?</legend>
                            <div className="flex gap-3 mt-1.5" role="group">
                              {[
                                { value: true, label: "Sim" },
                                { value: false, label: "Ainda não" },
                              ].map((opt) => (
                                <button
                                  key={String(opt.value)}
                                  type="button"
                                  aria-pressed={jaTiraTaro === opt.value}
                                  onClick={() => setJaTiraTaro(opt.value)}
                                  className={`flex-1 py-2.5 rounded-sm border text-sm font-readable transition-colors duration-200 cursor-pointer ${
                                    jaTiraTaro === opt.value
                                      ? "bg-primary/15 border-primary/40 text-foreground shadow-[0_0_12px_rgba(201,169,110,0.08)]"
                                      : "bg-white/[0.02] border-primary/10 text-foreground/40 hover:border-primary/20 hover:text-foreground/60"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                            <FieldError msg={fieldErrors.taro} />
                          </fieldset>

                          {/* Nível (conditional, CSS transition) */}
                          <div
                            className="transition-all duration-300 ease-out overflow-hidden"
                            style={{
                              maxHeight: nivelVisible ? "300px" : "0px",
                              opacity: nivelVisible ? 1 : 0,
                            }}
                          >
                            <div className="pt-1">
                              <p className={labelClass} id="nivel-label">Qual seu nível?</p>
                              <div className="space-y-2 mt-1.5" role="radiogroup" aria-labelledby="nivel-label">
                                {NIVEL_OPTIONS.map((opt) => (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    role="radio"
                                    aria-checked={nivel === opt.value}
                                    onClick={() => setNivel(opt.value)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm border text-left transition-colors duration-200 cursor-pointer ${
                                      nivel === opt.value
                                        ? "bg-primary/12 border-primary/35 shadow-[0_0_12px_rgba(201,169,110,0.06)]"
                                        : "bg-white/[0.02] border-primary/8 hover:border-primary/18"
                                    }`}
                                  >
                                    <div
                                      className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-colors duration-200 flex items-center justify-center ${
                                        nivel === opt.value ? "border-primary bg-primary/30" : "border-primary/20"
                                      }`}
                                    >
                                      {nivel === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                    </div>
                                    <div>
                                      <span className={`font-readable text-sm block ${nivel === opt.value ? "text-foreground" : "text-foreground/50"}`}>
                                        {opt.label}
                                      </span>
                                      <span className="font-readable text-foreground/25 text-[11px]">{opt.desc}</span>
                                    </div>
                                  </button>
                                ))}
                              </div>
                              <FieldError msg={fieldErrors.nivel} />
                            </div>
                          </div>
                        </>
                      )}

                      {/* ── Step 3: Expectations ── */}
                      {step === 2 && (
                        <div>
                          <p className={labelClass} id="expectativas-label">O que você espera com esse guia?</p>
                          <p className="font-readable text-foreground/20 text-[10px] mb-2.5 tracking-wide" id="expectativas-desc">
                            Selecione uma ou mais opções
                          </p>
                          <div className="grid grid-cols-2 gap-2" role="group" aria-labelledby="expectativas-label" aria-describedby="expectativas-desc">
                            {EXPECTATIVA_OPTIONS.map((opt) => {
                              const sel = expectativas.includes(opt.value);
                              return (
                                <button
                                  key={opt.value}
                                  type="button"
                                  aria-pressed={sel}
                                  onClick={() => toggleExpectativa(opt.value)}
                                  className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-sm border text-left transition-colors duration-200 cursor-pointer overflow-hidden ${
                                    sel
                                      ? "bg-primary/12 border-primary/35 shadow-[0_0_12px_rgba(201,169,110,0.06)]"
                                      : "bg-white/[0.02] border-primary/8 hover:border-primary/18 hover:bg-white/[0.03]"
                                  }`}
                                >
                                  {sel && <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />}
                                  <span className={`text-xs relative z-10 ${sel ? "text-primary" : "text-foreground/20"}`}>{opt.icon}</span>
                                  <span className={`font-readable text-[0.8rem] relative z-10 ${sel ? "text-foreground/90" : "text-foreground/40"}`}>{opt.label}</span>
                                  <span className={`ml-auto text-[10px] relative z-10 transition-opacity duration-200 ${sel ? "text-primary opacity-100" : "opacity-0"}`}>✓</span>
                                </button>
                              );
                            })}
                          </div>
                          <FieldError msg={fieldErrors.expectativas} />
                        </div>
                      )}
                    </div>

                    {/* Server error */}
                    {errorMessage && (
                      <p className="font-readable text-rose-400/80 text-xs text-center mt-3">{errorMessage}</p>
                    )}
                  </>
                )}
              </div>

              {/* Navigation — outside animated wrapper */}
              {step < 3 && (
                <div className="flex items-center gap-3 mt-5 sm:mt-6">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="font-readable text-foreground/30 text-xs hover:text-foreground/55 transition-colors duration-200 px-3 py-2 cursor-pointer"
                    >
                      ← voltar
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={`flex-1 font-cinzel tracking-[0.15em] text-[0.68rem] sm:text-[0.72rem] font-bold px-6 py-3 sm:py-3.5 rounded-sm border transition-all duration-500 uppercase ${
                      status === "loading"
                        ? "bg-primary/50 text-primary-foreground/50 border-primary/30 cursor-wait"
                        : "bg-primary text-primary-foreground border-primary/50 hover:bg-primary/90 hover:translate-y-[-1px] hover:shadow-[0_6px_20px_rgba(201,169,110,0.2)] animate-cta-glow cursor-pointer"
                    } ${shakeButton ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
                  >
                    {status === "loading" ? "Enviando..." : step < 2 ? "Continuar" : "Receber Meu Ebook"}
                  </button>
                </div>
              )}
            </form>

            {/* Footer */}
            {step < 3 && (
              <div className="px-5 sm:px-6 pb-4 sm:pb-5">
                <p className="font-readable text-foreground/15 text-[9px] sm:text-[10px] text-center tracking-wider">
                  ✦ Seus dados estão seguros. Sem spam, prometemos. ✦
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EbookOptinModal;
