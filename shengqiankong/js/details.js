$(function(){
    var productid=window.location.search.substr(11)
    console.log(productid);
    getDetails(productid);
    hot();
  function getDetails(productid){
    $.ajax({
        url:"http://localhost:9090/api/getmoneyctrlproduct",
        data:{productid:productid},
        success:function(obj){
            console.log(obj);
            var html=template("detailsTpl",{list:obj.result});
            $('.brief').html(html)
            
            
        }
    })
  }


  function hot(){
    $.ajax({
        url:'http://localhost:9090/api/getmoneyctrl',
        success:function(obj){
          console.log(obj);
          var html=template('hotTpl',{result:obj.result});
          $('.hot .container ul').html(html);
          
        }
    })
  }
    
})