import { TextureLoader, RepeatWrapping } from "three"
import { useFrame, useLoader, useResource } from "react-three-fiber"
import { Reflector } from "@react-three/drei"
import shader from "../../utils/reflectorShader.js"

import params from "../../assets/params.json"
// import wetFloorMapSource from "../assets/texture/wetFloorMapTest1.png"
import wetFloorMapSource from "../../assets/texture/groundwetconstrast1024.png"
import wetFloorNormalMapSource from "../../assets/texture/Ground_wet_003_normal.jpg"

const WarehouseFloor = () => {
  const wetFloorMap = useLoader(TextureLoader, wetFloorMapSource)
  wetFloorMap.wrapS = RepeatWrapping
  wetFloorMap.wrapT = RepeatWrapping
  const wetFloorNormalMap = useLoader(TextureLoader, wetFloorNormalMapSource)
  wetFloorNormalMap.wrapS = RepeatWrapping
  wetFloorNormalMap.wrapT = RepeatWrapping

  wetFloorMap.repeat.set(params.warehouseSliceNumber * 0.55, 1)
  wetFloorNormalMap.repeat.set(params.warehouseSliceNumber * 0.55, 1)

  const reflectorRef = useResource()

  useFrame(() => {
    // reflectorRef.current.material.uniforms.iTime = Date.now()
  })
  return (
    <>
      <Reflector
        ref={reflectorRef}
        shader={shader}
        position={[0, -4.1, -(params.warehouseSliceNumber / 2) * 11.2]}
        rotation={[-Math.PI / 2, 0, 0]}
        clipBias={0.003}
        textureWidth={window.innerWidth * window.devicePixelRatio}
        textureHeight={window.innerHeight * window.devicePixelRatio}
        color={0x5c5c5c}
      >
        <planeBufferGeometry
          args={[26, params.warehouseLength * (params.warehouseSliceNumber + 1), 5, 5]}
          attach='geometry'
        />
      </Reflector>
      {/* <mesh
        receiveShadow
        position={[0, -4.09, -(params.warehouseSliceNumber / 2) * 11.2]}
        // position={[0, -2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1, 1, 1]}
      >
        <planeBufferGeometry
          args={[26, params.warehouseLength * (params.warehouseSliceNumber + 1), 5, 5]}
          attach='geometry'
        />
        <meshLambertMaterial
          transparent
          alphaMap={wetFloorMap}
          // normalMap={wetFloorNormalMap}
          // normalScale={new THREE.Vector2(1, 1)}
          color='black'
          emissive={"0x151515"}
          attach='material'
        />
      </mesh> */}
    </>
  )
}

export default WarehouseFloor
