import React from "react"

const Scene = (props) => {
  return (
    <>
      <gridHelper />
      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
        <meshNormalMaterial attach='material' color='hotpink' />
      </mesh>
    </>
  )
}

export default Scene
