
"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FaPlay } from "react-icons/fa6";

const VIDEO_ID = "HHUi8F_qAXM";
const VIDEO_TITLE = "Watch how thetiny.site works";

export default function VideoSection() {
  const frameRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [playing, setPlaying] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);

  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 1 : 0.9, 1]
  );

  useEffect(() => {
    if (playing) {
      iframeRef.current?.focus();
    }
  }, [playing]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="video"
        aria-labelledby="video-title"
        className="bg-white pb-20 pt-4 dark:bg-[#0F0B1F] sm:pb-28"
      >
        <div className="mx-auto max-w-5xl px-5">
          <h2
            id="video-title"
            className="text-center font-heading text-2xl font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-4xl"
          >
            {VIDEO_TITLE}
          </h2>

          <motion.div
            ref={frameRef}
            style={{ scale }}
            className="relative mt-10 aspect-video overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-brand to-brand-dark shadow-[0_30px_80px_-30px_rgba(91,33,243,0.55)] dark:border-white/10"
          >
            {playing ? (
              <iframe
                ref={iframeRef}
                className="absolute inset-0 h-full w-full border-0"
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={VIDEO_TITLE}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play video: ${VIDEO_TITLE}`}
                className="group absolute inset-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-white"
              >
                {!thumbFailed && (
                  <img
                    src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                    alt=""
                    loading="lazy"
                    onError={() => setThumbFailed(true)}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}

                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-black/25 transition-colors duration-200 group-hover:bg-black/35"
                />

                {/* Play Button */}
                <span className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
                  <span
                    aria-hidden="true"
                    className="invisible absolute inset-0 rounded-full bg-white/60 group-hover:visible motion-safe:group-hover:animate-ping"
                  />

                  <span className="relative flex h-full w-full items-center justify-center rounded-full bg-white text-brand shadow-xl transition-transform duration-200 group-hover:scale-110">
                    <FaPlay
                      aria-hidden="true"
                      size={26}
                      className="ml-1"
                    />
                  </span>
                </span>
              </button>
            )}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
