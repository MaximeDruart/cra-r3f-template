import React from 'react'
import { useResource } from 'react-three-fiber'

const PointLightWrapper = ({ position, intensity = 1, distance = 0, color = 0xffffff, helper = false }) => {
	const [pointLightRef, pointLight] = useResource()

	return (
		<>
			<pointLight position={position} intensity={intensity} distance={distance} color={color} decay={2} ref={pointLightRef} />
			{helper && pointLight && <pointLightHelper args={[pointLight]} />}
		</>
	)
}

const SpotLightWrapper = ({ position, intensity = 1, distance = 0, color = 0xffffff, angle = Math.PI / 2, penumbra = 0, helper = false }) => {
	const [spotLightRef, spotLight] = useResource()

	return (
		<>
			<spotLight position={position} intensity={intensity} distance={distance} color={color} decay={2} angle={angle} penumbra={penumbra} ref={spotLightRef} />
			{helper && spotLight && <spotLightHelper args={[spotLight]} />}
		</>
	)
}

export { PointLightWrapper, SpotLightWrapper }
