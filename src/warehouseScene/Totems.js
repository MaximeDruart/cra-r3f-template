import React, { useMemo } from "react"
import artists from "../assets/artists.json"
import params from "../assets/params.json"
import Totem from "./Totem"
import { mapRange } from "../utils/functions"
import { Box } from "@react-three/drei"

const Totems = (props) => {
  const mappedArtistTotems = useMemo(
    () =>
      artists.map((artist, index) => (
        <Totem
          key={index}
          position={[
            mapRange(index % params.totemsPerRow, 0, params.totemsPerRow - 1, -8, 8),
            -2.6,
            -Math.floor(index / params.totemsPerRow) * params.warehouseLength - 4,
          ]}
          index={index}
          artist={artist}
        />
      )),
    []
  )
  return <group {...props}>{mappedArtistTotems}</group>
}

export default Totems
