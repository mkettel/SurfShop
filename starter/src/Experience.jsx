import { Sky, SoftShadows } from '@react-three/drei'
import React, { useRef, useState, useEffect } from "react";
import Surfboard from './Surfboard'
import Floor from './Floor'


export default function Experience()
{

    // Scene Resizing for Mobile -----------------------------------------------
    const [surfScale, setSurfScale ] = useState(1);
    useEffect(() => {
      function handleResize() {
        const { innerWidth } = window;
        const isMobile = innerWidth <= 768; // Adjust the breakpoint for mobile devices
        const scale = isMobile ? .60 : 1; // Adjust the scale values for mobile
        setSurfScale(scale);
      }
      window.addEventListener('resize', handleResize);
    handleResize(); // Call the function initially

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    }, []);
    // --------------------------------------------------------------------------


    return <>

        <directionalLight castShadow intensity={ 1 } position={[2, 6, 0]} shadow-mapSize={ [2224, 1224] }  />

        <ambientLight intensity={ 0.3 } />

        <SoftShadows frustum={ 1.25 } size={ 25 } near={ 10.5 } samples={ 17 } rings={11 } />

        <Surfboard scale={surfScale} receiveShadow castShadow rotation={ [ 0, 1, 0]} />

        <Floor />

        <Sky sunPosition={ [ 100, 10, 150 ] } />

    </>
}
