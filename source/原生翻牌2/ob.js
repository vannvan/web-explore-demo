/*
 * @Author: vannvan <https://github.com/vannvan>
 * @Date:   2019-12-30 11:52:13
 * @Last Modified by:   vannvan
 * @Last Modified time: 2019-12-30 11:52:22
 */
const Odometer = (function (win, doc) {
  class OdometerFn {
    constructor(x, y) {
      this.setting = {
        len: null,
        speed: 1000,
        num: "",
        symbol: "",
        dot: 0,
        zero: true,
      };
      this.$parent = doc.querySelector(x);
      this.html = `<div class="number-animate-dom" data-num="{{num}}">
                        <span class="number-animate-span">0</span>
                        <span class="number-animate-span">1</span>
                        <span class="number-animate-span">2</span>
                        <span class="number-animate-span">3</span>
                        <span class="number-animate-span">4</span>
                        <span class="number-animate-span">5</span>
                        <span class="number-animate-span">6</span>
                        <span class="number-animate-span">7</span>
                        <span class="number-animate-span">8</span>
                        <span class="number-animate-span">9</span>
                        <span class="number-animate-span">0</span>
                        <span class="number-animate-span">.</span>
                      </div>`;
      this.extend(this.setting, y);
      this.init(this.$parent, y);
    }
    init(x, y) {
      x.innerHTML = this.setNumDom(this.numToArr(this.setting.num));
      this.animate(x);
    }
    animate($parent) {
      let $dom = $parent.querySelectorAll(".number-animate-dom");
      for (let o of $dom) {
        let num = o.getAttribute("data-num");
        if (this.setting.zero) num = num == 0 ? 10 : num;
        this._height = o.offsetHeight / 12;
        o.style["transform"] = o.style["-webkit-transform"] =
          "translateY(" +
          (num == "." ? -11 * this._height : -num * this._height) +
          "px)";
        o.style["transition"] = o.style["-webkit-transition"] =
          (num == "." ? 0 : this.setting.speed / 1000) + "s";
      }
    }
    setNumDom(arrStr) {
      let shtml = '<div class="number-animate">';
      arrStr.forEach((o, i) => {
        if (
          i != 0 &&
          (arrStr.length - i) % 3 == 0 &&
          this.setting.symbol != "" &&
          o != "."
        ) {
          shtml +=
            '<div class="number-animate-dot"><span>' +
            this.setting.symbol +
            "</span></div>" +
            this.html.replace("{{num}}", o);
        } else {
          shtml += this.html.replace("{{num}}", o);
        }
      });
      shtml += "</div>";
      return shtml;
    }
    update(num) {
      let newArr = this.numToArr(num),
        $dom = this.$parent.querySelectorAll(".number-animate-dom");
      if ($dom.length != newArr.length) {
        this.$parent.innerHTML = this.setNumDom(this.numToArr(num));
      } else {
        [].forEach.call($dom, (o, i) => {
          o.setAttribute("data-num", newArr[i]);
        });
      }
      this.animate(this.$parent);
    }
    numToArr(num) {
      num = parseFloat(num).toFixed(this.setting.dot);
      let arrStr =
        typeof num == "number" ? num.toString().split("") : num.split("");
      let arrLen = arrStr.length;
      if (arrStr.length <= this.setting.len) {
        for (let _lens = 0; _lens < this.setting.len - arrLen; _lens++) {
          arrStr.unshift(0);
        }
      }
      return arrStr;
    }
    extend(n, n1) {
      for (let i in n1) {
        n[i] = n1[i];
      }
    }
  }
  return OdometerFn;
})(window, document);
