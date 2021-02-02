import React from "react";
import "./App.less";
import { Provider } from "mobx-react";
import { CreateStores } from "./store/createStores";
import AppRouter from "./layout/index";
import { ThemeProvider } from "@material-ui/styles";
import { UseRequestProvider } from "ahooks";
import "nprogress/nprogress.css";
import { ConfigProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");

const theme = {
  color: "#f1939c",
};
/**
 * @描述
 * @ConfigProvider antd全局配置容器
 * @UseRequestProvider 全局请求(useRequest)配置
 * @ThemeProvider 全局样式容器
 * @Provider 全局状态容器
 */

function App() {
  const store = CreateStores();
  return (
    <ConfigProvider locale={zh_CN}>
      <UseRequestProvider value={{}}>
        <ThemeProvider theme={theme}>
          <Provider {...store}>
            <div className="App">
              <AppRouter />
            </div>
          </Provider>
        </ThemeProvider>
      </UseRequestProvider>
    </ConfigProvider>
  );
}

export default App;
