import { OrbitControls, Sky, MeshReflectorMaterial, SoftShadows, CameraControls } from '@react-three/drei'
import React, { useRef, useState, useEffect } from "react";
import Surfboard from './Surfboard'
import { MeshBasicMaterial } from 'three';
import Floor from './Floor'
import { useRoute, useLocation } from 'wouter';
import * as THREE from 'three'
import { useThree } from '@react-three/fiber';



export default function Experience()
{
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()

    return <>

        <OrbitControls makeDefault />

        <directionalLight castShadow intensity={ 1 } position={[2, 6, 0]} />

        <ambientLight intensity={ 0.3 } />

        <SoftShadows frustum={ 1.25 } size={ 25 } near={ 10.5 } samples={ 17 } rings={11 } />

        <Surfboard receiveShadow castShadow rotation={ [ 0, 1, 0]} />

        <Floor />

        <Sky sunPosition={ [ 100, 10, 150 ] } />
    </>
}
