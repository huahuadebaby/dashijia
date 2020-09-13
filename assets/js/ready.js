$(function(){
    // 统一设置url（根路径）
    
    $.ajaxPrefilter(function (options) {
        //   console.log(options.url)
        options.url = 'http://ajax.frontend.itheima.net' + options.url
        //   统一设置请求头(判断是否含有my的路径，含有需要带有请求头)
        if (options.url.includes('/my/')) {
            options.headers = {
              Authorization: localStorage.getItem('token') || '',
            }
          }
          // 统一设置了权限
          options.complete = function (res) {
            if (
              res.responseJSON.status === 1 &&
              res.responseJSON.message === '身份认证失败！'
            ) {
              localStorage.removeItem('token')
              window.location.href = '/login.html'
            }
          }

      })
      

})