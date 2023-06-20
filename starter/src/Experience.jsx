import { OrbitControls, Sky, MeshReflectorMaterial, SoftShadows } from '@react-three/drei'
import React, { useRef, useState, useEffect } from "react";
import Surfboard from './Surfboard'
import { MeshBasicMaterial } from 'three';


export default function Experience()
{

    return <>

        <OrbitControls makeDefault />

        <directionalLight castShadow intensity={ 1 } position={[2, 6, 0]} />
        <ambientLight intensity={ 0.3 } />

        <SoftShadows frustum={ 1.25 } size={ 25 } near={ 10.5 } samples={ 17 } rings={11 } />

        <Surfboard receiveShadow castShadow position={ [ 0, .3, 0 ] } rotation={ [ 0, 1, 0]} />

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
            color="white" />
        </mesh>

        <Sky sunPosition={ [ 100, 10, 150 ] } />





    </>
}
