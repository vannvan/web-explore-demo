import $ from "jquery";
import "reset.css";
import "@/assets/utils/index.js";
import "@/assets/styles/mixin.scss";
import "@/assets/styles/common.less";
import "./index.scss";

$(function () {
  $("i").click(function () {
    if ($(this).hasClass("rotate")) {
      $(this).removeClass("rotate").addClass("rotate1");
    } else {
      $(this).removeClass("rotate1").addClass("rotate");
    }
    $(this).next(".answer").slideToggle(100).siblings(".answer").slideUp(400);
  });
});
