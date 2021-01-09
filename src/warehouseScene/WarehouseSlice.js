import React from "react"
import * as THREE from "three"
import { useGLTF } from "@react-three/drei/useGLTF"

import { PointLightWrapper } from "../utils/lightWrappers"
import EmissiveWindow from "./EmissiveWindow"
import params from "../assets/params.json"

const WarehouseSlice = (props) => {
  const { nodes } = useGLTF("models/warehouse_slice_updated.glb")
  return (
    <mesh {...props} castShadow={false} receiveShadow geometry={nodes.slice.geometry}>
      <meshLambertMaterial side={THREE.DoubleSide} color={params.sceneColor} attach='material' />
      <group>
        <EmissiveWindow position={[0, 5.05, 7.4]} rotation={[-Math.PI / 2.2, 0, 0]} />
        <PointLightWrapper
          position={[0, 0 + 3.8, 0 - 7]}
          intensity={12}
          distance={14}
          color={0xffffff}
          helper={false}
        />

        <PointLightWrapper position={[0, 3.8, 7]} intensity={12} distance={14} color={0xffffff} helper={false} />
        <EmissiveWindow position={[0, 5.05, -7.4]} rotation={[Math.PI + Math.PI / 2.2, 0, 0]} />
      </group>
    </mesh>
  )
}

// useGLTF.preload('/warehouseSlice.glb')

export default WarehouseSlice
