import { OrbitControls, Sky, MeshReflectorMaterial, SoftShadows, Text3D, Html, Hud } from '@react-three/drei'


export default function Floor() {


  return <>
      {/* plane underneath surfboard */}
      <mesh receiveShadow rotation={ [ -Math.PI / 2, 0, 0 ] } position={ [ 0, 0, 0 ] }>
          <planeGeometry args={ [ 100, 100 ] } />
          <MeshReflectorMaterial
            mirror={0.7}
            resolution={1024}
            mixBlur={1}
            mixStrength={.2}
            blur={blur || [5, 5]}
            metalness={0.1}
            color="silver" />
      </mesh>

  </>
}
