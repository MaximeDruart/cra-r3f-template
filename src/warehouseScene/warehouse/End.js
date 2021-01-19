import React from "react"
import * as THREE from "three"
import { useGLTF } from "@react-three/drei/useGLTF"

import EmissiveWindow from "../EmissiveWindow"
import params from "../../assets/params.json"
import { useResource } from "react-three-fiber"
import { Box } from "@react-three/drei"

const WarehouseEnd = (props) => {
  const { nodes } = useGLTF("models/warehouse_fond.glb")
  const spotLightRefRight = useResource()
  const spotLightRefLeft = useResource()
  const boxRefRight = useResource()
  const boxRefLeft = useResource()

  return (
    <mesh {...props} castShadow={false} receiveShadow geometry={nodes.slice001.geometry}>
      <meshLambertMaterial side={THREE.DoubleSide} color={params.sceneColor} attach='material' />
      <group visible={true} name='lights'>
        <Box visible={false} ref={boxRefLeft} position={[0, -3, -3.8]} rotation={[0, 0, 0]} />
        <spotLight
          angle={1}
          castShadow
          ref={spotLightRefLeft}
          target={boxRefLeft.current}
          power={1.8 * 4 * Math.PI}
          decay={2}
          position={[0, 3, -3.4]}
          color={0xffffff}
        ></spotLight>
        {/* {spotLightRefLeft.current && <spotLightHelper args={[spotLightRefLeft.current]} />} */}
        <pointLight distance={10} power={150 * 4 * Math.PI} decay={2} position={[0, 4.5, -7.4]} color={0xffffff} />
        <EmissiveWindow position={[0, 5.05, -7.4]} rotation={[Math.PI + Math.PI / 2.2, 0, 0]} />

        <Box visible={false} ref={boxRefRight} position={[0, -3, 3.8]} rotation={[0, 0, 0]} />
        <spotLight
          angle={1}
          castShadow
          ref={spotLightRefRight}
          target={boxRefRight.current}
          power={1.8 * 4 * Math.PI}
          decay={2}
          position={[0, 3, 3.4]}
          color={0xffffff}
        ></spotLight>
        <pointLight distance={10} power={150 * 4 * Math.PI} decay={2} position={[0, 4.5, 7.4]} color={0xffffff} />
        {/* {spotLightRefRight.current && <spotLightHelper args={[spotLightRefRight.current]} />} */}
        <EmissiveWindow position={[0, 5.05, 7.4]} rotation={[-Math.PI / 2.2, 0, 0]} />
      </group>
    </mesh>
  )
}

// useGLTF.preload('/warehouseEnd.glb')

export default WarehouseEnd
