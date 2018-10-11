//页面刚加载给区域,商城默认样式 
    window.addEventListener('load',function(){
        $('.show1 li').eq(0).addClass("min").children().append($("<span class='fa fa-check'></span>"));
        $('.area li').eq(0).addClass("min").children().append($("<span class='fa fa-check'></span>"));
    })
  
  
  //切换店铺
   var show1 = document.querySelector('.show1');
   var storeI = document.querySelector('.store i');

   //切换区域
   var area = document.querySelector('.area');
   var regionI = document.querySelector('.region i');

   //切换价格
   var rate = document.querySelector('.rate');
   var priceI = document.querySelector('.price i')
   //封装
   function toggle(obj1, obj2, obj3, obj4, obj5) {
       document.querySelector(obj1).onclick = function (e) {
           e = e || window.event;
           e.preventDefault();
           if (!obj2.classList.contains('active')) {
               obj2.classList.add("active");
               obj3.classList.remove('fa-chevron-down');
               obj3.classList.add('fa-chevron-up');
               obj4.classList.remove('active');
               obj5.classList.remove('active');
               $('.seach .sort').hide();
               $('.seach>i').attr('class', 'fa fa-search');
           } else {
               obj2.classList.remove("active");
               obj3.classList.remove('fa-chevron-up');
               obj3.classList.add('fa-chevron-down');
           }
       }
   }
   //调用
   toggle('.store>a', show1, storeI, area, rate);
   toggle('.region>a', area, regionI, show1, rate)
   toggle('.price>a', rate, priceI, show1, area)



//慢慢买的构造函数
var Manmanbuy = function () {
  
}
//慢慢买的原型
Manmanbuy.prototype = {
    // 1. 请求获取店铺数据的API
     getstore:function () {
          $.ajax({
            url: "http://localhost:9090/api/getgsshop",
            dataType: 'json',
            success: function (obj) {
                //  console.log(obj);
                var html = template('print', obj);
                $('.show1').html(html);
            }
        })
     },
    // 2. 请求获取区域数据的API
     getarea:function () {
          $.ajax({
            url: "http://localhost:9090/api/getgsshoparea",
            dataType: 'json',
            success: function (obj) {
                 console.log(obj);
                var html = template('area1', obj);
                // console.log(html);
                $('.area').html(html);
            }
        })
     },
    // // 3. 请求获取商品的API,默认发起一次请求
     getshop:function(){
          $.ajax({
            url: "http://localhost:9090/api/getgsproduct",
            data: {
                shopid: 0,
                areaid: 0
            },
            dataType: 'json',
            success: function (obj) {
                 console.log(obj);
                var html = template('picture', obj)
                $('#main ul').html(html);
            }
        })
     },
     //切换数据
  
    
    }
    
//实例化慢慢买对象
$(function () {
    var mmb = new Manmanbuy();
    // 调用原型中的方法
    mmb.getstore(); 
    mmb.getarea(); 
    mmb.getshop();
 
})


$(function(){
    //search的显示隐藏
       $('.seach').click(function () {
           //判断图标是否含有该类名
            if ($('.seach>i').hasClass('fa fa-search')) {
                if($('.show1').hasClass('active')){
                    $('.show1').removeClass('active');
                }else if($('.area').hasClass('active')){
                    $('.area').removeClass('active');
                }else  if($('.rate').hasClass('active')){
                    $('.rate').removeClass('active');
                }
                $('.seach>i').attr('class', 'fa fa-times-circle-o');
                $('.seach>.sort').show();
            
            } else if (!$('.seach>i').hasClass('fa fa-search')){
                if($('.show1').hasClass('active')){
                    $('.show1').removeClass('active');
                }else if($('.area').hasClass('active')){
                    $('.area').removeClass('active');
                }else  if($('.rate').hasClass('active')){
                    $('.rate').removeClass('active');
                }
                $('.seach>i').attr('class', 'fa fa-search');
                $('.seach>.sort').hide();
            }

        })
})
 
     //区域的ajax请求(点击时)
     $('.area').on('click', '.area li', function (e) {
        e = e || window.event;
        e.preventDefault();
        //获取事件源父亲的value
        var area = e.target.parentNode.value;
        //将点击的区域id存储起来
        localStorage.setItem('area1', area);
        if (!$(e.target.parentNode).hasClass("min")) {
            $(e.target.parentNode).addClass("min").children().append($("<span class='fa fa-check'></span>"));
        }
        if ($(e.target.parentNode).siblings().hasClass('min')) {
            $(e.target.parentNode).siblings().removeClass("min").children().children().remove();
        }
        //移出active类名
        $('.area').removeClass(' active');
        //切换区域的图标类名
        $('.region i').addClass('fa fa-chevron-down')
        //截取字符串到标题
        $('.region span').html($(e.target).text().substr(0, 2));
        if (!localStorage.getItem('shop1')) {
            $.ajax({
                url: "http://localhost:9090/api/getgsproduct",
                data: {
                    shopid: 0,
                    areaid: area
                },
                dataType: 'json',
                success: function (obj) {
                    // console.log(obj);
                    var html = template('picture', obj)
                    $('#main ul').html(html);
                }
            })
        } else {
            $.ajax({
                url: "http://localhost:9090/api/getgsproduct",
                data: {
                    shopid: parseInt(localStorage.getItem('shop1')),
                    areaid: area
                },
                dataType: 'json',
                success: function (obj) {
                    //填充模板
                    var html = template('picture', obj)
                    $('#main ul').html(html);
                    localStorage.removeItem('shop1');
                    // console.log(localStorage.removeItem('shop1'));
                }
            })
        }
    })

    //商城区域的ajax请求(点击时)
    $('.show1').on('click', '.show1 li a', function (e) {
        e = e || window.event;
        e.preventDefault();
        var shop = e.target.parentNode.value;
        // 将数据存储到本地
        localStorage.setItem('shop1', shop);
        if (!$(e.target.parentNode).hasClass("min")) {
            $(e.target.parentNode).addClass("min").children().append($("<span class='fa fa-check'></span>"));
        }
        if ($(e.target.parentNode).siblings().hasClass('min')) {
            $(e.target.parentNode).siblings().removeClass("min").children().children().remove();
        }
        //移除类名active
        $('.show1').removeClass('active');
        //切换商城图标类名
        $('.store i').addClass('fa fa-chevron-down');
        //将点击的名称替换
        $('.store span').html($(e.target).text());
        if (!parseInt(localStorage.getItem('area1'))) {
            $.ajax({
                url: "http://localhost:9090/api/getgsproduct",
                data: {
                    shopid: shop,
                    areaid: 0,
                },
                dataType: 'json',
                success: function (obj) {
                    // console.log(obj.result[0].shopId);
                    list = obj.result[0].shopId;
                    var html = template('picture', obj)
                    $('#main ul').html(html);
                    localStorage.removeItem('area1');
                }
            })
        } else {
            $.ajax({
                url: "http://localhost:9090/api/getgsproduct",
                data: {
                    shopid: shop,
                    areaid: parseInt(localStorage.getItem('area1')),
                },
                dataType: 'json',
                success: function (obj) {
                    // console.log(obj.result[0].shopId);
                    list = obj.result[0].shopId;
                    var html = template('picture', obj)
                    $('#main ul').html(html);
                    localStorage.removeItem('area1');
                }
            })
        }
    })

    //价格区域的点击事件
    $('.rate li').click(function (e) {
        e = e || window.event;
        e.preventDefault();
        //判断是否含有class类名min
        if (!$(e.target.parentNode).hasClass("min")) {
            $(e.target.parentNode).addClass("min").children().append($("<span class='fa fa-check'></span>"));
        }
        if ($(e.target.parentNode).siblings().hasClass('min')) {
            $(e.target.parentNode).siblings().removeClass("min").children().children().remove();
        }
        $('.price span').html($(e.target).text());
        $('.rate').removeClass(' active');
        $('.price i').addClass('fa fa-chevron-down')
    })

    //搜索区域的点击事件封装
    function click(obj) {
        obj.click(function (e) {
            e = e || window.event;
            e.preventDefault();
            e.stopPropagation();
            if (!$(e.target.parentNode).hasClass("fixation")) {
                $(e.target.parentNode).addClass("fixation");
            }
            if ($(e.target.parentNode).siblings().hasClass('fixation')) {
                $(e.target.parentNode).siblings().removeClass("fixation");
            }
            //搜索内容隐藏
            $('.seach>.sort').hide();
            //变成放大镜
            $('.seach>i').attr('class', 'fa fa-search');
        })
    }
    //搜索区域的点击事件调用
    click($('.rank ul li'));
    click($('.classify ul li'))
    //阻止搜索内容区域的点击跳转
    $('.sort').click(function (e) {
        e = e || window.event;
        // e.preventDefault();
        e.stopPropagation();
        // $('.sort').hide();
    })





























































































// $(function () {
//        var mmb = new Manmanbuy();
//        mmb.getIndexNav(); 
//        mmb.getMoneyctrl(); 
// })

// var Manmanbuy = function () {
        
// }

// Manmanbuy.prototype = {
//     //获取首页导航数据
//     getIndexNav:function () {
//         // 1. 请求获取首页导航数据的API
//         $.ajax({
//             url:'http://localhost:9090/api/getindexmenu',
//             success:function (data) {
//                 console.log(data);
//                 var html = template('indexNavTmp',data);
//                 $('#nav .mui-row').html(html);
//             }
//         })
//     },
//     getMoneyctrl:function () {
//         // 1. 请求首页折扣商品列表数据
//         $.ajax({
//             url:'http://localhost:9090/api/getmoneyctrl',
//             success:function (data) {
//                 console.log(data);
//                 var html = template('productListTmp',data);
//                 $('#productlist .mui-table-view').html(html);
//             }
//         })
//     }
// }