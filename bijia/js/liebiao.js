$(function () {
    //打开页面刷新
    loadPage();
    //页码点击
    pageClick();
    //上一页点击
    upOrDown();
    //搜索点击,显示遮罩层
    searchClick();
    //tab栏表头点击
    tabNavClick ();
    //筛选按钮点击
    selClick ();
})


//打开页面的请求
function loadPage() {
    //获取URL中的id
    var categoryid = /\d+/.exec(location.search)[0];
    // console.log(categoryid);
    //获取页码
    var pageid = $('#main .toPage select').val();
    // console.log(pageid);

    //ajax请求数据渲染页面
    $.ajax({
        type: 'get',
        url: 'http://localhost:9090/api/getproductlist?categoryid=' + categoryid + '&pageid=' + pageid,
        // data: {categoryid: id,pageid: 10},
        typeData: 'json',
        success: function (obj) {
            console.log(obj);
            var html = template('productTpl', {
                list: obj.result
            });
            // console.log(html);
            $('#main .list').html(html);

            var pageNum=Math.ceil(obj.totalCount/obj.pagesize);

            //将obj的页码加载出来  obj.totalCount
            for (var i = 0; i < pageNum - 1; i++) {
                var opt = document.createElement('option');
                opt.innerHTML = i + 2;
                opt.value = i + 2;
                $('#main .toPage select').append(opt);
            }
        }
    })
}

//页码点击事件
function pageClick() {
    $('#main .toPage select').on('change', function (e) {
        //获取URL中的id
        var categoryid = /\d+/.exec(location.search)[0];
        console.log(categoryid);
        //获取页码
        var pageid = $('#main .toPage select').val();
        console.log(pageid);

        //ajax请求数据渲染页面
        $.ajax({
            type: 'get',
            url: 'http://localhost:9090/api/getproductlist?categoryid=' + categoryid + '&pageid=' + pageid,
            // data: {categoryid: id,pageid: 10},
            typeData: 'json',
            success: function (obj) {
                console.log(obj);
                var html = template('productTpl', {
                    list: obj.result
                });
                // console.log(html);
                $('#main .list').html(html);
                //回到顶部
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                // location.reload();
            }
        })
    })
}

//页码点击事件
function upOrDown() {
    //上一页点击
    $('#main .toPage .upPage').on('click', function () {
        // console.log(111);

        //判断是否为第一页,如果为第一页,则不执行
        if ($('#main .toPage select').val() == 1) {
            return;
        }
        var a = $('#main .toPage select').val();
        $('#main .toPage select').val(a - 1);
        //请求局部刷新
        clickAjax();
    })
    // 下一页点击
    $('#main .toPage .downPage').on('click', function () {
        //判断是否为最后,如果为最后一页,则不执行
        var lastPage = $('#main .toPage select').children().last().val();
        console.log(lastPage);

        if ($('#main .toPage select').val() == lastPage) {
            return;
        }
        var a = $('#main .toPage select').val();
        $('#main .toPage select').val(++a);
        //请求局部刷新
        clickAjax();
    })
    //点击之后ajax请求函数
    function clickAjax (){
        //获取URL中的id
        var categoryid = /\d+/.exec(location.search)[0];
        console.log(categoryid);
        //获取页码
        var pageid = $('#main .toPage select').val();
        console.log(pageid);

        //ajax请求数据渲染页面
        $.ajax({
            type: 'get',
            url: 'http://localhost:9090/api/getproductlist?categoryid=' + categoryid + '&pageid=' + pageid,
            // data: {categoryid: id,pageid: 10},
            typeData: 'json',
            success: function (obj) {
                // console.log(obj);
                var html = template('productTpl', {
                    list: obj.result
                });
                // console.log(html);
                $('#main .list').html(html);
                //回到顶部
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
        })
    }
}

// 搜索框点击事件
function searchClick(){
    //搜索按钮点击显示遮罩层
    $('#search .search').on('click',function(){
        if($('#search .txt').val()!=''){
        // console.log(222);
        $('#tip').show();
         //禁止屏幕滚动
         $('body').css('overflow','hidden');
        }
    });
    //单击遮罩层,遮罩层消失
    $('#tip').on('click',function(){
        // console.log(111);
       $('#tip').hide();
       //输入框内容为0
       $('#search .txt').val('');
       $('body').css('overflow','visible');
    })
}


//tab栏点击
function tabNavClick (){
    //点击之前把所有类删除,然后
    $('#main .nav li').on('click',function(){
        // location.reload();
        $('#main .nav li').children().removeClass('active');
        $(this).children().addClass('active');

    })
}

// 筛选按钮点击
function selClick (){
    $('#main .nav .shaixuan').on('click',function(){
        // console.log(2222);
        $('#sel').show();
    })
    $('#sel .sel-left .head i').on('click',function(){
        // console.log(111);
        $('#sel').hide();
        // console.log($('#main .nav ul'));
        
        $('#main .nav ul li').eq(3).children().removeClass('active');
        $('#main .nav ul li').eq(0).children().addClass('active');
    })
    
}

