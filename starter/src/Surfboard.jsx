
import React, { useEffect, useRef } from "react";
import { MeshTransmissionMaterial, useGLTF, CameraControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from 'leva'
import * as THREE from 'three'
import { useRoute, useLocation } from 'wouter'

export default function Surfboard(props) {
  const { nodes, materials } = useGLTF("../model/surfboart-uno.glb");

  const surfboard = useRef();
  const [, setLocation] = useLocation()
  const [, params] = useRoute('/item/:id')



  useFrame(() => {
    surfboard.current.rotation.y += 0.0028
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
    }
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

// Temporary Rig Function to add in
function Rig({ position = new THREE.Vector3(0, 0, 2), focus = new THREE.Vector3(0, 0, 0) }) {
  const { controls, scene } = useThree()
  const [, params] = useRoute('/item/:id')
  useEffect(() => {
    const active = scene.getObjectByName(params?.id)
    if (active) {
      console.log(active.parent.localToWorld)
      active.parent.localToWorld(position.set(0, 0.5, 0.25))
      active.parent.localToWorld(focus.set(0, 0, -2))
    }
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true)
  })
  return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
}
