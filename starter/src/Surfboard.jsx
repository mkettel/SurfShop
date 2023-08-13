
import React, { useEffect, useRef, useState } from "react";
import { MeshTransmissionMaterial, useGLTF, CameraControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from 'leva'
import * as THREE from 'three'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'


export default function Surfboard(props) {
  const { nodes, materials } = useGLTF("../model/surfboart-uno.glb");

  // Leva Live Editor
  const { sideColor, baseColor } = useControls({
    sideColor: {
      value: "#B79D68",
      label: "Side Color",
    },
    baseColor: {
      value: '#E5E5E5',
      label: "Base Color",
    }
  })

  // camera acess
  const { camera } = useThree()
  camera.focus = 100;

  // Hover State for Cursor
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  // refs for various objects
  const surfboard = useRef();
  const controlsRef = useRef();

  // access to the top board
  const topBoard = useRef();
  const [topSelected, setTopSelected] = useState(false)

  // Camera Movement for Top Sheet
  const topSheet = () => {
    const oldCameraPosition = [2, 5, 9]
    const newCameraPosition = [2, 5, 10]
    const originTarget = [0, 0, 0]
    const newTarget = [0, 2.8, 0]
    // controls the camera position and target
    if (!topSelected) {
      controlsRef.current.setLookAt(...newCameraPosition, ...newTarget, .1)
    } else {
      controlsRef.current.setLookAt(...oldCameraPosition, ...originTarget, 1)
    }
    setTopSelected(!topSelected)
  }

  useFrame(( camera ) => {
    surfboard.current.rotation.x = topSelected ? THREE.MathUtils.lerp(surfboard.current.rotation.x, 1.2, .02) : THREE.MathUtils.lerp(surfboard.current.rotation.x, 0, .02);
    surfboard.current.position.y = topSelected ? THREE.MathUtils.lerp(surfboard.current.position.y, 3.3, .02) : THREE.MathUtils.lerp(surfboard.current.position.y, 0.4, .02);
  })


  return (
    <>
      <CameraControls ref={controlsRef} />
      <group
        ref={surfboard}
        castShadow {...props}
        dispose={null}
        >
        <mesh
          ref={topBoard}
          castShadow
          // receiveShadow
          geometry={nodes.Plane001.geometry}
          material={materials["Material.001"]}
          material-color={baseColor}
          onClick={topSheet}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
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
      {/* <Rig /> */}
    </>
  );
}


// function Rig() {

//   const vec = new THREE.Vector3();

//   return useFrame(({ camera, mouse }) => {
//     vec.set(mouse.x * 2, mouse.y * 2, camera.position.z)
//     camera.position.lerp(vec, 0.025)
//     camera.lookAt(0, 0, 0)
//   })
// }
