import { Input, Checkbox, Button } from 'antd-mobile'
import { useRef,useCallback,useState } from 'react';
import useLogin from '../../hooks/useLogin'
import {useLockFn, useMemoizedFn} from 'ahooks'
import {message,isVaildPhone, sleep} from '../../utils'
import Protocol from './protocol'
import { Dialog } from 'antd-mobile';

// 发送短信验证码组件
const SendSms = ({onSend}) => {
    const ref = useRef(0)
    const [cd, setCd] = useState(0);

    const loop = useCallback(() => {
        if (ref.current) {
            window.clearTimeout(ref.current)
        }
        ref.current = setTimeout(() => {
            setCd(p => {
                let n = p - 1;
                if (n > 0) {
                    loop();
                }
                return n;
            });
        }, 1e3);
    }, []);

    const onClick = useLockFn(async () => {
        try {
            await onSend()
            setCd(60)
            loop()
        } catch(e) {
            message.fail(e.message)
        }
    })

    return (
        <div className='ac-sendsms'>
            {cd <= 0 && <span onClick={onClick}>发送验证码</span>}
            {cd > 0 && <span>{cd}s后重发</span>}
        </div>
    )
}

function Login() {
    // 阅读并同意
    const [isRead, setIsRead] = useState(false)
    const { phone, code, set } = useLogin();

    // 构建input更新函数
    const genUpdate = useCallback((key) => {
        return (value) => {
            set({[key]: value});
        }
    }, [set]);

    // 发送短信
    const onSendSms = useMemoizedFn(async () => {
        if (!isVaildPhone(phone)) {
            throw new Error('请输入有效的手机号！')
        }

        await sleep(500)
    })

    // 点击注册按钮
    const onClickSign = useLockFn(async () => {
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

        await sleep(1e3)
    })

    return (
        <div className='ac-login'>
            <div className='ac-input-item'>
                <Input 
                    value={phone} 
                    maxLength={11}
                    onChange={genUpdate("phone")} 
                    placeholder='请输入手机号'
                />
            </div>
            <div className='ac-input-item'>
                <Input 
                    value={code}
                    maxLength={6}
                    onChange={genUpdate("code")}
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
            <Button loading="auto" onClick={onClickSign} className='sign-btn' block>注册并收下</Button>
        </div>
    )
}

export default Login