
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from 'leva'
import { Vector3 } from "three";
import * as THREE from 'three'

export default function Surfboard(props) {
  const { nodes, materials } = useGLTF("./model/surfboart-uno.glb");

  const p = new THREE.Vector3(0, 0, 0)
  const q = new THREE.Quaternion(0, 0, 0, 0)

  const surfboard = useRef()

  useFrame(() => {
    surfboard.current.rotation.y += 0.002
  })

  // Leva Live Editor
  const { position, sideColor, baseColor, rotation } = useControls({
    position: {
      value: {x: 0, y: .3},
      min: -3,
      max: 3,
      step: 0.1,
      joystick: 'invertY'
    },
    sideColor: {
      value: "#B79D68",
      label: "Color",
    },
    baseColor: {
      value: '#E5E5E5',
      label: "Base Color",
    },
    rotation: {
      value: {x: 0, y: 0, z: 0},
      min: -3,
      max: 3,
      step: 0.1,
      joystick: 'invertY'
    }
  })
  console.log(rotation)

  return (
    <group rotation={[rotation.x, rotation.y, rotation.z]} position={[position.x, position.y, 0]} ref={surfboard} castShadow {...props} dispose={null}>
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
