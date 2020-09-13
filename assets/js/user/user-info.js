$(function(){
    // 表单验证
    // 1.昵称验证

    layui.form.verify({
        nickname: function (value) {
          if (value.length > 6) {
            return '昵称长度必须在1~6个字符之间'
          }
        }
    })

getID()
// 一进来页面就获得用户信息
 function getID() {
        $.ajax({
            url:"/my/userinfo",
            success:function(res){
              console.log(res);
              if(res.status===0){
          // layui自带自动生成数据的方法
          layui.form.val('formInfo', res.data)
              }
            }
        })
 }
//  按重置按钮，恢复表单初始状态
$('#btn-reset').click (function(e){
  e.preventDefault();
  getID();

})
// 按提交表单按钮，让页面重新渲染
$('#formInfo').submit(function(e){
  e.preventDefault()
  $.ajax({
    type:'post',
    url:'/my/userinfo',
    data: $(this).serialize(),
    success:function(res){
      if(res.status==0) {
        // console.log(res);
        console.log(window.parent);
        // 借用父亲的方法，重新渲染页面
        window.parent.getIdcard()

      }

    }

  })

})

    
        

})