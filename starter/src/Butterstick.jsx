
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Butterstick(props) {
  const { nodes, materials } = useGLTF("../model/butter-stick.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.surfboard.geometry}
        material={materials.glossy}
        position={[0.039, 1.216, -0.292]}
        scale={[1, 1, 1.123]}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.surftop.geometry}
        material={materials.rough}
        position={[0.039, 1.216, -0.292]}
        scale={[1, 1, 1.123]}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.surfbottom.geometry}
        material={materials.rough}
        position={[0.039, 1.216, -0.292]}
        scale={[1, 1, 1.123]}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes["fin-1"].geometry}
        material={materials.fin}
        position={[0.653, 0.077, -2.872]}
        rotation={[-3.084, 0, -Math.PI]}
        scale={[0.142, 0.366, 0.441]}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes["fin-2"].geometry}
        material={materials.fin}
        position={[-0.477, 0.077, -2.872]}
        rotation={[-3.084, 0, -Math.PI]}
        scale={[0.142, 0.366, 0.441]}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes["topstripe-body"].geometry}
        material={materials.Material}
        position={[0.028, 0.682, -0.006]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.016, 1, 3.522]}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.bottomstripe.geometry}
        material={materials.Material}
        position={[0.028, 0.362, -0.006]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.016, 1, 3.522]}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.c1.geometry}
        material={materials.Material}
        position={[0.077, 0.651, 0.756]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.128}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.r1.geometry}
        material={materials.Material}
        position={[0.067, 0.65, 0.613]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.147}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.e1.geometry}
        material={materials.Material}
        position={[0.067, 0.645, 0.473]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.147}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.s1.geometry}
        material={materials.Material}
        position={[0.067, 0.645, 0.336]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.147}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.c2.geometry}
        material={materials.Material}
        position={[0.077, 0.645, 0.22]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.128}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.e2.geometry}
        material={materials.Material}
        position={[0.067, 0.643, 0.091]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.147}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.n.geometry}
        material={materials.Material}
        position={[0.075, 0.636, -0.024]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.116}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.t.geometry}
        material={materials.Material}
        position={[0.065, 0.636, -0.134]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.116}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.s2.geometry}
        material={materials.Material}
        position={[0.067, 0.634, -0.594]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.147}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.h.geometry}
        material={materials.Material}
        position={[0.076, 0.635, -0.711]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.127}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.a.geometry}
        material={materials.Material}
        position={[0.073, 0.629, -0.843]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.137}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.p.geometry}
        material={materials.Material}
        position={[0.064, 0.629, -0.977]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.137}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.e3.geometry}
        material={materials.Material}
        position={[0.067, 0.629, -1.121]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.147}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.s3.geometry}
        material={materials.Material}
        position={[0.067, 0.629, -1.255]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.147}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes["black-crescent-moon-png-2"].geometry}
        material={materials["black-crescent-moon-png-2"]}
        position={[0.024, 0.64, -0.305]}
        rotation={[3.135, 0.078, 0.049]}
        scale={0.31}
      />
    </group>
  );
}

useGLTF.preload("/butter-stick.glb");