/*
* @Author: vannvan <https://github.com/vannvan>
* @Date:   2019-11-15 15:01:28
* @Last Modified by:   vannvan
* @Last Modified time: 2019-11-15 15:07:21
*/
/**
 * Created by du on 16/12/10.
 */

const ah=require("../index")

ah.hookAjax({
    //响应拦截
    onload:function(xhr) {
        // console.log(xhr)
        console.log(xhr.getResponseHeader('token'))
        console.log('content-type:',xhr.getResponseHeader('Content-type'))
    },
    //请求拦截
    send:function(arg,xhr) {
        // console.log(arg)
        xhr.setRequestHeader('token','ahaha')
    }
})

