import React from "react"
import params from "../assets/params.json"
import { useGLTF } from "@react-three/drei/useGLTF"

export const Shelf = (props) => {
  const { nodes } = useGLTF("models/shelf.glb")

  return (
    <mesh {...props} geometry={nodes.etagere.geometry}>
      <meshLambertMaterial color={params.sceneColor} attach='material' />
    </mesh>
  )
}
export const ElectricMeter = (props) => {
  const { nodes } = useGLTF("models/electric_meter.glb")

  return (
    <mesh {...props} geometry={nodes.cable003.geometry}>
      <meshLambertMaterial color={params.sceneColor} attach='material' />
    </mesh>
  )
}
export const Door = (props) => {
  const { nodes } = useGLTF("models/door.glb")

  return (
    <mesh {...props} geometry={nodes.porte.geometry}>
      <meshLambertMaterial color={params.sceneColor} attach='material' />
    </mesh>
  )
}

const WarehouseProps = (props) => {
  return (
    <group {...props}>
      <Shelf
        castShadow
        receiveShadow
        position={[params.props.shelf.slice * params.warehouseLength, 0, 12.2 * -params.props.shelf.side]}
      />
      <ElectricMeter
        castShadow
        receiveShadow
        position={[
          params.props.electric_meter.slice * params.warehouseLength,
          -1,
          12.85 * -params.props.electric_meter.side,
        ]}
        rotation={[0, Math.PI * params.props.electric_meter.side, 0]}
      />
      <ElectricMeter
        castShadow
        receiveShadow
        scale={[0.8, 0.8, 0.8]}
        position={[-2.5, -1, -12.84]}
        rotation={[0, Math.PI * 2, 0]}
      />
      <Door
        castShadow
        receiveShadow
        position={[params.props.door.slice * params.warehouseLength - 0.5, 0, 12.9 * -params.props.door.side]}
        rotation={[0, Math.PI * params.props.door.side, 0]}
      />
    </group>
  )
}

export default WarehouseProps
