$(function(){
    var url = location.search; //获取url中"?"符后的字串
    var listId = url.substring(9)||0;
    $.ajax({
        url:"http://localhost:9090/api/getbaicaijiaproduct",
        type:'get',
        data:"titleid="+listId,
        dataType:"json",
        success:function(data){
            var html = template('listTpl',data)
            //console.log(html);

            //$("#productList .mui-row").innerHTML=html;
            //console.log($("#productList .mui-row"));
            document.querySelector('#productList .mui-row').innerHTML=html;
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
        }
    });
    //下拉框显示隐藏
    $('#header .list').on('tap',function () {
        if ($('#list').css('display') == 'none') {
            $('#list').css('display', 'block');
            $('#mask').css('display', 'block');
        } else {
            $('#list').css('display', 'none');
            $('#mask').css('display', 'none');
        }


    });
    //下拉框隐藏
    $('#list .mui-btn,#mask').on('tap',function () {
        $('#list').css('display', 'none');
        $('#mask').css('display', 'none');
    });


    $.ajax({
        url:'http://localhost:9090/api/getbaicaijiatitle',
        dataType:'json',
        type:'get',
        success:function(data){
            console.log(data);
            var html = template('titTpl',data);
            document.querySelector('#nav ul').innerHTML=html;
            console.log(data.result[listId].title);
        }
    });

    //搜索产品

    $('#search >input').on('focus',function(){
        $('#search a').css('display','block')
    });


    $('#search >a >i').on('tap',function(){

        if($('#search >input').val()==""){
            return;
        }else{
            console.log($('#search >input').val());
        }
    });

    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
    });
});