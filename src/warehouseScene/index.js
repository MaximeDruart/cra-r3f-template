import React, { Suspense } from 'react'

// import { PointLightWrapper, SpotLightWrapper } from '../utils/lightWrappers'
import params from '../assets/params.json'
import Warehouse from './Warehouse'

const Scene = () => {
	return (
		<>
			<mesh position={[0, 0, 0]} scale={[1, 1, 1]}>
				<dodecahedronGeometry attach="geometry" />
				<meshStandardMaterial attach="material" color={params.sceneColor} />
			</mesh>
			<Suspense fallback={null}>
				<Warehouse position={[0, 0, 0]} />
			</Suspense>
		</>
	)
}

export default Scene
