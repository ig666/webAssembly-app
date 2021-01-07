import React, { FC } from "react";
import { permissionList } from "../mock/permissions";
import { Switch } from "react-router-dom";
import Siders from './sider'
import Routers from "../router/index";
import AuthRoute from "../components/authRoute";
import { Layout } from 'antd';
import Footers from './footer'

const { Content, Header } = Layout;
const Contents: FC = () => {
  //根据后端permissionList动态载入组件
  let routeData: shouldRenderProps[] = [];
  const rednderRoute = (routes: shouldRenderProps[]): any => {
    routes.map((item) => {
      if (item.childrens) {
        return rednderRoute(item.childrens);
      } else {
        if (permissionList.includes(item.path)) {
          routeData.push(item);
        }
      }
    });
  };
  rednderRoute(Routers);
  return (
    <Layout style={{ height: '100%' }}>
      <Siders />
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Switch>
              {routeData.map((item: any, index: number) => {
                return <AuthRoute key={index} routeData={routeData} />;
              })}
            </Switch>
          </div>
        </Content>
        <Footers />
      </Layout>
    </Layout>
  );
};

export default Contents;
