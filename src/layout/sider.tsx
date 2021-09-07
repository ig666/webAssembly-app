import { FC } from "react";
import { Layout, Menu } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import { permissionList } from "../mock/permissions";
import Routers from "../router/index";
import { Link, useHistory } from "react-router-dom";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2790190_rdurkqro5t.js",
});
const { Sider } = Layout;
const { SubMenu } = Menu;

interface props {
  fPath?: string;
}
const Siders: FC = () => {
  const selectPath = useHistory<props>().location;
  const defaultOpenKeys = [
    selectPath.state && selectPath.state.fPath ? selectPath.state.fPath : "",
  ];
  //根据后端返回对菜单排序
  const sortMenu = (Routers: shouldRenderProps[]) => {
    let arr = [];
    for (let item of permissionList) {
      for (let menu of Routers) {
        if (item === menu.path) {
          if (!menu.children) {
            arr.push(menu);
          } else {
            menu.children = sortMenu(menu.children);
            arr.push(menu);
          }
        }
      }
    }
    return arr;
  };
  //是否返回导航按钮
  const shouldReturnLink = (item: shouldRenderProps) => {
    if (item.path !== selectPath.pathname) {
      return (
        <Link
          to={{
            pathname: item.path,
            state: item.fPath ? { fPath: item.fPath } : "",
          }}
        >
          {item.title}
        </Link>
      );
    } else {
      return <span style={{ cursor: "pointer" }}>{item.title}</span>;
    }
  };
  //根据后端返回permissionList动态加载路由
  const renderMenu = (Routers: shouldRenderProps[]) => {
    return Routers.map((item) => {
      if (!item.children && !item.hidden) {
        return (
          <Menu.Item
            key={item.path}
            icon={item.icon && <IconFont type={item.icon} />}
          >
            {shouldReturnLink(item)}
          </Menu.Item>
        );
      } else if (item.children && !item.hidden) {
        return (
          <SubMenu
            key={item.path}
            icon={item.icon && <IconFont type={item.icon} />}
            title={item.title}
          >
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      return undefined;
    });
  };
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={[selectPath.pathname]}
        selectedKeys={[selectPath.pathname]}
      >
        {renderMenu(sortMenu(Routers))}
      </Menu>
    </Sider>
  );
};

export default Siders;
