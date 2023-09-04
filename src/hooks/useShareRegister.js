import { getOpenIdByCode } from '../utils/wx'
import useLogin from './useLogin'
import { navigate } from './useRouter'
import { message } from '../utils'
import { useMemoizedFn } from 'ahooks'
import { useMount } from 'ahooks'

let sp = new URLSearchParams(location.search)
let oauthcode = sp.get("code")
let fromShareId = sp.get("sid")

function useShareRegister() {
    const state = useLogin(stat => ({phone: stat.phone, code: stat.code}))

    // 尝试登录
    const doRegister = useMemoizedFn(async (info) => {
        const {phone, code: smscode, openid} = Object.assign(state, info);
        let close;
        try {
            if(!phone || !smscode || !openid) {
                message.fail('信息不全')
                return;
            }

            close = message.loading("注册中...")

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
        } catch(e) {
            message.fail(e.message)
            navigate("/result", false)
        }

        close?.();
    })

    useMount(async () => {
        const openid = await getOpenIdByCode(oauthcode)
        if (!openid || !fromShareId) {
            return;
        }

        if (state.phone && state.code) {
            doRegister({openid});
        }
    })

    return doRegister;
}

export default useShareRegister