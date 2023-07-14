
import React, { useEffect, useRef } from "react";
import { MeshTransmissionMaterial, useGLTF, CameraControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from 'leva'
import * as THREE from 'three'
import { useRoute, useLocation } from 'wouter'

export default function Surfboard(props) {
  const { nodes, materials } = useGLTF("../model/surfboart-uno.glb");

  const surfboard = useRef()


  useFrame(() => {
    surfboard.current.rotation.y += 0.0025
  })

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
    },

  })


  return (
    <group
      position={[position.x, position.y, 0]}
      ref={surfboard}
      castShadow {...props}
      dispose={null}>
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
  );
}
