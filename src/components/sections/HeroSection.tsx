import { useEffect, useRef, useState, useCallback } from "react";
import TextureSection from "../TextureSection";
import Ornament from "../Ornament";
import CTAButton from "../CTAButton";

const VIMEO_VIDEO_ID = "1184470820";

const HeroSection = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>();

  /* ─── Vimeo SDK ─── */
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://player.vimeo.com/api/player.js"]'
    );

    const init = () => {
      if (!iframeRef.current || !(window as any).Vimeo) return;

      const player = new (window as any).Vimeo.Player(iframeRef.current);
      playerRef.current = player;

      player.ready().then(() => {
        setIsReady(true);
        player.setVolume(0);
        player.play().catch(() => {});
      });

      player.on("timeupdate", (d: any) => {
        setCurrentTime(d.seconds);
        setProgress(d.percent * 100);
      });

      player.getDuration().then((d: number) => setDuration(d));
      player.on("play", () => setIsPlaying(true));
      player.on("pause", () => setIsPlaying(false));
      player.on("ended", () => {
        setIsPlaying(false);
        setProgress(100);
      });
    };

    if (existing) {
      (window as any).Vimeo ? init() : existing.addEventListener("load", init);
    } else {
      const s = document.createElement("script");
      s.src = "https://player.vimeo.com/api/player.js";
      s.async = true;
      s.onload = init;
      document.head.appendChild(s);
    }

    return () => {
      playerRef.current?.destroy();
    };
  }, []);

  /* ─── Controls auto-hide ─── */
  const resetHide = useCallback(() => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    } else {
      resetHide();
    }
  }, [isPlaying, resetHide]);

  const handleVideoClick = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    p.setCurrentTime(0).then(() => p.play());
    resetHide();
  }, [resetHide]);

  const togglePlay = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const p = playerRef.current;
      if (!p) return;
      isPlaying ? p.pause() : p.play();
      resetHide();
    },
    [isPlaying, resetHide]
  );

  const toggleMute = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const p = playerRef.current;
      if (!p) return;
      if (isMuted) {
        p.setVolume(0.7);
        setIsMuted(false);
      } else {
        p.setVolume(0);
        setIsMuted(true);
      }
      resetHide();
    },
    [isMuted, resetHide]
  );

  const handleSeek = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const p = playerRef.current;
      const bar = progressBarRef.current;
      if (!p || !bar || !duration) return;
      const rect = bar.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      p.setCurrentTime(pct * duration);
      setProgress(pct * 100);
      resetHide();
    },
    [duration, resetHide]
  );

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

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
          <div
            className="fade-item order-2 w-full max-w-xl mx-auto lg:max-w-none"
            onMouseMove={resetHide}
            onMouseEnter={() => setShowControls(true)}
          >
            <div
              className="relative w-full rounded-md overflow-hidden shadow-[0_4px_60px_rgba(201,169,110,0.12)] border border-primary/10 cursor-pointer"
              onClick={handleVideoClick}
            >
              {/* 16:9 aspect-ratio wrapper */}
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                {/* Vimeo iframe */}
                <iframe
                  ref={iframeRef}
                  src={`https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&controls=0&title=0&byline=0&portrait=0`}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="vídeo landingpage"
                  className="absolute inset-0 w-full h-full border-0"
                />

                {/* Click overlay (captures clicks above the iframe) */}
                <div className="absolute inset-0 z-10" />

                {/* Loading */}
                {!isReady && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0a0505]">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="font-editorial italic text-foreground/40 text-xs tracking-[0.2em]">
                        Carregando...
                      </span>
                    </div>
                  </div>
                )}

                {/* Ended overlay */}
                {!isPlaying && progress >= 99 && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-2">
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="hsl(39,40%,60%)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 12a9 9 0 1 1-6.22-8.56" />
                        <polyline points="21 3 21 9 15 9" />
                      </svg>
                      <span className="font-editorial italic text-foreground text-xs tracking-wider">
                        Assistir novamente
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* ─── Controls ─── */}
              <div
                className={`absolute bottom-0 left-0 right-0 z-30 transition-all duration-500 ${
                  showControls
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,5,5,0.95) 0%, rgba(10,5,5,0.5) 70%, transparent 100%)",
                  padding: "1.5rem 0.75rem 0.5rem",
                }}
              >
                {/* Progress */}
                <div
                  ref={progressBarRef}
                  className="group w-full h-1 bg-white/10 rounded-full cursor-pointer mb-2 relative hover:h-1.5 transition-all duration-200"
                  onClick={handleSeek}
                >
                  <div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      background:
                        "linear-gradient(90deg, hsl(39,40%,60%), hsl(39,50%,70%))",
                    }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_6px_rgba(201,169,110,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ left: `calc(${progress}% - 5px)` }}
                  />
                </div>

                {/* Buttons row */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="text-foreground hover:text-primary transition-colors p-0.5"
                    aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                  >
                    {isPlaying ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="6,4 20,12 6,20" />
                      </svg>
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="text-foreground hover:text-primary transition-colors p-0.5"
                    aria-label={isMuted ? "Ativar som" : "Silenciar"}
                  >
                    {isMuted ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                    )}
                  </button>

                  <span className="font-readable text-foreground/50 text-[10px] tabular-nums tracking-wider ml-auto">
                    {fmt(currentTime)} / {fmt(duration)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ─── MOBILE CTA (below video) ─── */}
          <div className="fade-item order-3 lg:hidden flex justify-center w-full">
            <CTAButton />
          </div>
        </div>
      </div>
    </TextureSection>
  );
};

export default HeroSection;
