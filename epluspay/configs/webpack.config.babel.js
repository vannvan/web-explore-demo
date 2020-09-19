import path from "path";
import {
  NODE_ENV,
  isDevelopment,
  isProduction,
  appPath
} from "./env";
import optimization from "./optimization";
import module from "./module";
import plugins, { entry } from "./plugins";

export default  {
  target: "web",
  devtool: "source-map",
  mode: NODE_ENV,
  entry,
  output: {
    filename: isDevelopment ? "js/[name].bundle.js" : "js/[name].[contentHash:8].js",
    path: isProduction ? path.resolve(__dirname, "../dist") : undefined
  },
  resolve: {
    extensions: [".js", ".css", ".less", ".json",'.scss'],
    alias: {
      "@": appPath,
    }
  },
  performance: {
    hints: false, //  false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
    maxEntrypointSize: 500000, // in bytes, default 250k
    maxAssetSize: 450000, // in bytes
  },
  externals: {
    jquery: 'jQuery'
  },
  optimization,
  module,
  plugins
}
