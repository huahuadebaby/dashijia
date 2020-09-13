$(function(){
    // 表单验证
    // 1.昵称验证
(function(){
    layui.form.verify({
        nickname: function (value) {
          if (value.length > 6) {
            return '昵称长度必须在1~6个字符之间'
          }
        }
    })
})()
    getID()
    // 一进来页面就获得用户信息
    function getID() {
        $.ajax({
            url :"/my/userinfo",
            success:function(res){
                console.log(res);
               
                    // layui.layer.msg(res.message)
                    // layui自带自动生成数据的方法
                    layui.form.val('formInfo', res.data)
                
    
            }
    
    
        })
    }
    
        

})