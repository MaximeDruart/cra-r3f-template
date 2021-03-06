import React from "react"

const EmissiveWindow = (props) => {
  return (
    <mesh {...props}>
      <boxBufferGeometry args={[3, 4, 0.2]} attach='geometry' />
      <meshNormalMaterial />
      {/* <meshLambertMaterial emissive='rgb(150, 150, 150)' emissiveIntensity={15} color='#131515' attach='material' /> */}
    </mesh>
  )
}

export default EmissiveWindow
