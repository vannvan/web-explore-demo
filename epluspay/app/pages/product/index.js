import $ from "jquery";
import "reset.css";
import "@/assets/utils/index.js";
import "@/assets/styles/mixin.scss";
import "@/assets/styles/common.less";
import "./index.scss";

let routeParams = window.location.search;
if (/collection/.test(routeParams)) {
  let scroll_offset = $(".wrap-2").offset();
  $("body,html").animate({
    scrollTop: scroll_offset.top, //让body的scrollTop等于pos的top，就实现了滚动
  });
}

if (/vat/.test(routeParams)) {
  let scroll_offset = $(".wrap-10").offset();
  $("body,html").animate({
    scrollTop: scroll_offset.top, //让body的scrollTop等于pos的top，就实现了滚动
  });
}
