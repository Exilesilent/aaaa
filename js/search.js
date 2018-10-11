$(function(){
    // tab栏切换
    var search=new Search();
    search.tabHandover();
    search.RTS();
    search.blurbsData();
    search.lastDD();
});


var Search=function(){};
Search.prototype={
    // tab栏切换
    tabHandover:function(){
        var a=document.querySelectorAll('#main a');
        var div=document.querySelectorAll('#main .bottom');
        for(var i=0;i<a.length;i++){
            var btn=a[i];
            btn.setAttribute('index',i);
            btn.addEventListener('click',function(){
                for(var j=0;j<a.length;j++){
                    a[j].classList.remove('active');
                }
                this.classList.add('active');
                index=this.getAttribute('index');
                for(var k=0;k<div.length;k++){
                    div[k].style.display="none";
                }
                div[index].style.display="block";
            });
        }
    },
    // 发送请求
    URLS:"http://localhost:9090/api/",
    RTS:function(){
        // 搜索页面
    var id=window.location.search;
    value=id.slice(17);
    // 先转换中文 然后判断
    value=decodeURI(value);
    // 当这个value值等于-1的时候  就要重新切割
    if(value.indexOf("=")!=-1){
        value=value.slice(1,3);
    }
    id=id.slice(9,11);
    if(id.indexOf('&')!=-1){
        id=id.slice(0,1);
        // console.log(id);  
    }
    $.ajax({
        url:this.URLS+"getbaicaijiaproduct",
        type:'get',
        data:{titleid:id},
        success:function(data){
               var html=template('moodsTpl',data);
               $('#box222 ul').html(html);     
               $('#header #blurbs>span').html(value);   


           //懒加载
           var imgList=$('#box222 ul img');
           //   console.log(imgList);
             imgList.each(function(index,ele){
                 var url=$(ele).attr('src');
                 $(ele).attr('src','images/lanjiaz1.gif')
                 
               //   if($(ele).offset().top<=$(window).height()+$(window).scrollTop()){
               //       $(ele).attr('src',url);
               //   }
               // if($(window).height()>$(ele).offset().top-$(window).scrollTop()){
               //     $(ele).attr('src',url);
               // }  
           //   监听事件
          $(window).on('scroll',function(){
               if($(ele).offset().top<=$(window).height()+$(window).scrollTop()){
                   $(ele).attr('src',url);
               }
        });



             });










        }
    });
    },
    // 点击侧边栏出现nav栏
    blurbsData:function(){
        $('#header #blurbs').click(function(){
            if($('#offside').css('display')=='none'){
                $('#offside').show();
                $('#blurbs>i').attr('class','fa fa-angle-up');
            }else{
                $('#offside').hide();
                $('#blurbs>i').attr('class','fa fa-angle-down');
            }
        });
        $('#classify').click(function(){
            $('#offside').hide();
        });
    },

// nav导航栏展开
    lastDD:function(){  
        $.ajax({
            url:this.URLS+'getbaicaijiatitle',
            success:function(data){
                 var html=template('navTpl',data);
                 $('#offside ul').html(html);
            }
        });

  
    $('#offside>ul').click(function(e){
        var li=e.target.parentNode;
        var index=$(li).attr('class');
        var content=$(li).children('a').html();
    // console.log(index);
    

        $.ajax({
            url:"http://localhost:9090/api/getbaicaijiaproduct",
            type:'get',
            data:{titleid:index},
            success:function(data){
                   var html=template('moodsTpl',data);
                //    console.log(data);
                   
                   $('#box222 ul').html(html);     
                   $('#header #blurbs>span').html(content);   
            }
        });
        $('#offside').hide();
        $('#blurbs>i').attr('class','fa fa-angle-down');
   
 });
        
   
    },
}
