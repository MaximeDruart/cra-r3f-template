import React from 'react'
import styled from 'styled-components'
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from 'drei'

import Scene from './warehouseScene'
import params from './assets/params.json'

const StyledContainer = styled.div`
	width: 100vw;
	height: 100vh;
`

const CanvasContainer = () => {
	return (
		<StyledContainer>
			<Canvas colorManagement={true} style={{ background: params.sceneColor }}>
				<ambientLight intensity={1} />
				<Scene />
				<OrbitControls />
				{/* <gridHelper /> */}
				<axesHelper scale={[5, 5, 5]} />
			</Canvas>
		</StyledContainer>
	)
}

export default CanvasContainer
