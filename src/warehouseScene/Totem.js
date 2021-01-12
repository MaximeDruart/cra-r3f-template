import React, { useRef, useMemo, useState, useLayoutEffect } from "react"
import { useFrame } from "react-three-fiber"
import * as THREE from "three"
import params from "../assets/params.json"
import SimplexNoise from "simplex-noise"
import seedrandom from "seedrandom"
import { mapRange } from "../utils/functions"
import { PointLightWrapper } from "../utils/lightWrappers"

const noise = new SimplexNoise()

const count = 10

const dummyObject = new THREE.Object3D()

const r = (f = false, c = 1) => (!f ? Math.random() * c - c / 2 : Math.floor(Math.random() * c - c / 2))

const Totem = (props) => {
  const [positions, setPositions] = useState(
    new Array(count).fill().map(() => ({
      totemPos: [r(false, 3.5), r(false, 5), r(false, 3.5)],
      circlePos: "",
      baseNumber: seedrandom(props.artist)(),
    }))
  )

  const instancedRef = useRef()
  const circleRef = useRef()

  const lightRef = useRef()

  useLayoutEffect(() => {
    const { vertices } = circleRef.current.geometry
    setPositions((positions) =>
      positions.map((pos) => ({
        ...pos,
        circlePos: vertices[Math.floor(Math.random() * vertices.length)],
      }))
    )
  }, [])

  useFrame(({ clock }) => {
    positions.forEach((pos, index) => {
      const { totemPos, circlePos, baseNumber } = pos
      const position = new THREE.Vector3(0, 0, 0)
      const [x, y, z] = totemPos
      const actualPos = position.lerpVectors(new THREE.Vector3(x, y, z), circlePos, 0)
      actualPos.y += mapRange(
        noise.noise2D(seedrandom(index.toString())() * 10, baseNumber + clock.getElapsedTime() / 10),
        -1,
        1,
        -1,
        1
      )
      dummyObject.position.set(actualPos.x, actualPos.y, actualPos.z)
      dummyObject.updateMatrix()
      instancedRef.current.setMatrixAt(index, dummyObject.matrix)
    })
    instancedRef.current.instanceMatrix.needsUpdate = true
  })

  const clickHandler = (e) => {
    console.log(e)
  }

  return (
    <group {...props}>
      <mesh visible={false} ref={circleRef}>
        <sphereGeometry attach='geometry' args={[2, 32, 32]} />
        <meshStandardMaterial wireframe={true} attach='material' color='blue' />
      </mesh>
      <instancedMesh
        onClick={clickHandler}
        scale={[0.56, 0.56, 0.56]}
        castShadow={true}
        receiveShadow={true}
        ref={instancedRef}
        args={[null, null, count]}
      >
        <boxBufferGeometry attach='geometry' args={[1, 2, 1]}></boxBufferGeometry>
        <meshLambertMaterial side={THREE.DoubleSide} color={params.sceneColor} attach='material' />
      </instancedMesh>
    </group>
  )
}

export default Totem
