import React, { useMemo } from 'react'
import WarehouseSlice from './WarehouseSlice'
import params from '../assets/params.json'
import WarehouseFloor from './WarehouseFloor'
import WarehouseEnd from './WarehouseEnd'
import WarehouseProps from './WarehouseProps'

const Warehouse = (props) => {
	const mappedWarehouseSlices = useMemo(() => new Array(params.warehouseSliceNumber).fill().map((_, i) => <WarehouseSlice index={i} position={[11.2 * i, 0, 0]} key={i} />), [])

	return (
		<group {...props}>
			{mappedWarehouseSlices}
			<WarehouseEnd position={[11.2 * params.warehouseSliceNumber, 0, 0]} />
			<WarehouseProps position={[0, 0, 0]} />
			<WarehouseFloor />
		</group>
	)
}

export default Warehouse
