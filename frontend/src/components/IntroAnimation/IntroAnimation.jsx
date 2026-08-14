"use client";

import React, {
  Component,
  useEffect,
  useRef,
  useState,
} from "react";

import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Preload,
} from "@react-three/drei";

import FitnessSquatScene from "./FitnessSquatScene.jsx";

import "./IntroAnimation.css";


/* =========================================================
   TIMING
========================================================= */

const INTRO_DURATION = 4600;

const EXIT_START = 3950;


/* =========================================================
   ERROR BOUNDARY
========================================================= */

class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error) {
    console.error(
      "FitTrack intro scene error:",
      error
    );
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}


/* =========================================================
   INTRO
========================================================= */

function IntroAnimation({
  onComplete,
}) {
  const completedRef =
    useRef(false);

  const [isExiting, setIsExiting] =
    useState(false);

  const [sceneFailed, setSceneFailed] =
    useState(false);


  /* =======================================================
     INTRO TIMELINE
  ======================================================= */

  useEffect(() => {
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

        if (
          typeof onComplete ===
          "function"
        ) {
          onComplete();
        }
      }, INTRO_DURATION);


    return () => {
      window.clearTimeout(
        exitTimer
      );

      window.clearTimeout(
        completeTimer
      );
    };
  }, [onComplete]);


  /* =======================================================
     THREE FAILURE FALLBACK
  ======================================================= */

  useEffect(() => {
    if (!sceneFailed) {
      return;
    }

    setIsExiting(true);

    const fallbackTimer =
      window.setTimeout(() => {
        if (completedRef.current) {
          return;
        }

        completedRef.current = true;

        if (
          typeof onComplete ===
          "function"
        ) {
          onComplete();
        }
      }, 500);


    return () => {
      window.clearTimeout(
        fallbackTimer
      );
    };
  }, [
    sceneFailed,
    onComplete,
  ]);


  return (
    <div
      className={
        isExiting
          ? "intro-animation intro-animation--exit"
          : "intro-animation"
      }
    >

      {/* =================================================
          3D SCENE
      ================================================= */}

      <div className="intro-animation__scene">

        {!sceneFailed && (
          <SceneErrorBoundary>
            <Canvas
              shadows
              dpr={[1, 1.5]}
              camera={{
                position: [
                  0,
                  2.6,
                  9.5,
                ],
                fov: 38,
                near: 0.1,
                far: 100,
              }}
              gl={{
                antialias: true,
                alpha: false,
                powerPreference:
                  "high-performance",
              }}
              onCreated={({ gl }) => {
                gl.setClearColor(
                  "#05070b",
                  1
                );
              }}
              onError={(error) => {
                console.error(
                  "FitTrack Canvas error:",
                  error
                );

                setSceneFailed(true);
              }}
            >
              <FitnessSquatScene />

              <AdaptiveDpr />

              <Preload all />
            </Canvas>
          </SceneErrorBoundary>
        )}

      </div>


      {/* =================================================
          CINEMATIC OVERLAY
      ================================================= */}

      <div className="intro-animation__overlay" />


      <div className="intro-animation__vignette" />


      {/* =================================================
          BRAND
      ================================================= */}

      <div className="intro-animation__brand">

        <div className="intro-animation__eyebrow">
          YOUR TRAINING. YOUR PROGRESS.
        </div>


        <h1 className="intro-animation__title">
          FIT<span>TRACK</span>
        </h1>


        <div className="intro-animation__line" />


        <p className="intro-animation__subtitle">
          TRAIN WITH PURPOSE.
        </p>

      </div>


      {/* =================================================
          EXIT
      ================================================= */}

      <div className="intro-animation__flash" />

    </div>
  );
}


export default IntroAnimation;