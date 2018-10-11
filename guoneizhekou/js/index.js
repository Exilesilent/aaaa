$(function () {
    /* 实例化一个构造函数 */
    var mmb = new MMB();
    mmb.navclick();
    // mmb.guoneidiscount();
    mmb.requestProduct();
    mmb.ulSlide();
    //   $(window).scroll(function(){
    //       //1.获取滚动出去的距离和窗口,可视区域的距离
    //       var height=$(this).scrollTop()+$(Window).height();
    //       console.log(height);
    //       //2.获取文档的高度
    //       var sumHeight=$(document).height();
    //       if(height==sumHeight){
    //           $('#footer .lazy').show();
    //       }else{
    //         $('#footer .lazy').hidden();
    //       }
    //   });
});

/* 创建一个慢慢买构造函数 */
var MMB = function () {

};

/* 构造函数的原型 */
MMB.prototype = {
    //1.头部的点击事件
    navclick: function () {
        $('#nav .swiper-slide li').click(function () {
            $('#nav .swiper-slide li').removeClass('active');
            $(this).addClass('active')
        })
    },

    /* 1.写一个base的URL用的时候拼接 */
    /* 1.1本地地址 */
    baseURL:"http://localhost:9090/api/",
    /* 1.2网络地址 */
    // baseURL="http://mmb. ittun.com/api"

    /* 2.获取国内折扣页面的数据函数 */
    guoneidiscount: function () {
            /* 2.1使用$ajax请求api数据 */
            $.ajax({
                url:this.baseURL+"getinlanddiscount",
                success:function(data){
                    console.log(data);
                    var html=template('indexGuoneiTpl',data);
                    console.log(html);
                    $('.main-content >#ul').html(html);
                }
            })
    },

    requestProduct: function () {
        function reques() {
            $.ajax({
                url: 'http://localhost:9090/api/getinlanddiscount',
                success: function (data) {
                    // var html = template('navTpl', data);

                    var ul = '';
                    for (var i = 0; i < data.result.length; i++) {
                        if (data.result[i].productImg.indexOf('amp;') == -1) {
                            ul += "<li><a href='detailed.html?productid=" + data.result[i].productId + "'><img class='lazyload' src='' alt='' data-src='" + data.result[i].productImg.replace(data.result[i].productImg.slice(data.result[i].productImg.indexOf('alt') - 2), '').replace(data.result[i].productImg.slice(0, data.result[i].productImg.indexOf('=') + 2), '') + "'><p class='title'>" + data.result[i].productName + "</p><div class='subtit'>" + data.result[i].productPrice + "</div><span class='info'>" + data.result[i].productFrom + "|" + data.result[i].productTime + "</span></a></li>";
                        } else {
                            ul += "<li><a href='detailed.html?productid=" + data.result[i].productId + "'><img class='lazyload' src='' alt='' data-src='" + data.result[i].productImg.replace(data.result[i].productImg.slice(data.result[i].productImg.indexOf('alt') - 2), '').replace(data.result[i].productImg.slice(0, data.result[i].productImg.indexOf('=') + 2), '').replace(
                                data.result[i].productImg.replace(data.result[i].productImg.slice(data.result[i].productImg.indexOf('alt') - 2), '').replace(data.result[i].productImg.slice(0, data.result[i].productImg.indexOf('=') + 2), '').slice(
                                    data.result[i].productImg.replace(data.result[i].productImg.slice(data.result[i].productImg.indexOf('alt') - 2), '').replace(data.result[i].productImg.slice(0, data.result[i].productImg.indexOf('=') + 2), '').indexOf('&') + 1, data.result[i].productImg.replace(data.result[i].productImg.slice(data.result[i].productImg.indexOf('alt') - 2), '').replace(data.result[i].productImg.slice(0, data.result[i].productImg.indexOf('=') + 2), '').indexOf(';') + 1), '') + "'><p class='title'>" + data.result[i].productName + "</p><div class='subtit'>" + data.result[i].productPrice + "</div><span class='info'>" + data.result[i].productFrom + "|" + data.result[i].productTime + "</span></a></li>"
                        }
                    }
                    $("#main ul").append(ul);

                    //懒加载
                    var imgArr = document.querySelectorAll('#ul img')
                    console.log(imgArr);
                    var n = 0;
                    lazyLoad();
                    window.onscroll = lazyLoad; //监听页面滚动事件
                    function lazyLoad() {
                        var seeHeight = document.documentElement.clientHeight; //可见区域高度
                        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop; //滚动条距离顶部高度
                        for (var i = n; i < imgArr.length; i++) {
                            if (imgArr[i].offsetTop < seeHeight + scrollTop - 150) {
                                if (imgArr[i].getAttribute('src') == '') {
                                    imgArr[i].src = imgArr[i].getAttribute('data-src');  
                                }
                                n = i + 1;
                            }
                        }
                    };
                }
            });
        }
        reques();
        $(window).scroll(function () {
            //滚动条的滚动高度，不可见的部分 + 窗口，可见部分的高度
            var height = $(this).scrollTop() + $(window).height();
            //整个文档的高度，（可见+不可见)
            var sumHeight = $(document).height();
            if (height == sumHeight) {
                $('#footer .upload').show()
                reques();
            } else {
                $('#footer .upload').hide()
            }
        });
    },

    /* 导航栏左右滑动js代码初始化 */
    ulSlide: function () {
        //初始化右边的滑动
        // 初始化左边的滑动
        var swiper = new Swiper('.nav-length .swiper-container', {
            direction: 'horizontal',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            mousewheel: true,
        });
    },
};