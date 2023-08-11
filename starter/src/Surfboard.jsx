
import React, { useEffect, useRef, useState } from "react";
import { MeshTransmissionMaterial, useGLTF, CameraControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from 'leva'
import * as THREE from 'three'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'

export default function Surfboard(props) {
  const { nodes, materials } = useGLTF("../model/surfboart-uno.glb");

  const surfboard = useRef();
  const controlsRef = useRef();
  const cameraRef = useRef();


  const topSheet = () => {
    const newPosition = [2, 2, 7]
    const newTarget = [0, 0, 0]

    // sets the camera position and target and duration of lerping (sick as fuck)
    controlsRef.current.setLookAt(...newPosition, ...newTarget, 1)
    console.log('controlsRef.current', controlsRef.current);
    console.log('cameraRef.current', cameraRef.current);
  }


  // Leva Live Editor
  const { position, sideColor, baseColor } = useControls({
    position: {
      value: {x: 0, y: .3},
      min: .2,
      max: 3,
      step: 0.1,
      joystick: 'invertY'
    },
    sideColor: {
      value: "#B79D68",
      label: "Side Color",
    },
    baseColor: {
      value: '#E5E5E5',
      label: "Base Color",
    }
  })

  useFrame(() => {
    surfboard.current.rotation.y += 0.0028
  })

  const startTargetVector = new THREE.Vector3(0, 3, 0)

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[2, 4, 10]} focus={startTargetVector} fov={45} />
      <CameraControls ref={controlsRef} camera={cameraRef.current} />
      <group
        position={[position.x, position.y, 0]}
        ref={surfboard}
        castShadow {...props}
        dispose={null}
        onClick={topSheet}
        >
        <mesh
          castShadow
          // receiveShadow
          geometry={nodes.Plane001.geometry}
          material={materials["Material.001"]}
          material-color={baseColor}
        />
        <mesh
          castShadow
          // receiveShadow
          geometry={nodes.Plane002.geometry}
          material={materials.bottom}
        />
        <mesh
          castShadow
          // receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials["side-material"]}
          material-color={sideColor}
        />
      </group>
    </>
  );
}
