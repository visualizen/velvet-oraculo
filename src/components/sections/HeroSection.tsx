import { useState, useCallback, useRef, useEffect } from "react";
import TextureSection from "../TextureSection";
import Ornament from "../Ornament";
import CTAButton from "../CTAButton";

const VIDEO_URL =
  "https://gvhqihdqxqiiokyhteba.supabase.co/storage/v1/object/public/videos/video-landingpage.mp4";

/*
  TikTok / IG / FB in-app browser detection.
  These webviews force ANY <video> element into native fullscreen.
  Solution: use animated GIF + <audio> element (never <video>).
*/
const IS_RESTRICTIVE_APP = (() => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /BytedanceWebview|TikTok|Musical_ly|Instagram|FBAN|FBAV/i.test(ua);
})();

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(IS_RESTRICTIVE_APP); // GIF is always "ready"
  const [realProgress, setRealProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  /* ─── Accelerated progress: first 50% real → 75% visual ─── */
  const visualProgress =
    realProgress <= 50
      ? (realProgress / 50) * 75
      : 75 + ((realProgress - 50) / 50) * 25;

  /* ─── Audio progress tracking (TikTok mode) ─── */
  useEffect(() => {
    if (!IS_RESTRICTIVE_APP) return;
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (!audio.duration) return;
      setRealProgress((audio.currentTime / audio.duration) * 100);
      setDuration(audio.duration);
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      // Loop audio
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  /* ─── Click handler ─── */
  const handleClick = useCallback(() => {
    if (IS_RESTRICTIVE_APP) {
      // TikTok mode: toggle audio only, NEVER create a <video>
      const audio = audioRef.current;
      if (!audio) return;

      if (isMuted) {
        // First tap: start playing audio
        audio.volume = 0.7;
        audio.play().catch(() => {});
        setIsMuted(false);
        setIsPlaying(true);
      } else {
        // Subsequent taps: toggle play/pause
        if (audio.paused) {
          audio.play().catch(() => {});
        } else {
          audio.pause();
        }
      }
      return;
    }

    // Normal browser behavior
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
  }, [isMuted]);

  /* ─── Seek ─── */
  const handleSeek = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      const media = IS_RESTRICTIVE_APP ? audioRef.current : videoRef.current;
      const bar = progressBarRef.current;
      if (!media || !bar || !duration) return;

      const rect = bar.getBoundingClientRect();
      const clickPct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      // Reverse the accelerated mapping
      const realPct =
        clickPct <= 0.75
          ? (clickPct / 0.75) * 0.5
          : 0.5 + ((clickPct - 0.75) / 0.25) * 0.5;
      media.currentTime = realPct * duration;
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
              <CTAButton text="QUERO ENTRAR NO PORTAL" scrollTo="identificacao" />
            </div>
          </div>

          {/* ─── RIGHT: Video / GIF+Audio ─── */}
          <div className="fade-item order-2 w-full max-w-xl mx-auto lg:max-w-none">
            <div
              className="relative w-full rounded-md overflow-hidden shadow-[0_4px_60px_rgba(201,169,110,0.12)] border border-primary/10 cursor-pointer"
              onClick={handleClick}
            >
              <div className="relative w-full bg-[#0a0505]" style={{ paddingBottom: "56.25%" }}>

                {IS_RESTRICTIVE_APP ? (
                  <>
                    {/* ─── TikTok/IG: GIF visual + hidden <audio> for sound ─── */}
                    <img
                      src="/tiktok-preview.gif"
                      alt="Preview do vídeo"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Hidden audio element - plays the MP4 audio track only */}
                    <audio
                      ref={audioRef}
                      src={VIDEO_URL}
                      preload="auto"
                    />
                  </>
                ) : (
                  /* ─── Normal browsers: standard <video> ─── */
                  <video
                    ref={videoRef}
                    src={VIDEO_URL}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoadedData={() => setIsReady(true)}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
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

                {/* Unmute / Play overlay */}
                {isReady && (isMuted || !isPlaying) && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/15 shadow-lg animate-[pulse-gentle_2s_ease-in-out_infinite]">
                        {isMuted ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="rgba(255,255,255,0.85)" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                          </svg>
                        ) : (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)">
                            <polygon points="8,5 19,12 8,19" />
                          </svg>
                        )}
                      </div>

                      {isMuted && IS_RESTRICTIVE_APP && (
                        <span className="font-editorial italic text-foreground/80 text-[11px] tracking-wider bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full mt-1">
                          Toque para ouvir
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Equalizer animation when audio is playing (TikTok only) */}
                {IS_RESTRICTIVE_APP && isPlaying && !isMuted && (
                  <div className="absolute bottom-3 right-3 z-20 flex items-end gap-[3px] h-5 pointer-events-none">
                    <div className="w-[3px] bg-primary/80 rounded-full animate-[eq1_0.8s_ease-in-out_infinite]" />
                    <div className="w-[3px] bg-primary/80 rounded-full animate-[eq2_0.6s_ease-in-out_infinite]" />
                    <div className="w-[3px] bg-primary/80 rounded-full animate-[eq3_0.7s_ease-in-out_infinite]" />
                    <div className="w-[3px] bg-primary/80 rounded-full animate-[eq4_0.9s_ease-in-out_infinite]" />
                  </div>
                )}

                {/* Loading (normal browsers only) */}
                {!IS_RESTRICTIVE_APP && !isReady && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0a0505]">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {/* Progress bar (always shown) */}
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
            <CTAButton text="QUERO ENTRAR NO PORTAL" scrollTo="identificacao" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        @keyframes eq1 {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        @keyframes eq2 {
          0%, 100% { height: 8px; }
          50% { height: 20px; }
        }
        @keyframes eq3 {
          0%, 100% { height: 12px; }
          50% { height: 6px; }
        }
        @keyframes eq4 {
          0%, 100% { height: 6px; }
          50% { height: 14px; }
        }
      `}</style>
    </TextureSection>
  );
};

export default HeroSection;
