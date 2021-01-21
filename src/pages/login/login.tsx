import React, { FC, useState, useEffect, useRef } from 'react'
import { RouteChildrenProps, useHistory } from 'react-router-dom'
import { Row, Col, Input, Button, Space, message, Tabs } from 'antd'
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, LockOutlined, UsergroupAddOutlined, HomeOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles'
import liveBg from '../../assets/images/live.jpg'
import guiBg from '../../assets/images/1007788.jpg'
import lottie from 'lottie-web'
import loadingJson from '../../animationJson/42740-new-year-with-social-distancing.json'
import { useRequest } from 'ahooks';
import { handleService } from '../../utils/request'
// import '../../utils/ice'
interface props {
    bg: string
}
interface userProps {
    username: string,
    password: string
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
const { TabPane } = Tabs
const Login: FC<RouteChildrenProps> = (props) => {
    const node = useRef<HTMLDivElement>(null)
    const history=useHistory()
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
    const { loading, run } = useRequest(handleService, {
        manual: true,
        onSuccess: (result) => {
            if(!checkBox){
                localStorage.setItem('authToken',result.data.token)
                history.push('/')
                message.success('登录成功!')
            }
        }
    })
    const [live, setLive] = useState(false)
    const [user, setUser] = useState<userProps>({ username: '', password: '' })
    const [checkBox, setCheckBox] = useState(false)
    const classes = useStyle({ bg: live ? liveBg : guiBg })
    const ok = () => {
        if (!user.username || !user.password) {
            message.warn('请检查输入')
            return
        }
        run({ data: user, method: 'POST', url: checkBox ? 'register' : 'login' })
    }

    const loginOrRegister = () => {
        return (
            <Tabs onChange={(key) => { key === '1' ? setCheckBox(false) : setCheckBox(true) }} defaultActiveKey="1" style={{ width: '100%' }} centered>
                <TabPane
                    tab={
                        <span>
                            <HomeOutlined />
                  登录
                </span>
                    }
                    key="1"
                >
                    <Input onChange={e => { setUser({ username: e.target.value, password: user.password }) }} style={{ width: "70%" }} size="large" placeholder="请输入账号" prefix={<UserOutlined />} />
                    <br />
                    <br />
                    <Input.Password
                        onChange={e => { setUser({ username: user.username, password: e.target.value }) }}
                        style={{ width: "70%" }}
                        size="large"
                        placeholder="请输入密码"
                        prefix={<LockOutlined />}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <UsergroupAddOutlined />
                  注册
                </span>
                    }
                    key="2"
                >
                    <Input onChange={e => { setUser({ username: e.target.value, password: user.password }) }} style={{ width: "70%" }} size="large" placeholder="请输入账号" prefix={<UserOutlined />} />
                    <br />
                    <br />
                    <Input.Password
                        onChange={e => { setUser({ username: user.username, password: e.target.value }) }}
                        style={{ width: "70%" }}
                        size="large"
                        placeholder="请输入密码"
                        prefix={<LockOutlined />}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </TabPane>
            </Tabs>
        )
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
                        {loginOrRegister()}
                        <br />
                        <Space>
                            <Button loading={loading} type="primary" onClick={ok}>{checkBox ? '注册' : '登录'}</Button>
                            <Button type="primary" onClick={checkImg}>切换图片</Button>
                        </Space>
                    </div>
                </Col>
            </Row>
        )
    }
    return (
        <div className={`${classes.root} ice`}>
            {loginBox()}
        </div>
    )
}

export default Login