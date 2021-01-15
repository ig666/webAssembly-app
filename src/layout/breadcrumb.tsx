import React, { FC } from "react";
import { Breadcrumb } from "antd";
import { useLocation, Link } from "react-router-dom";
import Routers from "../router";
import { treeToList } from "../utils";

let list = treeToList(Routers);
const Breadcrumbs: FC = () => {
  const pathSnippets = useLocation()
    .pathname.split("/")
    .filter((i) => i);
  const length = pathSnippets.length
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        {list.map((item) => {
          if (item.path === url && item.childrens) {
            return (
              <Link key={url} to={item.childrens[0].path}>
                {item.title}
              </Link>
            );
          } else if (item.path === url && (index + 1) !== length) {
            return (
              <Link key={url} to={item.path}>
                {item.title}
              </Link>
            );
          } else if(item.path === url){
            return <span key={url}>{item.title}</span>
          }
          return undefined
        })}
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">主页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
};

export default Breadcrumbs;
