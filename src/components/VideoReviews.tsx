"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { reviewVideos, type ReviewVideo } from "@/data/videoReviews";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const emptySubscribe = () => () => {};

const NUM_SETS = 2;
const loopedVideos = Array(NUM_SETS).fill(reviewVideos).flat();
const warmedFullVideos = new Set<string>();
const queuedFullVideos = new Set<string>();
const activeWarmers = new Map<string, HTMLVideoElement>();
const fullVideoQueue: string[] = [];
const previewVideoPromises = new Map<string, Promise<void>>();

type NavigatorWithConnection = Navigator & {
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
  };
};

function canWarmFullVideo() {
  if (typeof navigator === "undefined") return false;
  const connection = (navigator as NavigatorWithConnection).connection;
  const effectiveType = connection?.effectiveType?.toLowerCase();

  return (
    !connection?.saveData &&
    effectiveType !== "slow-2g" &&
    effectiveType !== "2g"
  );
}

function drainFullVideoQueue() {
  if (typeof window === "undefined" || !canWarmFullVideo()) return;

  const concurrency = window.matchMedia("(max-width: 767px)").matches ? 1 : 2;
  while (activeWarmers.size < concurrency && fullVideoQueue.length > 0) {
    const src = fullVideoQueue.shift();
    if (!src) break;

    queuedFullVideos.delete(src);
    if (warmedFullVideos.has(src) || activeWarmers.has(src)) continue;

    const warmer = document.createElement("video");
    warmer.muted = true;
    warmer.playsInline = true;
    warmer.preload = "auto";
    warmer.src = src;
    activeWarmers.set(src, warmer);

    const finish = () => {
      warmedFullVideos.add(src);
      activeWarmers.delete(src);
      drainFullVideoQueue();
    };

    warmer.addEventListener("canplay", finish, { once: true });
    warmer.addEventListener("error", finish, { once: true });
    warmer.load();
  }
}

function warmFullVideo(src?: string, immediate = false) {
  if (
    !src ||
    !canWarmFullVideo() ||
    warmedFullVideos.has(src) ||
    activeWarmers.has(src) ||
    queuedFullVideos.has(src)
  ) {
    return;
  }

  queuedFullVideos.add(src);
  if (immediate) fullVideoQueue.unshift(src);
  else fullVideoQueue.push(src);
  drainFullVideoQueue();
}

function preparePreviewVideo(video: ReviewVideo) {
  if (typeof window === "undefined") return Promise.resolve();

  const src = video.src;
  const cached = previewVideoPromises.get(src);
  if (cached) return cached;

  const promise = new Promise<void>((resolve) => {
    const preview = document.createElement("video");
    const settle = () => resolve();

    preview.muted = true;
    preview.playsInline = true;
    preview.preload = "auto";
    preview.addEventListener("loadeddata", settle, { once: true });
    preview.addEventListener("error", settle, { once: true });
    preview.src = src;
    preview.load();

    if (preview.readyState >= 2) settle();
  });

  previewVideoPromises.set(src, promise);
  return promise;
}

function ReviewVideoCard({
  index,
  video,
  onClick,
}: {
  index: number;
  video: ReviewVideo;
  onClick: (video: ReviewVideo) => void;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasPlayableFrame, setHasPlayableFrame] = useState(false);

  const playWhenReady = useCallback(() => {
    setHasPlayableFrame(true);
    videoRef.current?.play().catch(() => undefined);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    warmFullVideo(video.fullSrc, true);
    videoRef.current?.play().catch(() => undefined);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.muted = true;
    videoEl.playsInline = true;
    videoEl.preload = "auto";

    const startPlayback = () => {
      setHasPlayableFrame(true);
      videoEl.play().catch(() => undefined);
    };

    if (videoEl.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      startPlayback();
    } else {
      videoEl.addEventListener("canplay", startPlayback);
      videoEl.addEventListener("loadeddata", startPlayback);
      videoEl.load();
      window.setTimeout(() => {
        videoEl.play().catch(() => undefined);
      }, 0);
    }

    return () => {
      videoEl.removeEventListener("canplay", startPlayback);
      videoEl.removeEventListener("loadeddata", startPlayback);
    };
  }, [video.src]);

  return (
    <article
      className="pillow-vr-card group"
      ref={cardRef}
      onClick={() => onClick(video)}
      onFocus={() => {
        warmFullVideo(video.fullSrc, true);
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        onClick(video);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => {
        warmFullVideo(video.fullSrc, true);
      }}
      role="button"
      tabIndex={0}
      aria-label={`Customer review video ${index + 1}`}
    >
      <video
        aria-label={`Customer review video ${index + 1}`}
        className="pillow-vr-card-video"
        disablePictureInPicture
        loop
        muted
        onCanPlay={playWhenReady}
        onLoadedData={playWhenReady}
        playsInline
        poster={video.poster}
        preload="auto"
        ref={videoRef}
        src={video.src}
      >
        Your browser does not support the video tag.
      </video>
      {video.poster ? (
        <div
          aria-hidden
          className={`pillow-vr-poster-fallback ${
            hasPlayableFrame ? "is-hidden" : ""
          }`}
          style={{ backgroundImage: `url("${video.poster}")` }}
        />
      ) : null}
      <div aria-hidden className="pillow-vr-card-scrim" />
      {/* Play Button Overlay */}
      <div
        className={`pillow-vr-play-overlay ${
          isHovered ? "is-visible" : ""
        }`}
      >
        <div className="pillow-vr-play-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="pillow-vr-play-svg"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </article>
  );
}

export function VideoReviews() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [selectedVideo, setSelectedVideo] = useState<ReviewVideo | null>(null);
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const navigationRequestRef = useRef(0);

  const selectedIndex = selectedVideo
    ? reviewVideos.findIndex((video) => video.id === selectedVideo.id)
    : -1;

  const openVideo = useCallback((video: ReviewVideo) => {
    const requestId = navigationRequestRef.current + 1;
    navigationRequestRef.current = requestId;
    warmFullVideo(video.fullSrc, true);
    setModalSrc(video.fullSrc);
    setSelectedVideo(video);

    void preparePreviewVideo(video).then(() => {
      if (navigationRequestRef.current !== requestId) return;
      setModalSrc(video.fullSrc);
    });
  }, []);

  const handleClose = useCallback(() => {
    setSelectedVideo(null);
    setModalSrc(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedIndex === -1) return;
    const nextVideo =
      selectedIndex > 0
        ? reviewVideos[selectedIndex - 1]
        : reviewVideos[reviewVideos.length - 1];
    openVideo(nextVideo);
  }, [openVideo, selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex === -1) return;
    const nextVideo =
      selectedIndex < reviewVideos.length - 1
        ? reviewVideos[selectedIndex + 1]
        : reviewVideos[0];
    openVideo(nextVideo);
  }, [openVideo, selectedIndex]);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Lock body scroll when modal is open and handle Escape / Arrow keys
  useEffect(() => {
    if (!selectedVideo) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedVideo, handleClose, handlePrev, handleNext]);

  return (
    <section className="pillow-video-reviews-section" data-reveal>
      <div className="pillow-vr-header">
        <p className="pillow-vr-eyebrow">REAL SLEEPERS</p>
        <h2 className="pillow-vr-title">
          Real customer <span className="pillow-vr-italic">video reviews</span> & results
        </h2>
      </div>

      <div className="pillow-vr-carousel-wrap">
        <div className="pillow-vr-track">
          {loopedVideos.map((video, index) => (
            <ReviewVideoCard
              index={index}
              key={`${video.id}-${index}`}
              video={video}
              onClick={openVideo}
            />
          ))}
        </div>
      </div>

      {mounted && selectedVideo && createPortal(
        <div
          className="pillow-vr-modal-backdrop"
          onClick={handleClose}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Customer review video lightbox"
        >
          <div
            className="pillow-vr-modal-inner"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="pillow-vr-modal-arrow is-prev"
              aria-label="Previous video"
              type="button"
            >
              <ChevronLeft size={26} />
            </button>

            {/* Close Button */}
            <button
              className="pillow-vr-modal-close"
              onClick={handleClose}
              aria-label="Close video"
              type="button"
            >
              <X size={22} />
            </button>

            {/* Video Player */}
            <div className="pillow-vr-player-box">
              <video
                key={`${selectedVideo.id}-${modalSrc}`}
                className="pillow-vr-modal-video"
                src={modalSrc ?? selectedVideo.fullSrc}
                controls
                autoPlay
                playsInline
                poster={selectedVideo.poster}
              />
            </div>

            {/* Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="pillow-vr-modal-arrow is-next"
              aria-label="Next video"
              type="button"
            >
              <ChevronRight size={26} />
            </button>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
