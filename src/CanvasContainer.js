import React from "react"
import styled from "styled-components"
import { Canvas } from "react-three-fiber"
import * as THREE from "three"
import { OrbitControls, Stats } from "drei"

import WarehouseScene from "./warehouseScene"
import params from "./assets/params.json"
// import Effects from "./Effects"

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
`

const CanvasContainer = () => {
  return (
    <StyledContainer>
      <Canvas
        camera={{ position: [-10, 3, -4] }}
        onCreated={({ gl, camera }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
        }}
        shadowMap
        colorManagement={true}
        style={{ background: params.sceneColor }}
      >
        <ambientLight intensity={1} />
        <WarehouseScene />
        <OrbitControls />
        {/* <gridHelper /> */}
        <axesHelper scale={[5, 5, 5]} />
        {/* <Effects /> */}

        <Stats />
      </Canvas>
    </StyledContainer>
  )
}

export default CanvasContainer
