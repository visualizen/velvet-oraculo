import { useState, useRef, useEffect } from "react";
import TextureSection from "@/components/TextureSection";
import Ornament from "@/components/Ornament";

const WHATSAPP_NUMBER = "5547991770604";

interface StepConfig {
  label: string;
  sublabel: string;
  placeholder: string;
  type: "textarea" | "text" | "date";
  field: "question" | "name" | "birthDate";
}

const steps: StepConfig[] = [
  {
    label: "O que gostaria de saber do oráculo?",
    sublabel: "Conte-me brevemente sua pergunta ou intenção",
    placeholder: "Ex: Gostaria de entender melhor meu momento profissional...",
    type: "textarea",
    field: "question",
  },
  {
    label: "Seu nome",
    sublabel: "Como devemos te chamar?",
    placeholder: "Seu nome completo",
    type: "text",
    field: "name",
  },
  {
    label: "Data de nascimento",
    sublabel: "Para uma leitura mais precisa e pessoal",
    placeholder: "",
    type: "date",
    field: "birthDate",
  },
];

const ConsultaPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    question: "",
    name: "",
    birthDate: "",
  });
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    document.title = "Consulta de Tarô Online · Velvet Oráculo";
    return () => { document.title = "Curso de Tarot Online · Do Básico ao Avançado · Velvet Oráculo"; };
  }, []);

  useEffect(() => {
    // Focus input when step changes
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 400);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleNext = () => {
    const step = steps[currentStep];
    if (!formData[step.field].trim()) return;

    if (currentStep < steps.length - 1) {
      setDirection("forward");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      // Format date from YYYY-MM-DD to DD/MM/AAAA
      const [y, m, d] = formData.birthDate.split("-");
      const formattedDate = `${d}/${m}/${y}`;

      const message = encodeURIComponent(
        `Olá, gostaria de uma consulta de tarô\n\n` +
          `Pergunta: ${formData.question}\n` +
          `Nome completo: ${formData.name}\n` +
          `Data de nascimento: ${formattedDate}`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection("backward");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && steps[currentStep].type !== "textarea") {
      e.preventDefault();
      handleNext();
    }
    if (e.key === "Enter" && e.metaKey && steps[currentStep].type === "textarea") {
      e.preventDefault();
      handleNext();
    }
  };

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = formData[step.field].trim().length > 0;

  return (
    <TextureSection
      texture="/textures/velvet-burgundy.jpg"
      overlay="rgba(18,8,8,0.82)"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="w-full max-w-lg mx-auto px-6 py-16 flex flex-col items-center text-shadow-dark">
        {/* Header */}
        <p className="font-editorial italic text-primary/70 text-xs tracking-[0.3em] uppercase mb-4">
          ✦ Consulta de Tarô ✦
        </p>
        <Ornament className="mb-10 opacity-40" />

        {/* Progress Dots */}
        <div className="flex items-center gap-3 mb-10">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`transition-all duration-500 rounded-full ${
                i === currentStep
                  ? "w-3 h-3 bg-primary shadow-[0_0_12px_rgba(201,169,110,0.5)]"
                  : i < currentStep
                  ? "w-2.5 h-2.5 bg-primary/60"
                  : "w-2 h-2 bg-primary/20"
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div
          className={`w-full transition-all duration-300 ${
            isAnimating
              ? direction === "forward"
                ? "opacity-0 translate-x-8"
                : "opacity-0 -translate-x-8"
              : "opacity-100 translate-x-0"
          }`}
        >
          {/* Question */}
          <h2 className="font-display text-xl md:text-2xl text-foreground text-center mb-2 leading-tight">
            {step.label}
          </h2>
          <p className="font-body text-foreground/50 text-sm text-center mb-8">
            {step.sublabel}
          </p>

          {/* Input */}
          <div className="w-full">
            {step.type === "textarea" ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={formData[step.field]}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [step.field]: e.target.value }))
                }
                onKeyDown={handleKeyDown}
                placeholder={step.placeholder}
                rows={4}
                className="w-full bg-white/[0.04] border border-primary/20 rounded-sm px-5 py-4 text-foreground font-body text-base placeholder:text-foreground/25 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(201,169,110,0.1)] transition-all duration-300 resize-none"
              />
            ) : step.type === "date" ? (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="date"
                value={formData[step.field]}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [step.field]: e.target.value }))
                }
                onKeyDown={handleKeyDown}
                className="w-full bg-white/[0.04] border border-primary/20 rounded-sm px-5 py-4 text-foreground font-body text-base placeholder:text-foreground/25 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(201,169,110,0.1)] transition-all duration-300 [color-scheme:dark]"
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                value={formData[step.field]}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [step.field]: e.target.value }))
                }
                onKeyDown={handleKeyDown}
                placeholder={step.placeholder}
                className="w-full bg-white/[0.04] border border-primary/20 rounded-sm px-5 py-4 text-foreground font-body text-base placeholder:text-foreground/25 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(201,169,110,0.1)] transition-all duration-300"
              />
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-10 w-full">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="font-editorial italic text-foreground/40 text-sm hover:text-foreground/70 transition-colors duration-300 px-4 py-3"
            >
              ← voltar
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`flex-1 font-display tracking-[0.15em] text-sm font-bold px-8 py-4 rounded-sm border transition-all duration-500 ${
              canProceed
                ? "bg-primary text-primary-foreground border-primary/50 hover:bg-primary/90 animate-cta-glow cursor-pointer"
                : "bg-primary/10 text-foreground/30 border-primary/10 cursor-not-allowed"
            }`}
          >
            {isLastStep ? "INICIAR CONSULTA" : "CONTINUAR"}
          </button>
        </div>

        {/* Hint */}
        <p className="font-body text-foreground/20 text-xs mt-6 text-center">
          {step.type === "textarea"
            ? "⌘ + Enter para continuar"
            : "Enter para continuar"}
        </p>

        {/* Footer Ornament */}
        <Ornament className="mt-12 opacity-20" />
      </div>
    </TextureSection>
  );
};

export default ConsultaPage;
