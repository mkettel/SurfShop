import { MeshReflectorMaterial } from '@react-three/drei'
import { MeshStandardMaterial } from 'three'
import { Water } from 'three-stdlib'
import React, { useRef, useMemo } from 'react'
import { useFrame, useThree, useLoader, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { useControls } from 'leva'

extend({ Water })

export default function Ocean() {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 2.7,
      fog: false,
      format: gl.encoding
    }),
    [waterNormals]
  )
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta * .1))
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
}

// NORMAL TRANSPARENT PLANE TO ACT AS THE GROUND

// export default function Floor() {


  // return <>
      {/* plane underneath surfboard */}
      {/* <mesh receiveShadow rotation={ [ -Math.PI / 2, 0, 0 ] } position={ [ 0, 0, 0 ] }> */}
          {/* <planeGeometry args={ [ 70, 70 ] } /> */}
          {/* <meshStandardMaterial transparent color="#698399" opacity={0.2}  /> */}
          {/* <MeshReflectorMaterial
            mirror={0.2}
            resolution={1024}
            mixBlur={1}
            mixStrength={.2}
            blur={blur || [5, 5]}
            metalness={0.1}
            transparent={true}
            // color="#698399"
            /> */}
      {/* </mesh> */}

  {/* </> */}
{/* } */}
