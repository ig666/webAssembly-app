import React, { FC } from "react";
import { Layout } from "antd";
const { Footer } = Layout;
const Footers: FC = () => {
  return (
    <Footer style={{ textAlign: "center", paddingBottom: 12, paddingTop: 7 }}>
      YaMeiLa.com ©2022 Created By CQ And LY
    </Footer>
  );
};

export default Footers;
