$(function(){
    // 统一设置url（根路径）
    
    $.ajaxPrefilter(function (options) {
        //   console.log(options.url)
        options.url = 'http://ajax.frontend.itheima.net' + options.url
        //   统一设置请求头(判断是否含有my的路径，含有需要带有请求头)
        // includes为es6新增的字符串的方法，含有某个元素返回true
        if (options.url.includes('/my/')) {
            options.headers = {
              Authorization: localStorage.getItem('token') || '',
            }
          }
      })
      

})