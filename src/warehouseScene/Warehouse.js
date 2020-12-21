import React, { useMemo } from "react"

import WarehouseSlice from "./WarehouseSlice"
import { PointLightWrapper } from "../utils/lightWrappers"
import params from "../assets/params.json"

const Warehouse = ({ position }) => {
  const mappedSlices = useMemo(
    () =>
      new Array(params.warehouseSliceNumber).fill().map((_, i) => (
        <group key={i}>
          <WarehouseSlice position={[position[0] + 11.2 * i, position[1], position[2]]} key={i} />
          <PointLightWrapper
            position={[position[0] + 11.2 * i, position[1] + 4, position[2]]}
            intensity={3}
            distance={20}
            color={0xffffff}
            helper={true}
            key={-i - 1}
          />
        </group>
      )),
    [position]
  )

  return mappedSlices
}

export default Warehouse
