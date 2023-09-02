import { Toast } from "antd-mobile"

export const message = {
    fail(content, duration = 2e3) {
        setTimeout(() => {
            Toast.show({
                icon: 'fail',
                content,
                duration
            })
        }, 1);
    },
    ok(content, duration = 2e3) {
        setTimeout(() => {
            Toast.show({
                icon: 'success',
                content,
                duration
            })
        }, 1);
    },
    loading(content) {
        let handler = Toast.show({
            icon: 'loading',
            content,
            duration: 10e5
        })
        return () => {
            handler.close()
        }
    }
}

let phoneReg = /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/
export const isVaildPhone = phone => {
    return !!phone && phoneReg.test(phone);
}

export const sleep = (delay = 200) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, delay);
    })
}