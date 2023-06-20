import { OrbitControls, Sky, MeshReflectorMaterial, SoftShadows, Text3D, Html, Hud } from '@react-three/drei'
import React, { useRef, useState, useEffect } from "react";
import Surfboard from './Surfboard'
import { MeshBasicMaterial } from 'three';
import Floor from './Floor'


export default function Experience()
{

    return <>

        <OrbitControls makeDefault />

        <directionalLight castShadow intensity={ 1 } position={[2, 6, 0]} />

        <ambientLight intensity={ 0.3 } />

        <SoftShadows frustum={ 1.25 } size={ 25 } near={ 10.5 } samples={ 17 } rings={11 } />

        <Surfboard receiveShadow castShadow position={ [ 0, .3, 0 ] } rotation={ [ 0, 1, 0]} />

        <Floor />

        <Sky sunPosition={ [ 100, 10, 150 ] } />





    </>
}
