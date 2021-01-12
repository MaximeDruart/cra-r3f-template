import React, { useMemo } from "react"
import WarehouseSlice from "./Slice"
import params from "../../assets/params.json"
import Floor from "./Floor"
import End from "./End"
import Props from "./Props"

const Warehouse = (props) => {
  const mappedWarehouseSlices = useMemo(
    () =>
      new Array(params.warehouseSliceNumber)
        .fill()
        .map((_, i) => <WarehouseSlice index={i} position={[11.2 * i, 0, 0]} key={i} />),
    []
  )

  return (
    <group {...props}>
      {mappedWarehouseSlices}
      <End position={[11.2 * params.warehouseSliceNumber, 0, 0]} />
      <Props position={[0, -2.5, 0]} />
      <Floor />
    </group>
  )
}

export default Warehouse
