import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useLogin = create(persist((set) => {
    return {
        phone: '',
        code: '',
        set(param) {
            set(param)
        }
    }
}, {
    name: "magic:h5login:temp"
}))

export default useLogin