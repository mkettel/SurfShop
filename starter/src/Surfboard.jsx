
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from 'leva'

export default function Surfboard(props) {
  const { nodes, materials } = useGLTF("./model/surfboart-uno.glb");

  // rotate the surfboard slowly
  const surfboard = useRef()

  useFrame(() => {
    surfboard.current.rotation.y += 0.002
  })

  // color editor using leva
  const { position, sideColor } = useControls({
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
    }
  })

  return (
    <group position={[position.x, position.y, 0]} ref={surfboard} castShadow {...props} dispose={null}>
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials["Material.001"]}
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
