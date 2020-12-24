import { TextureLoader, RepeatWrapping } from "three"
import { useLoader } from "react-three-fiber"
import { Reflector } from "@react-three/drei"
import reflectorFrag from "./reflectorFrag.frag"
import * as THREE from "three"

import params from "../assets/params.json"
// import wetFloorMapSource from "../assets/texture/wetFloorMapTest1.png"
import wetFloorMapSource from "../assets/texture/groundwetconstrast1024.png"
import wetFloorNormalMapSource from "../assets/texture/Ground_wet_003_normal.jpg"

const WarehouseFloor = () => {
  const wetFloorMap = useLoader(TextureLoader, wetFloorMapSource)
  wetFloorMap.wrapS = RepeatWrapping
  wetFloorMap.wrapT = RepeatWrapping
  const wetFloorNormalMap = useLoader(TextureLoader, wetFloorNormalMapSource)
  wetFloorNormalMap.wrapS = RepeatWrapping
  wetFloorNormalMap.wrapT = RepeatWrapping

  wetFloorMap.repeat.set(2.4, 1)
  wetFloorNormalMap.repeat.set(2.4, 1)
  return (
    <>
      <Reflector
        shader={{
          uniforms: {
            color: {
              value: null,
            },

            tDiffuse: {
              value: null,
            },

            textureMatrix: {
              value: null,
            },
          },

          vertexShader: [
            "uniform mat4 textureMatrix;",
            "varying vec4 vUv;",

            "void main() {",

            "	vUv = textureMatrix * vec4( position, 1.0 );",

            "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

            "}",
          ].join("\n"),

          fragmentShader: `
            uniform vec3 color;
            uniform sampler2D tDiffuse;
            varying vec4 vUv;

            float blendOverlay( float base, float blend ) {

                return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

            }

            vec3 blendOverlay( vec3 base, vec3 blend ) {

                return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

            }
            void main() {

            float Pi = 6.28318530718; // Pi*2

            // GAUSSIAN BLUR SETTINGS {{{
            float Directions = 16.0; // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
            float Quality = 6.0; // BLUR QUALITY (Default 4.0 - More is better but slower)
            vec2 Radius = vec2(0.2, 0.2);
            // GAUSSIAN BLUR SETTINGS }}}


            // Normalized pixel coordinates (from 0 to 1)
            // Pixel colour
            vec4 Color = texture2DProj(tDiffuse, vUv);

            // Blur calculations
            for( float d=0.0; d<Pi; d+=Pi/Directions)
            {
                for(float i=1.0/Quality; i<=1.0; i+=1.0/Quality)
                {
                    vec2 blurToAdd = vec2(cos(d),sin(d))*Radius*i;
                    Color += texture2DProj( tDiffuse, vUv.xyz +vec3(blurToAdd, 0.0));		
                }
            }

            // Output to screen
            Color /= Quality * Directions - 15.0;

            gl_FragColor = vec4( blendOverlay( vec3(Color.rgb), color ), 1.0 );
            // gl_FragColor = vec4( base.rgb, 1.0 );
          
          }
			`,
        }}
        position={[(params.warehouseSliceNumber / 2) * 11.2 - 11.2 / 2, -4, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        clipBias={0.003}
        textureWidth={window.innerWidth * window.devicePixelRatio}
        textureHeight={window.innerHeight * window.devicePixelRatio}
        color={0x151515}
      >
        <planeBufferGeometry args={[params.warehouseLength * params.warehouseSliceNumber, 25]} attach="geometry" />
      </Reflector>
      <mesh
        position={[(params.warehouseSliceNumber / 2) * 11.2 - 11.2 / 2, -3.9, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1, 1, 1]}
      >
        <planeBufferGeometry args={[params.warehouseLength * params.warehouseSliceNumber, 25]} attach="geometry" />
        <meshPhongMaterial
          shininess={0}
          attach="material"
          color="black"
          emissive="black"
          emissiveIntensity={10}
          transparent
          alphaMap={wetFloorMap}
          normalMap={wetFloorNormalMap}
          normalScale={new THREE.Vector2(1.5, 1.5)}
        />
      </mesh>
    </>
  )
}

export default WarehouseFloor
