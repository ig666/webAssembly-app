import React, { FC, useState, useEffect, useRef } from 'react'
import { RouteChildrenProps, useHistory } from 'react-router-dom'
import { Row, Col, Input, Button, Space, message } from 'antd'
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles'
import liveBg from '../../assets/images/live.jpg'
import guiBg from '../../assets/images/1007788.jpg'
import lottie from 'lottie-web'
import loadingJson from '../../animationJson/42740-new-year-with-social-distancing.json'
// import '../../utils/ice'
interface props {
    bg: string
}
interface userProps {
    name: string,
    passWord: string
}

const useStyle = makeStyles({
    root: (props: props) => (
        {
            height: '100%',
            background: `url(${props.bg}) no-repeat `,
            backgroundSize: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    ),
    lgBox: {
        width: '100%',
        padding: '20px 10px',
        background: 'rgba(255,255,255,0.3)',
        backdropFilter: 'blur(10px)',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
})
const Login: FC<RouteChildrenProps> = (props) => {
    const node = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const lot = lottie.loadAnimation({
            container: node.current!,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: loadingJson
        })
        lot.play()
        return () => { lot.stop() }
    }, [])
    const [live, setLive] = useState(false)
    const [user, setUser] = useState<userProps>({ name: '', passWord: '' })
    const hitory = useHistory()
    const classes = useStyle({ bg: live ? liveBg : guiBg })
    const goLogin = () => {
        if (!user.name || !user.passWord) {
            message.warn('请检查输入')
            return
        }
        localStorage.setItem('isLogin', JSON.stringify(user))
        hitory.push('/home')
    }
    //切换背景图片
    const checkImg = () => {
        setLive(!live)
    }
    //登录框
    const loginBox = () => {
        return (
            <Row style={{ width: '100%' }} justify='center'>
                <Col xs={{ span: 24 }} lg={{ span: 7 }}>
                    <div className={classes.lgBox}>
                        <div ref={node} style={{ height: '30vh' }}></div>
                        <Input onChange={e => { setUser({ name: e.target.value, passWord: user.passWord }) }} style={{ width: "70%" }} size="large" placeholder="请输入账号" prefix={<UserOutlined />} />
                        <br />
                        <br />
                        <Input.Password
                            onChange={e => { setUser({ name: user.name, passWord: e.target.value }) }}
                            style={{ width: "70%" }}
                            size="large"
                            placeholder="请输入密码"
                            prefix={<LockOutlined />}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                        <br />
                        <Space>
                            <Button type="primary" onClick={goLogin}>登录</Button>
                            <Button type="primary" onClick={checkImg}>切换图片</Button>
                        </Space>
                    </div>
                </Col>
            </Row>
        )
    }
    return (
        <div className={classes.root}>
            {loginBox()}
        </div>
    )
}

export default Login