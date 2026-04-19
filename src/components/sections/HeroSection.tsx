import { useState, useCallback, useRef, useEffect } from "react";
import Player from "@vimeo/player";
import TextureSection from "../TextureSection";
import Ornament from "../Ornament";
import CTAButton from "../CTAButton";

const VIMEO_ID = "1184470820";

const HeroSection = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [realProgress, setRealProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  /* ─── Accelerated progress: first 50% real → 75% visual ─── */
  const visualProgress =
    realProgress <= 50
      ? (realProgress / 50) * 75
      : 75 + ((realProgress - 50) / 50) * 25;

  /* ─── Initialize Vimeo Player ─── */
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const player = new Player(iframe);
    playerRef.current = player;

    player.on("loaded", () => {
      setIsReady(true);
    });

    player.on("timeupdate", (data: { seconds: number; duration: number }) => {
      setRealProgress((data.seconds / data.duration) * 100);
      setDuration(data.duration);
    });

    player.ready().then(() => {
      setIsReady(true);
    });

    return () => {
      player.off("loaded");
      player.off("timeupdate");
      playerRef.current = null;
    };
  }, []);

  /* ─── Click: unmute (first tap) or toggle play/pause ─── */
  const handleClick = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    if (isMuted) {
      player.setMuted(false);
      player.setVolume(0.7);
      setIsMuted(false);
    } else {
      player.getPaused().then((paused) => {
        paused ? player.play() : player.pause();
      });
    }
  }, [isMuted]);

  /* ─── Seek ─── */
  const handleSeek = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const player = playerRef.current;
      const bar = progressBarRef.current;
      if (!player || !bar || !duration) return;

      const rect = bar.getBoundingClientRect();
      const clickPct = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width)
      );
      // Reverse the accelerated mapping
      const realPct =
        clickPct <= 0.75
          ? (clickPct / 0.75) * 0.5
          : 0.5 + ((clickPct - 0.75) / 0.25) * 0.5;
      player.setCurrentTime(realPct * duration);
      setRealProgress(realPct * 100);
    },
    [duration]
  );

  /* ─── Vimeo iframe URL: background=1 is the key ─── */
  const vimeoSrc = `https://player.vimeo.com/video/${VIMEO_ID}?background=1&autoplay=1&loop=1&muted=1&playsinline=1`;

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
              Aprenda tarô de forma profunda, simbólica e intuitiva — sem
              decorar significados.
            </p>
            <p className="fade-item font-body text-foreground/60 text-sm md:text-base mb-6 lg:mb-8">
              Para quem quer se conhecer e ler com autonomia.
            </p>
            <div className="fade-item hidden lg:block">
              <CTAButton
                text="QUERO ENTRAR NO PORTAL"
                scrollTo="identificacao"
              />
            </div>
          </div>

          {/* ─── RIGHT: Vimeo Video (background mode) ─── */}
          <div className="fade-item order-2 w-full max-w-xl mx-auto lg:max-w-none">
            <div
              className="relative w-full rounded-md overflow-hidden shadow-[0_4px_60px_rgba(201,169,110,0.12)] border border-primary/10 cursor-pointer"
              onClick={handleClick}
            >
              {/* 16:9 wrapper */}
              <div
                className="relative w-full bg-[#0a0505]"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  ref={iframeRef}
                  src={vimeoSrc}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                  title="Vídeo de apresentação"
                />

                {/* Click overlay (captures clicks instead of iframe) */}
                <div className="absolute inset-0 z-10" />

                {/* Unmute button */}
                {isMuted && isReady && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/15 shadow-lg animate-[pulse-gentle_2s_ease-in-out_infinite]">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="rgba(255,255,255,0.85)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon
                            points="11,5 6,9 2,9 2,15 6,15 11,19"
                            fill="rgba(255,255,255,0.85)"
                          />
                          <line x1="23" y1="9" x2="17" y2="15" />
                          <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                      </div>
                      <span className="font-editorial italic text-foreground/80 text-[11px] tracking-wider bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        Toque para ouvir
                      </span>
                    </div>
                  </div>
                )}

                {/* Loading */}
                {!isReady && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0a0505]">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {/* Progress bar */}
              <div
                ref={progressBarRef}
                className="absolute bottom-0 left-0 right-0 z-30 h-[3px] bg-white/10 cursor-pointer"
                onClick={handleSeek}
              >
                <div
                  className="h-full rounded-r-full transition-[width] duration-200 ease-linear"
                  style={{
                    width: `${visualProgress}%`,
                    background:
                      "linear-gradient(90deg, hsl(39,40%,60%), hsl(39,50%,70%))",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ─── MOBILE CTA ─── */}
          <div className="fade-item order-3 lg:hidden flex justify-center w-full">
            <CTAButton
              text="QUERO ENTRAR NO PORTAL"
              scrollTo="identificacao"
            />
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
