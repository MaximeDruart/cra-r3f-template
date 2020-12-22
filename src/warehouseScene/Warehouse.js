import React, { useMemo } from "react"
import WarehouseSlice from "./WarehouseSlice"
import params from "../assets/params.json"

const Warehouse = ({ position }) => {
  const mappedSlices = useMemo(
    () =>
      new Array(params.warehouseSliceNumber)
        .fill()
        .map((_, i) => (
          <WarehouseSlice index={i} position={[position[0] + 11.2 * i, position[1], position[2]]} key={i} />
        )),
    [position]
  )

  return <>{mappedSlices}</>
}

export default Warehouse
