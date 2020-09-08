$(function () {
    // 第一个功能的实现
    (function () {
        $('#link-login').on('click', function () {
            $('.login-box').hide();
            $('.reg-box').show();

        })
        $('#link-reg').on('click', function () {
            $('.login-box').show();
            $('.reg-box').hide();

        })
    })();
    // 第二个功能 表单验证  layui自带的表单验证
    // (function () {

    (function () {
        // var usepwd =
        layui.form.verify({
            // 给密码框添加
            password: [/^[\S]{6,12}$/,
                '密码必须6到12位，且不能出现空格'
            ],
            respassword: function (value) { //value：表单的值、item：表单的DOM对象
                if ($('#usep').val() !== value) {
                    return '密码输入错误';
                }
            }
        })
    })();






    // })()
    // 第三个功能
    (function () {
        $("#login-form").submit(function (e) {
            var unameVal = $('#username').val();
            var usepVal = $('#usep').val();
            // 阻止默认提交行为
            e.preventDefault();
            // 像后端发送验证
            $.ajax({
                type: 'post',
                data: {
                    username: unameVal,
                    password: usepVal,

                },
                url: 'http://ajax.frontend.itheima.net/api/reguser',
                success: function (res) {
                    if (res.status == 0) {
                        console.log(res.message);
                    } else {
                        console.log(res.message);
                    }

                }

            })



        })
    })()


})