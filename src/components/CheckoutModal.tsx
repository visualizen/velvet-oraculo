import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Ornament from "./Ornament";
import { supabase } from "@/lib/supabase";

const KIWIFY_CHECKOUT_URL = "https://pay.kiwify.com.br/GBx9stV";

/**
 * Detect if we're inside an in-app browser (TikTok, Instagram, Facebook, etc.)
 * These browsers restrict window.open and sometimes even window.location redirects.
 */
const isInAppBrowser = (): boolean => {
  const ua = navigator.userAgent || navigator.vendor || "";
  return /TikTok|Instagram|FBAN|FBAV|Line\//i.test(ua);
};

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  // State to show the in-app browser redirect screen
  const [inAppRedirectUrl, setInAppRedirectUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  // Reset all fields when modal closes
  const resetForm = useCallback(() => {
    setName("");
    setEmail("");
    setPhone("");
    setError("");
    setInAppRedirectUrl("");
    setCopied(false);
    setTouched({});
    setIsSubmitting(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus name field after animation completes
      const timer = setTimeout(() => nameRef.current?.focus(), 400);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
      resetForm();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, resetForm]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const phoneDigits = phone.replace(/\D/g, "");

  const fieldErrors = {
    name: touched.name && name.trim().length < 2,
    email: touched.email && !validateEmail(email),
    phone: touched.phone && phoneDigits.length < 10,
  };

  const isValid =
    name.trim().length >= 2 &&
    validateEmail(email) &&
    phoneDigits.length >= 10;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  /** Save lead to Supabase + localStorage (fire-and-forget) */
  const saveLead = (lead: { name: string; email: string; phone: string; source: string }) => {
    try {
      supabase.from("checkout_leads").insert(lead).then(() => {});
    } catch {
      // Silent fail
    }
    try {
      const existingLeads = JSON.parse(
        localStorage.getItem("velvet_leads") || "[]"
      );
      existingLeads.push({ ...lead, capturedAt: new Date().toISOString() });
      localStorage.setItem("velvet_leads", JSON.stringify(existingLeads));
    } catch {
      // Silent fail
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched on submit attempt
    setTouched({ name: true, email: true, phone: true });

    if (!isValid) {
      setError("Preencha todos os campos corretamente.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const lead = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phoneDigits,
      source: "sales-page-cta",
    };

    // Build Kiwify checkout URL with pre-populated fields
    const params = new URLSearchParams({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
    });
    const checkoutUrl = `${KIWIFY_CHECKOUT_URL}?${params.toString()}`;

    // Save lead (non-blocking)
    saveLead(lead);

    // === Redirect strategy ===
    // In-app browsers (TikTok, Instagram, etc.) block JS-initiated cross-domain
    // redirects and show interstitial "copy & paste" warnings.
    // For these browsers: show a branded transition screen with a native <a> link
    // (user-tapped links are treated differently) + one-tap copy button.
    // For normal browsers: redirect directly via window.location.href.

    if (isInAppBrowser()) {
      // Show the in-app browser redirect screen instead of trying to redirect
      setInAppRedirectUrl(checkoutUrl);
      setIsSubmitting(false);
    } else {
      // Normal browser: direct redirect
      window.location.href = checkoutUrl;
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inAppRedirectUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = inAppRedirectUrl;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // Only close when clicking the actual backdrop, not the card
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const inputBaseClass =
    "w-full bg-white/[0.04] border rounded-sm px-4 py-3 text-foreground font-body text-base placeholder:text-foreground/20 focus:outline-none transition-all duration-300";

  const getInputClass = (field: keyof typeof fieldErrors) =>
    `${inputBaseClass} ${
      fieldErrors[field]
        ? "border-red-400/60 focus:border-red-400/80 shadow-[0_0_16px_rgba(244,63,94,0.12)]"
        : "border-primary/20 focus:border-primary/50 focus:shadow-[0_0_20px_rgba(201,169,110,0.08)]"
    }`;

  // =========================================================================
  // IN-APP BROWSER REDIRECT SCREEN
  // When we detect TikTok/Instagram/etc., show a beautiful branded screen
  // with a native <a> link the user can tap directly + a copy button.
  // =========================================================================
  if (inAppRedirectUrl) {
    return createPortal(
      <div
        className="fixed inset-0 z-[9999] overflow-y-auto"
        style={{
          background: "rgba(18, 8, 8, 0.96)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="min-h-full flex items-center justify-center px-4 py-8 sm:py-12">
          <div
            ref={cardRef}
            className="relative w-full max-w-md animate-modal-content rounded-sm border border-primary/25 bg-[#1a1020] shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="p-6 sm:p-8">
              {/* Success animation */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full border-2 border-primary/40 flex items-center justify-center"
                  style={{
                    background: "radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)",
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <Ornament className="mb-4 opacity-50" />
                <h3 className="font-editorial italic text-primary text-xl sm:text-2xl mb-2">
                  Dados salvos com sucesso
                </h3>
                <p className="font-body text-foreground/60 text-sm leading-relaxed mb-1">
                  Toque no botão abaixo para ir ao checkout seguro
                </p>
                <p className="font-body text-foreground/35 text-xs leading-relaxed">
                  Seu navegador requer um toque extra para prosseguir
                </p>
              </div>

              {/* Primary CTA: Native <a> link — in-app browsers treat user taps on <a> differently than JS redirects */}
              <a
                ref={anchorRef}
                href={inAppRedirectUrl}
                target="_self"
                rel="noopener"
                className="block w-full text-center bg-primary text-primary-foreground font-cinzel tracking-[0.15em] text-sm font-bold px-8 py-4 rounded-sm border border-primary/50 hover:bg-primary/90 transition-all duration-500 animate-cta-glow no-underline"
              >
                CONTINUAR PARA O CHECKOUT →
              </a>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-primary/10" />
                <span className="font-body text-foreground/25 text-[10px] tracking-widest uppercase">ou</span>
                <div className="flex-1 h-px bg-primary/10" />
              </div>

              {/* Copy link button */}
              <button
                type="button"
                onClick={handleCopyLink}
                className={`w-full flex items-center justify-center gap-2 font-body text-sm px-6 py-3 rounded-sm border transition-all duration-300 ${
                  copied
                    ? "bg-green-500/10 text-green-400 border-green-500/30"
                    : "bg-white/[0.04] text-foreground/60 border-primary/15 hover:border-primary/30 hover:text-foreground/80"
                }`}
              >
                {copied ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Link copiado! Cole no navegador
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copiar link do checkout
                  </>
                )}
              </button>

              {/* Instruction hint for in-app browsers */}
              <div className="mt-5 p-3 rounded-sm bg-white/[0.02] border border-primary/8">
                <p className="font-body text-foreground/40 text-[11px] text-center leading-relaxed">
                  💡 <span className="text-foreground/50">Dica:</span> Se o botão não funcionar, copie o link e abra no <strong className="text-foreground/60">Safari</strong> ou <strong className="text-foreground/60">Chrome</strong>
                </p>
              </div>

              {/* Trust signals */}
              <div className="mt-4 text-center">
                <p className="font-body text-foreground/25 text-[11px] tracking-wide">
                  🔒 Pagamento 100% seguro via Kiwify
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  // =========================================================================
  // NORMAL FORM SCREEN
  // =========================================================================
  return createPortal(
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[9999] overflow-y-auto animate-modal-backdrop"
      style={{
        background: "rgba(18, 8, 8, 0.92)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="min-h-full flex items-center justify-center px-4 py-8 sm:py-12">
        <div
          ref={cardRef}
          className="relative w-full max-w-md animate-modal-content rounded-sm border border-primary/25 bg-[#1a1020] shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full text-foreground/40 hover:text-foreground/80 hover:bg-white/[0.06] transition-all duration-200"
            aria-label="Fechar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>

          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <Ornament className="mb-4 opacity-50" />
              <h3 className="font-editorial italic text-primary text-lg sm:text-xl mb-2">
                Falta pouco para entrar no portal
              </h3>
              <p className="font-body text-foreground/50 text-sm leading-relaxed">
                Preencha seus dados para garantir sua vaga com segurança
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Name */}
              <div>
                <label className="block font-body text-foreground/60 text-xs tracking-wider uppercase mb-1.5">
                  Seu nome
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError("");
                  }}
                  onBlur={() => handleBlur("name")}
                  placeholder="Como deseja ser chamada?"
                  className={getInputClass("name")}
                  autoComplete="name"
                />
                {fieldErrors.name && (
                  <p className="text-red-400/80 text-xs font-body mt-1.5 ml-1">
                    Informe seu nome (mínimo 2 caracteres)
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-body text-foreground/60 text-xs tracking-wider uppercase mb-1.5">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  onBlur={() => handleBlur("email")}
                  placeholder="seu@email.com"
                  className={getInputClass("email")}
                  autoComplete="email"
                />
                {fieldErrors.email && (
                  <p className="text-red-400/80 text-xs font-body mt-1.5 ml-1">
                    Informe um e-mail válido
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-body text-foreground/60 text-xs tracking-wider uppercase mb-1.5">
                  WhatsApp (com DDD)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(formatPhone(e.target.value));
                    if (error) setError("");
                  }}
                  onBlur={() => handleBlur("phone")}
                  placeholder="(00) 00000-0000"
                  className={getInputClass("phone")}
                  autoComplete="tel"
                />
                {fieldErrors.phone && (
                  <p className="text-red-400/80 text-xs font-body mt-1.5 ml-1">
                    Informe um WhatsApp válido com DDD
                  </p>
                )}
              </div>


              {error && (
                <p className="text-red-400/80 text-sm font-body text-center py-1">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-cinzel tracking-[0.15em] text-sm font-bold px-8 py-4 rounded-sm border transition-all duration-500 mt-2 ${
                  isSubmitting
                    ? "bg-primary/20 text-foreground/40 border-primary/10 cursor-wait"
                    : isValid
                      ? "bg-primary text-primary-foreground border-primary/50 hover:bg-primary/90 animate-cta-glow cursor-pointer"
                      : "bg-primary/10 text-foreground/30 border-primary/10 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    REDIRECIONANDO...
                  </span>
                ) : (
                  "COMEÇAR JORNADA"
                )}
              </button>
            </form>

            {/* Trust signals */}
            <div className="mt-5 text-center space-y-1.5">
              <p className="font-body text-foreground/30 text-[11px] tracking-wide">
                🔒 Seus dados estão protegidos · Pagamento via Kiwify
              </p>
              <p className="font-body text-foreground/25 text-[11px]">
                12x de R$27,67 · Garantia incondicional de 7 dias
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CheckoutModal;
