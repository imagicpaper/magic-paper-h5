import { create } from "zustand";

const useRouter = create(set => {
    return {
        path: '/',
        data: undefined,
        setPath(path, data) {
            set({path, data})
        }
    }
})

export default useRouter

export function navigate(path, data) {
    useRouter.getState().setPath(path, data)
}