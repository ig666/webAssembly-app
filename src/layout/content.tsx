import React, { FC } from 'react'
import { Layout } from 'antd'
import { permissionList } from '../mock/permissions'
import { Route } from 'react-router-dom'
import Routers from '../router/index'


const { Content } = Layout;
const Contents: FC = () => {
    //根据后端permissionList动态载入组件
    const rednderRoute = (routes: shouldRenderProps[]): any => {
        return routes.map(item => {
            if (item.childrens) {
                return rednderRoute(item.childrens)
            } else {
                if (permissionList.includes(item.path)) {
                    return <Route key={item.path} path={item.path} exact component={item.component}></Route>
                }
            }
        })
    }
    return (
        <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {rednderRoute(Routers)}
            </div>
        </Content>
    )
}

export default Contents