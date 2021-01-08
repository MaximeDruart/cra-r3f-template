import React, { useMemo } from "react"
import WarehouseSlice from "./WarehouseSlice"
import params from "../assets/params.json"
import WarehouseFloor from "./WarehouseFloor"
import WarehouseEnd from "./WarehouseEnd"

const Warehouse = ({ position }) => {
  const mappedWarehouseSlices = useMemo(
    () =>
      new Array(params.warehouseSliceNumber)
        .fill()
        .map((_, i) => (
          <WarehouseSlice index={i} position={[position[0] + 11.2 * i, position[1], position[2]]} key={i} />
        )),
    [position]
  )

  return (
    <>
      {mappedWarehouseSlices}
      <WarehouseEnd position={[position[0] + 11.2 * params.warehouseSliceNumber, position[1], position[2]]} />
      <WarehouseFloor />
    </>
  )
}

export default Warehouse
