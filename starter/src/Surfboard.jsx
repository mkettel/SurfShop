
import React, { useEffect, useRef, useState } from "react";
import { MeshTransmissionMaterial, useGLTF, CameraControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from 'leva'
import * as THREE from 'three'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'


export default function Surfboard(props) {
  const { nodes, materials } = useGLTF("../model/surfboart-uno.glb");

  const { camera } = useThree()
  camera.focus = 100;

  // refs
  const surfboard = useRef();
  const controlsRef = useRef();

  const topBoard = useRef();
  const [topSelected, setTopSelected] = useState(false)

  const topSheet = () => {
    const oldCameraPosition = [2, 5, 10]
    const newCameraPosition = [2, 5, 10]
    const originTarget = [0, 0, 0]
    const newTarget = [0, 2, 0]
    if (!topSelected) {
      controlsRef.current.setLookAt(...newCameraPosition, ...newTarget, 1.2)
    } else {
      controlsRef.current.setLookAt(...oldCameraPosition, ...originTarget, 1)
    }
    // sets the camera position and target and duration of lerping (sick as fuck)
    // console.log('controlsRef.current', controlsRef.current);
    // console.log('cameraRef.current', cameraRef.current);
    // console.log(surfboard.current.rotation);
    setTopSelected(!topSelected)
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

  useFrame(( camera ) => {
    surfboard.current.rotation.x = topSelected ? THREE.MathUtils.lerp(surfboard.current.rotation.x, 1.2, .02) : THREE.MathUtils.lerp(surfboard.current.rotation.x, 0, .02);
    surfboard.current.position.y = topSelected ? THREE.MathUtils.lerp(surfboard.current.position.y, 3.3, .02) : THREE.MathUtils.lerp(surfboard.current.position.y, 0.4, .02);
  })


  return (
    <>
      {/* <PerspectiveCamera ref={cameraRef} makeDefault position={[2, 4, 10]} fov={45} /> */}
      <CameraControls ref={controlsRef} />
      <group
        position={[position.x, position.y, 0]}
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
