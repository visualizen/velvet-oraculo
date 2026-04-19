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
  const [realProgress, setRealProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  /* ─── Accelerated progress ─── */
  const visualProgress =
    realProgress <= 50
      ? (realProgress / 50) * 75
      : 75 + ((realProgress - 50) / 50) * 25;

  /* ─── Bytedance / TikTok Webview Hacks ─── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // React might strip custom attributes, so we apply them directly to the DOM.
    // These are specifically for Tencent X5 and Bytedance WebViews (TikTok)
    // to force "same-layer" rendering and inline playback instead of native fullscreen.
    v.setAttribute("x5-video-player-type", "h5"); // Force h5 player instead of native
    v.setAttribute("x5-video-player-fullscreen", "false"); // Disable X5 fullscreen
    v.setAttribute("x5-playsinline", "true");
    v.setAttribute("webkit-playsinline", "true");
    v.setAttribute("playsinline", "true");
    v.setAttribute("x-webkit-airplay", "deny");
    
    // Attempt programmatic play to ensure we capture the state
    const tryPlay = () => {
      v.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
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

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  /* ─── Click: unmute (first tap) or toggle play/pause ─── */
  const handleClick = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;

    if (isMuted) {
      v.muted = false;
      v.volume = 0.7;
      setIsMuted(false);
      // Ensure it plays if it was blocked by autoplay policies
      if (v.paused) v.play().catch(() => {});
    } else {
      v.paused ? v.play().catch(() => {}) : v.pause();
    }
  }, [isMuted]);

  /* ─── Seek ─── */
  const handleSeek = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
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
              <div className="relative w-full bg-[#0a0505]" style={{ paddingBottom: "56.25%" }}>
                {/* 
                  Native video with all attributes. 
                  The extra x5 attributes are injected via useEffect. 
                */}
                <video
                  ref={videoRef}
                  src={VIDEO_URL}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover"
                  onTimeUpdate={() => {
                    const v = videoRef.current;
                    if (!v || !v.duration) return;
                    setRealProgress((v.currentTime / v.duration) * 100);
                    setDuration(v.duration);
                  }}
                />

                {/* Click overlay */}
                <div className="absolute inset-0 z-10" />

                {/* Show unmute button OR large play button if autoplay failed */}
                {isReady && (
                   isMuted || !isPlaying ? (
                    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/15 shadow-lg animate-[pulse-gentle_2s_ease-in-out_infinite]">
                        {!isPlaying ? (
                          /* Large play icon if video is completely paused/blocked */
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)">
                             <polygon points="8,5 19,12 8,19" />
                           </svg>
                        ) : (
                          /* Unmute icon if it's playing but muted */
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="rgba(255,255,255,0.85)" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                          </svg>
                        )}
                      </div>
                    </div>
                  ) : null
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
                    background: "linear-gradient(90deg, hsl(39,40%,60%), hsl(39,50%,70%))",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ─── MOBILE CTA ─── */}
          <div className="fade-item order-3 lg:hidden flex justify-center w-full">
            <CTAButton />
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
