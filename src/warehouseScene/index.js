import React from 'react'

import { PointLightWrapper, SpotLightWrapper } from '../utils/lightWrappers'
import params from '../assets/params.json'

const Scene = () => {
	return (
		<>
			<PointLightWrapper position={[20, 7, -20]} intensity={3} distance={20} color={0xffffff} helper={true} />
			<SpotLightWrapper position={[5, 7, 5]} intensity={3} distance={20} color={0xffffff} angle={0.5} penumbra={0.1} helper={true} />
			<mesh position={[0, 0, 0]} scale={[100, 100, 100]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeBufferGeometry attach="geometry" />
				<meshStandardMaterial attach="material" color={params.sceneColor} />
			</mesh>
			<mesh position={[0, 0, 0]} scale={[1, 1, 1]}>
				<dodecahedronGeometry attach="geometry" />
				<meshStandardMaterial attach="material" color={params.sceneColor} />
			</mesh>
		</>
	)
}

export default Scene
