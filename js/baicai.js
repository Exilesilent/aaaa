$(function(){
    var bargain=new Bargain();
    // 侧边栏
    bargain.sidebar();
    // 轮播图
    bargain.slide();
    // 返回顶部
    bargain.back();
    // 发起nav数据请求
    bargain.bargainData();
    // 发起商品请求
    bargain.commodityData();
    //超高人气发起请求
    bargain.superData();
    bargain.seachData();
    
});

var Bargain=function(){};
Bargain.prototype={
    sidebar:function(){
        // 侧边栏
    var offside=document.querySelector('#offside'); 
    
    var rightside=document.querySelector('.two');

    var offside=document.querySelector('#offside');
    var spans=document.querySelector('#spans');
  
     rightside.addEventListener('click',function(){
            if(offside.style.display=="none"){
                offside.style.display="block";
            }else{
                offside.style.display="none";
            }
        });
    spans.addEventListener('click',function(){
        offside.style.display="none";
    });
    },
    slide:function(){
            //轮播图
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
    autoplay: {
    delay: 1000,
    stopOnLastSlide: false,
    disableOnInteraction: true,
    },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
      })   
    },
    back:function(){
        //回到顶部
var lastfooter=document.querySelector('#lastfooter');
var html=document.documentElement;
var body=document.body;
lastfooter.addEventListener('click',backTOP);
function backTOP(){
    
    $('html').animate({scrollTop:0},1000);
}
window.addEventListener('scroll',function(){
    if(document.documentElement.scrollTop>300){
        lastfooter.style.height="44px";
        lastfooter.style.width="44px";
    }else{
        lastfooter.style.height="0px";
        lastfooter.style.width="0px";
    }
});

    },

    // 发起ajax请求
    baseURI:'http://localhost:9090/api/',
    bargainData:function(){
        $.ajax({
            url:this.baseURI+'getbaicaijiatitle',
            success:function(data){
                 var html=template('navTpl',data);
                 $('#offside ul').html(html);
                //  console.log(data);
                 

            }
        });
    },
    // 商品
    commodityData:function(){
        $.ajax({
            url:this.baseURI+'getbaicaijiaproduct',
            type:'get',
            data:{titleid:1},
            success:function(data){
                var html=template('commodityTpl',data);
                $('#nav-three .youhList ul').html(html); 
                // console.log(data);
                //懒加载
              var imgList=$('#nav-three .youhList ul img');
            //   console.log(imgList);
              imgList.each(function(index,ele){
                  var url=$(ele).attr('src');
                  $(ele).attr('src','images/lanjiaz.gif')
                  
                //   if($(ele).offset().top<=$(window).height()+$(window).scrollTop()){
                //       $(ele).attr('src',url);
                //   }
                // if($(window).height()>$(ele).offset().top-$(window).scrollTop()){
                //     $(ele).attr('src',url);
                // }

                
            //   监听事件
           $(window).on('scroll',function(){
                if($(ele).offset().top<$(window).height()+$(window).scrollTop()){
                    $(ele).attr('src',url);
                }
         });



              });


              
                
            }
        });
    },
    // 更多
    superData:function(){
        $.ajax({
            url:this.baseURI+'getbaicaijiaproduct',
            type:'get',
            data:{titleid:7},
            success:function(data){
                var html1=template('superTpl',data);
                $('#nav-two .rqList ul').html(html1); 
            //   console.log(data); 
            }
        });



    },
    seachData:function(){
        $('#header div input').on('focus',function(){
            $('#header div i').show();
        });
        $('#header div i').on('touchstart',function(){
            if($('#header div input').val().length){
                var content=$('#header div input').val();
                window.location="keyword.html?value="+content;
                $('#header div input').val('');
            }else{
                alert('请输入你要搜索的内容');
            }
          
            
        });
        $('#header div input').on('blur',function(){
            $('#header div i').hide();
        });
    }




};



