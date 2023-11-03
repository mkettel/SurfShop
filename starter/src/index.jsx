import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import Overlay from './Overlay'
import { Leva } from 'leva'
import { Color } from 'three'
import Spline from './Spline'
import { OrbitControls } from '@react-three/drei'


const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <>
    <Canvas
      shadows
      camera={{ position: [0, 4, 10], fov: 45 }}
       >
        <Experience />
    </Canvas>

    <Overlay />
    <Leva />
  </>
)
