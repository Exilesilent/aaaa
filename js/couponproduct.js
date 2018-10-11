$(function () {
    var mmb = new MMB();
    var search = location.search;
    console.log(search);

    var brandTitleId = search.substring(10);
    console.log(brandTitleId);

    // 渲染商品
    mmb.getwindcloud(brandTitleId);
    // 倒计时
    mmb.getnowTime();
    //渲染遮罩层里面的图片
    mmb.slideshow(brandTitleId);
   

})


// 定义一个慢慢买的构造函数
var MMB = function () {

}

MMB.prototype = {
    baseURL: "http://localhost:9090/api/",
    // 渲染商品
    getwindcloud: function (page) {
        console.log(this.baseURL + 'getcouponproduct');
        $.ajax({
            url: this.baseURL + 'getcouponproduct',
            type: 'get',
            data: {
                couponid: page
            },
            // dataType:"json",         
            success: function (obj) {
                // console.log(obj);
                var html = template('productTpl', obj);
                // console.log(html);
                $('.products ul').html(html);
            }
        })

    },
    //倒计时
    getnowTime: function () {
        var nowTime = new Date();
        var hour = nowTime.getHours()
        console.log(hour);
        $('#productList .time span').html("国内折扣热度排行榜-" + hour + "点档");
    },
    //遮罩层图片轮播模板
    maskedControl: function (id) {
        var index;
      
        $('.products ul').on('click','li', function () {
            var img = $(this).find('.productimg').html();
            var dataid = $(img).data('id');
            console.log(dataid);
            console.log(img);
            
            index=dataid;
            console.log(index);


            
           

            //开启遮罩层
            if ($('.mui-backdrop').css('display') == 'none') {
            
              $('.mui-backdrop').show();
            //   $('.mui-backdrop .mui-slider-group').css("transform","translate3d(-350px,0px,0px)");
                // $('.mui-backdrop .mui-slider-item').eq(dataid).addClass('mui-active').siblings().removeClass('mui-active');
                // $('.mui-backdrop').show().find('.mui-active').find('.tupian').html(img);
                var gallery = mui('.mui-slider');
                setTimeout(function () {  
                    // 跳到选定的页面
                    gallery.slider().gotoItem(index,0);
                    
                 });
                
                //  解决隐藏会有的Bug
                 gallery.slider().refresh();
                //轮播图上下控件
                document.getElementById('left').onclick = function (e) {
                    // 阻止事件冒泡
                    e.stopPropagation();
                    if (index == 0) {
                        alert('已经是第一张了')
                    } else {
                        index--;
                        gallery.slider().gotoItem(index);
                    }
                }
                document.getElementById('right').onclick = function (e) {
                    e.stopPropagation();
                    if (index == sumPage - 1) {
                        alert('已经是最后一张了')
                    } else {
                        index++;
                        gallery.slider().gotoItem(index);
                    }
                }

                // 禁止屏幕滑动
                $('body').css('overflow', 'hidden');

            }
            // 关闭遮罩层
            $('.mui-backdrop').click(function () {
                $('.mui-backdrop').css('display', 'none');
                $('body').css('overflow', 'visible');
            })
        });


    },
    // 遮罩层里面图片
    slideshow: function (id) {
        var that = this;
        $.ajax({
            url: 'http://localhost:9090/api/getcouponproduct',
            data: {
                couponid: id,
            },
            success: function (obj) {
                var html = template('couponproductTpl2', obj);
                $('.mui-backdrop .mui-slider-group').html(html);
                sumPage = obj.result.length;
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval:0//自动轮播周期，若为0则不自动播放，默认为0；
                });
                var brandTitleId = location.search.substring(10);
               
                     //遮罩层图片轮播
                that.maskedControl(brandTitleId);
              
            }
        });
    }
}