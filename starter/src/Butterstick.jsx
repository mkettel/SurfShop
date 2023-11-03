import React, { useRef, useState, useEffect } from "react";
import { useGLTF, CameraControls, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from 'leva'
import * as THREE from 'three'

export function Butterstick(props) {
  const { nodes, materials } = useGLTF("../model/butter-stick.glb");

  // Leva Live Editor
  // const { sidesColor, topColor, bottomsColor, stripeColor, finColor } = useControls({
  //   sidesColor: {
  //     value: "#E965A1",
  //     label: "Side Color",
  //   },
  //   topColor: {
  //     value: "#c780b7",
  //     label: "Base Color",
  //   },
  //   bottomsColor: {
  //     value: '#c780b7',
  //     label: "Bottom Base Color",
  //   },
  //   stripeColor: {
  //     value: '#000000',
  //     label: "Stripe Color"
  //   },
  //   finColor: {
  //     value: '#000000',
  //     label: "Fin Color"
  //   }
  // });

  // ---------------------------------------------------------------
  // CUSTOM COLOR SELECTION
  // ---------------------------------------------------------------
  // selected mesh state
  const [selectMesh, setSelectMesh] = useState(null);
  const [meshName, setMeshName] = useState(null);
  // default colors
  const [colors, setColors] = useState({
    sidesColor: "#E965A1",
    topColor: "#c780b7",
    bottomsColor: "#c780b7",
    stripeColor: "#000000",
    finColor: "#000000"
  });

  const availableColors = [
    { id: 'color1', value: "#E965A1", label: "Pink"},
    { id: 'color2', value: "#c780b7", label: "Purple"},
    { id: 'color3', value: "#000000", label: "Black"},
    { id: 'color4', value: "#ffffff", label: "White"},
    { id: 'color5', value: "#ff0000", label: "Red"},
  ]

  // function to get the details of the clicked mesh
  const getMesh = (event) => {
    const { object } = event; // get the mesh object from the event
    if (object) {
      setSelectMesh(object);
      setMeshName(object.name);
      console.log(object.material.color, meshName);
    }
  };

  const colorChange = (color) => {
    if (selectMesh) {
      selectMesh.material.color.set(color);
      console.log(color);
      setColors({
        ...colors,
        [meshName]: color
      })
    }
  }

  // ---------------------------------------------------------------

  // cloning material to make a new one for top and bottom
  const topMaterial = materials.rough.clone();
  topMaterial.color.set(colors.topColor);

  const bottomMaterial = materials.rough.clone();
  bottomMaterial.color.set(colors.bottomsColor);

  useEffect(() => {
    // Update materials directly
    materials.glossy.color.set(colors.sides);
    topMaterial.color.set(colors.top);
    bottomMaterial.color.set(colors.bottoms);
    materials.fin.color.set(colors.fin);
  }, [colors, materials]);

  // Refs
  const butterstick = useRef(); // access to the surfboard
  const controlsRef = useRef(); // access to the camera controls

  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  // access to the top board
  const topBoard = useRef();
  const [topSelected, setTopSelected] = useState(false)

  // Camera Movement for Top Sheet
  const topSheet = () => {
    const oldCameraPosition = [2, 5, 9]
    const newCameraPosition = [2, 5, 10]
    const originTarget = [0, 0, 0]
    const newTarget = [0, 2.8, 0]

    // if the board is selected and it is flipped, then flip it back
    if (topSelected && flipBoardState) {
      setFlipBoardState(false);
    }
    if (!topSelected) {
      controlsRef.current.setLookAt(...newCameraPosition, ...newTarget, .1);
    } else {
      controlsRef.current.setLookAt(...oldCameraPosition, ...originTarget, 1);
    }
    setTopSelected(!topSelected);
  }

  // flipBoardState
  const [flipBoardState, setFlipBoardState] = useState(false)
  const flipBoard = () => {
    if (topSelected) {
      setFlipBoardState(!flipBoardState)
    }
  }

  // Changing position of the surfboard
  useFrame(( camera ) => {
    butterstick.current.rotation.x = topSelected ? THREE.MathUtils.lerp(butterstick.current.rotation.x, 1.2, .05) : THREE.MathUtils.lerp(butterstick.current.rotation.x, 0, .05);
    butterstick.current.position.y = topSelected ? THREE.MathUtils.lerp(butterstick.current.position.y, 3.3, .05) : THREE.MathUtils.lerp(butterstick.current.position.y, 0.1, .05);
    butterstick.current.position.z = topSelected ? THREE.MathUtils.lerp(butterstick.current.position.z, .7, .05) : THREE.MathUtils.lerp(butterstick.current.position.z, 0, .05);
    butterstick.current.rotation.z = flipBoardState ? THREE.MathUtils.lerp(butterstick.current.rotation.z, 2.9, .05) : THREE.MathUtils.lerp(butterstick.current.rotation.z, 0, .05);
    butterstick.current.position.z = flipBoardState ? THREE.MathUtils.lerp(butterstick.current.position.z, 1.6, .05) : THREE.MathUtils.lerp(butterstick.current.position.z, 0, .05);
  })

  return (
    <>
    {availableColors.map((color, index) => (
      <ColorPicker key={color.id} index={index} color={color.value} meshName={meshName} selectMesh={selectMesh} onSelect={() => colorChange()} />
    ))}

    <CameraControls ref={controlsRef} minPolarAngle={.3} maxPolarAngle={Math.PI / 2.3} minAzimuthAngle={-.7} maxAzimuthAngle={1} minDistance={3} maxDistance={11}  />
    <group
      {...props}
      dispose={null}
      ref={butterstick}
      >
      <mesh
        castShadow
        geometry={nodes.surfboard.geometry}
        material-color={colors.sidesColor}
        material={materials.glossy}
        position={[0.039, 1.216, -0.292]}
        scale={[1, 1, 1.123]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        material-envMapIntensity={0.5}
        name="sides"
        onClick={getMesh}
        />
      <mesh
        castShadow
        geometry={nodes.surftop.geometry}
        material-color={colors.topColor}
        material={topMaterial}
        position={[0.039, 1.216, -0.292]}
        scale={[1, 1, 1.123]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        material-envMapIntensity={0.4}
        name="top"
        onClick={getMesh}
        />
      <mesh
        castShadow
        geometry={nodes.surfbottom.geometry}
        material={bottomMaterial}
        material-color={colors.bottomsColor}
        position={[0.039, 1.216, -0.292]}
        scale={[1, 1, 1.123]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        material-envMapIntensity={0.4}
        name="bottoms"
        onClick={getMesh}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes["fin-1"].geometry}
        material={materials.fin}
        material-color={colors.finColor}
        position={[0.653, 0.077, -2.872]}
        rotation={[-3.084, 0, -Math.PI]}
        scale={[0.142, 0.366, 0.441]}
        material-envMapIntensity={0.4}
        name="fin"
        onClick={getMesh}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes["fin-2"].geometry}
        material={materials.fin}
        material-color={colors.finColor}
        position={[-0.477, 0.077, -2.872]}
        rotation={[-3.084, 0, -Math.PI]}
        scale={[0.142, 0.366, 0.441]}
        material-envMapIntensity={0.4}
        name="fin"
        onClick={getMesh}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes["topstripe-body"].geometry}
        material={materials.Material}
        // material-color={stripeColor}
        position={[0.028, 0.682, -0.006]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.016, 1, 3.522]}
        material-envMapIntensity={0.5}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.bottomstripe.geometry}
        material={materials.Material}
        position={[0.028, 0.362, -0.006]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.016, 1, 3.522]}
        material-envMapIntensity={0.5}

      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.c1.geometry}
        material={materials.Material}
        position={[0.077, 0.651, 0.756]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.128}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.r1.geometry}
        material={materials.Material}
        position={[0.067, 0.65, 0.613]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.147}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.e1.geometry}
        material={materials.Material}
        position={[0.067, 0.645, 0.473]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.147}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.s1.geometry}
        material={materials.Material}
        position={[0.067, 0.645, 0.336]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.147}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.c2.geometry}
        material={materials.Material}
        position={[0.077, 0.645, 0.22]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.128}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.e2.geometry}
        material={materials.Material}
        position={[0.067, 0.643, 0.091]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.147}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.n.geometry}
        material={materials.Material}
        position={[0.075, 0.636, -0.024]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.116}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.t.geometry}
        material={materials.Material}
        position={[0.065, 0.636, -0.134]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.116}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.s2.geometry}
        material={materials.Material}
        position={[0.067, 0.634, -0.594]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.147}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.h.geometry}
        material={materials.Material}
        position={[0.076, 0.635, -0.711]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.127}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.a.geometry}
        material={materials.Material}
        position={[0.073, 0.629, -0.843]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.137}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.p.geometry}
        material={materials.Material}
        position={[0.064, 0.629, -0.977]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.137}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.e3.geometry}
        material={materials.Material}
        position={[0.067, 0.629, -1.121]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.147}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.s3.geometry}
        material={materials.Material}
        position={[0.067, 0.629, -1.255]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.147}
        />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes["black-crescent-moon-png-2"].geometry}
        material={materials["black-crescent-moon-png-2"]}
        position={[0.024, 0.64, -0.305]}
        rotation={[3.135, 0.078, 0.049]}
        scale={0.31}
        />
    </group>
    <props.FlipButton topSheet={topSheet} flipBoard={flipBoard} flipBoardState={flipBoardState} setFlipBoardState={setFlipBoardState} topSelected={topSelected} setTopSelected={setTopSelected} />

    <DisplaySelection meshName={meshName} selectMesh={selectMesh} />
  </>
  );
}

useGLTF.preload("/butter-stick.glb");


function ColorPicker({ color, onSelect, index, meshName, selectMesh }) {

  // get access to the mesh
  const mesh = useRef();

  // sphere color state
  const [sphereColor, setSphereColor] = useState(color);

  const handleClick = () => {
    setSphereColor(color);
    selectMesh.material.color.set(color);
    console.log(sphereColor);
  };

  return <>
    <mesh
      useRef={mesh}
      position={[(index * .7) * -.9, .5, 3]}
      onClick={handleClick}
    >
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshBasicMaterial color={color} />
    </mesh>
  </>
}

function DisplaySelection({ meshName, selectMesh}) {


  return <>
    <Html>
      <p className="selectionDisplay">{meshName}</p>
    </Html>
  </>
}
