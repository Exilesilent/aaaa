$(function(){
    var brandBase=new BrandBase();
    brandBase.initScoll();
    brandBase.backToTop();
    brandBase.closeFix();
    
});
function BrandBase(){

};
BrandBase.prototype={
    initScoll: function () {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    backToTop:function () {
        $('.backToTop').on('tap',function () {
            mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,500);//100毫秒滚动到顶            
        });
    },
    closeFix:function(){
        $('.close').on('tap',function(){
            $('#fixFooter').hide();
        });
    }
}