import { useMemo } from 'react'
import { useCallback } from 'react'
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

export function useLoginInfo() {
    const {phone, code, set} = useLogin()

    // 构建input更新函数
    const genOnChange = useCallback((key) => {
        return (value) => {
            set({[key]: value});
        }
    }, [set]);

    return useMemo(() => ({
        data: {
            phone, code
        }, genOnChange
    }), [phone, code, genOnChange])
}