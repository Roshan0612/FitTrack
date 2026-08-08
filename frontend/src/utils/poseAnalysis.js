
import { calculateAngle } from "./poseUtils";


// ==========================================
// CALCULATE MULTIPLE ANGLES
// ==========================================

export const calculatePoseAngles = (
  landmarks,
  angleDefinitions
) => {

  if (
    !landmarks ||
    !angleDefinitions
  ) {
    return {};
  }


  const results = {};


  Object.entries(
    angleDefinitions
  ).forEach(
    ([angleName, definition]) => {

      const pointA =
        landmarks[definition.a];

      const pointB =
        landmarks[definition.b];

      const pointC =
        landmarks[definition.c];


      results[angleName] =
        calculateAngle(
          pointA,
          pointB,
          pointC
        );
    }
  );


  return results;
};
