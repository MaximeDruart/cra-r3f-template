import React from 'react'
import { useResource } from 'react-three-fiber'

const PointLightWrapper = ({ position, intensity = 1, distance = 0, color = 0xffffff, helper = false }) => {
	const pointLightRef = useResource()

	return (
		<>
			{<pointLight position={position} intensity={intensity} distance={distance} color={color} decay={2} ref={pointLightRef} />}
			{helper && pointLightRef.current && <pointLightHelper args={[pointLightRef.current]} />}
		</>
	)
}

const SpotLightWrapper = ({ position, intensity = 1, distance = 0, color = 0xffffff, angle = 0.5, penumbra = 0, helper = false }) => {
	const spotLightRef = useResource()

	return (
		<>
			{<spotLight position={position} intensity={intensity} distance={distance} color={color} decay={2} angle={angle} penumbra={penumbra} ref={spotLightRef} />}
			{helper && spotLightRef.current && <spotLightHelper args={[spotLightRef.current]} />}
		</>
	)
}

export { PointLightWrapper, SpotLightWrapper }
