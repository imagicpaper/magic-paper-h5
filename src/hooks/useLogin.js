import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const useLogin = create(persist((set) => {
    return {
        phone: '',
        code: '',
        set(param) {
            set(param)
        }
    }
}, {
    name: "magic:h5login:temp",
    storage: createJSONStorage(() => window.sessionStorage)
}))

export default useLogin