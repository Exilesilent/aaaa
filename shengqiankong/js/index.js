$(function(){
    var currentPage;
    page(1);
     $('#select').change(function(){
         var pageId=select.value;
         page(pageId);
         document.documentElement.scrollTop=0;
         console.log(this);
         this[pageId-1].selected=true;
         
         console.log(this[pageId-1].selected);
         

        

        
         
     })

     function page(pageId){
        currentPage=pageId;
        $.ajax({
            // type:'get',
            url:"http://localhost:9090/api/getmoneyctrl",
            data:{pageid:pageId},
            dataType:'json',
            success:function(obj){
                console.log(obj);
                var html=template('productTpl',{list:obj.result});
                $('#main .container ul').html(html);
                var html2=template('pageTpl',{pageNum:Math.ceil(obj.totalCount/obj.pagesize)})
                $('#main .page .selectPage select').html(html2);
                
                
            }
        })
        
    
     }
})