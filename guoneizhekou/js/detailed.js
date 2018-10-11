$(function(){  
    NavClick();
    ulSlide();
})

function NavClick(){
    $('#nav .swiper-slide li').click(function(){
        $('#nav .swiper-slide li').removeClass('active');
        $(this).addClass('active');
    })
}


function ulSlide(){
    var swiper = new Swiper('.nav-length .swiper-container', {
               direction: 'horizontal',
               slidesPerView: 'auto',
               freeMode: true,
               scrollbar: {
                   el: '.swiper-scrollbar',
               },
               mousewheel: true,
           });
}

var  href = window.location.href;
// console.log(herf);
var url = href.indexOf("?");
// console.log(url);
var id = href.substring(url+1);
// console.log(id);
  var productid= id.replace(/[^0-9]/ig, "");

  

  console.log(productid);
  setProductList($('.main'),productid);
  // console.log($.getUrlParma('productid'));
  function setProductList(dom,productid,callback){
      $.ajax({
          url:"http://localhost:9090/api/getdiscountproduct",
          data:{'productid':productid},
          success:function(data){
              var html=template('guoneiDetailed',data);
              console.log(data);
              
              dom.html(html);
          }
      })
  }