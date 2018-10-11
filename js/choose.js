$(function(){
    var mmb=new MMB();
    mmb.getcoupon();
})

var MMB=function(){
}

MMB.prototype={
    getcoupon:function(){
        $.ajax({
            url:"http://localhost:9090/api/getcoupon",
            type:'get',
            success:function(obj){
                console.log(obj);
                var html=template('navtpl',obj);
                $('#nav').html(html);
            }
        })
    }
}
