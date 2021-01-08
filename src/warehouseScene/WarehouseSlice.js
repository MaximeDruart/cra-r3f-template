import React from "react"
import * as THREE from "three"
import { useGLTF } from "@react-three/drei/useGLTF"

import { PointLightWrapper } from "../utils/lightWrappers"
import EmissiveWindow from "./EmissiveWindow"
import params from "../assets/params.json"

const WarehouseSlice = ({ position, index }) => {
  const { nodes } = useGLTF("models/warehouse_slice_updated.glb")
  console.log(nodes)
  return (
    <mesh castShadow={false} receiveShadow position={position} geometry={nodes.slice.geometry}>
      <meshLambertMaterial side={THREE.DoubleSide} color={params.sceneColor} attach="material" />
      <group>
        <EmissiveWindow position={[0, position[1] + 5.05, position[2] + 7.4]} rotation={[-Math.PI / 2.2, 0, 0]} />
        <PointLightWrapper
          position={[0, position[1] + 3.8, position[2] - 7]}
          intensity={12}
          distance={14}
          color={0xffffff}
          helper={false}
        />

        <PointLightWrapper
          position={[0, position[1] + 3.8, position[2] + 7]}
          intensity={12}
          distance={14}
          color={0xffffff}
          helper={false}
        />
        <EmissiveWindow
          position={[0, position[1] + 5.05, position[2] - 7.4]}
          rotation={[Math.PI + Math.PI / 2.2, 0, 0]}
        />
      </group>
    </mesh>
  )
}

// useGLTF.preload('/warehouseSlice.glb')

export default WarehouseSlice
