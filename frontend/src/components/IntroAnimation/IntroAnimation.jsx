import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import "./IntroAnimation.css";


/* =========================================================
   TIMING
========================================================= */

const INTRO_DURATION = 10450;

const EXIT_START = 10000;

const INTRO_STILLS = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=2000&q=85",
];

const INTRO_WORDS = [
  { key: "transform", text: "TRANSFORM" },
  { key: "elevate", text: "ELEVATE" },
  { key: "endure", text: "ENDURE" },
  { key: "empower", text: "EMPOWER" },
];

const LABEL_MERGE_OFFSETS = ["-37.5vw", "-12.5vw", "12.5vw", "37.5vw"];


/* =========================================================
   INTRO
========================================================= */

function IntroAnimation({
  onComplete,
}) {
  const onCompleteRef =
    useRef(onComplete);

  onCompleteRef.current = onComplete;

  const completedRef =
    useRef(false);

  const [isExiting, setIsExiting] =
    useState(false);

  const [beatIndex, setBeatIndex] =
    useState(0);

  const visibleStillCount = Math.min(
    INTRO_STILLS.length,
    beatIndex + 1
  );


  /* =======================================================
     INTRO TIMELINE
  ======================================================= */

  useEffect(() => {
    const beatTimer = window.setInterval(() => {
      setBeatIndex((current) => Math.min(current + 1, 4));
    }, 2000);

    const exitTimer =
      window.setTimeout(() => {
        setIsExiting(true);
      }, EXIT_START);


    const completeTimer =
      window.setTimeout(() => {
        if (completedRef.current) {
          return;
        }

        completedRef.current = true;

        if (typeof onCompleteRef.current === "function") {
          onCompleteRef.current();
        }
      }, INTRO_DURATION);


    return () => {
      window.clearInterval(beatTimer);
      window.clearTimeout(
        exitTimer
      );

      window.clearTimeout(
        completeTimer
      );
    };
  }, []);


  return (
    <div
      className={
        `intro-animation intro-animation--beat-${beatIndex} intro-animation--stage-${visibleStillCount}${
          isExiting ? " intro-animation--exit" : ""
        }`
      }
    >

      <div className="intro-animation__stills">
        {INTRO_STILLS.map((src, index) => {
          const isVisible = index < visibleStillCount;
          const isCurrent = beatIndex < INTRO_WORDS.length && index === beatIndex;
          const isSettled = index < beatIndex;
          const word = INTRO_WORDS[index];

          return (
            <div
              key={src}
              className={`intro-animation__panel${
                isVisible ? " is-visible" : ""
              }${isCurrent ? " is-current" : ""}${
                isSettled ? " is-settled" : ""
              }`}
              style={{
                "--still-index": index,
                "--panel-center": `${((index + 0.5) / visibleStillCount) * 100}%`,
                "--merge-x": LABEL_MERGE_OFFSETS[index],
              }}
            >
              <img
                src={src}
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
                fetchPriority={index === 0 ? "high" : "auto"}
                draggable="false"
              />
              <span
                className={`intro-animation__word intro-animation__word--${word.key}`}
                aria-hidden="true"
              >
                {index === 0 ? (
                  <>
                    <span className="intro-animation__word-rough">{word.text}</span>
                    <span className="intro-animation__word-clean">{word.text}</span>
                  </>
                ) : word.text}
              </span>
            </div>
          );
        })}
      </div>


      {/* =================================================
          CINEMATIC OVERLAY
      ================================================= */}

      <div className="intro-animation__overlay" />


      <div className="intro-animation__vignette" />

      <div className="intro-animation__slash" />

      <div className="intro-animation__shot-counter" aria-hidden="true">
        <span>{String(beatIndex + 1).padStart(2, "0")}</span> / 05
      </div>

      <div className="intro-animation__shot-progress" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={index === beatIndex ? "is-active" : ""}
          />
        ))}
      </div>


      {/* =================================================
          BRAND
      ================================================= */}

      <div className="intro-animation__brand">
        <div className="intro-animation__finale">
          <div className="intro-animation__ecg" aria-hidden="true" />
          <h1 className="intro-animation__title" aria-label="FitTrack">
            {Array.from("FitTrack", (letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="intro-animation__glyph"
              aria-hidden="true"
              style={{ animationDelay: `${0.12 + index * 0.055}s` }}
            >
              {letter}
            </span>
          ))}
          </h1>

          <p className="intro-animation__subtitle">
            TRAIN WITH PURPOSE. BUILD A BETTER YOU.
          </p>
        </div>

      </div>


      {/* =================================================
          EXIT
      ================================================= */}

      <div className="intro-animation__flash" />

    </div>
  );
}


export default IntroAnimation;
