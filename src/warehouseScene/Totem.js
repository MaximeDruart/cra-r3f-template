import React, { useRef, useState, useLayoutEffect, useCallback } from "react"
import { useFrame } from "react-three-fiber"
import * as THREE from "three"
import params from "../assets/params.json"
import SimplexNoise from "simplex-noise"
import seedrandom from "seedrandom"
import { mapRange } from "../utils/functions"
import useStore from "../store"
import groundCrackPath from "../assets/texture/groundCrackInverted.png"
import { useCubeTexture, useTexture } from "@react-three/drei"
import lerp from "lerp"
import mapPath from "../assets/texture/groundCrack.png"
import invertedMapPath from "../assets/texture/groundCrackInverted.png"
import normalMapPath from "../assets/texture/groundCrackNormal.png"
import { Box } from "drei"

const noise = new SimplexNoise()

const count = 10

const dummyObject = new THREE.Object3D()

const easeOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const easeIn = (x) => x * x * x * x
const r = (f = false, c = 1) => (!f ? Math.random() * c - c / 2 : Math.floor(Math.random() * c - c / 2))

const Totem = (props) => {
  const [mapTest, invertedMap, normalMap] = useTexture([mapPath, invertedMapPath, normalMapPath])
  mapTest.wrapS = THREE.RepeatWrapping
  mapTest.wrapT = THREE.RepeatWrapping
  mapTest.repeat.y = 0.6
  mapTest.repeat.x = 0.3
  normalMap.wrapS = THREE.RepeatWrapping
  normalMap.wrapT = THREE.RepeatWrapping
  normalMap.repeat.y = 0.6
  normalMap.repeat.x = 0.3
  invertedMap.wrapS = THREE.RepeatWrapping
  invertedMap.wrapT = THREE.RepeatWrapping
  invertedMap.repeat.y = 0.6
  invertedMap.repeat.x = 0.3

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

  const spotLightRef = useRef()
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
    centerLightRef.current.power = easeOut(animValue.current) * 30 * 4 * Math.PI
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
    spotLightRef.current.power = lerp(
      spotLightRef.current.power,
      cameraTarget?.id === instancedRef?.current?.uuid ? (cameraTarget ? 10 * 4 * Math.PI : 0) : 0,
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
        ref={spotLightRef}
        // castShadow
        visible={cameraTarget?.id === instancedRef?.current?.uuid}
        distance={40}
        decay={2}
        angle={0.8}
        target={instancedRef.current}
        color={0xffffff}
        position={[0, 2, 4]}
      />
      <pointLight distance={40} decay={2} ref={centerLightRef} />

      <mesh
        onPointerOver={() => {
          if (cameraTarget && cameraTarget?.id === instancedRef?.current?.uuid) {
            setHovered({ playing: true, dir: "up" })
            document.body.style.cursor = "pointer"
          }
        }}
        onPointerOut={() => {
          if (cameraTarget && cameraTarget?.id === instancedRef?.current?.uuid) {
            setHovered({ playing: true, dir: "down" })
            document.body.style.cursor = "auto"
          }
        }}
        visible={false}
        ref={circleRef}
      >
        <sphereGeometry attach='geometry' args={[1.75, 15, 15]} />
        <meshBasicMaterial wireframe={true} attach='material' color='blue' />
      </mesh>
      <instancedMesh
        castShadow={false}
        receiveShadow={true}
        ref={instancedRef}
        args={[null, null, count]}
        onClick={clickHandler}
        onPointerOver={() => {
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto"
        }}
      >
        <boxBufferGeometry attach='geometry' args={[0.5, 1, 0.5]} />
        <meshStandardMaterial
          attach='material'
          color={"rgb(100,100,100)"}
          emissive={"rgb(40,40,40)"}
          // emissive='white'
          emissiveMap={invertedMap}
          emissiveIntensity={hovered.dir === "up" ? 15 : 0}
          roughness={0.8}
          metalness={0}
          roughnessMap={mapTest}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(15, 15)}
        />

        {/* <meshLambertMaterial
          side={THREE.DoubleSide}
          color={params.sceneColor}
          emissive={"rgb(40,40,40)"}
          attach='material'
        /> */}
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
