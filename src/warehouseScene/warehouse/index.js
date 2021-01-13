import React, { useMemo } from "react"
import WarehouseSlice from "./Slice"
import params from "../../assets/params.json"
import Floor from "./Floor"
import End from "./End"
import Props from "./Props"
import * as THREE from "three"
import useStore from "../../store"
import { OrbitControls } from "@react-three/drei"

const Warehouse = (props) => {
  const cameraTarget = useStore((state) => state.cameraTarget)

  const mappedWarehouseSlices = useMemo(
    () =>
      new Array(params.warehouseSliceNumber)
        .fill()
        .map((_, i) => (
          <WarehouseSlice index={i} rotation={[0, Math.PI / 2, 0]} position={[0, 0, -11.2 * i]} key={i} />
        )),
    []
  )

  return (
    <group {...props}>
      <OrbitControls target={cameraTarget || new THREE.Vector3(0, 0, 0)} />
      {mappedWarehouseSlices}
      <End rotation={[0, Math.PI / 2, 0]} position={[0, 0, -11.2 * params.warehouseSliceNumber]} />
      <Props rotation={[0, Math.PI / 2, 0]} position={[0, -2.5, 0]} />
      {/* <Floor /> */}
    </group>
  )
}

export default Warehouse
