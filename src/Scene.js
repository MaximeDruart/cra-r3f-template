import { Box } from "@react-three/drei"
import React, { useRef, useMemo } from "react"
import { useFrame } from "react-three-fiber"
import * as THREE from "three"
import niceColors from "nice-color-palettes"

const count = 100

const dummyObject = new THREE.Object3D()
const tempColor = new THREE.Color()

const r = (f = false, c = 1) => (!f ? Math.random() * c - c / 2 : Math.floor(Math.random() * c - c / 2))

const colors = new Array(count).fill().map(() => niceColors[17][Math.floor(Math.random() * 5)])

const positions = new Array(count).fill().map(() => [r(false, 10), r(false, 10), r(false, 10)])

const Totem = (props) => {
  const instancedRef = useRef()

  const colorArray = useMemo(
    () => Float32Array.from(new Array(count).fill().flatMap((_, i) => tempColor.set(colors[i]).toArray())),
    []
  )

  useFrame(({ clock }) => {
    positions.forEach((pos, index) => {
      const [posx, posy, posz] = pos
      dummyObject.position.set(posx, posy + Math.sin(index + clock.getElapsedTime()), posz)
      dummyObject.updateMatrix()

      //   console.log(dummyObject.matrix)
      instancedRef.current.setMatrixAt(index, dummyObject.matrix)
    })
    instancedRef.current.instanceMatrix.needsUpdate = true

    // console.log(instancedRef.current.instanceMatrix)
  })
  return (
    <>
      <instancedMesh castShadow={true} receiveShadow={true} ref={instancedRef} args={[null, null, count]}>
        <boxBufferGeometry attach='geometry' args={[2, 2, 2]}>
          <instancedBufferAttribute attachObject={["attributes", "color"]} args={[colorArray, 3]} />
        </boxBufferGeometry>
        <meshPhongMaterial attach='material' vertexColors={THREE.VertexColors} />
      </instancedMesh>
      <pointLight receiveShadow={true} castShadow={true} position={[5, 15, 0]} args={[0xff0000, 10, 100]} />
    </>
  )
}

export default Totem

// import * as THREE from "three"
// import ReactDOM from "react-dom"
// import React, { useRef, useMemo, useState, useEffect } from "react"
// import { Canvas, useFrame } from "react-three-fiber"

// const tempObject = new THREE.Object3D()

// function Boxes() {
//   const ref = useRef()

//   useFrame((state) => {
//     const time = state.clock.getElapsedTime()
//     ref.current.rotation.x = Math.sin(time / 4)
//     ref.current.rotation.y = Math.sin(time / 2)
//     let i = 0
//     for (let x = 0; x < 10; x++)
//       for (let y = 0; y < 10; y++)
//         for (let z = 0; z < 10; z++) {
//           const id = i++
//           tempObject.position.set(0, 0, 0)
//           //   tempObject.rotation.y = Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time)
//           //   tempObject.rotation.z = tempObject.rotation.y * 2
//           tempObject.updateMatrix()
//           ref.current.setMatrixAt(id, tempObject.matrix)
//         }
//     ref.current.instanceMatrix.needsUpdate = true
//   })

//   return (
//     <instancedMesh ref={ref} args={[null, null, 1000]}>
//       <boxBufferGeometry attach='geometry' args={[0.7, 0.7, 0.7]} />
//       <meshBasicMaterial color='rgb(0,0,255)' attach='material' />
//     </instancedMesh>
//   )
// }

// export default Boxes
