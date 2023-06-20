
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Surfboard(props) {
  const { nodes, materials } = useGLTF("./model/surfboart-uno.glb");

  // rotate the surfboard slowly
  const surfboard = useRef()

  useFrame(() => {
    surfboard.current.rotation.y += 0.001
  })

  return (
    <group ref={surfboard} castShadow {...props} dispose={null}>
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
      />
    </group>
  );
}
