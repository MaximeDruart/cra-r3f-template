import React, { useMemo } from "react"
// import * as THREE from "three"
import WarehouseSlice from "./Slice"
import params from "../../assets/params.json"
import Floor from "./Floor"
import End from "./End"

const Warehouse = (props) => {
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
      {mappedWarehouseSlices}
      <End rotation={[0, Math.PI / 2, 0]} position={[0, 0, -11.2 * params.warehouseSliceNumber]} />
      {/* <Floor /> */}
    </group>
  )
}

export default Warehouse
