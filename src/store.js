import create from "zustand"

const useStore = create((set) => ({
  activeTotem: null,
  setActiveTotem: (totem) => set({ activeTotem: totem }),
  cameraTarget: null,
  setCameraTarget: (cameraTarget) => set({ cameraTarget }),
  outlineTargets: null,
  setOutlineTargets: (outlineTargets) => set({ outlineTargets }),
}))

export default useStore
