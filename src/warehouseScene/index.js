import React, { Suspense } from "react"

// import { PointLightWrapper, SpotLightWrapper } from '../utils/lightWrappers'
import params from "../assets/params.json"
import Warehouse from "./warehouse"
import Totems from "./Totems"

const Scene = () => {
  return (
    <>
      <Warehouse position={[0, 0, 0]} />
      <Totems />
    </>
  )
}

export default Scene
