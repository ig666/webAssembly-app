import React, { FC, useContext } from "react";

import { ThemeContext } from "../../context";

export const UserManger: FC = () => {
  const context = useContext(ThemeContext);
  console.log("全局颜色值", context);
  return <div>1111</div>;
};
