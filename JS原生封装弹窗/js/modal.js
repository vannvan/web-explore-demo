const Modal = function() {
	this.prefix = 'w-'
	var _this = this	

	/*
		创建最外层节点
	 */
	this.createModalContent = function() {
		let bodyCtx = document.getElementsByTagName('body')[0]
		let wrapCtxNode = document.createElement('div')
		// console.log(wrapCtxNode.__proto__)
		wrapCtxNode.id = this.prefix + 'modal'
		bodyCtx.appendChild(wrapCtxNode)
		return document.getElementById(this.prefix + 'modal')
	}

	/*
		@ title: 标题 {String} 可空
		@ content: alert内容 {String} 必需
		@ okText: 确认按钮文字 {String} 选填
		@ duration: 自动关闭时间 {Number} 选填
	 */
	this.alert = function({title,content,okText,onOk,duration = 0}) {
		let modalCtx =  document.getElementById(this.prefix + 'modal') || this.createModalContent()
		let alertTitle = title || '提示'
		let alertContent = content || 'content is required'
		let btnText = okText || '确认'
		let alertContentStr = `
			<div class="alert-content">
				<div class="title">${alertTitle}</div>
				<div class="body">${alertContent}</div>
				<div class="alert-ok-btn" id="alert-ok-btn">${btnText}</div>
			</div>
			`
		modalCtx.innerHTML = alertContentStr
		if(duration) {
			setTimeout(()=>{
				_this.removeChildDOM()
			},duration)	
		}
		if(onOk) {
			document.getElementById('alert-ok-btn').addEventListener('click', function () {
            	_this.sureAction(onOk);
        	})
		}
	}

	/*
		@ title: 标题  {String} 可空
		@ content: confirm内容 {String} 必需
		@ onOk: 确认回调 {function}  必需
		@ onCancel: 取消回调 {function} 可空
	 */
	this.confirm = function({title,content,onOk,okText,onCancel}) {
		let modalCtx =  document.getElementById(this.prefix + 'modal') || this.createModalContent()
		let confirmTitle = title || '提示'
		let confirmOkText = okText || '确认'
		let confirmContent = content || 'content is required'
		let confirmContentStr = `
			<div class="confirm-content">
				<div class="title">${confirmTitle}</div>
				<div class="body">${confirmContent}</div>
				<div class="footer">
					<button class="ok-btn" id="confirm-ok-btn">${confirmOkText}</button>
					<button class="cancel-btn" id="confirm-cancel-btn">取消</button>
				</div>
			</div>
		`
		modalCtx.innerHTML = confirmContentStr
	    document.getElementById('confirm-ok-btn').addEventListener('click', function () {
            _this.sureAction(onOk);
        })

        document.getElementById('confirm-cancel-btn').addEventListener('click',function() {
        	_this.cancelAction(onCancel)
        })
	}

	/*
		@ title: 标题 {String} 可空
		@ render: 
		@ hideFoot: 是否隐藏底部按钮 {Boolean} 默认false 
		@ onOk: 确认回调 {function} 必需
		@ okText: 确认按钮文字 {String} 可空
		@ onCancel: 取消回调 {function} 可空 
	 */ 
	this.render = function({title,render,hideFoot = false,onOk,okText,onCancel}) {
		let modalCtx =  document.getElementById(this.prefix + 'modal') || this.createModalContent()
		let renderTitleStr = title?`<div class="title">${title}</div>` : ''
		let renderOkText = okText || '确认'
		let renderFooterStr = !hideFoot?`
			<div class="footer">
					<button class="ok-btn" id="render-ok-btn">${renderOkText}</button>
					<button class="cancel-btn" id="render-cancel-btn">取消</button>
			</div>
		`:''
		let renderContentStr = `
			<div class="render-content">
				${renderTitleStr}
				${render}
				${renderFooterStr}
			</div>
		`
		modalCtx.innerHTML = renderContentStr
		document.getElementById("render-ok-btn").addEventListener('click',function() {
			_this.sureAction(onOk)
		})
		document.getElementById("render-cancel-btn").addEventListener('click',function() {
			_this.cancelAction(onCancel)
		})
	}

	/*
		confirm 确认回调
	 */
	this.sureAction = function(fn) {
		if (typeof fn === 'function') {
                fn.apply();
            } else {
                console.error('Parameter type error');
        }
	}
	/*
		confirm 取消回调
	 */ 
	this.cancelAction = function(fn) {
		//如果没有传入取消操作默认移除modal
		if(!fn) {
			this.removeChildDOM()
		}else {
			if (typeof fn === 'function') {
                fn.apply();
            } else {
                console.error('Parameter type error');
        	}
		}
	}

	/*
		必填项异常处理
	 */
	this.isRequired = function (params) {
		throw new Error(params + ' is required')
	}

	/*
		移除DOM
	 */
	this.removeChildDOM = function() {
		// let modalCtx = document.getElementById(this.prefix + 'modal') 
		// modalCtx.removeChild(modalCtx.firstElementChild) //移除不包括遮罩
		document.getElementById(this.prefix + 'modal').remove()  //移除包括遮罩
	}

	/*
		关闭modal
	 */
	 this.close = function() {
	 	this.removeChildDOM()
	 }
};
