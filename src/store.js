import create from "zustand"
import { devtools } from "zustand/middleware"
import * as THREE from "three"

const useStore = create(
  devtools((set, get) => ({
    activeTotem: null,
    setActiveTotem: (totem) => set({ activeTotem: totem }),
    cameraTarget: null,
    setCameraTarget: (cameraTarget) => set({ cameraTarget }),
    outlineTargets: null,
    setOutlineTargets: (outlineTargets) => set({ outlineTargets }),
    mouse: new THREE.Vector2(0, 0),
    updateMouse: ({ clientX: x, clientY: y }) => {
      get().mouse.set(x / window.innerWidth - 0.5, y / window.innerHeight - 0.5)
    },
  }))
)

export default useStore
