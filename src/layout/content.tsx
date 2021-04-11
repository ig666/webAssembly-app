import React, { FC } from "react";
import { permissionList } from "../mock/permissions";
import { Switch } from "react-router-dom";
import Siders from "./sider";
import Routers from "../router/index";
import AuthRoute from "../components/authRoute";
import Headers from "./header";

import { Layout } from "antd";
import Footers from "./footer";
const Contents: FC = () => {
  //根据后端permissionList动态载入组件
  let routeData: shouldRenderProps[] = [];
  const rednderRoute = (routes: shouldRenderProps[]): any => {
    routes.map((item) => {
      if (item.children) {
        return rednderRoute(item.children);
      } else {
        if (permissionList.includes(item.path)) {
          routeData.push(item);
        }
      }
      return undefined;
    });
  };
  rednderRoute(Routers);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Siders />
      <Layout style={{ height: "100vh", overflowY: "auto" }}>
        <Headers />
        <div style={{ flex: "auto" }}>
          <div
            className="site-layout-background"
            style={{ padding: "10px 24px 0px 24px", minHeight: 360 }}
          >
            <Switch>
              {routeData.map((item: any, index: number) => {
                return <AuthRoute key={index} routeData={routeData} />;
              })}
            </Switch>
          </div>
        </div>
        <Footers />
      </Layout>
    </Layout>
  );
};

export default Contents;
