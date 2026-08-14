"use client";

import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

const GREEN = "#10b981";
const GREEN_BRIGHT = "#34d399";

const SKIN = "#8b5a42";
const SKIN_DARK = "#5d382b";

const SHIRT = "#11161a";
const SHORTS = "#080b0e";

const RUBBER = "#080a0c";
const METAL = "#9ba4a8";
const METAL_DARK = "#343b40";

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function smooth(t) {
  return t * t * (3 - 2 * t);
}

function smoother(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function squatAmount(raw) {
  if (raw < 0.16) return 0;

  if (raw < 0.48) {
    return smooth((raw - 0.16) / 0.32);
  }

  if (raw < 0.55) {
    return 1;
  }

  if (raw < 0.82) {
    return 1 - smoother((raw - 0.55) / 0.27);
  }

  return 0;
}

/* =========================================================
   MATERIAL
========================================================= */

function Material({
  color,
  roughness = 0.5,
  metalness = 0,
  emissive,
  emissiveIntensity = 0,
}) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={roughness}
      metalness={metalness}
      emissive={emissive || "#000000"}
      emissiveIntensity={emissiveIntensity}
    />
  );
}

/* =========================================================
   JOINT CYLINDER
========================================================= */

function Limb({
  start,
  end,
  radius,
  color,
  roughness = 0.5,
}) {
  const direction = useMemo(
    () => new THREE.Vector3().subVectors(end, start),
    [start, end]
  );

  const length = direction.length();

  const midpoint = useMemo(
    () => new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5),
    [start, end]
  );

  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();

    q.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize()
    );

    return q;
  }, [direction]);

  return (
    <mesh
      position={midpoint}
      quaternion={quaternion}
      castShadow
      receiveShadow
    >
      <capsuleGeometry
        args={[
          radius,
          Math.max(0.04, length - radius * 2),
          8,
          18,
        ]}
      />

      <Material color={color} roughness={roughness} />
    </mesh>
  );
}

/* =========================================================
   ATHLETIC HEAD
========================================================= */

function AthleteHead() {
  return (
    <group>
      {/* neck */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.18, 0.32, 20]} />
        <Material color={SKIN} roughness={0.7} />
      </mesh>

      {/* head */}
      <mesh
        position={[0, 0.25, 0]}
        scale={[0.82, 1, 0.86]}
        castShadow
      >
        <sphereGeometry args={[0.32, 28, 28]} />
        <Material color={SKIN} roughness={0.66} />
      </mesh>

      {/* hair */}
      <mesh
        position={[0, 0.44, -0.015]}
        scale={[0.84, 0.48, 0.88]}
        castShadow
      >
        <sphereGeometry args={[0.315, 24, 20]} />
        <Material color="#050607" roughness={0.86} />
      </mesh>

      {/* ears */}
      <mesh
        position={[-0.29, 0.25, 0]}
        scale={[0.65, 1, 0.7]}
        castShadow
      >
        <sphereGeometry args={[0.065, 14, 14]} />
        <Material color={SKIN_DARK} roughness={0.75} />
      </mesh>

      <mesh
        position={[0.29, 0.25, 0]}
        scale={[0.65, 1, 0.7]}
        castShadow
      >
        <sphereGeometry args={[0.065, 14, 14]} />
        <Material color={SKIN_DARK} roughness={0.75} />
      </mesh>

      {/* jaw / beard shadow */}
      <mesh
        position={[0, 0.09, 0.255]}
        scale={[0.7, 0.42, 0.12]}
      >
        <sphereGeometry args={[0.2, 18, 14]} />
        <Material color="#211815" roughness={0.9} />
      </mesh>
    </group>
  );
}

/* =========================================================
   ATHLETE
========================================================= */

function Athlete({ progressRef }) {
  const body = useRef();

  useFrame((state) => {
    if (!body.current) return;

    const t = state.clock.elapsedTime;
    const raw = progressRef.current;

    const squat = squatAmount(raw);

    const breathing =
      Math.sin(t * 2.1) * 0.012;

    /*
      Athletic squat mechanics.

      Standing:
      hips high
      knees relatively straight
      torso upright

      Squat:
      hips move backward/down
      knees move forward
      torso leans forward
      chest remains open
    */

    const hipY = THREE.MathUtils.lerp(
      2.42,
      1.62,
      squat
    );

    const hipZ = THREE.MathUtils.lerp(
      0,
      0.12,
      squat
    );

    const kneeY = THREE.MathUtils.lerp(
      1.30,
      0.83,
      squat
    );

    const kneeZ = THREE.MathUtils.lerp(
      0.05,
      0.46,
      squat
    );

    const ankleY = 0.40;

    const ankleZ = 0;

    const thighSpread = THREE.MathUtils.lerp(
      0.42,
      0.59,
      squat
    );

    const hipWidth = 0.34;

    const shoulderY =
      hipY +
      THREE.MathUtils.lerp(
        1.35,
        1.18,
        squat
      );

    const shoulderZ =
      hipZ +
      THREE.MathUtils.lerp(
        0,
        0.16,
        squat
      );

    const shoulderWidth =
      THREE.MathUtils.lerp(
        0.67,
        0.72,
        squat
      );

    const torsoLean =
      THREE.MathUtils.degToRad(
        THREE.MathUtils.lerp(
          3,
          17,
          squat
        )
      );

    const leftHip = new THREE.Vector3(
      -hipWidth,
      hipY,
      hipZ
    );

    const rightHip = new THREE.Vector3(
      hipWidth,
      hipY,
      hipZ
    );

    const leftKnee = new THREE.Vector3(
      -thighSpread,
      kneeY,
      kneeZ
    );

    const rightKnee = new THREE.Vector3(
      thighSpread,
      kneeY,
      kneeZ
    );

    const leftAnkle = new THREE.Vector3(
      -0.43,
      ankleY,
      ankleZ
    );

    const rightAnkle = new THREE.Vector3(
      0.43,
      ankleY,
      ankleZ
    );

    const leftShoulder = new THREE.Vector3(
      -shoulderWidth,
      shoulderY,
      shoulderZ
    );

    const rightShoulder = new THREE.Vector3(
      shoulderWidth,
      shoulderY,
      shoulderZ
    );

    /*
      Bar position.
    */

    const barY = THREE.MathUtils.lerp(
      3.96,
      3.12,
      squat
    );

    const barZ = THREE.MathUtils.lerp(
      -0.08,
      0.18,
      squat
    );

    /*
      Hands remain connected to bar.
    */

    const handSpacing = 0.92;

    const leftHand = new THREE.Vector3(
      -handSpacing,
      barY,
      barZ
    );

    const rightHand = new THREE.Vector3(
      handSpacing,
      barY,
      barZ
    );

    /*
      Elbows.
      Arms bend naturally toward the bar.
    */

    const leftElbow = new THREE.Vector3(
      -0.93,
      THREE.MathUtils.lerp(
        3.12,
        2.78,
        squat
      ),
      THREE.MathUtils.lerp(
        0.02,
        0.20,
        squat
      )
    );

    const rightElbow = new THREE.Vector3(
      0.93,
      THREE.MathUtils.lerp(
        3.12,
        2.78,
        squat
      ),
      THREE.MathUtils.lerp(
        0.02,
        0.20,
        squat
      )
    );

    /*
      Neck/head.
    */

    const headPosition = new THREE.Vector3(
      0,
      shoulderY + 0.30,
      shoulderZ +
        THREE.MathUtils.lerp(
          0,
          0.04,
          squat
        )
    );

    body.current.position.y =
      THREE.MathUtils.lerp(
        -0.15,
        -0.08,
        clamp01(raw * 5)
      );

    body.current.rotation.z =
      Math.sin(t * 1.4) * 0.003;

    /*
      Store everything for rendering.
    */

    body.current.userData = {
      leftHip,
      rightHip,
      leftKnee,
      rightKnee,
      leftAnkle,
      rightAnkle,

      leftShoulder,
      rightShoulder,

      leftElbow,
      rightElbow,

      leftHand,
      rightHand,

      headPosition,

      hipY,
      hipZ,
      shoulderY,
      shoulderZ,

      torsoLean,

      squat,
      breathing,
    };
  });

  /*
    We need initial values before first frame.
  */

  const initial = {
    leftHip: new THREE.Vector3(-0.34, 2.42, 0),
    rightHip: new THREE.Vector3(0.34, 2.42, 0),

    leftKnee: new THREE.Vector3(-0.42, 1.30, 0.05),
    rightKnee: new THREE.Vector3(0.42, 1.30, 0.05),

    leftAnkle: new THREE.Vector3(-0.43, 0.4, 0),
    rightAnkle: new THREE.Vector3(0.43, 0.4, 0),

    leftShoulder: new THREE.Vector3(-0.67, 3.77, 0),
    rightShoulder: new THREE.Vector3(0.67, 3.77, 0),

    leftElbow: new THREE.Vector3(-0.93, 3.12, 0),
    rightElbow: new THREE.Vector3(0.93, 3.12, 0),

    leftHand: new THREE.Vector3(-0.92, 3.96, -0.08),
    rightHand: new THREE.Vector3(0.92, 3.96, -0.08),

    headPosition: new THREE.Vector3(0, 4.07, 0),

    torsoLean: 0,
    hipY: 2.42,
    hipZ: 0,
    shoulderY: 3.77,
    shoulderZ: 0,
    squat: 0,
    breathing: 0,
  };

  const get = (key) =>
    body.current?.userData?.[key] || initial[key];

  return (
    <group ref={body}>
      {/* =================================================
          TORSO
      ================================================= */}

      <group
        position={[
          0,
          3.05,
          0,
        ]}
      >
        <mesh
          scale={[0.78, 1.15, 0.43]}
          castShadow
        >
          <capsuleGeometry
            args={[
              0.55,
              0.65,
              10,
              28,
            ]}
          />

          <Material
            color={SHIRT}
            roughness={0.78}
          />
        </mesh>

        {/* chest mass */}
        <mesh
          position={[0, 0.18, 0.36]}
          scale={[0.62, 0.36, 0.10]}
          castShadow
        >
          <sphereGeometry
            args={[0.5, 24, 16]}
          />

          <Material
            color={SHIRT}
            roughness={0.74}
          />
        </mesh>

        {/* subtle center detail */}
        <mesh
          position={[
            0,
            0.28,
            0.425,
          ]}
          scale={[
            0.04,
            0.30,
            0.025,
          ]}
        >
          <boxGeometry
            args={[1, 1, 1]}
          />

          <Material
            color={GREEN}
            roughness={0.38}
            metalness={0.15}
            emissive={GREEN}
            emissiveIntensity={0.7}
          />
        </mesh>

        {/* traps */}
        <mesh
          position={[
            -0.43,
            0.62,
            0,
          ]}
          rotation={[
            0,
            0,
            -0.18,
          ]}
          scale={[
            0.42,
            0.18,
            0.32,
          ]}
          castShadow
        >
          <sphereGeometry
            args={[1, 20, 16]}
          />

          <Material
            color={SHIRT}
            roughness={0.76}
          />
        </mesh>

        <mesh
          position={[
            0.43,
            0.62,
            0,
          ]}
          rotation={[
            0,
            0,
            0.18,
          ]}
          scale={[
            0.42,
            0.18,
            0.32,
          ]}
          castShadow
        >
          <sphereGeometry
            args={[1, 20, 16]}
          />

          <Material
            color={SHIRT}
            roughness={0.76}
          />
        </mesh>
      </group>

      {/* =================================================
          HEAD
      ================================================= */}

      <group
        position={[
          get("headPosition").x,
          get("headPosition").y,
          get("headPosition").z,
        ]}
        rotation={[
          -get("torsoLean") * 0.35,
          0,
          0,
        ]}
      >
        <AthleteHead />
      </group>

      {/* =================================================
          HIPS
      ================================================= */}

      <group
        position={[
          0,
          get("hipY"),
          get("hipZ"),
        ]}
      >
        <mesh
          scale={[
            0.74,
            0.38,
            0.46,
          ]}
          castShadow
        >
          <capsuleGeometry
            args={[
              0.48,
              0.40,
              8,
              20,
            ]}
          />

          <Material
            color={SHORTS}
            roughness={0.86}
          />
        </mesh>
      </group>

      {/* =================================================
          LEFT LEG
      ================================================= */}

      <Limb
        start={get("leftHip")}
        end={get("leftKnee")}
        radius={0.225}
        color={SHORTS}
        roughness={0.84}
      />

      <Limb
        start={get("leftKnee")}
        end={get("leftAnkle")}
        radius={0.155}
        color={SKIN_DARK}
        roughness={0.76}
      />

      {/* left quad highlight */}
      <mesh
        position={[
          -0.52,
          1.43,
          0.18,
        ]}
        scale={[
          0.20,
          0.52,
          0.18,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[1, 18, 16]}
        />

        <Material
          color={BODY_COLOR}
          roughness={0.82}
        />
      </mesh>

      {/* =================================================
          RIGHT LEG
      ================================================= */}

      <Limb
        start={get("rightHip")}
        end={get("rightKnee")}
        radius={0.225}
        color={SHORTS}
        roughness={0.84}
      />

      <Limb
        start={get("rightKnee")}
        end={get("rightAnkle")}
        radius={0.155}
        color={SKIN_DARK}
        roughness={0.76}
      />

      <mesh
        position={[
          0.52,
          1.43,
          0.18,
        ]}
        scale={[
          0.20,
          0.52,
          0.18,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[1, 18, 16]}
        />

        <Material
          color={BODY_COLOR}
          roughness={0.82}
        />
      </mesh>

      {/* =================================================
          SHOES
      ================================================= */}

      <mesh
        position={[
          -0.43,
          0.18,
          0.13,
        ]}
        scale={[
          0.30,
          0.15,
          0.56,
        ]}
        castShadow
      >
        <capsuleGeometry
          args={[
            0.5,
            0.30,
            8,
            18,
          ]}
        />

        <Material
          color="#040506"
          roughness={0.68}
          metalness={0.08}
        />
      </mesh>

      <mesh
        position={[
          0.43,
          0.18,
          0.13,
        ]}
        scale={[
          0.30,
          0.15,
          0.56,
        ]}
        castShadow
      >
        <capsuleGeometry
          args={[
            0.5,
            0.30,
            8,
            18,
          ]}
        />

        <Material
          color="#040506"
          roughness={0.68}
          metalness={0.08}
        />
      </mesh>

      {/* =================================================
          LEFT ARM
      ================================================= */}

      <Limb
        start={get("leftShoulder")}
        end={get("leftElbow")}
        radius={0.165}
        color={SHIRT}
        roughness={0.78}
      />

      <Limb
        start={get("leftElbow")}
        end={get("leftHand")}
        radius={0.105}
        color={SKIN}
        roughness={0.70}
      />

      {/* =================================================
          RIGHT ARM
      ================================================= */}

      <Limb
        start={get("rightShoulder")}
        end={get("rightElbow")}
        radius={0.165}
        color={SHIRT}
        roughness={0.78}
      />

      <Limb
        start={get("rightElbow")}
        end={get("rightHand")}
        radius={0.105}
        color={SKIN}
        roughness={0.70}
      />

      {/* hands */}
      <mesh
        position={[
          get("leftHand").x,
          get("leftHand").y,
          get("leftHand").z,
        ]}
        scale={[
          0.13,
          0.18,
          0.13,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[1, 16, 16]}
        />

        <Material
          color={SKIN}
          roughness={0.68}
        />
      </mesh>

      <mesh
        position={[
          get("rightHand").x,
          get("rightHand").y,
          get("rightHand").z,
        ]}
        scale={[
          0.13,
          0.18,
          0.13,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[1, 16, 16]}
        />

        <Material
          color={SKIN}
          roughness={0.68}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   WEIGHT PLATE
========================================================= */

function Plate({
  position,
  scale = 1,
}) {
  return (
    <group position={position}>
      <mesh
        rotation={[
          0,
          0,
          Math.PI / 2,
        ]}
        scale={[
          scale,
          scale,
          0.16,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.52,
            0.52,
            1,
            48,
          ]}
        />

        <Material
          color={RUBBER}
          roughness={0.70}
          metalness={0.05}
        />
      </mesh>

      <mesh
        rotation={[
          0,
          0,
          Math.PI / 2,
        ]}
        position={[
          0,
          0,
          0.11,
        ]}
        scale={[
          scale * 0.33,
          scale * 0.33,
          0.05,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.52,
            0.52,
            1,
            32,
          ]}
        />

        <Material
          color={METAL}
          roughness={0.28}
          metalness={0.82}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   BARBELL
========================================================= */

function Barbell({
  progressRef,
}) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;

    const raw = progressRef.current;

    const squat = squatAmount(raw);

    const baseY = THREE.MathUtils.lerp(
      3.96,
      3.12,
      squat
    );

    const baseZ = THREE.MathUtils.lerp(
      -0.08,
      0.18,
      squat
    );

    /*
      Slight inertia after explosive ascent.
    */

    let inertia = 0;

    if (raw > 0.55 && raw < 0.88) {
      const p = (raw - 0.55) / 0.33;

      inertia =
        Math.sin(p * Math.PI * 3.2) *
        0.025 *
        (1 - p);
    }

    group.current.position.y =
      baseY + inertia;

    group.current.position.z =
      baseZ;

    group.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 3.2) *
      0.002;
  });

  return (
    <group
      ref={group}
      position={[
        0,
        3.96,
        -0.08,
      ]}
    >
      {/* bar */}
      <mesh
        rotation={[
          0,
          0,
          Math.PI / 2,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.045,
            0.045,
            4.9,
            28,
          ]}
        />

        <Material
          color={METAL}
          roughness={0.23}
          metalness={0.92}
        />
      </mesh>

      {/* center grip */}
      <mesh
        rotation={[
          0,
          0,
          Math.PI / 2,
        ]}
        position={[
          0,
          0,
          0.01,
        ]}
      >
        <cylinderGeometry
          args={[
            0.058,
            0.058,
            0.9,
            28,
          ]}
        />

        <Material
          color="#5f676b"
          roughness={0.34}
          metalness={0.85}
        />
      </mesh>

      {/* plates */}
      <Plate
        position={[
          -1.55,
          0,
          0,
        ]}
        scale={1}
      />

      <Plate
        position={[
          -1.25,
          0,
          0,
        ]}
        scale={0.84}
      />

      <Plate
        position={[
          -1.01,
          0,
          0,
        ]}
        scale={0.68}
      />

      <Plate
        position={[
          1.55,
          0,
          0,
        ]}
        scale={1}
      />

      <Plate
        position={[
          1.25,
          0,
          0,
        ]}
        scale={0.84}
      />

      <Plate
        position={[
          1.01,
          0,
          0,
        ]}
        scale={0.68}
      />

      {/* collars */}
      <mesh
        position={[
          -1.78,
          0,
          0,
        ]}
        rotation={[
          0,
          0,
          Math.PI / 2,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.115,
            0.115,
            0.12,
            24,
          ]}
        />

        <Material
          color={METAL_DARK}
          roughness={0.28}
          metalness={0.85}
        />
      </mesh>

      <mesh
        position={[
          1.78,
          0,
          0,
        ]}
        rotation={[
          0,
          0,
          Math.PI / 2,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.115,
            0.115,
            0.12,
            24,
          ]}
        />

        <Material
          color={METAL_DARK}
          roughness={0.28}
          metalness={0.85}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   FLOOR
========================================================= */

function GymFloor() {
  return (
    <group>
      <mesh
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
        receiveShadow
      >
        <planeGeometry
          args={[
            30,
            30,
          ]}
        />

        <Material
          color="#070a0d"
          roughness={0.92}
          metalness={0.05}
        />
      </mesh>

      {/* platform */}
      <mesh
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
        position={[
          0,
          0.012,
          0,
        ]}
        receiveShadow
      >
        <planeGeometry
          args={[
            7,
            5,
          ]}
        />

        <Material
          color="#0b1112"
          roughness={0.88}
        />
      </mesh>

      {/* platform edge */}
      <mesh
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
        position={[
          0,
          0.025,
          0,
        ]}
      >
        <ringGeometry
          args={[
            3.0,
            3.045,
            64,
          ]}
        />

        <meshStandardMaterial
          color={GREEN}
          emissive={GREEN}
          emissiveIntensity={0.8}
          roughness={0.45}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   BACKGROUND
========================================================= */

function GymBackground() {
  return (
    <group>
      <mesh
        position={[
          0,
          3.5,
          -3.9,
        ]}
      >
        <boxGeometry
          args={[
            18,
            8,
            0.3,
          ]}
        />

        <Material
          color="#040609"
          roughness={0.96}
        />
      </mesh>

      {[-5.2, -3.7, 3.7, 5.2].map(
        (x) => (
          <mesh
            key={x}
            position={[
              x,
              3.4,
              -3.65,
            ]}
          >
            <boxGeometry
              args={[
                0.035,
                6.5,
                0.035,
              ]}
            />

            <meshStandardMaterial
              color={GREEN}
              emissive={GREEN}
              emissiveIntensity={0.55}
            />
          </mesh>
        )
      )}

      {[-2.5, 0, 2.5].map(
        (x) => (
          <mesh
            key={x}
            position={[
              x,
              5.0,
              -3.48,
            ]}
          >
            <boxGeometry
              args={[
                2.7,
                0.025,
                0.025,
              ]}
            />

            <meshStandardMaterial
              color={GREEN_BRIGHT}
              emissive={GREEN}
              emissiveIntensity={1.7}
            />
          </mesh>
        )
      )}
    </group>
  );
}

/* =========================================================
   LIGHTING
========================================================= */

function GymLighting({
  progressRef,
}) {
  const key = useRef();
  const green = useRef();

  useFrame((state) => {
    const raw = progressRef.current;

    const finalPush = clamp01(
      (raw - 0.72) / 0.28
    );

    if (key.current) {
      key.current.intensity =
        4.8 +
        finalPush * 1.4 +
        Math.sin(
          state.clock.elapsedTime * 1.1
        ) *
          0.12;
    }

    if (green.current) {
      green.current.intensity =
        2.8 +
        finalPush * 5;
    }
  });

  return (
    <>
      <spotLight
        ref={key}
        position={[
          4.5,
          7,
          5,
        ]}
        angle={0.46}
        penumbra={0.72}
        intensity={4.8}
        distance={17}
        color="#fff4e7"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0002}
      />

      <pointLight
        ref={green}
        position={[
          -4,
          3.5,
          1.5,
        ]}
        intensity={2.8}
        distance={11}
        color={GREEN}
      />

      <pointLight
        position={[
          4,
          2.5,
          -1,
        ]}
        intensity={1.6}
        distance={10}
        color="#718da6"
      />

      <rectAreaLight
        position={[
          0,
          7,
          2,
        ]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
        width={6}
        height={4}
        intensity={3.5}
        color="#eafff7"
      />
    </>
  );
}

/* =========================================================
   ATMOSPHERE
========================================================= */

function Atmosphere({
  progressRef,
}) {
  const ref = useRef();

  useFrame(() => {
    if (!ref.current) return;

    const raw = progressRef.current;

    ref.current.material.opacity =
      0.018 +
      clamp01(
        (raw - 0.72) / 0.28
      ) *
        0.045;
  });

  return (
    <>
      <Sparkles
        count={90}
        scale={[
          9,
          5,
          8,
        ]}
        size={1.25}
        speed={0.16}
        opacity={0.22}
        color="#a9fbdc"
      />

      <Sparkles
        count={25}
        scale={[
          5,
          3,
          5,
        ]}
        size={1.8}
        speed={0.1}
        opacity={0.16}
        color="#ffffff"
      />

      {/* cinematic green haze */}
      <mesh
        ref={ref}
        position={[
          0,
          2.3,
          -3.25,
        ]}
        scale={[
          4,
          4,
          0.1,
        ]}
      >
        <planeGeometry
          args={[
            1,
            1,
          ]}
        />

        <meshBasicMaterial
          color={GREEN}
          transparent
          opacity={0.018}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

/* =========================================================
   CAMERA
========================================================= */

function CinematicCamera({
  progressRef,
}) {
  const {
    camera,
    size,
  } = useThree();

  useFrame((state) => {
    const raw = progressRef.current;

    const mobile =
      size.width < 700;

    const finalPush = clamp01(
      (raw - 0.72) / 0.28
    );

    const targetZ = THREE.MathUtils.lerp(
      mobile ? 9.8 : 8.9,
      mobile ? 7.8 : 7.25,
      finalPush
    );

    const targetY = THREE.MathUtils.lerp(
      mobile ? 2.55 : 2.72,
      mobile ? 2.68 : 2.86,
      finalPush
    );

    const targetX =
      mobile ? 0 : 0.12;

    camera.position.x +=
      (targetX -
        camera.position.x) *
      0.045;

    camera.position.y +=
      (targetY -
        camera.position.y) *
      0.045;

    camera.position.z +=
      (targetZ -
        camera.position.z) *
      0.045;

    const lookY =
      THREE.MathUtils.lerp(
        2.30,
        2.55,
        finalPush
      );

    camera.lookAt(
      0,
      lookY,
      0
    );

    /*
      Tiny handheld/cinematic breathing.
    */

    camera.position.x +=
      Math.sin(
        state.clock.elapsedTime *
          0.55
      ) *
      0.006;

    camera.position.y +=
      Math.sin(
        state.clock.elapsedTime *
          0.45
      ) *
      0.004;
  });

  return null;
}

/* =========================================================
   MAIN SCENE
========================================================= */

export default function FitnessSquatScene({
  progressRef: externalProgressRef,
}) {
  const internalProgressRef =
    useRef(0);

  const progressRef =
    externalProgressRef ||
    internalProgressRef;

  useFrame((state) => {
    if (externalProgressRef) return;

    progressRef.current =
      clamp01(
        state.clock.elapsedTime /
          3.6
      );
  });

  return (
    <>
      <CinematicCamera
        progressRef={progressRef}
      />

      <GymLighting
        progressRef={progressRef}
      />

      <Environment
        preset="warehouse"
        environmentIntensity={0.18}
      />

      <GymBackground />

      <GymFloor />

      <Athlete
        progressRef={progressRef}
      />

      <Barbell
        progressRef={progressRef}
      />

      <Atmosphere
        progressRef={progressRef}
      />

      <ContactShadows
        position={[
          0,
          0.025,
          0,
        ]}
        opacity={0.62}
        scale={7}
        blur={2.5}
        far={4.8}
        resolution={512}
        color="#000000"
      />

      <Float
        speed={0.55}
        rotationIntensity={0.025}
        floatIntensity={0.035}
      >
        <mesh
          position={[
            0,
            2.0,
            -3.2,
          ]}
        >
          <planeGeometry
            args={[
              4,
              4,
            ]}
          />

          <meshBasicMaterial
            color={GREEN}
            transparent
            opacity={0.018}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
          />
        </mesh>
      </Float>
    </>
  );
}