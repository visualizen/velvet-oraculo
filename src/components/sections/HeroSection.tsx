import { useState, useCallback, useRef } from "react";
import TextureSection from "../TextureSection";
import Ornament from "../Ornament";
import CTAButton from "../CTAButton";

const VIDEO_URL =
  "https://gvhqihdqxqiiokyhteba.supabase.co/storage/v1/object/public/videos/video-landingpage.mp4";

const IS_RESTRICTIVE_APP = (() => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /BytedanceWebview|TikTok|Musical_ly|Instagram|FBAN|FBAV/i.test(ua);
})();

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(IS_RESTRICTIVE_APP);
  const [realProgress, setRealProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // TikTok: starts with GIF, tapping swaps to real video
  const [showGif, setShowGif] = useState(IS_RESTRICTIVE_APP);

  const visualProgress =
    realProgress <= 50
      ? (realProgress / 50) * 75
      : 75 + ((realProgress - 50) / 50) * 25;

  /* ─── Click ─── */
  const handleClick = useCallback(() => {
    // TikTok GIF mode: swap to real video (will go fullscreen, that's OK)
    if (showGif) {
      setShowGif(false);
      setIsMuted(false);
      setIsReady(false);
      setTimeout(() => {
        const v = videoRef.current;
        if (v) {
          v.muted = false;
          v.volume = 0.7;
          v.play().catch(() => {});
        }
      }, 100);
      return;
    }

    // Normal: unmute on first tap, toggle play/pause after
    const v = videoRef.current;
    if (!v) return;

    if (isMuted) {
      v.muted = false;
      v.volume = 0.7;
      setIsMuted(false);
      if (v.paused) v.play().catch(() => {});
    } else {
      v.paused ? v.play().catch(() => {}) : v.pause();
    }
  }, [isMuted, showGif]);

  /* ─── Seek ─── */
  const handleSeek = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (showGif) return;
      const v = videoRef.current;
      const bar = progressBarRef.current;
      if (!v || !bar || !duration) return;
      const rect = bar.getBoundingClientRect();
      const clickPct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const realPct =
        clickPct <= 0.75
          ? (clickPct / 0.75) * 0.5
          : 0.5 + ((clickPct - 0.75) / 0.25) * 0.5;
      v.currentTime = realPct * duration;
      setRealProgress(realPct * 100);
    },
    [duration, showGif]
  );

  return (
    <TextureSection
      texture="/textures/dark-parchment.jpg"
      overlay="rgba(18,8,8,0.82)"
      className=""
    >
      <div className="w-full max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 min-h-[80vh] lg:min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center w-full py-10 md:py-16 lg:py-0">
          {/* ─── LEFT: Copy ─── */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start text-shadow-dark order-1">
            <p className="fade-item font-editorial italic text-primary text-sm md:text-base tracking-[0.3em] uppercase mb-5">
              ✦ Velvet Oráculo ✦
            </p>
            <Ornament className="fade-item mb-6 lg:mb-8" />
            <h1 className="fade-item font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-5xl text-foreground leading-[1.15] mb-4 lg:mb-5">
              O tarô não só prevê o futuro.<br />
              Ele mostra <em className="font-editorial italic text-primary">quem você está sendo.</em>
            </h1>
            <p className="fade-item font-editorial italic text-foreground/90 text-base md:text-lg lg:text-xl leading-relaxed mb-3 lg:mb-4 max-w-lg">
              Um curso para quem sente o chamado do tarô como ferramenta de ascensão espiritual, evolução da alma e encontro consigo mesma.
            </p>
            <p className="fade-item font-body text-foreground/75 text-base md:text-lg mb-6 lg:mb-8">
              Para quem quer se conhecer e ler com autonomia.
            </p>
            <div className="fade-item hidden lg:block">
              <CTAButton text="QUERO ENTRAR NO PORTAL" scrollTo="identificacao" />
            </div>
          </div>

          {/* ─── RIGHT: Video ─── */}
          <div className="fade-item order-2 w-full max-w-xl mx-auto lg:max-w-none">
            <div
              className="relative w-full rounded-md overflow-hidden shadow-[0_4px_60px_rgba(201,169,110,0.12)] border border-primary/10 cursor-pointer"
              onClick={handleClick}
            >
              <div className="relative w-full bg-[#0a0505]" style={{ paddingBottom: "56.25%" }}>
                {showGif ? (
                  /* ─── TikTok: animated GIF preview ─── */
                  <img
                    src="/tiktok-preview.gif"
                    alt="Preview do vídeo"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  /* ─── Real video ─── */
                  <video
                    ref={videoRef}
                    src={VIDEO_URL}
                    autoPlay={!IS_RESTRICTIVE_APP}
                    muted={isMuted}
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoadedData={() => setIsReady(true)}
                    onTimeUpdate={() => {
                      const v = videoRef.current;
                      if (!v || !v.duration) return;
                      setRealProgress((v.currentTime / v.duration) * 100);
                      setDuration(v.duration);
                    }}
                  />
                )}

                {/* Click overlay */}
                <div className="absolute inset-0 z-10" />

                {/* ─── Play button (TikTok GIF mode) ─── */}
                {showGif && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-[0_0_30px_rgba(201,169,110,0.4)] animate-[pulse-gentle_2s_ease-in-out_infinite]">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                          <polygon points="8,5 19,12 8,19" />
                        </svg>
                      </div>
                      <span className="font-editorial italic text-foreground text-sm tracking-wider bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full">
                        ▶ Assistir apresentação
                      </span>
                    </div>
                  </div>
                )}

                {/* ─── Unmute button (normal browsers, autoplay muted) ─── */}
                {!showGif && isReady && isMuted && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/15 shadow-lg animate-[pulse-gentle_2s_ease-in-out_infinite]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="rgba(255,255,255,0.85)" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Loading (video mode only) */}
                {!showGif && !isReady && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0a0505]">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {/* Progress bar */}
              {!showGif && isReady && (
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
              )}
            </div>
          </div>

          {/* ─── MOBILE CTA ─── */}
          <div className="fade-item order-3 lg:hidden flex justify-center w-full">
            <CTAButton text="QUERO ENTRAR NO PORTAL" scrollTo="identificacao" />
          </div>
        </div>
      </div>

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
