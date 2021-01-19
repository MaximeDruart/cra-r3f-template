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

  const groundCrackMap = useTexture(groundCrackPath)
  groundCrackMap.repeat.set(0.3, 0.3)
  groundCrackMap.wrapS = THREE.RepeatWrapping
  groundCrackMap.wrapT = THREE.RepeatWrapping

  const instancedRef = useRef()
  const circleRef = useRef()

  const lightRef = useRef()

  const [setOutlineTargets, setCameraTarget, cameraTarget] = useStore(
    useCallback((state) => [state.setOutlineTargets, state.setCameraTarget, state.cameraTarget], [])
  )
  useLayoutEffect(() => {
    props.index === 0 && instancedRef.current && setOutlineTargets(instancedRef)
  }, [instancedRef, props.index, setOutlineTargets])

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
      ></spotLight>
      <mesh visible={false} ref={circleRef}>
        <sphereGeometry attach='geometry' args={[2, 32, 32]} />
        <meshStandardMaterial wireframe={true} attach='material' color='blue' />
      </mesh>
      <instancedMesh
        onClick={clickHandler}
        scale={[0.56, 0.56, 0.56]}
        castShadow={false}
        receiveShadow={true}
        ref={instancedRef}
        args={[null, null, count]}
      >
        <boxBufferGeometry attach='geometry' args={[1, 2, 1]}></boxBufferGeometry>
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
