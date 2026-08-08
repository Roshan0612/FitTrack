export const MOVEMENT_STATES = {
  START: "START",
  MOVING_DOWN: "MOVING_DOWN",
  END_POSITION: "END_POSITION",
  MOVING_UP: "MOVING_UP",
};


export const createMovementState = () => {
  return {
    currentState: MOVEMENT_STATES.START,

    reps: 0,

    lastAngle: null,

    lowestAngle: null,

    movementStartedAt: null,

    lastRepTime: 0,
  };
};


export const updateMovement = ({
  state,
  angle,
  startAngle,
  endAngle,
  minRepDuration = 700,
  angleTolerance = 8,
}) => {

  if (
    angle === null ||
    angle === undefined ||
    Number.isNaN(angle)
  ) {
    return state;
  }


  const now = Date.now();


  const newState = {
    ...state,

    lastAngle: angle,
  };


  // ==========================================
  // START POSITION
  // ==========================================

  const startReached =
    angle >=
    startAngle -
      angleTolerance;


  // ==========================================
  // END POSITION
  // ==========================================

  const endReached =
    angle <=
    endAngle +
      angleTolerance;


  // ==========================================
  // START
  // ==========================================

  if (
    state.currentState ===
    MOVEMENT_STATES.START
  ) {

    if (endReached === false && !startReached) {

      newState.currentState =
        MOVEMENT_STATES.MOVING_DOWN;

      newState.movementStartedAt =
        now;

      newState.lowestAngle =
        angle;
    }

    return newState;
  }


  // ==========================================
  // MOVING DOWN
  // ==========================================

  if (
    state.currentState ===
    MOVEMENT_STATES.MOVING_DOWN
  ) {

    // Track lowest angle
    if (
      newState.lowestAngle === null ||
      angle < newState.lowestAngle
    ) {
      newState.lowestAngle =
        angle;
    }


    // User reached contracted position
    if (endReached) {

      newState.currentState =
        MOVEMENT_STATES.END_POSITION;
    }


    return newState;
  }


  // ==========================================
  // END POSITION
  // ==========================================

  if (
    state.currentState ===
    MOVEMENT_STATES.END_POSITION
  ) {

    // User has started extending arm
    if (
      angle >
      endAngle +
        angleTolerance
    ) {

      newState.currentState =
        MOVEMENT_STATES.MOVING_UP;
    }


    return newState;
  }


  // ==========================================
  // MOVING UP
  // ==========================================

  if (
    state.currentState ===
    MOVEMENT_STATES.MOVING_UP
  ) {

    // User returned to starting position
    if (startReached) {

      const movementDuration =
        state.movementStartedAt
          ? now -
            state.movementStartedAt
          : 0;


      // Prevent accidental double counting
      const enoughTimeSinceLastRep =
        now -
          state.lastRepTime >=
        minRepDuration;


      // Make sure this was an actual
      // full movement
      const fullMovement =
        state.lowestAngle !== null &&
        state.lowestAngle <=
          endAngle +
            angleTolerance;


      if (
        movementDuration >=
          minRepDuration &&
        enoughTimeSinceLastRep &&
        fullMovement
      ) {

        newState.reps =
          state.reps + 1;

        newState.lastRepTime =
          now;
      }


      // Reset for next repetition
      newState.currentState =
        MOVEMENT_STATES.START;

      newState.movementStartedAt =
        null;

      newState.lowestAngle =
        null;
    }


    return newState;
  }


  return newState;
};