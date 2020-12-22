import React from "react"

const EmissiveWindow = (props) => {
  return (
    <mesh {...props}>
      <boxBufferGeometry args={[3, 4, 0.2]} attach="geometry" />
      <meshLambertMaterial emissive="rgb(70, 70, 70)" emissiveIntensity={10} color="#131515" attach="material" />
      {props.children}
    </mesh>
  )
}

export default EmissiveWindow
