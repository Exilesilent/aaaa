$(function () {
    var url = location.search; //获取url中"?"符后的字串
    var listId = url.substring(9) || 0;
    console.log(url);
    //获取产品数据
    $.ajax({
        url: "http://localhost:9090/api/getbaicaijiaproduct",
        type: 'get',
        data: "titleid=" + listId,
        dataType: "json",
        success: function (data) {
            var html = template('listTpl', data)
            //console.log(html);

            //$("#productList .mui-row").innerHTML=html;
            //console.log($("#productList .mui-row"));
            document.querySelector('#productList .mui-row').innerHTML = html;
        }
    });
    //获取产品类别
    $.ajax({
        url: 'http://localhost:9090/api/getbaicaijiatitle',
        dataType: 'json',
        type: 'get',
        success: function (data) {
            var html = template('xialaTpl', data);
            document.querySelector('#list .mui-row').innerHTML = html;
            document.querySelector(".titleName >span").innerHTML = data.result[listId].title;
            console.log(data.result[listId].title);
            console.log(data)
        }
    });
    //下拉框显示隐藏
    $('#header .titleName').click(function () {
        if ($('#list').css('display') == 'none') {
            $('#list').css('display', 'block');
            $('#mask').css('display', 'block');
            $('.titleName >i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        } else {
            $('#list').css('display', 'none');
            $('#mask').css('display', 'none');
            $('.titleName >i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        }


    });
    //下拉框隐藏
    $('#list .mui-btn,#mask').click(function () {
        $('#list').css('display', 'none');
        $('#mask').css('display', 'none');
        $('.titleName >i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    });
    //回到顶部
    $('#comeback').on('tap', function () {
        var dis = document.documentElement.scrollTop;
        console.log(dis)
        // console.log( $('html').scrollTop())
        //$('html').scrollTop(0);
        // $('html').css({
        //     'transition': '1s',
        //     'transform': 'translateY(' + dis + 'px)'
        // });

        $('html').animate({scrollTop:0},1000);

    });

    //判断回到顶部是否显示
    $(window).scroll(function () {
        if ($('html').scrollTop() > 400) {
            $("#comeback").css('display', 'block');
        } else {
            $("#comeback").css('display', 'none');
        }
    });

    //导航切换
    $('#nav ul').on('tap',function(e){
        $('#nav ul li').removeClass('active')
        e.target.parentElement.classList.add('active')
    });

});