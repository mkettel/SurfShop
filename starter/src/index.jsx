import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import Overlay from './Overlay'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <>
    <Canvas shadows
        camera={ {
          fov: 45,
          near: 0.1,
          far: 200,
          position: [ 5, 5, 12 ]
        } }
        >
        <Experience />
    </Canvas>
    <Overlay />
  </>
)
