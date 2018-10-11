$(function(){
    //请求数据
    var content=decodeURI(window.location.search);
    content=content.slice(7);
    $('#header form>i').html(content);  
    $.ajax({
        url:"http://localhost:9090/api/getbaicaijiaproduct",
        type:'get',
        data:{titleid:6},
        success:function(data){
               var html=template('moodsTpl',data);
               $('#box222 ul').html(html);     
               $('#header #blurbs>span').html(value);     

        }
    });
    // tab栏
        // tab栏切换
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
       
})