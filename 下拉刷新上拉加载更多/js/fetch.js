/*
* @Author: vannvan <https://github.com/vannvan>
* @Date:   2019-09-05 15:45:29
* @Last Modified by:   vannvan
* @Last Modified time: 2019-09-05 16:50:47
*/
  //------------------------下拉刷新-------------------------------
    //定义的全局变量
var disY, startY, endY;
 (function(window) {
        var _element = document.querySelector('.container'),
          _refreshText = document.querySelector('.refreshText'),
          _startPos = 0,
          _transitionHeight = 0;
        _element.addEventListener('touchstart', function(e) {
            console.log('初始位置：', e.touches[0].pageY);
            _startPos = e.touches[0].pageY;
            _element.style.position = 'relative';
            _element.style.transition = 'transform 0s';
        }, false);
        
        _element.addEventListener('touchmove', function(e) {
            console.log('当前位置：', e.touches[0].pageY);
            _transitionHeight = e.touches[0].pageY - _startPos;
            
            if (_transitionHeight > 0 && _transitionHeight < 60) {
                _refreshText.innerText = '下拉刷新';
                _element.style.transform = 'translateY('+_transitionHeight+'px)';
                if (_transitionHeight > 55) {
                  _refreshText.innerText = '释放更新';
                }
            }               
        }, false);
        _element.addEventListener('touchend', function(e) {
            _element.style.transition = 'transform 0.5s ease 1s';
            _element.style.transform = 'translateY(0px)';
            _refreshText.innerText = '更新中...';
            endY = e.changedTouches[0].pageY;
	        disY = endY - _startPos;
	        if (disY > 72) {
	            //定义一个定时器，返回下拉到一定的高度
	            var timer = setInterval(function () {
	                disY -= 13;
	                if (disY <= 60) {
	                    clearInterval(timer);
	                    refresh();
	                }
	            }, 75);
	        }
        }, false);
})(window);

//请求刷新数据
function refresh() {
	$('.loading').show()
    var t = setTimeout(function () {
    	 $('.container').empty()
         getServiceList(reqContent)
    }, 100);
}

//fetchmore
 function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }
 
//获取当前可视范围的高度
function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}

//获取文档完整的高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

//滚动事件触发
window.onscroll = function () {
    if (getScrollTop() + getClientHeight() === getScrollHeight()) {
        console.log('在这里加载数据咯！');
        if(totalSize%10!=0){
          console.log('加载完了')
          reqContent.page = totalSize
        }else{
          console.log('继续加载')
          reqContent.page +=10
          console.log(pageSize)
          getServiceList(reqContent)
        }
    }
};