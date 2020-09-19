import path from "path";
import fs from "fs";
import glob from "glob";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ProgressBarPlugin from "progress-bar-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import {
  isProduction,
  isDevelopment,
  appPath,
  isBundleAnalyze
} from "./env";

function getEntry () {
  let entry = {};
  glob.sync(path.resolve(appPath, "pages/**/index.js")).forEach(function (fileDir) {
  	let pathObj = path.parse(fileDir);
    let entryName = pathObj.dir.match(/\/\w+$/g)[0].split("/")[1]; // 用文件夹名字作为入口名。
    entry[entryName] = fileDir;
  });
  return entry;
};

const entry = getEntry();

const plugins = [
  isProduction && new CleanWebpackPlugin(),
  new ProgressBarPlugin({
    summary: isDevelopment
  }),
  isDevelopment && new webpack.HotModuleReplacementPlugin(),
  isProduction && new MiniCssExtractPlugin({
    filename: 'css/[name].[contentHash:8].css',
    chunkFilename: 'css/[id].[contentHash:8].css'
  }),
  isProduction && isBundleAnalyze && new BundleAnalyzerPlugin()
].filter(Boolean);

function getHtmlWebpackPluginConfigs () {
  const res = [];
  for (let [entryName, entryPath] of Object.entries(entry)) {
    const htmlFilePath = `${appPath}/pages/${entryName}/index.html`;
    if (!fs.existsSync(htmlFilePath)) {
      throw new Error(`file: ${htmlFilePath} not exist`);
    }
    const plugin = new HtmlWebpackPlugin({
      template: htmlFilePath,
      filename: `${entryName}.html`,
      chunks: ["vendor", "common", entryName],
      ...isProduction ? {
        minify: {
          removeComments: true,  //删除注释
          collapseWhitespace: true,  //删除空格
          removeRedundantAttributes: true,  //删除多余的属性
          useShortDoctype: true, //使用短的文档类型
          removeEmptyAttributes: true,   //删除空属性
          removeStyleLinkTypeAttributes: true,  //删除style的类型属性， type="text/css"
          keepClosingSlash: true,  //
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      } : {}
    });
    res.push(plugin);
  }
  return res;
}

export { entry };
export default [...plugins, ...getHtmlWebpackPluginConfigs()];
