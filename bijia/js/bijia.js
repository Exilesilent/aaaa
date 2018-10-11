$(function(){
    //数据展示
    fullData();
    //点击隐藏
    cilickHide();
    //搜索点击显示遮罩层
    searchClick();
})


//填空数据函数
function fullData (){
    // ajax局部请求---分类标题
    $.ajax({
        type: 'get',
        url: 'http://localhost:9090/api/getcategorytitle',
        dataType: 'json',
        async: false,
        success: function(obj1){
            //遍历obj1的数组
            for(var i=0;i<obj1['result'].length;i++){
                $.ajax({
                    type: 'get',
                    url: 'http://localhost:9090/api/getcategory?titleid='+obj1['result'][i].titleId,
                    // data : {titleid: 1},
                    dataType: 'json',
                    async: false,
                    success: function(obj2){
                        // console.log(obj2);
                        // console.log(i);
                        // console.log(obj1['result'][i]);
                        //如果obj2['result'].length除3模2,加一个.如果除以3模1加2
                        // if(obj2['result'].length%3==0){
                        //     obj1['result'][i].result=obj2['result'];
                        // }
                        // if(obj2['result'].length%3==1){
                        //     obj2['result'].push={categoty : '1'};
                        //     obj2['result'].push={categoty : '2'};
                        //     obj1['result'][i].result=obj2['result'];
                        // }
                        // if(obj2['result'].length%3==2){
                        //     obj2['result'].push={categoty : '1'};
                        //     obj1['result'][i].result=obj2['result'];
                        // }
                        obj1['result'][i].result=obj2['result'];
                    }
                })
            }
            // console.log(html);
            console.log(obj1['result']);
            var html=template('getcategorytitle',{ list: obj1['result'] })
            $('#main .container').html(html);
        }
    })
}

//点击隐藏函数
function cilickHide (){
    $('#main .container').on('click','#main .container>a',function(){
        // console.log(11);
        // console.log($(this).next('ul').css('display')=='none');
        
        //如果点击的这个下面兄弟元素是隐藏状态,则其他所有的都隐藏
        if($(this).next('ul').css('display')=='none'){
            //如果是隐藏状态,则先把所有的都隐藏.
            $('#main .container>a').next('ul').hide();
            //把所有的都隐藏之后,再把图标换成向上的
            $('#main .container>a').css('background','url(img/arrow'+2+'.gif) no-repeat center right');
        }
        $(this).next('ul').toggle();
        // else{
        //     //点击隐藏对应的下面元素
        // // console.log(this);
        // $(this).next('ul').toggle();
        // }
        //判断display是none还是block  更改数码
        if($(this).next('ul').css('display')=='none'){
            $(this).css('background','url(img/arrow'+2+'.gif) no-repeat center right');
        }else {
            $(this).css('background','url(img/arrow'+1+'.gif) no-repeat center right');
        }
    }) 
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



