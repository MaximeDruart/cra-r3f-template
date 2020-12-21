import { BlendFunction } from "postprocessing"
import { React, Suspense, useLayoutEffect } from "react"
import { EffectComposer, GodRays, Sepia } from "react-postprocessing"
import { useResource } from "react-three-fiber"

const Effects = () => {
  const sunRef = useResource()

  useLayoutEffect(() => {
    console.log(sunRef)
  }, [])
  return (
    <>
      <mesh ref={sunRef} position={[0, 4, 0]} scale={[1, 1, 1]}>
        <dodecahedronGeometry attach="geometry" />
        <meshStandardMaterial visible={false} emissive="white" attach="material" color={"blue"} />
      </mesh>
      <Suspense fallback="null">
        <EffectComposer>
            {/* <Sepia
                intensity={1.0} // sepia intensity
                //   blendFunction={BlendFunction.NORMAL} // blend mode
            /> */}
          {sunRef.current && (
            <GodRays
              test={console.log(sunRef)}
              sun={sunRef.current}
              blendFunction={BlendFunction.Screen} // The blend function of this effect.
              samples={60} // The number of samples per pixel.
              density={0.96} // The density of the light rays.
              decay={0.9} // An illumination decay factor.
              weight={3} // A light ray weight factor.
              exposure={0.6} // A constant attenuation coefficient.
              clampMax={1} // An upper bound for the saturation of the overall effect.
              //   width={Resizer.AUTO_SIZE} // Render width.
              //   height={Resizer.AUTO_SIZE} // Render height.
              //   kernelSize={KernelSize.SMALL} // The blur kernel size. Has no effect if blur is disabled.
              blur={true} // Whether the god rays should be blurred to reduce artifacts.
            />
          )}
        </EffectComposer>
      </Suspense>
    </>
  )
}

export default Effects
