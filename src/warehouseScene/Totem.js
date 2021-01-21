import React, { useRef, useState, useLayoutEffect, useCallback } from "react"
import { useFrame } from "react-three-fiber"
import * as THREE from "three"
import params from "../assets/params.json"
import SimplexNoise from "simplex-noise"
import seedrandom from "seedrandom"
import { mapRange } from "../utils/functions"
import useStore from "../store"
import groundCrackPath from "../assets/texture/groundCrackInverted.png"
import { useTexture } from "@react-three/drei"
import lerp from "lerp"

const noise = new SimplexNoise()

const count = 10
// let animValue.current = 0

let a = new THREE.Vector3(1, 0, 0)
let b = new THREE.Vector3(1, 0, 0)
console.log(a === b, a == b)

const dummyObject = new THREE.Object3D()

const easeOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

const easeIn = (x) => x * x * x * x

const r = (f = false, c = 1) => (!f ? Math.random() * c - c / 2 : Math.floor(Math.random() * c - c / 2))

const Totem = (props) => {
  const [positions, setPositions] = useState(
    new Array(count).fill().map(() => ({
      totemPos: new THREE.Vector3(r(false, 1.75), r(false, 2.5), r(false, 1.75)),
      circlePos: "",
      baseNumber: seedrandom(props.artist)(),
    }))
  )

  let animValue = useRef(0)
  let pickedVerticesHistory = useRef([])

  const [hovered, setHovered] = useState({
    dir: "down",
    playing: false,
  })

  const instancedRef = useRef()
  const circleRef = useRef()

  const lightRef = useRef()
  const centerLightRef = useRef()

  const [setCameraTarget, cameraTarget] = useStore(
    useCallback((state) => [state.setCameraTarget, state.cameraTarget], [])
  )

  const getNearestCircleVertex = (vertices, pos) => {
    let minDistance = Infinity
    let vertex
    for (const _vertex of vertices) {
      const distance = _vertex.distanceTo(pos)
      if (distance < minDistance && !pickedVerticesHistory.current.includes(_vertex)) {
        minDistance = distance
        vertex = _vertex
      }
    }
    return vertex
  }

  useLayoutEffect(() => {
    const { vertices } = circleRef.current.geometry

    setPositions((positions) =>
      positions.map((pos) => ({
        ...pos,
        circlePos: getNearestCircleVertex(vertices, pos.totemPos),
      }))
    )
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    // console.log(hovered)
    // console.log(animValue)

    if (hovered.playing) {
      animValue.current += hovered.dir === "up" ? 0.01 : -0.01
      animValue.current = Math.min(Math.max(animValue.current, 0), 1)
      if (animValue.current <= 0) hovered.playing = false
    }
    centerLightRef.current.power = animValue.current * 40 * 4 * Math.PI
    positions.forEach((pos, index) => {
      const { totemPos, circlePos, baseNumber } = pos
      const position = new THREE.Vector3(0, 0, 0)
      const { x, y, z } = totemPos
      const actualPos = position.lerpVectors(new THREE.Vector3(x, y, z), circlePos, easeOut(animValue.current))
      actualPos.y += noise.noise2D(seedrandom(index.toString())() * 5, baseNumber + t / 20)

      dummyObject.position.set(actualPos.x, actualPos.y, actualPos.z)
      dummyObject.updateMatrix()
      instancedRef.current.setMatrixAt(index, dummyObject.matrix)
    })

    if (hovered.playing) instancedRef.current.rotation.y += mapRange(animValue.current, 0, 1, 0.001, 0.01)
    // const closestFullRotation = Math.floor(instancedRef.current.rotation.y % (Math.PI * 2)) * (Math.PI * 2)
    // if (hovered.dir === "down") instancedRef.current.rotation.y = lerp(instancedRef.current.rotation.y, 0, 0.01)

    instancedRef.current.instanceMatrix.needsUpdate = true

    // light update
    lightRef.current.power = lerp(
      lightRef.current.power,
      cameraTarget?.id === instancedRef?.current?.uuid ? (cameraTarget ? 3 * 4 * Math.PI : 0) : 0,
      0.1
    )
  })

  const clickHandler = (e) => {
    const pos = new THREE.Vector3()
    e.object.getWorldPosition(pos)
    setCameraTarget({ pos, id: e.object.uuid })
  }

  return (
    <group {...props}>
      <spotLight
        ref={lightRef}
        // castShadow
        visible={cameraTarget?.id === instancedRef?.current?.uuid}
        distance={40}
        decay={2}
        angle={0.8}
        target={instancedRef.current}
        color={0xffffff}
        position={[0, 2, 4]}
      />
      <pointLight distance={20} decay={2} ref={centerLightRef} />
      <mesh
        onPointerOver={() =>
          cameraTarget && cameraTarget?.id === instancedRef?.current?.uuid && setHovered({ playing: true, dir: "up" })
        }
        onPointerOut={() =>
          cameraTarget && cameraTarget?.id === instancedRef?.current?.uuid && setHovered({ playing: true, dir: "down" })
        }
        visible={false}
        ref={circleRef}
      >
        <sphereGeometry attach='geometry' args={[1.75, 10, 10]} />
        <meshBasicMaterial wireframe={true} attach='material' color='blue' />
      </mesh>
      <instancedMesh
        castShadow={false}
        receiveShadow={true}
        ref={instancedRef}
        args={[null, null, count]}
        onClick={clickHandler}
      >
        <boxBufferGeometry attach='geometry' args={[0.5, 1, 0.5]}></boxBufferGeometry>
        <meshLambertMaterial
          side={THREE.DoubleSide}
          color={params.sceneColor}
          emissive={"rgb(40,40,40)"}
          attach='material'
        />
        {/* <meshStandardMaterial color={params.sceneColor} attach='material' /> */}
        {/* <Html scaleFactor={10}>Text</Html> */}
      </instancedMesh>
      {/* <mesh position-y={-1.51} rotation={[-Math.PI / 2, 0, 0]}>
        <torusBufferGeometry args={[2.2, 0.0, 16, 100]} />
        <meshLambertMaterial color='black' emissive='rgba(200,200,200)' />
      </mesh> */}
    </group>
  )
}

export default Totem
