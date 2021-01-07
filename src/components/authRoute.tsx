/**
 * @描述
 * @自定义鉴权路由
 * @param {routeData} 路由数据
 */

import React, { FC } from "react";

import { Redirect, Route, RouteProps } from "react-router-dom";

interface Props {
  routeData: shouldRenderProps[];
}
type AuthRouteProps = Props & RouteProps;
const AuthRoute: FC<AuthRouteProps> = (props) => {
  let { location, routeData } = props;
  let pathname = location?.pathname;
  const isLogin = localStorage.getItem("isLogin");
  //当前路径所在的路由item信息
  const targetRouteObj = routeData.find((item) => item.path === pathname);
  //未登录，路径存在，且不需要拦截则直接进入该页面
  if (targetRouteObj && !targetRouteObj.auth && !isLogin) {
    let { component } = targetRouteObj;

    return <Route path={pathname} component={component}></Route>;
  }

  //登录
  if (isLogin) {
    // 如果要进入登录页面
    if (pathname === "/login") {
      return <Redirect to="/home"></Redirect>;
    } else {
      //页面地址存在
      if (targetRouteObj) {
        return (
          <Route path={pathname} component={targetRouteObj.component}></Route>
        );
      } else {
        //页面地址不存在
        return <Redirect to="/404"></Redirect>;
      }
    }
  } else {
    if (targetRouteObj && targetRouteObj.auth) {
      return <Redirect to="/login" />;
    } else {
      return <Redirect to="/404" />;
    }
  }
};

export default AuthRoute;
