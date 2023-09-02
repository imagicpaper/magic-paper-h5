import { Input, Checkbox, Button } from 'antd-mobile'
import { useState } from 'react';
import { Dialog } from 'antd-mobile'
import {useLoginInfo} from '../../hooks/useLogin'
import {useLockFn, useMemoizedFn} from 'ahooks'
import {message,isVaildPhone, sleep} from '../../utils'
import Protocol from './protocol'
import SendSms from '../SendSms'
import { openOauth2Authorize } from '../../utils/wx'
import useOauthRegister from '../../hooks/useOauthRegister'
import { useMemo } from 'react';

function Login() {
    useOauthRegister()
    // 阅读并同意
    const [isRead, setIsRead] = useState(false)
    const { data, genOnChange } = useLoginInfo()

    // 发送短信
    const onSendSms = useMemoizedFn(async () => {
        if (!isVaildPhone(data.phone)) {
            throw new Error('请输入有效的手机号！')
        }

        await sleep(500)
    })

    // 点击注册按钮
    const onClickSign = useLockFn(async () => {
        const { phone, code } = data;
        if (!phone || !code) return;
        if (!isVaildPhone(phone)) {
            message.fail('请输入有效的手机号！')
            return;
        }
        if (!isRead) {
            const ok = await Dialog.confirm({
                content: (
                    <div>同意 <Protocol/> 后继续</div>
                )
            })
            if (!ok) {
                return
            } else {
                setIsRead(true)
            }
        }

        openOauth2Authorize()
    })

    // 是否禁止按钮点击
    const isDisabled = useMemo(() => {
        return !data.phone || !data.code;
    }, [data]);

    return (
        <div className='ac-login'>
            <div className='ac-input-item'>
                <Input 
                    value={data.phone} 
                    maxLength={11}
                    onChange={genOnChange("phone")} 
                    placeholder='请输入手机号'
                />
            </div>
            <div className='ac-input-item'>
                <Input 
                    value={data.code}
                    maxLength={6}
                    onChange={genOnChange("code")}
                    placeholder='请输入验证码'
                />
                <SendSms onSend={onSendSms} />
            </div>
            <Checkbox
                checked={isRead}
                onChange={setIsRead}
                className='mark-read-checkbox'
                style={{
                    '--icon-size': '12px',
                    '--font-size': '10px',
                    '--gap': '10px',
                    '--adm-color-light': '#fff'
                }}
            >
                我已阅读并同意 <Protocol color="#fff"/>
            </Checkbox>
            <Button 
                disabled={isDisabled} 
                loading="auto" 
                onClick={onClickSign} 
                className='sign-btn' 
                block
            >
                注册并收下
            </Button>
        </div>
    )
}

export default Login