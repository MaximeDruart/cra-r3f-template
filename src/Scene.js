import { Box } from "@react-three/drei"
import React, { useRef, useMemo, useState, useLayoutEffect } from "react"
import { useFrame } from "react-three-fiber"
import * as THREE from "three"
import niceColors from "nice-color-palettes"

const count = 1000

const dummyObject = new THREE.Object3D()
const tempColor = new THREE.Color()

const r = (f = false, c = 1) => (!f ? Math.random() * c - c / 2 : Math.floor(Math.random() * c - c / 2))

const colors = new Array(count).fill().map(() => niceColors[2][Math.floor(Math.random() * 5)])

let positions = new Array(count).fill().map(() => ({
  totemPos: [r(false, 3.5), r(false, 5), r(false, 3.5)],
  circlePos: "",
}))

const Totem = (props) => {
  const instancedRef = useRef()
  const circleRef = useRef()
  const [isExploded, setIsExploded] = useState(false)
  // 0 means state 1 and 1 means state 2
  const [animStatus, setAnimStatus] = useState({ value: 0, ascending: true })

  const colorArray = useMemo(
    () => Float32Array.from(new Array(count).fill().flatMap((_, i) => tempColor.set(colors[i]).toArray())),
    []
  )

  useLayoutEffect(() => {
    const { vertices } = circleRef.current.geometry
    positions = positions.map((pos) => ({
      ...pos,
      circlePos: vertices[Math.floor(Math.random() * vertices.length)],
    }))
  }, [])

  useFrame(({ clock }) => {
    // update animStatus
    setAnimStatus((animStatus) => {
      if (animStatus.ascending) {
        if (animStatus.value >= 1) return animStatus
        return { ...animStatus, value: animStatus.value + 0.05 }
      }
      if (!animStatus.ascending) {
        if (animStatus.value <= 0) return animStatus
        return { ...animStatus, value: animStatus.value - 0.01 }
      }
    })

    console.log(animStatus.value)

    positions.forEach((pos, index) => {
      const { totemPos, circlePos } = pos
      const position = new THREE.Vector3(0, 0, 0)
      const [x, y, z] = totemPos
      const actualPos = position.lerpVectors(new THREE.Vector3(x, y, z), circlePos, animStatus.value)
      dummyObject.position.set(actualPos.x, actualPos.y, actualPos.z)
      // dummyObject.position.set(0, 0, 0)
      dummyObject.updateMatrix()
      instancedRef.current.setMatrixAt(index, dummyObject.matrix)
    })
    instancedRef.current.instanceMatrix.needsUpdate = true

    // if (!isExploded) {
    //   const totemPos = positions.map(({ totemPos }) => totemPos)
    //   totemPos.forEach((pos, index) => {
    //     const [posx, posy, posz] = pos
    //     dummyObject.position.set(posx, posy + Math.sin(index + clock.getElapsedTime()), posz)
    //     dummyObject.updateMatrix()

    //     dummyObject.updateMatrix()
    //     instancedRef.current.setMatrixAt(index, dummyObject.matrix)
    //   })
    //   instancedRef.current.instanceMatrix.needsUpdate = true
    // } else {
    //   positions.forEach(({ circlePos }, index) => {
    //     dummyObject.position.set(circlePos.x, circlePos.y, circlePos.z)

    //     dummyObject.updateMatrix()
    //     instancedRef.current.setMatrixAt(index, dummyObject.matrix)
    //   })
    //   instancedRef.current.instanceMatrix.needsUpdate = true
    // }
  })

  // const explode = () => {
  //   const { vertices } = circleRef.current.geometry
  //   positions.forEach((pos, index) => {
  //     const randomVertex = vertices[Math.floor(Math.random() * vertices.length)]
  //     dummyObject.position.set(randomVertex.x, randomVertex.y, randomVertex.z)

  //     dummyObject.updateMatrix()
  //     instancedRef.current.setMatrixAt(index, dummyObject.matrix)
  //   })
  //   instancedRef.current.instanceMatrix.needsUpdate = true
  // }

  return (
    <>
      <mesh ref={circleRef} onClick={() => setIsExploded(!isExploded)}>
        <sphereGeometry attach="geometry" args={[10, 32, 32]} />
        <meshStandardMaterial wireframe={true} attach="material" color="blue" />
      </mesh>
      <instancedMesh castShadow={true} receiveShadow={true} ref={instancedRef} args={[null, null, count]}>
        <boxBufferGeometry attach="geometry" args={[1, 2, 1]}>
          <instancedBufferAttribute attachObject={["attributes", "color"]} args={[colorArray, 3]} />
        </boxBufferGeometry>
        <meshStandardMaterial attach="material" vertexColors={THREE.VertexColors} />
      </instancedMesh>
      <pointLight receiveShadow={true} castShadow={true} position={[5, 15, 0]} args={[0xff0000, 10, 100]} />
    </>
  )
}

export default Totem
