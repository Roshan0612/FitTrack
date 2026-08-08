import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FilesetResolver,
  PoseLandmarker,
} from "@mediapipe/tasks-vision";

import { calculatePoseAngles } from "../../utils/poseAnalysis";

import {
  EXERCISES,
  ANGLES,
} from "../../exerciseConfigs/exerciseConfig";

import {
  createMovementState,
  updateMovement,
} from "../../utils/movementEngine";

import "../../styles/ExerciseCamera.css";

const ExerciseCamera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const poseLandmarkerRef = useRef(null);
  const animationFrameRef = useRef(null);

  // ==========================================
  // CURRENT EXERCISE
  // ==========================================

  const exercise = EXERCISES.bicepCurl;

  // ==========================================
  // MOVEMENT ENGINE
  // ==========================================

  const movementStateRef = useRef(
    createMovementState()
  );

  // ==========================================
  // GENERAL STATE
  // ==========================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // ANGLES
  // ==========================================

  const [angles, setAngles] = useState({
    LEFT_ELBOW: null,
    RIGHT_ELBOW: null,
    LEFT_KNEE: null,
    RIGHT_KNEE: null,
    LEFT_HIP: null,
    RIGHT_HIP: null,
  });

  // ==========================================
  // REP / MOVEMENT STATE
  // ==========================================

  const [reps, setReps] = useState(0);
  const [movementState, setMovementState] =
    useState("START");

  // ==========================================
  // INITIALIZE MEDIAPIPE
  // ==========================================

  useEffect(() => {
    const initializePoseLandmarker = async () => {
      try {
        setLoading(true);
        setError("");

        const vision =
          await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
          );

        const poseLandmarker =
          await PoseLandmarker.createFromOptions(
            vision,
            {
              baseOptions: {
                modelAssetPath:
                  "/models/pose_landmarker_lite.task",
              },

              runningMode: "VIDEO",

              numPoses: 1,

              minPoseDetectionConfidence: 0.5,

              minPosePresenceConfidence: 0.5,

              minTrackingConfidence: 0.5,
            }
          );

        poseLandmarkerRef.current =
          poseLandmarker;

        console.log(
          "MediaPipe Pose Landmarker loaded successfully"
        );

        setLoading(false);

        startCamera();
      } catch (err) {
        console.error(
          "MediaPipe initialization error:",
          err
        );

        setError(
          err?.message ||
            "Failed to load pose detection."
        );

        setLoading(false);
      }
    };

    initializePoseLandmarker();

    // ========================================
    // CLEANUP
    // ========================================

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      if (poseLandmarkerRef.current) {
        poseLandmarkerRef.current.close();

        poseLandmarkerRef.current = null;
      }

      stopCamera();
    };
  }, []);

  // ==========================================
  // START CAMERA
  // ==========================================

  const startCamera = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            width: {
              ideal: 1280,
            },

            height: {
              ideal: 720,
            },

            facingMode: "user",
          },

          audio: false,
        });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        videoRef.current.onloadeddata = () => {
          videoRef.current.play();

          detectPose();
        };
      }
    } catch (err) {
      console.error(
        "Camera error:",
        err
      );

      setError(
        "Camera permission denied or camera is not available."
      );
    }
  };

  // ==========================================
  // STOP CAMERA
  // ==========================================

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks =
        videoRef.current.srcObject.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      videoRef.current.srcObject = null;
    }
  };

  // ==========================================
  // DETECT POSE
  // ==========================================

  const detectPose = () => {
    if (
      !videoRef.current ||
      !poseLandmarkerRef.current
    ) {
      return;
    }

    const video = videoRef.current;

    if (video.readyState < 2) {
      animationFrameRef.current =
        requestAnimationFrame(
          detectPose
        );

      return;
    }

    try {
      const result =
        poseLandmarkerRef.current.detectForVideo(
          video,
          performance.now()
        );

      drawPose(result);
    } catch (err) {
      console.error(
        "Pose detection error:",
        err
      );
    }

    animationFrameRef.current =
      requestAnimationFrame(
        detectPose
      );
  };

  // ==========================================
  // DRAW POSE
  // ==========================================

  const drawPose = (result) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    // ========================================
    // CHECK PERSON
    // ========================================

    if (
      !result.landmarks ||
      result.landmarks.length === 0
    ) {
      setAngles({
        LEFT_ELBOW: null,
        RIGHT_ELBOW: null,
        LEFT_KNEE: null,
        RIGHT_KNEE: null,
        LEFT_HIP: null,
        RIGHT_HIP: null,
      });

      return;
    }

    // ========================================
    // GET FIRST PERSON
    // ========================================

    const landmarks =
      result.landmarks[0];

    // ========================================
    // CALCULATE ANGLES
    // ========================================

    const calculatedAngles =
      calculatePoseAngles(
        landmarks,
        ANGLES
      );

    setAngles(calculatedAngles);

    // ========================================
    // BICEP CURL REP DETECTION
    // ========================================

    const elbowAngle =
      calculatedAngles[
        exercise.joint
      ];

    if (
      elbowAngle !== null &&
      elbowAngle !== undefined
    ) {
      const updatedMovement =
        updateMovement({
          state:
            movementStateRef.current,

          angle:
            elbowAngle,

          startAngle:
            exercise.startAngle,

          endAngle:
            exercise.endAngle,

          minRepDuration:
            exercise.minRepDuration,

          angleTolerance:
            exercise.angleTolerance,
        });

      movementStateRef.current =
        updatedMovement;

      setReps(
        updatedMovement.reps
      );

      setMovementState(
        updatedMovement.currentState
      );
    }

    // ========================================
    // DRAW LANDMARK POINTS
    // ========================================

    landmarks.forEach(
      (landmark) => {
        const x =
          landmark.x *
          canvas.width;

        const y =
          landmark.y *
          canvas.height;

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          5,
          0,
          2 * Math.PI
        );

        ctx.fillStyle = "black";

        ctx.fill();
      }
    );

    // ========================================
    // BODY CONNECTIONS
    // ========================================

    const connections = [
      // Face
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 7],

      [0, 4],
      [4, 5],
      [5, 6],
      [6, 8],

      // Left arm
      [11, 13],
      [13, 15],

      // Right arm
      [12, 14],
      [14, 16],

      // Shoulders
      [11, 12],

      // Torso
      [11, 23],
      [12, 24],
      [23, 24],

      // Left leg
      [23, 25],
      [25, 27],

      // Right leg
      [24, 26],
      [26, 28],

      // Feet
      [27, 31],
      [28, 32],
    ];

    ctx.beginPath();

    connections.forEach(
      ([start, end]) => {
        const startPoint =
          landmarks[start];

        const endPoint =
          landmarks[end];

        if (
          !startPoint ||
          !endPoint
        ) {
          return;
        }

        ctx.moveTo(
          startPoint.x *
            canvas.width,

          startPoint.y *
            canvas.height
        );

        ctx.lineTo(
          endPoint.x *
            canvas.width,

          endPoint.y *
            canvas.height
        );
      }
    );

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.stroke();

    // ========================================
    // DRAW ANGLE LABELS
    // ========================================

    drawAngleLabel(
      ctx,
      landmarks[13],
      calculatedAngles.LEFT_ELBOW,
      canvas
    );

    drawAngleLabel(
      ctx,
      landmarks[14],
      calculatedAngles.RIGHT_ELBOW,
      canvas
    );

    drawAngleLabel(
      ctx,
      landmarks[25],
      calculatedAngles.LEFT_KNEE,
      canvas
    );

    drawAngleLabel(
      ctx,
      landmarks[26],
      calculatedAngles.RIGHT_KNEE,
      canvas
    );
  };

  // ==========================================
  // DRAW ANGLE LABEL
  // ==========================================

  const drawAngleLabel = (
    ctx,
    landmark,
    angle,
    canvas
  ) => {
    if (
      !landmark ||
      angle === null ||
      angle === undefined
    ) {
      return;
    }

    const x =
      landmark.x *
      canvas.width;

    const y =
      landmark.y *
      canvas.height;

    const text = `${angle}°`;

    ctx.font =
      "bold 18px Arial";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const textWidth =
      ctx.measureText(text).width;

    // Background
    ctx.fillStyle = "white";

    ctx.fillRect(
      x -
        textWidth / 2 -
        6,

      y - 36,

      textWidth + 12,

      26
    );

    // Text
    ctx.fillStyle = "black";

    ctx.fillText(
      text,
      x,
      y - 23
    );
  };

  // ==========================================
  // RESET WORKOUT
  // ==========================================

  const resetWorkout = () => {
    movementStateRef.current =
      createMovementState();

    setReps(0);

    setMovementState("START");
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="exercise-page">

      <div className="exercise-container">

        {/* =====================================
            HEADER
        ====================================== */}

        <header className="exercise-header">

          <h1 className="exercise-title">
            {exercise.name}
          </h1>

          <div className="tracking-status">
            <span className="tracking-dot" />
            Tracking
          </div>

        </header>

        {/* =====================================
            LOADING
        ====================================== */}

        {loading && (
          <div className="exercise-message loading">
            Loading pose detection...
          </div>
        )}

        {/* =====================================
            ERROR
        ====================================== */}

        {error && (
          <div className="exercise-message error">
            {error}
          </div>
        )}

        {/* =====================================
            CAMERA
        ====================================== */}

        <section className="camera-wrapper">

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="camera-video"
          />

          <canvas
            ref={canvasRef}
            className="camera-canvas"
          />

          {/* REP COUNTER */}

          <div className="rep-overlay">

            <span className="rep-label">
              Reps
            </span>

            <span className="rep-value">
              {reps}
            </span>

          </div>

          {/* MOVEMENT STATE */}

          <div className="movement-overlay">
            {movementState}
          </div>

        </section>

        {/* =====================================
            ANGLE SUMMARY
        ====================================== */}

        <section className="angle-summary">

          <AngleItem
            title="L Elbow"
            value={
              angles.LEFT_ELBOW
            }
          />

          <AngleItem
            title="R Elbow"
            value={
              angles.RIGHT_ELBOW
            }
          />

          <AngleItem
            title="L Knee"
            value={
              angles.LEFT_KNEE
            }
          />

          <AngleItem
            title="R Knee"
            value={
              angles.RIGHT_KNEE
            }
          />

          <AngleItem
            title="L Hip"
            value={
              angles.LEFT_HIP
            }
          />

          <AngleItem
            title="R Hip"
            value={
              angles.RIGHT_HIP
            }
          />

        </section>

        {/* =====================================
            RESET
        ====================================== */}

        <div className="exercise-controls">

          <button
            type="button"
            className="reset-button"
            onClick={resetWorkout}
          >
            Reset Reps
          </button>

        </div>

      </div>

    </main>
  );
};

// ==========================================
// ANGLE ITEM
// ==========================================

const AngleItem = ({
  title,
  value,
}) => {
  return (
    <div className="angle-item">

      <span className="angle-name">
        {title}
      </span>

      <span className="angle-value">
        {value !== null &&
        value !== undefined
          ? `${value}°`
          : "--"}
      </span>

    </div>
  );
};

export default ExerciseCamera;