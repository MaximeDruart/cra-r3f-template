import { React } from "react"
import { EffectComposer, Bloom, DepthOfField, SMAA, Noise } from "react-postprocessing"
// import { useResource } from "react-three-fiber"
import useStore from "./store"

const Effects = () => {
  // const sunRef = useResource()
  const outlineTargets = useStore((state) => state.outlineTargets)

  console.log(outlineTargets)
  return (
    <>
      {/* <mesh ref={sunRef} position={[0, 4, 0]} scale={[1, 1, 1]}>
        <dodecahedronGeometry attach='geometry' />
        <meshStandardMaterial visible={false} emissive='white' attach='material' color={"blue"} />
      </mesh> */}
      <EffectComposer multisampling={0}>
        {/* <Sepia
                intensity={1.0} // sepia intensity
                //   blendFunction={BlendFunction.NORMAL} // blend mode
            /> */}
        {/* {sunRef.current && (
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
              width={Resizer.AUTO_SIZE} // Render width.
              height={Resizer.AUTO_SIZE} // Render height.
              kernelSize={KernelSize.SMALL} // The blur kernel size. Has no effect if blur is disabled.
              blur={true} // Whether the god rays should be blurred to reduce artifacts.
            />
          )} */}

        {/* {outlineTargets && (
          <Outline
            selection={[outlineTargets]} // selection of objects that wiill be outlined
            blendFunction={BlendFunction.SCREEN} // set this to BlendFunction.ALPHA for dark outlines
            patternTexture={null} // a pattern texture
            edgeStrength={150} // the edge strength
            pulseSpeed={0.0} // a pulse speed. A value of zero disables the pulse effect
            visibleEdgeColor={0xffffff} // the color of visible edges
            hiddenEdgeColor={0x22090a} // the color of hidden edges
            width={Resizer.AUTO_SIZE} // render width
            height={Resizer.AUTO_SIZE} // render height
            kernelSize={KernelSize.LARGE} // blur kernel size
            blur={false} // whether the outline should be blurred
            xRay={true} // indicates whether X-Ray outlines are enabled
          />
        )} */}

        <SMAA />
        <Noise opacity={0.02} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={0.09} />
        <DepthOfField focusDistance={0} focalLength={0.04} bokehScale={1.6} height={360} />
      </EffectComposer>
    </>
  )
}

export default Effects
