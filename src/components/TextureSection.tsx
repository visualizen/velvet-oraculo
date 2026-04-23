import { useEffect, useRef, type ReactNode } from "react";

interface TextureSectionProps {
  texture: string;
  overlay?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

const TextureSection = ({ texture, overlay = "rgba(18,8,8,0.6)", children, className = "", id }: TextureSectionProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-item").forEach((el, i) => {
              (el as HTMLElement).style.animationDelay = `${i * 0.15}s`;
              el.classList.add("animate-fade-in-up");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative section-texture texture-overlay ${className}`}
      style={{ backgroundImage: `url(${texture})` }}
    >
      <div className="absolute inset-0" style={{ background: overlay }} />
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
};

export default TextureSection;
