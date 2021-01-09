import React from "react"
import params from "../assets/params.json"
import { useGLTF } from "@react-three/drei/useGLTF"

export const Etagere = (props) => {
  const { nodes } = useGLTF("models/etagere.glb")

  return (
    <mesh {...props} castShadow={false} receiveShadow geometry={nodes.etagere.geometry}>
      <meshLambertMaterial color={params.sceneColor} attach='material' />
    </mesh>
  )
}
export const Compteur = (props) => {
  const { nodes } = useGLTF("models/compteur.glb")

  return (
    <mesh {...props} castShadow={false} receiveShadow geometry={nodes.cable003.geometry}>
      <meshLambertMaterial color={params.sceneColor} attach='material' />
    </mesh>
  )
}
export const Porte = (props) => {
  const { nodes } = useGLTF("models/porte.glb")

  return (
    <mesh {...props} castShadow={false} receiveShadow geometry={nodes.porte.geometry}>
      <meshLambertMaterial color={params.sceneColor} attach='material' />
    </mesh>
  )
}

const WarehouseProps = (props) => {
  return (
    <group {...props}>
      <Etagere />
      <Compteur />
      <Porte />
    </group>
  )
}

export default WarehouseProps
