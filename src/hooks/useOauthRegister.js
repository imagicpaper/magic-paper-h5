import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getOpenId } from '../utils/wx'
import useLogin from './useLogin'
import { message, sleep } from '../utils'
import { useMemoizedFn } from 'ahooks'

function useOauthRegister() {
    const [ phone, smscode ] = useLogin(stat => [stat.phone, stat.code])
    const navigate = useNavigate()

    const check = useMemoizedFn(async () => {
        try {
            if (!phone || !smscode) return;

            const { openid, code } = await getOpenId()
            if (!openid) {
                // 回调情况下要给个toast
                if (code) {
                    message.fail("取消登录授权")
                }
                return
            }

            // TODO: 调注册接口
            console.log(phone, smscode, openid)
            await sleep(1e3)

            navigate("/result", {
                state: true
            })
        } catch (e) {
            console.warn(e)
        }
    })

    useEffect(() => {
        check()
    }, [check])
}

export default useOauthRegister