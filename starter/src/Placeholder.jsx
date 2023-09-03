import React from 'react'
import { useControls } from 'leva'

export default function Placeholder() {

  return <>
    {/* fake little background big sphere in wireframe
     while the background is loading */}

    <mesh>
      <sphereGeometry args={[100, 100, 100]} />
      <meshBasicMaterial wireframe color="#000000" />
    </mesh>


  </>
}
