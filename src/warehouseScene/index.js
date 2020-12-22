import React, { Suspense } from "react"

import Warehouse from "./Warehouse"

const Scene = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Warehouse position={[0, 0, 0]} />
      </Suspense>
    </>
  )
}

export default Scene
