import React from "react"
import { useResource } from "react-three-fiber"

// DO NOT PUT THE HELPER INSIDE THE LIGHT AS A CHILD it bugs out idk why

const PointLightWrapper = (props) => {
  const pointLightRef = useResource()

  return (
    <>
      <pointLight {...props} decay={2} ref={pointLightRef} />
      {props.helper && pointLightRef.current && <pointLightHelper args={[pointLightRef.current]} />}
    </>
  )
}

const SpotLightWrapper = (props) => {
  const spotLightRef = useResource()

  return (
    <>
      <spotLight {...props} ref={spotLightRef} focus={1} decay={2} />
      {props.helper && spotLightRef.current && <spotLightHelper args={[spotLightRef.current]} />}
    </>
  )
}
const DirectionalLightWrapper = (props) => {
  const directionalLightRef = useResource()

  return (
    <>
      <directionalLight {...props} ref={directionalLightRef} />
      {props.helper && directionalLightRef.current && <directionalLightHelper args={[directionalLightRef.current]} />}
    </>
  )
}

export { PointLightWrapper, SpotLightWrapper, DirectionalLightWrapper }
