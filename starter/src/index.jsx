import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import Overlay from './Overlay'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <>
    <Canvas shadows
        >
        <Experience />
    </Canvas>
    <Overlay />
  </>
)
