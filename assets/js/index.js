
$(function(){
    // 用户一进来就发发送请求获得用户基本信息
    getIdcard()
    function getIdcard(){
        $.ajax({
            url:'/my/userinfo',
            success:function(res){
                //  console.log(res);
                // 实时更新信息
                if(res.status===0) {
                    var name = res.data.nickname||res.data.username
                    $("#welcome").html('欢迎&nbsp;&nbsp;'+name)
                // 判断用户是否自己设置用户图片 如果不为空就默认使用用户的图片,没有设置就默认设置用户名首字母大写
                if(res.data.user_pic!==null) {
                    $('.layui-nav-img').attr('src',res.data.user_pic).show()
                    $('.text-avatar').hide();
                } else {
                    $('.layui-nav-img').hide();
                    var nes =name[0].toUpperCase()
                    $('.text-avatar').text(nes).show();
                }
                }
     
            },
            // 统一设置权限
        })

    }
 window.getIdcard=getIdcard;

// 点击退出，清空数据，返回登陆页面
$('#btn-logout').click (function(){
    layui.layer.confirm(
        'is not?',
        { icon: 3, title: '真的要退出吗？' },
        function (index) {
          //do something
          localStorage.removeItem('token')
  
          window.location.href = '/login.html'
          layer.close(index)
        }
      )
})
})