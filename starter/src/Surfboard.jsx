
import React, { useEffect, useRef, useState } from "react";
import { MeshTransmissionMaterial, useGLTF, CameraControls, PerspectiveCamera, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from 'leva'
import * as THREE from 'three'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'


export default function Surfboard(props) {
  const { nodes, materials } = useGLTF("../model/surfboart-uno.glb");

  // Leva Live Editor
  const { sideColor, baseColor, bottomColor } = useControls({
    sideColor: {
      value: "#B79D68",
      label: "Side Color",
    },
    baseColor: {
      value: '#E5E5E5',
      label: "Base Color",
    },
    bottomColor: {
      value: '#E5E5E5',
      label: "Bottom Color",
    },
  })

  // camera acess
  const { camera } = useThree()
  camera.focus = 100; // set the focus distance

  // Hover State for Cursor
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])


  const surfboard = useRef(); // access to the surfboard
  const controlsRef = useRef(); // access to the camera controls

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

  // flipBoardState
  const [flipBoardState, setFlipBoardState] = useState(false)
  const flipBoard = () => {
    setFlipBoardState(!flipBoardState)
  }


  // Changing position of the surfboard
  useFrame(( camera ) => {
    surfboard.current.rotation.x = topSelected ? THREE.MathUtils.lerp(surfboard.current.rotation.x, 1.2, .05) : THREE.MathUtils.lerp(surfboard.current.rotation.x, 0, .05);
    surfboard.current.position.y = topSelected ? THREE.MathUtils.lerp(surfboard.current.position.y, 3.3, .05) : THREE.MathUtils.lerp(surfboard.current.position.y, 0.4, .05);
    surfboard.current.rotation.z = flipBoardState ? THREE.MathUtils.lerp(surfboard.current.rotation.z, 3.2, .05) : THREE.MathUtils.lerp(surfboard.current.rotation.z, 0, .05);
  })


  return (
    <>
      <CameraControls ref={controlsRef} minPolarAngle={.3} maxPolarAngle={Math.PI / 2.3} minAzimuthAngle={-.7} maxAzimuthAngle={1} minDistance={3} maxDistance={11}  />
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
          material-color={bottomColor}
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
      <FlipButton flipBoard={flipBoard} flipBoardState={flipBoardState} setFlipBoardState={setFlipBoardState} topSelected={topSelected} setTopSelected={setTopSelected} />
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

function FlipButton(props) {

  if (props.topSelected) {
    return <>
      <Html>
        <button className="flip-button" onClick={props.flipBoard}>flip</button>
      </Html>
    </>
  } else {
    return <>
      <Html>
        <button className="flip-button" style={{opacity: 0, transform: 'translateY(-300px)'}}>flip</button>
      </Html>
    </>
  }
}
