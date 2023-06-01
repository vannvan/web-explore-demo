// import { cloneDeep, throttle, debounce } from "lodash-es";
import $ from "jquery";
import "reset.css";
import "@/assets/utils/index.js";
import "@/assets/styles/mixin.scss";
import "@/assets/styles/common.less";

import "./index.scss";

import "./test.js";

// console.log(cloneDeep, throttle, debounce, $);

if (module.hot) {
  module.hot.accept("./test.js", function () {
    console.log("hot reload");
  });
}
