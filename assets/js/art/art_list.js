$(function(){
    var q = {
         pagenum: 1,//页码值
        pagesize: 2,//每页显示多少条数据
        cate_id:$('[name=cate_id]').val(),
        state:$('[name=state]').val(),
    }

    // 修改列表的时间
    template.defaults.imports.formatDate = function (olddate) {
        // console.log(olddate) // 2020-09-13 01:45:39.448
        // 处理逻辑
        // console.log(moment)
        var timenew = moment(olddate).format('MMMM Do YYYY, h:mm:ss a')
        return timenew
      }
    // 进来发送请求,渲染列表的数据
    initTable() 
    function initTable(){
        $.ajax ({
            type:'get',
            data:q,
            url:'/my/article/list',
            success :function(res){
                
                if(res.status===0) {
                    console.log(res);
                    var strHtml =template('tpl-table' ,res)
                    $('tbody').html(strHtml)}
                    // 页面生成以后，就生成分页，就调用下面的方法
                    renderPage(res.total)


            }
        })
    }

    // 进来发送请求，渲染第一个下拉菜单的数据
    initCate()
    function initCate() {
        $.ajax({
            url:'/my/article/cates',
            success:function(res){
                if(res.status ==0){
              var strHtml =template('tpl-cate',res)
                $('#cate-sou').html(strHtml);
                layui.form.render()
                }
            }
        })
    }
    // 点击获取按钮重新渲染页面
    $('#layui-cate').submit(function(e){
       e.preventDefault();

    //    将数据重新赋值
    var cate_id=$('[name=cate_id]').val();
    var state=$('[name=state]').val();
    q.cate_id = cate_id;
    q.state = state;
    initTable();
    // console.log(initTable);


    })

// 下方的分页(layui提供的)
function renderPage(todel) {
    layui.use('laypage', function(){
        var laypage = layui.laypage;
        
        //执行一个laypage实例
        laypage.render({
          elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
          count: todel,//数据总数，从服务端得到
           limit:q.pagesize,
           curr:q.pagenum,
        jump: function(obj, first){
            //obj包含了当前分页的所有参数，比如：
            // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            // console.log(obj.limit); //得到每页显示的条数
        // / 情况1：默认第一次时调用！！！！！！！所以在这里要判断是否为第一次，不为第一次让它重新赋值并重新渲染页面

        // 情况2：切换页码时，调用jump函数
        if(!first) {
            q.pagenum=obj.curr;
            q. pagesize=obj.limit;
            initTable() 
        }
        },
          limits:[2,3,5,10],
          layout:['count','limit','prev','page','next','skip']
        });
      });
}

// 点击删除的按钮,删除对应的文章
$('tbody').on('click','#layui-delete',function(e){
       e.preventDefault()
       var len =$('#layui-delete').length
    //    console.log(len);
       var id= $(this).attr('data-id')
       layer.confirm('Sure?', { icon: 3, title: '删除文章' }, function (index) {
        $.ajax({
            url:`/my/article/delete/${id}`,
            success:function(res){
               if(res.status===0) {
                //    判断目前的存在的按钮，判断目前的页面的页码是否在第一页，不在第一页让页码-1
                if(len===1) {
                    q.pagenum=q.pagenum ===1 ? 1:q.pagenum - 1;
                }
                // 同时重新渲染页面并关闭提示框
                layer.close(index)
                initTable() 
               }

            }
        })
       })
      

})



// 点击编辑按钮，编辑对应的文章
$('tbody').on('click','#layui-edit',function(e){
    e.preventDefault()
    var editStr =$("#tpl-init").text();
    indexEdit= layui.layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: editStr,
      })
      var id =$(this).attr('data-id');
      $.ajax({
          url:`/my/article/${id}`,
          success:function(res){
              console.log(res);
             if(res.status===0) {
                layui.form.val('editForm', res.data)
             }
          }
      })

})
})

// 点击确定按钮，重新渲染页面
$('body').on('submit','#editForm',function(e){
    e.preventDefault();
    $.ajax({
        type:'post',
        url:'/my/article/edit',
        data:$(this).se
    })
    

})