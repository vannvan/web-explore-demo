/*
 * 参数说明：
 * {
 * 	height: 进度条的高度,
 * 	percent: 进度值（不带百分比）,
 * 	bgStartColor: 渐变色初始值（非必要参数）,
 *  bgEndColor: 渐变色末尾值（非必要参数）,
 *  isAuto: 是否显示动画
 * }
 * 不需要渐变的时候，初始值和末尾值相同即可
 */
$.fn.extend({
	initData: function(initObj) {
		//				var percentStyle = 'height: ' + initObj.height + 'px;border-Radius: ' + initObj.height / 2 + 'px;'
		//				var noPercentStyle = 'height: ' + initObj.height + 'px;border-Radius: ' + initObj.height / 2 + 'px;left: ' + (initObj.percent - 100) + '%;'
		//				var bgPercentStyle = 'height: ' + initObj.height + 'px;border-Radius: ' + initObj.height / 2 + 'px;' +
		//					'background: linear-gradient(to right,' + (initObj.bgStartColor ? initObj.bgStartColor : '#feea4d') + ',' + (initObj.bgEndColor ? initObj.bgEndColor : '#ff3d00') + ');' +
		//					'left: ' + (100 - initObj.percent) + '%;'
		var innerEl = '<div class="m-percent-include" style="height: ' + initObj.height + 'px;">' +
			'<div class = "m-no-percent" style="height: ' + initObj.height + 'px;">' +
			'<div class = "m-bg-percent" style="height: ' + initObj.height + 'px;"></div>' +
			'</div> </div> <span class="m-percent">' + initObj.percent + '% </span>'
		$(this).append(innerEl)
		var _this = $(this)
		if(initObj.isAuto) {
			setTimeout(function() {
				_this.find('.m-percent-include').css({
					height: initObj.height + 'px',
					borderRadius: initObj.height / 2 + 'px'
				})
				_this.find('.m-no-percent').css({
					height: initObj.height + 'px',
					borderRadius: initObj.height / 2 + 'px',
					left: (initObj.percent - 100) + '%',
					transition: 'left 2s ease-in-out'
				})
				_this.find('.m-bg-percent').css({
					height: initObj.height + 'px',
					borderRadius: initObj.height / 2 + 'px',
					background: 'linear-gradient(to right,' + (initObj.bgStartColor ? initObj.bgStartColor : '#feea4d') + ',' + (initObj.bgEndColor ? initObj.bgEndColor : '#ff3d00') + ')',
					left: (100 - initObj.percent) + '%',
					transition: 'left 2s ease-in-out'
				})
			}, 200)
		} else {
			_this.find('.m-percent-include').css({
				height: initObj.height + 'px',
				borderRadius: initObj.height / 2 + 'px'
			})
			_this.find('.m-no-percent').css({
				height: initObj.height + 'px',
				borderRadius: initObj.height / 2 + 'px',
				left: (initObj.percent - 100) + '%'
			})
			_this.find('.m-bg-percent').css({
				height: initObj.height + 'px',
				borderRadius: initObj.height / 2 + 'px',
				background: 'linear-gradient(to right,' + (initObj.bgStartColor ? initObj.bgStartColor : '#feea4d') + ',' + (initObj.bgEndColor ? initObj.bgEndColor : '#ff3d00') + ')',
				left: (100 - initObj.percent) + '%'
			})
		}
	}
})

/*
 * @params
 * el: 进行自动动画的dom元素
 * percent： 当前进度（动态变化）
 * m_obj: 进度条高度，背景色参数 例： {height: 10, bgStartColor: '#feea4d', bgEndColor: '#ff3d00'}
 */
function mAutoPlay(el, percent, m_obj) {
	el.find('.m-percent').html(percent + '%')
	el.find('.m-percent-include').css({
		height: m_obj.height + 'px',
		borderRadius: m_obj.height / 2 + 'px'
	})
	el.find('.m-no-percent').css({
		height: m_obj.height + 'px',
		borderRadius: m_obj.height / 2 + 'px',
		left: (percent - 100) + '%'
	})
	el.find('.m-bg-percent').css({
		height: m_obj.height + 'px',
		borderRadius: m_obj.height / 2 + 'px',
		background: 'linear-gradient(to right,' + (m_obj.bgStartColor ? m_obj.bgStartColor : '#feea4d') + ',' + (m_obj.bgEndColor ? m_obj.bgEndColor : '#ff3d00') + ')',
		left: (100 - percent) + '%'
	})
}