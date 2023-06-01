import path from "path";
import { appPath } from "./env";

export default {
  contentBase: path.resolve(appPath, "pages/**/*.html"),
  publicPath: "/",
  watchContentBase: true,
  overlay: true, // 浏览器页面上显示错误
  open: false, // 开启浏览器
  proxy: {
    "/api": {
      target: "http://172.16.222.231:2333/frs-api/",
      pathRewrite: { "^/api": "" },
    },
  },
  stats: "errors-only", //stats: "errors-only"表示只打印错误：
  before(app, server) {
    server._watch(path.resolve(appPath, "pages/**/*.html"));
  },
};
