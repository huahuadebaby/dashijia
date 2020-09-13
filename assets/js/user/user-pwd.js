$(function () {
    var form = layui.form
    
    form.verify({

      len: [/^\S{6,12}$/, '长度必须6到12位，不能有空格'],
  
      // 验证新密码不能和原密码相同
      diff: function (value) {
        // value 表示新密码
        // 获取原密码
        let oldPwd = $('[name="oldPwd"]').val()
        if (value === oldPwd) {
          return '新密码不能和原密码相同'
        }
      },
  
      // 验证两次新密码必须相同
      same: function (value) {
        // value 表示确认密码
        // 获取新密码
        let newPwd = $('[name="newPwd"]').val()
        if (newPwd !== value) {
          return '两次密码不一致'
        }
      },
    })
    $('#formInfo').submit(
        function (e) {
           e.preventDefault()
           $.ajax({
            type:'post',
            url:'/my/updatepwd',
            data:$(this).serialize() ,
            success:function (res){
                layer.msg(res.message)
                // console.log(res);
                if (res.status === 0) {
                    // 重置输入框
                    $('button[type="reset"]').click()
                  }       
            }
    
           })
        }
    )

   
  })
  