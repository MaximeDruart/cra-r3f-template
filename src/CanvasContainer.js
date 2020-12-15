import React from "react"
import styled from "styled-components"
import { Canvas } from "react-three-fiber"
import { OrbitControls, Plane } from "drei"
import * as THREE from "three"

import params from "./assets/params.json"
import Scene from "./Scene"

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
`

const CanvasContainer = () => {
  return (
    <StyledContainer>
      <Canvas style={{ background: params.sceneColor }}>
        <ambientLight intensity={1} />
        <OrbitControls />
        <gridHelper />
        <axesHelper scale={[5, 5, 5]} />

        <Scene />
      </Canvas>
    </StyledContainer>
  )
}

export default CanvasContainer
