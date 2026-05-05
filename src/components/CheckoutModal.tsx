import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Ornament from "./Ornament";
import { supabase } from "@/lib/supabase";

const KIWIFY_CHECKOUT_URL = "https://pay.kiwify.com.br/GBx9stV";



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
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Reset all fields when modal closes
  const resetForm = useCallback(() => {
    setName("");
    setEmail("");
    setPhone("");
    setError("");
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

    // Direct redirect
    window.location.href = checkoutUrl;
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
                12x de R$27,92 · Garantia incondicional de 7 dias
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
