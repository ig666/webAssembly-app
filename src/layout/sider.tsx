import React, { FC } from 'react'
import { Layout, Menu } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import { permissionList } from '../mock/permissions'
import Routers from '../router/index'
import { Link } from 'react-router-dom'
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
const { Sider } = Layout;
const { SubMenu } = Menu

const Siders: FC = () => {
    
    //根据后端返回permissionList动态加载路由
    const renderMenu = (Routers: shouldRenderProps[]) => {
        return Routers.map(item => {
            if (permissionList.includes(item.path)) {
                if (item.childrens) {
                    return (
                        <SubMenu key={item.key} icon={item.icon && <IconFont type={item.icon} />} title={item.title}>
                            {renderMenu(item.childrens)}
                        </SubMenu>
                    )
                } else {
                    return (
                        <Menu.Item key={item.key} icon={item.icon && <IconFont type={item.icon} />}>
                            <Link to={item.path}>{item.title}</Link>
                        </Menu.Item>
                    )
                }
            }else{
                return undefined
            }
        })
    }
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
        >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                {renderMenu(Routers)}
            </Menu>
        </Sider>
    )
}

export default Siders