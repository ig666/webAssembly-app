//自动整合引入路由文件

let context = require.context("./route", true, /\.ts$/);
let Routers: shouldRenderProps[] = [];

context.keys().forEach((key) => {
  let item = context(key).default;
  Routers = Routers.concat(item)
});
export default Routers;
