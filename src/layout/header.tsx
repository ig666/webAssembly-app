import React, { FC } from "react";
import { Layout } from "antd";
import Breadcrumbs from "./breadcrumb";
import UserUtils from "./userUtils";
import BgBubbles from "../components/bgBubbles/bgBubbles";

const { Header } = Layout;
const Headers: FC = () => {
  return (
    <Header
      className="site-layout-sub-header-background"
      style={{
        padding: "10px 20px",
        backgroundColor: "#fff",
        boxShadow: "0 1px 4px rgba(0,21,41,.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position:'relative'
      }}
    >
      <BgBubbles />
      <Breadcrumbs />
      <UserUtils />
    </Header>
  );
};

export default Headers;
