import React, { Suspense, useEffect, useState, useCallback } from "react"
import { Box, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import useStore from "../store"
import Warehouse from "./warehouse"
import Totems from "./Totems"
import Props from "./Props"
import { useFrame, useResource, useThree } from "react-three-fiber"
import lerp from "lerp"
import gsap from "gsap"
// import mapRange from '../utils/functions'

import useEventListener from "../utils/useEventListener"

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3)

const WarehouseScene = () => {
  const cameraTarget = useStore((state) => state.cameraTarget)
  const orbitRef = useResource()
  const boxRef = useResource()

  const [camIsLocked, setCamIsLocked] = useState(false)

  const mouse = useStore((state) => state.mouse)

  useEffect(() => {
    if (cameraTarget?.pos) {
      gsap.fromTo(
        boxRef.current,
        {
          three: {
            positionX: boxRef.current.position.x,
            positionY: boxRef.current.position.y,
            positionZ: boxRef.current.position.z,
          },
        },
        {
          three: {
            positionX: cameraTarget.pos.x,
            positionY: cameraTarget.pos.y,
            positionZ: cameraTarget.pos.z,
          },
          duration: 1,
          ease: "power3.easeInOut",
        }
      )

      gsap.fromTo(
        orbitRef.current.object,
        {
          three: {
            positionX: orbitRef.current.object.position.x,
            positionY: orbitRef.current.object.position.y,
            positionZ: orbitRef.current.object.position.z,
          },
        },
        {
          three: {
            positionX: cameraTarget.pos.x,
            positionY: cameraTarget.pos.y + 2,
            positionZ: cameraTarget.pos.z + 5,
          },
          duration: 1,
          ease: "power3.easeInOut",
          onStart: () => {
            setCamIsLocked(true)
            orbitRef.current.enabled = false
          },
          onUpdate: () => {
            orbitRef.current.target = boxRef.current.position
          },
          onComplete: () => {
            setCamIsLocked(false)
            orbitRef.current.enabled = true
          },
        }
      )
    }
  }, [boxRef, cameraTarget, orbitRef])

  return (
    <>
      <OrbitControls
        enablePan={false}
        enableKeys={true}
        maxAzimuthAngle={Math.PI / 2.2}
        minAzimuthAngle={-Math.PI / 2.2}
        minDistance={3.5}
        maxDistance={7}
        minPolarAngle={-Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        ref={orbitRef}
        position={[0, -100, -11]}
      />
      <Box wireframe={true} ref={boxRef} />
      <Warehouse position={[0, 0, 0]} />
      <Props rotation={[0, Math.PI / 2, 0]} position={[0, -2.5, 0]} />
      <Totems />
    </>
  )
}

export default WarehouseScene
