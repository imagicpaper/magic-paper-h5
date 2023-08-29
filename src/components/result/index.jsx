import { Button } from "antd-mobile";
import classNames from "classnames";
import { useMemo } from "react";
import copy from 'copy-to-clipboard'
import { message } from "../../utils";

const SuFooter = () => {
    let url = "https://mymagicpaper.com/login"

    const onClick = () => {
        let ok = copy(url)
        if (ok) {
            message.ok("复制成功，请在PC端打开")
        }
    }

    return (
        <div className="su-footer">
            <div className="blue-url">{url}</div>
            <Button onClick={onClick}>复制登录地址</Button>
        </div>
    )
}

function LoResult({success}) {
    let title = success?'注册成功':'领取失败';
    let description = useMemo(() => {
        if (success) {
            return (
                <>
                    <p>10000魔法值已到账，</p>
                    <p>快去电脑登陆使用！</p>
                </>
            )
        }
        return (
            <>
                <p>您已经注册过MyMagicPaper魔法写作，</p>
                <p>不能参加本次新客活动啦！</p>
            </>
        )
    }, [success]);

    return (
        <div className="lo-result">
            <div className={classNames("icon", success ? 'success-icon' : 'warn-icon')}/>
            <div className="title">{title}</div>
            <div className="description">{description}</div>
            {success && <SuFooter/>}
        </div>
    )
}

export default LoResult