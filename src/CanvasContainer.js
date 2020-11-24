import React, { useState, useRef } from "react"
import { Canvas, useFrame } from "react-three-fiber"
import { OrbitControls } from "drei"
import Scene from "./Scene"
import styled from "styled-components"

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
`

const CanvasContainer = () => {
  return (
    <StyledContainer>
      <Canvas>
        <ambientLight intensity={0.11} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Scene />
        <OrbitControls />
      </Canvas>
    </StyledContainer>
  )
}

export default CanvasContainer
