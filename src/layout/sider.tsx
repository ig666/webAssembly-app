import React, { FC } from 'react'
import { Layout, Menu } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import { permissionList } from '../mock/permissions'
import Routers from '../router/index'
import { Link,useLocation } from 'react-router-dom'
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
const { Sider } = Layout;
const { SubMenu } = Menu

const Siders: FC = () => {
    console.log('join')
    //根据后端返回对菜单排序
    const sortMenu = (Routers: shouldRenderProps[]) => {
        let arr = []
        for (let item of permissionList) {
            for (let menu of Routers) {
                if (item === menu.path) {
                    arr.push(menu)
                }
            }
        }
        return arr
    }
    //根据后端返回permissionList动态加载路由
    const renderMenu = (Routers: shouldRenderProps[]) => {
        return Routers.map(item => {
            if (!item.childrens) {
                return (
                    <Menu.Item key={item.path} icon={item.icon && <IconFont type={item.icon} />}>
                        <Link to={item.path}>{item.title}</Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu key={item.path} icon={item.icon && <IconFont type={item.icon} />} title={item.title}>
                        {renderMenu(item.childrens)}
                    </SubMenu>
                )
            }
        })
    }
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
        >
            <div className="logo" />
            <Menu theme="dark" mode="inline"  selectedKeys={[useLocation().pathname]}>
                {renderMenu(sortMenu(Routers))}
            </Menu>
        </Sider>
    )
}

export default Siders