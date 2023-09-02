import { useEffect } from 'react'
import { getOpenId } from '../utils/wx'
import useLogin from './useLogin'
import { navigate } from './useRouter'
import { message, sleep } from '../utils'
import { useMemoizedFn } from 'ahooks'

let sp = new URLSearchParams(location.search)
let searchcode = sp.get("code")

function useOauthRegister() {
    const [ phone, smscode ] = useLogin(stat => [stat.phone, stat.code])

    const check = useMemoizedFn(async () => {
        try {
            if (!searchcode || !phone || !smscode) return;

            const close = message.loading("注册中...")
            const openid = await getOpenId(searchcode)

            if (openid) {
                // TODO: 调注册接口
                console.log(phone, smscode, openid)
                await sleep(1e3)

                navigate("/result", true)
            } else {
                // 回调情况下要给个取消的toast
                message.fail("取消登录授权")
            }

            close()
        } catch (e) {
            console.warn(e)
        }
    })

    useEffect(() => {
        check()
    }, [check])
}

export default useOauthRegister