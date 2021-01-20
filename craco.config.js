const { getThemeVariables } = require("antd/dist/theme");
const CracoLessPlugin = require("craco-less");
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "primary-color": "#93d5dc",
              ...getThemeVariables({
                dark: true, // 开启暗黑模式
                // compact: false, // 开启紧凑模式
              }),
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
