import React from "react";
import "./App.less";
import { Provider } from "mobx-react";
import { CreateStores } from "./store/createStores";
import AppRouter from "./layout/index";
import { ThemeProvider } from "@material-ui/styles";
import { UseRequestProvider } from "ahooks";
import "nprogress/nprogress.css";

const theme = {
  color: "#f1939c",
};
/**
 * @描述
 * @UseRequestProvider 全局请求(useRequest)配置
 * @ThemeProvider 全局样式容器
 * @Provider 全局状态容器
 */

function App() {
  const store = CreateStores();
  return (
    <UseRequestProvider value={{}}>
      <ThemeProvider theme={theme}>
        <Provider {...store}>
          <div className="App">
            <AppRouter />
          </div>
        </Provider>
      </ThemeProvider>
    </UseRequestProvider>
  );
}

export default App;
