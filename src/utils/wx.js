const appid = import.meta.env.VITE_APPID
const key = "magic:wx:openid"

// 打开oauth登录页面
export function openOauth2Authorize() {
    const redirect = window.location.href;

    window.open("https://open.weixin.qq.com/connect/oauth2/authorize" + 
      "?appid=" + appid +
      "&redirect_uri=" + encodeURIComponent(redirect) + 
      "&response_type=code" + 
      "&scope=snsapi_userinfo" + 
      "&state=ok#wechat_redirect", "_top")
}

// 获取openid
export async function getOpenId(code) {
    let data = JSON.parse(window.localStorage.getItem(key)||"{}")
    if (data?.openid) {
        return data.openid
    }
  
    if (code) {
        let resp = await fetch("/gapi/get/openid?code=" + code, {method: "GET"})
        data = await resp.json()

        if (data.openid) {
            window.localStorage.setItem(key, JSON.stringify(data))
            return data.openid
        }
    }
    return ''
}
