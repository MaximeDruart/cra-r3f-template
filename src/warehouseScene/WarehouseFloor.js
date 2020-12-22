import { TextureLoader, RepeatWrapping } from 'three'
import { useLoader } from 'react-three-fiber'
import { Reflector } from '@react-three/drei'

import params from '../assets/params.json'
import wetFloorMapSource from '../assets/texture/wetFloorMapTest1.png'

const WarehouseFloor = () => {
	const wetFloorMap = useLoader(TextureLoader, wetFloorMapSource)
	wetFloorMap.wrapS = RepeatWrapping
	wetFloorMap.wrapT = RepeatWrapping
	wetFloorMap.repeat.set(0.7, 0.4)
	return (
		<>
			<Reflector position={[(params.warehouseSliceNumber / 2) * 11.2 - 11.2 / 2, -4, 0]} rotation={[-Math.PI / 2, 0, 0]} clipBias={0.003} textureWidth={window.innerWidth * window.devicePixelRatio} textureHeight={window.innerHeight * window.devicePixelRatio} color={0x151515}>
				<planeBufferGeometry args={[params.warehouseLength * params.warehouseSliceNumber, 25]} attach="geometry" />
			</Reflector>
			<mesh position={[(params.warehouseSliceNumber / 2) * 11.2 - 11.2 / 2, -3.9, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 1]}>
				<planeBufferGeometry args={[params.warehouseLength * params.warehouseSliceNumber, 25]} attach="geometry" />
				<meshStandardMaterial attach="material" color={params.sceneColor} transparent alphaMap={wetFloorMap} />
			</mesh>
		</>
	)
}

export default WarehouseFloor
