import React from 'react'

import WarehouseSlice from './WarehouseSlice'
import { PointLightWrapper } from '../utils/lightWrappers'
import params from '../assets/params.json'

const Warehouse = ({ position }) => {
	const slices = []
	for (let i = 0; i < params.warehouseSliceNumber; i++) {
		slices.push(<WarehouseSlice position={[position[0] + 11.2 * i, position[1], position[2]]} key={i}></WarehouseSlice>)
		slices.push(<PointLightWrapper position={[position[0] + 11.2 * i, position[1] + 4, position[2]]} intensity={3} distance={20} color={0xffffff} helper={true} key={-i - 1} />)
	}

	return slices
}

export default Warehouse
