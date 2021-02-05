import React, { FC } from "react";
import { Layout } from "antd";
const { Footer } = Layout;
const Footers: FC = () => {
  return (
    <Footer style={{ textAlign: "center", paddingBottom: 12, paddingTop: 7 }}>
      JieRuiMi.Top ©2021 Created by CQ
    </Footer>
  );
};

export default Footers;
