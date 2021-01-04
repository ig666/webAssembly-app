import React, { FC } from 'react'
import { Layout } from 'antd'
import { permissionList } from '../mock/permissions'
import { Route, Switch } from 'react-router-dom'
import Routers from '../router/index'


const { Content } = Layout;
const Contents: FC = () => {

    //根据后端permissionList动态载入组件
    const rednderRoute = (routes: shouldRenderProps[]) => {
        return routes.map(item => {
            if (item.childrens) {
                rednderRoute(item.childrens)
            } else {
                if (permissionList.includes(item.path)) {
                    console.log(item)
                    return <Route key={item.path} path={item.path} exact component={item.component}></Route>
                } else {
                    return undefined
                }
            }
            return undefined
        })
    }
    return (
        <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Switch>
                    {rednderRoute(Routers)}
                </Switch>
            </div>
        </Content>
    )
}

export default Contents