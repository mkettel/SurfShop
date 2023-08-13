import { OrbitControls, Sky, MeshReflectorMaterial, SoftShadows, CameraControls, PerspectiveCamera, PresentationControls } from '@react-three/drei'
import React, { useRef, useState, useEffect } from "react";
import Surfboard from './Surfboard'
import { MeshBasicMaterial } from 'three';
import Floor from './Floor'
import { useRoute, useLocation } from 'wouter';
import * as THREE from 'three'
import { useThree } from '@react-three/fiber';



export default function Experience()
{


    return <>


        <OrbitControls makeDefault />

        <directionalLight castShadow intensity={ 1 } position={[2, 6, 0]} shadow-mapSize={ [1224, 1224] }  />

        <ambientLight intensity={ 0.3 } />

        <SoftShadows frustum={ 1.25 } size={ 25 } near={ 10.5 } samples={ 17 } rings={11 } />


        <Surfboard receiveShadow castShadow rotation={ [ 0, 1, 0]} />

        <Floor />

        <Sky sunPosition={ [ 100, 10, 150 ] } />
    </>
}
