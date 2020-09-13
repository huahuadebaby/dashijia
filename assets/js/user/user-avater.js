$(function(){
     // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)
//   点击按钮提交
$('#layui-let').click(function(){
    $('.layui-flie').click()
})
// 给提交表单注册change事件
// e.target绑定当前事件的元素
$('.layui-flie').change(function(e){
    // 拿到用户选择的文件
    var file = e.target.files[0]
    // 根据选择的文件，创建一个对应的 URL 地址：
    var newImgURL = URL.createObjectURL(file)
    // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域

})

})