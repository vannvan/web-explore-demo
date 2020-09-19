import $ from "jquery";
import "reset.css";
import '@/assets/utils/index.js'
import "@/assets/styles/mixin.scss";
import "@/assets/styles/common.less";
import './index.scss'

let routeParams = window.location.search
if (/contact/.test(routeParams)) {
    let scroll_offset = $('.wrap-4').offset()
    $("body,html").animate({
        scrollTop: scroll_offset.top //让body的scrollTop等于pos的top，就实现了滚动
    })
}