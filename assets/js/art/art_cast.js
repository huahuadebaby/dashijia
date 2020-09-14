$(function(){
    initList()
    // 进来就发送数据获得相应的数据渲染表格
   function initList() {
    $.ajax({
        type:'get',
        url:'/my/article/cates',
        success:function(res){
            //   console.log(res);
            var strHtml =template('tpl-table',res)
            $('tbody').html(strHtml)

        }

    })
   }
   var indexAdd=null;
   var indexEdit=null
   $('#addBtn').click(function () {
    //    点击添加按钮，跳出弹出框
    var addStr =$('#add').text()
     indexAdd= layui.layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: addStr,
    })


  })
//   通过事件委托动态绑定添加提示框
$('body').on('submit','#addForm',function(e){
    e.preventDefault();
    $.ajax({
        type:'post',
        url:'/my/article/addcates',
        data:$(this).serialize(),
        success:function(res){
            if(res.status===0) {
                // 请求成功，重新渲染
                initList()
                layer.close(indexAdd)

            }

        }

    })

})

// 点击编辑按钮跳出编辑弹出框事件绑定并获取当前的元素的内容
$('tbody').on('click','#btn-edit',function(e){
    e.preventDefault();
    var editStr =$('#edit').text()
     indexEdit= layui.layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: editStr,
    })
    var id= $(this).attr('data-id')
    $.ajax({
        url:'/my/article/cates/'+id,
        success:function(res){
           if(res.status===0) {
            layui.form.val('editForm', res.data)
           }
        }
    })

})
// 点击确认编辑框的确认修改按钮，重新渲染页面
$('body').on('submit'  ,'#editForm',function(e){
    e.preventDefault();
    $.ajax({
        type:'post',
        url:'/my/article/updatecate',
        data:$(this).serialize(),
        success:function(res){
            if(res.status===0) {
             // 重新渲染页面
            initList()
            // 关闭提示框
            layer.close(indexEdit)
                
            }
            // console.log(res);
           
        }
    })
    
  

})
// 点击删除按钮，删除对应id的表单
$('tbody').on('click','#btn-delete',function(e){
    e.preventDefault()
    var id = $(this).attr('data-id');
    console.log(id);
    layui.layer.confirm('SURE？', { icon: 3, title: '提示' }, function (index) {
        $.ajax({
            url:'/my/article/deletecate/'+id,
            success:function(res){
                console.log(res);
                if(res.status===0) {
                    initList();
                    layer.close(index)
                }
                
            }
    
    
        })
    })
    

})
})