import { useEffect } from 'react'
import { getOpenId } from '../utils/wx'
import useLogin from './useLogin'
import { navigate } from './useRouter'
import { message } from '../utils'
import { useMemoizedFn } from 'ahooks'

let sp = new URLSearchParams(location.search)
let searchcode = sp.get("code")
let fromShareId = sp.get("sid")

function useOauthRegister() {
    const [ phone, smscode ] = useLogin(stat => [stat.phone, stat.code])

    const check = useMemoizedFn(async () => {
        let close;
        try {
            if (!searchcode || !phone || !smscode) return;

            close = message.loading("注册中...")
            const openid = await getOpenId(searchcode)

            if (openid) {
                // 分享用户注册
                const resp = await fetch("/api/user/share/register", {
                    method: "POST",
                    body: JSON.stringify({
                        phone, verificationCode: smscode,
                        weChatOpenId: openid, fromShareId
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const data = await resp.json()
                if (data.code !== 200) {
                    throw new Error(data?.message)
                }

                navigate("/result", true)
            } else {
                // 回调情况下要给个取消的toast
                message.fail("取消登录授权")
            }
        } catch (e) {
            message.fail(e.message)
            navigate("/result", false)
        }
        close()
    })

    useEffect(() => {
        check()
    }, [check])
}

export default useOauthRegister