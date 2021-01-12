import { TextureLoader, RepeatWrapping } from 'three'
import { useFrame, useLoader, useResource } from 'react-three-fiber'
import { Reflector } from '@react-three/drei'
import shader from '../utils/reflectorShader.js'
import * as THREE from 'three'

import params from '../assets/params.json'
// import wetFloorMapSource from "../assets/texture/wetFloorMapTest1.png"
import wetFloorMapSource from '../assets/texture/groundwetconstrast1024.png'
import wetFloorNormalMapSource from '../assets/texture/Ground_wet_003_normal.jpg'
import { PointLightWrapper, SpotLightWrapper } from '../utils/lightWrappers.js'

const WarehouseFloor = () => {
	const wetFloorMap = useLoader(TextureLoader, wetFloorMapSource)
	wetFloorMap.wrapS = RepeatWrapping
	wetFloorMap.wrapT = RepeatWrapping
	const wetFloorNormalMap = useLoader(TextureLoader, wetFloorNormalMapSource)
	wetFloorNormalMap.wrapS = RepeatWrapping
	wetFloorNormalMap.wrapT = RepeatWrapping

	wetFloorMap.repeat.set(params.warehouseSliceNumber * 0.55, 1)
	wetFloorNormalMap.repeat.set(params.warehouseSliceNumber * 0.55, 1)

	const reflectorRef = useResource()

	useFrame(() => {
		reflectorRef.current.material.uniforms.iTime = Date.now()
	})
	return (
		<>
			<Reflector
				ref={reflectorRef}
				shader={shader}
				position={[((params.warehouseSliceNumber + 1) / 2) * 11.2 - 11.2 / 2, -4, 0]}
				rotation={[-Math.PI / 2, 0, 0]}
				clipBias={0.003}
				textureWidth={window.innerWidth * window.devicePixelRatio}
				textureHeight={window.innerHeight * window.devicePixelRatio}
				color={0x202020}
				// color={'white'}
			>
				<planeBufferGeometry args={[params.warehouseLength * (params.warehouseSliceNumber + 1), 25]} attach="geometry" />
			</Reflector>
			{/* <mesh
				receiveShadow
				position={[((params.warehouseSliceNumber + 1) / 2) * 11.2 - 11.2 / 2, -3.99, 0]}
				// position={[0, -2, 0]}
				rotation={[-Math.PI / 2, 0, 0]}
				scale={[1, 1, 1]}
			>
				<planeBufferGeometry args={[params.warehouseLength * (params.warehouseSliceNumber + 1), 25]} attach="geometry" />
				<meshPhongMaterial shininess={0} transparent alphaMap={wetFloorMap} normalMap={wetFloorNormalMap} normalScale={new THREE.Vector2(3, 3)} color="black" emissive={params.sceneColor} emissiveIntensity={2} attach="material" />
			</mesh> */}
		</>
	)
}

export default WarehouseFloor
