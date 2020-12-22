import React from "react"

const EmissiveWindow = (props) => {
  return (
    <mesh {...props}>
      <boxBufferGeometry args={[3, 4, 0.2]} attach="geometry" />
      <meshPhysicalMaterial
        metalness={0}
        roughness={1}
        reflectivity={1}
        emissive="rgb(70, 70, 70)"
        emissiveIntensity={10}
        color="#131515"
        attach="material"
        transmission={1}
      />
      {props.children}
    </mesh>
  )
}

export default EmissiveWindow
