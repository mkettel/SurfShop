import { Sky, SoftShadows } from '@react-three/drei'
import React, { useRef, useState, useEffect } from "react";
import Surfboard from './Surfboard'
import Floor from './Floor'
import { Butterstick } from './Butterstick';
import { useControls } from 'leva';


export default function Experience()
{

    // Scene Resizing for Mobile -----------------------------------------------
    const [surfScale, setSurfScale ] = useState(1);
    const [butterScale, setButterScale ] = useState(1.2);
    useEffect(() => {
      function handleResize() {
        const { innerWidth } = window;
        const isMobile = innerWidth <= 768; // Adjust the breakpoint for mobile devices
        const scale = isMobile ? .60 : 1; // Adjust the scale values for mobile
        const butterScale = isMobile ? .60 : 1.2; // Adjust the scale values for mobile
        setSurfScale(scale);
        setButterScale(butterScale);
      }
      window.addEventListener('resize', handleResize);
    handleResize(); // Call the function initially

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    }, []);
    // --------------------------------------------------------------------------

    // Leva Surfboard Change
    const { selectedBoard } = useControls({
      selectedBoard: {
        value: 'Chupacabra',
        label: 'Choose Surfboard',
        options: ['Chupacabra', 'Butterstick']
      }
    });

    return <>

        <directionalLight castShadow intensity={ 1 } position={[2, 6, 0]} shadow-mapSize={ [1024, 1024] } shadow-camera-far={10} shadow-camera-near={0} shadow-camera-left={-5} />

        <ambientLight intensity={ 0.3 } />

        <SoftShadows frustum={ 1.25 } size={ 15 } near={ 10.5 } samples={ 17 } rings={11 } />

        {selectedBoard === 'Chupacabra' && <Surfboard scale={surfScale} receiveShadow castShadow rotation={ [ 0, 1, 0]} />}
        {selectedBoard === 'Butterstick' && <Butterstick scale={butterScale} receiveShadow castShadow rotation={ [ 0, 4, 0]} />}

        <Floor />

        <Sky sunPosition={ [ 100, 10, 150 ] } />

    </>
}
