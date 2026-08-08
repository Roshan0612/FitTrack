
export const calculateAngle = (a, b, c) => {
  if (!a || !b || !c) {
    return null;
  }

  const BAx = a.x - b.x;
  const BAy = a.y - b.y;

  const BCx = c.x - b.x;
  const BCy = c.y - b.y;

  const dotProduct =
    BAx * BCx +
    BAy * BCy;

  const magnitudeBA = Math.sqrt(
    BAx * BAx +
    BAy * BAy
  );

  const magnitudeBC = Math.sqrt(
    BCx * BCx +
    BCy * BCy
  );

  if (
    magnitudeBA === 0 ||
    magnitudeBC === 0
  ) {
    return null;
  }

  let cosine =
    dotProduct /
    (magnitudeBA * magnitudeBC);

  cosine = Math.max(
    -1,
    Math.min(1, cosine)
  );

  const angle =
    Math.acos(cosine) *
    (180 / Math.PI);

  return Math.round(angle);
};


export const isValidLandmark = (landmark) => {
  if (!landmark) {
    return false;
  }

  return (
    typeof landmark.x === "number" &&
    typeof landmark.y === "number"
  );
};


export const calculateDistance = (a, b) => {
  if (
    !isValidLandmark(a) ||
    !isValidLandmark(b)
  ) {
    return null;
  }

  const dx = a.x - b.x;
  const dy = a.y - b.y;

  return Math.sqrt(
    dx * dx +
    dy * dy
  );
};

