import { TextureLoader, RepeatWrapping } from "three"
import { useLoader } from "react-three-fiber"
import { Reflector } from "@react-three/drei"

import params from "../assets/params.json"
import wetFloorMapSource from "../assets/texture/wetFloorMapTest3.png"

const WarehouseFloor = () => {
  const wetFloorMap = useLoader(TextureLoader, wetFloorMapSource)
  wetFloorMap.wrapS = RepeatWrapping
  wetFloorMap.wrapT = RepeatWrapping
  wetFloorMap.repeat.set(0.7, 0.4)
  return (
    <>
      <Reflector
        // shader={{
        //   uniforms: {
        //     color: {
        //       value: null,
        //     },

        //     tDiffuse: {
        //       value: null,
        //     },

        //     textureMatrix: {
        //       value: null,
        //     },
        //   },

        //   vertexShader: [
        //     "uniform mat4 textureMatrix;",
        //     "varying vec4 vUv;",

        //     "void main() {",

        //     "	vUv = textureMatrix * vec4( position, 1.0 );",

        //     "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

        //     "}",
        //   ].join("\n"),

        //   fragmentShader: [
        //     "uniform vec3 color;",
        //     "uniform sampler2D tDiffuse;",
        //     "varying vec4 vUv;",

        //     "float blendOverlay( float base, float blend ) {",

        //     "	return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );",

        //     "}",

        //     "vec3 blendOverlay( vec3 base, vec3 blend ) {",

        //     "	return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );",

        //     "}",

        //     "void main() {",

        //     "	vec4 base = texture2DProj( tDiffuse, vUv );",
        //     "	gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );",

        //     "}",
        //   ].join("\n"),
        // }}
        position={[(params.warehouseSliceNumber / 2) * 11.2 - 11.2 / 2, -4, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        clipBias={0.003}
        textureWidth={window.innerWidth * window.devicePixelRatio}
        textureHeight={window.innerHeight * window.devicePixelRatio}
        color={0xaaaaaa}
      >
        <planeBufferGeometry args={[params.warehouseLength * params.warehouseSliceNumber, 25]} attach="geometry" />
      </Reflector>
      {/* <mesh
        position={[(params.warehouseSliceNumber / 2) * 11.2 - 11.2 / 2, -3.9, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1, 1, 1]}
      >
        <planeBufferGeometry args={[params.warehouseLength * params.warehouseSliceNumber, 25]} attach="geometry" />
        <meshStandardMaterial attach="material" color={params.sceneColor} transparent alphaMap={wetFloorMap} />
      </mesh> */}
    </>
  )
}

export default WarehouseFloor
