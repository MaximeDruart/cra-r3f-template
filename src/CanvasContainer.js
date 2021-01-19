import React, { Suspense } from "react"
import styled from "styled-components"
import { Canvas } from "react-three-fiber"
import * as THREE from "three"
import { OrbitControls, Stats } from "drei"

import WarehouseScene from "./warehouseScene"
import params from "./assets/params.json"
import Effects from "./Effects"
import { EffectComposer, Noise } from "react-postprocessing"
import gsap from "gsap"
import ThreePlugin from "./utils/GSAPTHREE"
import useStore from "./store"

gsap.registerPlugin(ThreePlugin)

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
`

const CanvasContainer = () => {
  const updateMouse = useStore((state) => state.updateMouse)

  return (
    <StyledContainer>
      <Canvas
        onCreated={({ gl, camera }) => {
          gl.physicallyCorrectLights = true
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = Math.pow(0.7, 5.0) // -> exposure: 0.168
          gl.antialias = false
          // camera.position.set(0, 0, 11)
        }}
        shadowMap
        colorManagement={true}
        style={{ background: params.sceneColor }}
        onPointerMove={updateMouse}
      >
        <ambientLight intensity={1} />
        {/* <gridHelper /> */}
        {/* <axesHelper scale={[5, 5, 5]} /> */}
        <Suspense fallback={null}>
          <WarehouseScene />
          <Effects />
        </Suspense>

        <Stats />
      </Canvas>
    </StyledContainer>
  )
}

export default CanvasContainer
