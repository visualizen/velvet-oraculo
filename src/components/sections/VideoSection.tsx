import { useEffect, useRef, useState, useCallback } from "react";

// Placeholder — replace with your actual Vimeo video ID
const VIMEO_VIDEO_ID = "1184470820";

const VideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Load Vimeo Player SDK
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://player.vimeo.com/api/player.js"]'
    );

    const initPlayer = () => {
      if (!containerRef.current || !(window as any).Vimeo) return;

      const player = new (window as any).Vimeo.Player(containerRef.current, {
        id: VIMEO_VIDEO_ID,
        background: false,
        autopause: false,
        autoplay: true,
        muted: true,
        loop: true,
        controls: false,
        responsive: true,
        playsinline: true,
        title: false,
        byline: false,
        portrait: false,
      });

      playerRef.current = player;

      player.ready().then(() => {
        setIsReady(true);
        player.setVolume(0);
        player.play().catch(() => {});
      });

      player.on("timeupdate", (data: any) => {
        setCurrentTime(data.seconds);
        setProgress(data.percent * 100);
      });

      player.getDuration().then((dur: number) => {
        setDuration(dur);
      });

      player.on("play", () => setIsPlaying(true));
      player.on("pause", () => setIsPlaying(false));
      player.on("ended", () => {
        setIsPlaying(false);
        setProgress(100);
      });
    };

    if (existingScript) {
      if ((window as any).Vimeo) {
        initPlayer();
      } else {
        existingScript.addEventListener("load", initPlayer);
      }
    } else {
      const script = document.createElement("script");
      script.src = "https://player.vimeo.com/api/player.js";
      script.async = true;
      script.onload = initPlayer;
      document.head.appendChild(script);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Auto-hide controls
  const resetHideTimer = useCallback(() => {
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
      resetHideTimer();
    }
  }, [isPlaying, resetHideTimer]);

  // Click on video to restart
  const handleVideoClick = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    player.setCurrentTime(0).then(() => {
      player.play();
    });
    resetHideTimer();
  }, [resetHideTimer]);

  // Play/Pause
  const togglePlay = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const player = playerRef.current;
      if (!player) return;
      if (isPlaying) {
        player.pause();
      } else {
        player.play();
      }
      resetHideTimer();
    },
    [isPlaying, resetHideTimer]
  );

  // Volume toggle
  const toggleMute = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const player = playerRef.current;
      if (!player) return;
      if (isMuted) {
        player.setVolume(0.7);
        setVolume(0.7);
        setIsMuted(false);
      } else {
        player.setVolume(0);
        setVolume(0);
        setIsMuted(true);
      }
      resetHideTimer();
    },
    [isMuted, resetHideTimer]
  );

  // Progress bar seek
  const handleProgressClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const player = playerRef.current;
      const bar = progressBarRef.current;
      if (!player || !bar || !duration) return;

      const rect = bar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = Math.max(0, Math.min(1, clickX / rect.width));
      const seekTime = percent * duration;

      player.setCurrentTime(seekTime);
      setProgress(percent * 100);
      resetHideTimer();
    },
    [duration, resetHideTimer]
  );

  // Format time
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <section
      className="relative bg-[#0a0505] overflow-hidden"
      onMouseMove={resetHideTimer}
      onMouseEnter={() => setShowControls(true)}
    >
      {/* Video container */}
      <div
        className="relative w-full cursor-pointer"
        style={{ aspectRatio: "16/9" }}
        onClick={handleVideoClick}
      >
        {/* Vimeo player mount point */}
        <div
          ref={containerRef}
          className="absolute inset-0 w-full h-full [&_iframe]{w-full h-full}"
          style={{ pointerEvents: "none" }}
        />

        {/* Overlay click target (sits over the iframe) */}
        <div className="absolute inset-0 z-10" />

        {/* Loading state */}
        {!isReady && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0a0505]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-[hsl(39,40%,60%)] border-t-transparent rounded-full animate-spin" />
              <span className="font-editorial italic text-[hsl(39,45%,92%)]/50 text-sm tracking-[0.2em]">
                Carregando...
              </span>
            </div>
          </div>
        )}

        {/* Restart hint on click */}
        <div
          className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
            !isPlaying && progress >= 99 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-3 bg-black/60 backdrop-blur-sm rounded-full px-8 py-6">
            <svg
              width="40"
              height="40"
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
            <span className="font-editorial italic text-[hsl(39,45%,92%)] text-sm tracking-wider">
              Clique para assistir novamente
            </span>
          </div>
        </div>

        {/* Controls bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-30 transition-all duration-500 ${
            showControls
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2"
          }`}
          style={{
            background:
              "linear-gradient(to top, rgba(10,5,5,0.95) 0%, rgba(10,5,5,0.6) 60%, transparent 100%)",
            padding: "2rem 1.25rem 1rem",
          }}
        >
          {/* Progress bar */}
          <div
            ref={progressBarRef}
            className="group w-full h-1.5 bg-white/10 rounded-full cursor-pointer mb-3 relative hover:h-2 transition-all duration-200"
            onClick={handleProgressClick}
          >
            {/* Buffered / played */}
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-150"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, hsl(39,40%,60%), hsl(39,50%,70%))",
              }}
            />
            {/* Scrub handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[hsl(39,40%,60%)] shadow-[0_0_8px_rgba(201,169,110,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-4">
            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="text-[hsl(39,45%,92%)] hover:text-[hsl(39,40%,60%)] transition-colors duration-200 p-1"
              aria-label={isPlaying ? "Pausar" : "Reproduzir"}
            >
              {isPlaying ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              )}
            </button>

            {/* Volume */}
            <button
              onClick={toggleMute}
              className="text-[hsl(39,45%,92%)] hover:text-[hsl(39,40%,60%)] transition-colors duration-200 p-1"
              aria-label={isMuted ? "Ativar som" : "Silenciar"}
            >
              {isMuted ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </button>

            {/* Time display */}
            <span className="font-readable text-[hsl(39,45%,92%)]/60 text-xs tabular-nums tracking-wider ml-auto">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
