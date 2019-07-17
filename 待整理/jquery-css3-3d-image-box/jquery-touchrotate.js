(function($) {
	$.fn.touchrotate = function(params) {
		var myParams = {
			//初始3D旋转
			rotateX: -15,
			rotateY: 15,
			//数值越小 , 旋转速度越快
			speedX: 2,
			speedY: 2,
			// 旋转的倍数, 越大旋转的圈数越多
			multipleX: 50,
			multipleY: 50,
			// 动画持续的时间, 单位是S
			time: 2,
			//模式 0:表示匀速运动 , 运动中途可以重新开始 , 1表示先加速后减速(动画过程中不可滑动,体验效果差)
			model: 0,
			//是否有滑动动画(false时只可以拖动)
            isTransition:true,
		}
		params = $.extend(myParams, params);
		var boxNode = this[0];
		// 如果是jQuery
		if($.fn.jquery) {
			var mousedown = 'mousedown';
			var mousemove = 'mousemove';
			var mouseup = 'mouseleave';

		} else {
			//否则就是zepot
			var mousedown = 'touchstart';
			var mousemove = 'touchmove';
			var mouseup = 'touchend';

		}

		boxNode.style.transform = "rotateX(" + params.rotateX + "deg) rotateY(" + params.rotateY + "deg)";
		var isMove = true;
		var dowm_point = {};
		var isMove = false;
		var rotateX = params.rotateX;
		var rotateY = params.rotateY;

		//滑动的x距离, 滑动的Y距离
		var lengthX = 0,
			lengthY = 0;
		//滑动开始的X,滑动开始的Y,滑动开始的时间
		var startX = 0,
			startY = 0,
			timeStart = 0,
			isStart = null;
		var transitionLock = false; //移动时加锁
		var transitionStart = 0; //动画开始的时间
        //鼠标是否按下
        var isDown =false;
		// 监听鼠标按下
		boxNode.addEventListener(mousedown, function(e) {

		    isDown=true;
			e.preventDefault();
			//如果是先加速后减速运动, 那么中途不可点击
			if(transitionLock && params.model)
				return;
			if(!e.clientX) {
				e.clientX = e.changedTouches[0].clientX;
				e.clientY = e.changedTouches[0].clientY;
			}
			//如果是动画正在进行中
			if(transitionLock) {
				//动画还原
				var time = (new Date()).getTime();
				//计算时间差
				time = (time - transitionStart) / (params.time * 1000);

				//还原默认值
				rotateX += lengthY;
				rotateY -= lengthX;

				rotateX -= lengthY * time;
				rotateY += lengthX * time;

				boxNode.style.transition = "none";
				boxNode.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
				transitionLock = false;
			}

			boxNode.style.transition = "none";
			//获取到坐标
			isMove = true;
			startX = e.clientX;
			startY = e.clientY;
			dowm_point = {};
		});

		boxNode.addEventListener(mousemove, function(e) {

			e.preventDefault();
			// 如果鼠标左键没有按下, 那么不可以移动
			if($.fn.jquery&&!isDown) {
				return;
			}

			//如果是先加速后减速运动, 那么中途不可点击
			if(transitionLock && params.model)
				return;

			if(!isMove) return;
			if(!e.clientX) {
				e.clientX = e.changedTouches[0].clientX;
				e.clientY = e.changedTouches[0].clientY;
			}
			if(dowm_point.X == undefined) {
				dowm_point.X = e.clientX;
				dowm_point.Y = e.clientY;
			}

			if((dowm_point.X > e.clientX) != isStart) {
				//判断是否是开始 - 如果方向进行了改变,那么重新记录开始的位置

				isStart = (dowm_point.X > e.clientX);
				startX = dowm_point.X;
				startY = dowm_point.Y;
				timeStart = (new Date).getTime();
			}

			rotateX -= (e.clientY - dowm_point.Y) / params.speedX;
			rotateY += (e.clientX - dowm_point.X) / params.speedY;

			dowm_point.X = e.clientX;
			dowm_point.Y = e.clientY;
			if(Math.abs(rotateX%360) == 90) rotateX+=0.1;
            if(Math.abs(rotateY%360) == 90) rotateY+=0.1;
            boxNode.style.transform = "rotateX(" + rotateX % 360 + "deg) rotateY(" + rotateY % 360 + "deg)";
		});
		document.addEventListener('mouseup',function(){isDown=false;})
		boxNode.addEventListener(mouseup, function(e) {
			e.preventDefault();
			//如果是先加速后减速运动, 那么中途不可点击
			if(transitionLock && params.model)
				return;
            // 如果鼠标左键没有按下, 那么不可以移动
            if($.fn.jquery&&!isDown) {
                return;
            }

			if(!e.clientX) {
				e.clientX = e.changedTouches[0].clientX;
				e.clientY = e.changedTouches[0].clientY;
			}

			lengthX = e.clientX - startX;
			lengthY = e.clientY - startY;
			if(params.isTransition){
				//获取时间,进行是否缓冲动画判断
				var times = (new Date).getTime() - timeStart;

				if(times > 0 && (Math.abs(lengthX) > 10 || Math.abs(lengthY) > 10)) {
					transitionLock = true;

					rotateX %= 360;
					rotateY %= 360;
					//设置旋转的值
					lengthX = lengthX / times * params.multipleX;
					lengthY = lengthY / times * params.multipleY;

					rotateX -= lengthY;
					rotateY += lengthX;

					//记录动画开始的时间
					transitionStart = (new Date()).getTime();
					//设置动画

					if(params.model == 0) {
						boxNode.style.transition = "all " + params.time + "s linear"; // 解决
					} else {
						//先加速后减速
						boxNode.style.transition = "all " + params.time + "s ease-out";
					}
					boxNode.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

				}
            }else{
                boxNode.style.transition = "none";
                transitionLock = false;
            }
			//初始化数据
			dowm_point.X = undefined;
			dowm_point.Y = undefined;
			isMove = false;
			isStart = null;
		});
		//监听动画结束
		boxNode.addEventListener('transitionend', function() {
			boxNode.style.transition = "none";
			transitionLock = false;
		});
	}
})($);