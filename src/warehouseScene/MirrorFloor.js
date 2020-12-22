import React from "react"
import useRenderTarget from "../utils/useRenderTarget"

const MirrorFloor = (props) => {
  const [cubeCamera, renderTarget] = useRenderTarget()
  return (
    <>
      <cubeCamera position={[0, 2, 0]} name="cubeCamera" ref={cubeCamera} args={[0.1, 100, renderTarget]} />
      <Floor {...props} envMap={renderTarget.texture}></Floor>
    </>
  )
}

const Floor = ({ envMap, children, ...props }) => {
  return (
    <>
      <mesh {...props}>
        <planeBufferGeometry attach="geometry" args={[80, 25]} />
        <meshBasicMaterial attach="material" envMap={envMap} color="#FFFFFF" />
      </mesh>
      {children}
    </>
  )
}

export default MirrorFloor
