// const { getThemeVariables } = require("antd/dist/theme");
const CracoLessPlugin = require("craco-less");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
module.exports = {
  webpack:{
    plugins:[
      new AntdDayjsWebpackPlugin() //dayjs替换momentjs
    ]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "primary-color": "#ee3f4d",
              // ...getThemeVariables({
              //   dark: true, // 开启暗黑模式
              //   compact: false, // 开启紧凑模式
              // }),
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
