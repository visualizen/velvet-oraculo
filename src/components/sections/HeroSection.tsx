import { useEffect, useRef, useState, useCallback } from "react";
import TextureSection from "../TextureSection";
import Ornament from "../Ornament";
import CTAButton from "../CTAButton";

const VIDEO_URL =
  "https://gvhqihdqxqiiokyhteba.supabase.co/storage/v1/object/public/videos/video-landingpage.mp4";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [realProgress, setRealProgress] = useState(0); // 0-100 real
  const [duration, setDuration] = useState(0);

  /* ─── Accelerated progress: first half of video fills 75% of bar ─── */
  const getVisualProgress = (real: number) => {
    if (real <= 50) return (real / 50) * 75; // 0-50% real → 0-75% visual
    return 75 + ((real - 50) / 50) * 25; // 50-100% real → 75-100% visual
    // This makes the bar move ~3x faster in the first half
  };

  const visualProgress = getVisualProgress(realProgress);

  /* ─── Init video: force playsinline then play programmatically ─── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Force playsinline attributes BEFORE play
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "true");
    v.setAttribute("x-webkit-airplay", "deny");
    v.playsInline = true;
    v.muted = true;
    v.loop = true;

    // Play programmatically (NOT via autoPlay attribute)
    const tryPlay = () => {
      v.play().catch(() => {
        // Some browsers block even muted autoplay; that's fine
      });
    };

    if (v.readyState >= 3) {
      setIsReady(true);
      tryPlay();
    } else {
      v.addEventListener("canplay", () => {
        setIsReady(true);
        tryPlay();
      }, { once: true });
    }
  }, []);

  /* ─── Video event handlers ─── */
  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setRealProgress((v.currentTime / v.duration) * 100);
    setDuration(v.duration);
  }, []);

  /* ─── Click on video: toggle mute (first click) or play/pause ─── */
  const handleClick = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;

    if (isMuted) {
      // First interaction: unmute
      v.muted = false;
      v.volume = 0.7;
      setIsMuted(false);
    } else {
      // Subsequent: toggle play/pause
      if (v.paused) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    }
  }, [isMuted]);

  /* ─── Seek on progress bar click ─── */
  const handleSeek = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const v = videoRef.current;
      const bar = progressBarRef.current;
      if (!v || !bar || !duration) return;

      const rect = bar.getBoundingClientRect();
      const clickPct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

      // Reverse the visual mapping to get real time
      let realPct: number;
      if (clickPct <= 0.75) {
        realPct = (clickPct / 0.75) * 0.5;
      } else {
        realPct = 0.5 + ((clickPct - 0.75) / 0.25) * 0.5;
      }

      v.currentTime = realPct * duration;
      setRealProgress(realPct * 100);
    },
    [duration]
  );

  return (
    <TextureSection
      texture="/textures/dark-parchment.jpg"
      overlay="rgba(18,8,8,0.82)"
      className="lg:min-h-screen flex items-center"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-10 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 xl:gap-16 items-center">
          {/* ─── LEFT: Copy ─── */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start text-shadow-dark order-1">
            <p className="fade-item font-editorial italic text-primary text-xs md:text-sm tracking-[0.3em] uppercase mb-5">
              ✦ Velvet Oráculo ✦
            </p>

            <Ornament className="fade-item mb-6 lg:mb-8" />

            <h1 className="fade-item font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-5xl text-foreground leading-[1.15] mb-4 lg:mb-5">
              Torne-se mestre do seu próprio oráculo.
            </h1>

            <p className="fade-item font-editorial italic text-foreground/90 text-base md:text-lg lg:text-xl leading-relaxed mb-3 lg:mb-4 max-w-lg">
              Aprenda tarô de forma profunda, simbólica e intuitiva — sem decorar significados.
            </p>

            <p className="fade-item font-body text-foreground/60 text-sm md:text-base mb-6 lg:mb-8">
              Para quem quer se conhecer e ler com autonomia.
            </p>

            {/* CTA visible only on desktop (on mobile it goes below the video) */}
            <div className="fade-item hidden lg:block">
              <CTAButton />
            </div>
          </div>

          {/* ─── RIGHT: Video ─── */}
          <div className="fade-item order-2 w-full max-w-xl mx-auto lg:max-w-none">
            <div
              className="relative w-full rounded-md overflow-hidden shadow-[0_4px_60px_rgba(201,169,110,0.12)] border border-primary/10 cursor-pointer"
              onClick={handleClick}
            >
              {/* 16:9 aspect-ratio wrapper */}
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                {/* Native video — NO autoPlay attribute (triggered via JS) */}
                <video
                  ref={videoRef}
                  src={VIDEO_URL}
                  playsInline
                  muted
                  loop
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover"
                  onTimeUpdate={onTimeUpdate}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => {
                    setIsPlaying(false);
                    setRealProgress(100);
                  }}
                />

                {/* Click overlay */}
                <div className="absolute inset-0 z-10" />

                {/* Unmute button — small, circular, centered */}
                {isMuted && isReady && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div
                      className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/15 shadow-lg"
                      style={{ animation: "pulse-gentle 2s ease-in-out infinite" }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(255,255,255,0.85)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="rgba(255,255,255,0.85)" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Loading spinner */}
                {!isReady && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0a0505]">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {/* ─── Progress bar (always visible, minimal) ─── */}
              <div
                ref={progressBarRef}
                className="absolute bottom-0 left-0 right-0 z-30 h-[3px] bg-white/10 cursor-pointer"
                onClick={handleSeek}
              >
                <div
                  className="h-full rounded-r-full transition-[width] duration-200 ease-linear"
                  style={{
                    width: `${visualProgress}%`,
                    background: "linear-gradient(90deg, hsl(39,40%,60%), hsl(39,50%,70%))",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ─── MOBILE CTA (below video) ─── */}
          <div className="fade-item order-3 lg:hidden flex justify-center w-full">
            <CTAButton />
          </div>
        </div>
      </div>

      {/* Gentle pulse animation for unmute button */}
      <style>{`
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.08); opacity: 1; }
        }
      `}</style>
    </TextureSection>
  );
};

export default HeroSection;
