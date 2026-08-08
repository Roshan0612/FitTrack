// ==========================================
// GENERIC EXERCISE CONFIGURATION
// ==========================================
//
// MediaPipe landmark indexes:
//
// 11 = Left Shoulder
// 12 = Right Shoulder
// 13 = Left Elbow
// 14 = Right Elbow
// 15 = Left Wrist
// 16 = Right Wrist
//
// 23 = Left Hip
// 24 = Right Hip
// 25 = Left Knee
// 26 = Right Knee
// 27 = Left Ankle
// 28 = Right Ankle
// ==========================================


export const LANDMARKS = {
  LEFT_SHOULDER: 11,
  RIGHT_SHOULDER: 12,

  LEFT_ELBOW: 13,
  RIGHT_ELBOW: 14,

  LEFT_WRIST: 15,
  RIGHT_WRIST: 16,

  LEFT_HIP: 23,
  RIGHT_HIP: 24,

  LEFT_KNEE: 25,
  RIGHT_KNEE: 26,

  LEFT_ANKLE: 27,
  RIGHT_ANKLE: 28,
};


// ==========================================
// ANGLE DEFINITIONS
// ==========================================

export const ANGLES = {

  LEFT_ELBOW: {
    a: LANDMARKS.LEFT_SHOULDER,
    b: LANDMARKS.LEFT_ELBOW,
    c: LANDMARKS.LEFT_WRIST,
  },

  RIGHT_ELBOW: {
    a: LANDMARKS.RIGHT_SHOULDER,
    b: LANDMARKS.RIGHT_ELBOW,
    c: LANDMARKS.RIGHT_WRIST,
  },

  LEFT_KNEE: {
    a: LANDMARKS.LEFT_HIP,
    b: LANDMARKS.LEFT_KNEE,
    c: LANDMARKS.LEFT_ANKLE,
  },

  RIGHT_KNEE: {
    a: LANDMARKS.RIGHT_HIP,
    b: LANDMARKS.RIGHT_KNEE,
    c: LANDMARKS.RIGHT_ANKLE,
  },

  LEFT_HIP: {
    a: LANDMARKS.LEFT_SHOULDER,
    b: LANDMARKS.LEFT_HIP,
    c: LANDMARKS.LEFT_KNEE,
  },

  RIGHT_HIP: {
    a: LANDMARKS.RIGHT_SHOULDER,
    b: LANDMARKS.RIGHT_HIP,
    c: LANDMARKS.RIGHT_KNEE,
  },
};


// ==========================================
// EXERCISE CONFIGURATION STRUCTURE
// ==========================================
//
// We are NOT assigning these to a particular
// exercise yet.
//
// This structure will later be used like:
//
// {
//   exerciseName: "Some Exercise",
//   angles: [...],
//   repRules: {...},
//   postureRules: [...]
// }
//
// ==========================================

export const DEFAULT_EXERCISE_CONFIG = {

  exerciseName: "",

  angles: [],

  repRules: {
    startAngle: null,
    endAngle: null,
  },

  postureRules: [],
};







export const EXERCISES = {
  bicepCurl: {
    id: "bicep-curl",
    name: "Bicep Curl",

    // Joint used for rep detection
    joint: "LEFT_ELBOW",

    // Fully extended arm
    startAngle: 155,

    // Fully contracted arm
    endAngle: 65,

    // Prevent accidental rapid counting
    minRepDuration: 700,

    // Small tolerance for camera/landmark noise
    angleTolerance: 8,
  },
};
