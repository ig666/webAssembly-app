import "./App.less";
import { useState } from "react";
import { Provider } from "mobx-react";
import { ThemeContext } from "./context";
import AppRouter from "./layout/index";
import { UseRequestProvider } from "ahooks";
import "nprogress/nprogress.css";
import { ConfigProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // 导入本地化语言

dayjs.locale("zh-cn"); // 使用本地化语言
/**
 * @描述
 * @ConfigProvider antd全局配置容器
 * @UseRequestProvider 全局请求(useRequest)配置
 * @ThemeProvider 全局样式容器
 * @Provider 全局状态容器
 */

function App() {
  //全局颜色
  const [theme] = useState({ color: "#00A6C9" });

  return (
    <ThemeContext.Provider value={theme}>
      <ConfigProvider locale={zh_CN}>
        <UseRequestProvider value={{}}>
          <Provider>
            <div className="App">
              <AppRouter />
            </div>
          </Provider>
        </UseRequestProvider>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

export default App;
