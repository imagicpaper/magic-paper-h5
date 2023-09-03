import { useRef,useCallback,useState } from 'react';
import {useLockFn} from 'ahooks'
import {message} from '../utils'

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
        let close = message.loading("发送中...")
        try {
            await onSend()
            setCd(60)
            loop()
        } catch(e) {
            message.fail(e.message)
        }
        close()
    })

    return (
        <div className='ac-sendsms'>
            {cd <= 0 && <span onClick={onClick}>发送验证码</span>}
            {cd > 0 && <span>{cd}s后重发</span>}
        </div>
    )
}

export default SendSms
