import React, { Suspense } from "react"

// import { PointLightWrapper, SpotLightWrapper } from '../utils/lightWrappers'
import params from "../assets/params.json"
import MirrorFloor from "./MirrorFloor"
import Warehouse from "./Warehouse"
import WarehouseFloor from "./WarehouseFloor"

const Scene = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Warehouse position={[0, 0, 0]} />
        <WarehouseFloor />
        {/* <MirrorFloor position-y={-2} rotation={[-Math.PI / 2, 0, 0]} /> */}
      </Suspense>
    </>
  )
}

export default Scene
