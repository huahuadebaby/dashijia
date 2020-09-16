$(function(){
  // 进来设置state
  var state='已发布'
  $('#caogao').click(function (e) {
    state = '草稿'
  })

    //  初始化富文本编辑器
    initEditor()
   // 一进来就发送请求，渲染下拉菜单
   $.ajax({
    url :'/my/article/cates',
    success :function(res){
   var strHtml= template('cate',res) 
    $("#cate-id").html(strHtml)
    layui.form.render()

    }
} 
)

     // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview',
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)


  $('#chooseImage').click(function (e) {
    $('#file').click()
  })

  $('#file').change(function (e) {
    var file = e.target.files[0]
    if (!file) return
    var newImgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  // 给form表单注册事件
  $('#formPub').submit(function (e) {
    e.preventDefault()
    var fd = new FormData($(this)[0])
    fd.append('state', state)
    $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 400,
      height: 280,
    })
    .toBlob(function (blob) {
      // 将 Canvas 画布上的内容，转化为文件对象
      // 得到文件对象后，进行后续的操作
      fd.append('cover_img', blob)
      $.ajax({
        url: `/my/article/add`,
        data: fd,
        method: 'POST',
        // 使用formData时需要设置的
        contentType: false,
        processData: false,
        success: function (res) {
          console.log(res)
          if (res.status === 0) {
            window.location.href = '/art/art_list.html'
          }
        },
         
      })
    })
    
      
  
// 发送请求 
// $.ajax({
//   method: 'POST',
//   url:'/my/article/add',
//   data:fd,
//   // formdata必须带的两个属性
//   contentType: false,
//   processData: false,
//   success:function(res){
//     console.log(res);
//   }

// })

  })

   
})