$(function(){
    //加载
    shangpinLoad ();
    //主页点击
    mainNavClick();
})


//初始化函数
function shangpinLoad (){
     //获取URL中的商品id
     var productid=/\d+/.exec(location.search)[0];
     // console.log(productid);
     //使用字符串的方法,查找indexOf 
     var index=location.search.indexOf('%EF%BF%A5');
     //截取字符串,从下标处加9开始截取
     var productPrice=location.search.substr(index+9);
     // console.log(productPrice);
     //参数图片隐藏
     $('#main .para').hide();
     //ajax请求
     $.ajax({
         type: 'get',
         url: 'http://localhost:9090/api/getproduct?productid='+productid,
         typeData: 'json',
         async:false,
         success: function(obj){
             // console.log(obj);
             // console.log(obj.result[0].categoryId);
             //添加该商品的价格
             obj.result[0].productPrice=productPrice;
             //添加商品的标题  [^\s]*
             var productTitle=/[^\s]*/.exec(obj.result[0].productName)[0];
             obj.result[0].productTitle=productTitle;
             $.ajax({
                 type: 'get',
                 url: 'http://localhost:9090/api/getcategorybyid?categoryid='+obj.result[0].categoryId,
                 // data: {categoryid: obj.result[0].categoryid},
                 typeData: 'json',
                 success: function(data){
                     // console.log(data);
                     obj.result[0].category=data.result[0].category;
                     console.log(obj);
                     //导入模板__导航栏
                     var html=template('navTpl',obj.result[0]);
                     $('#nav').html(html);
                     // 导入模板__商品详情
                     var html=template('detailTpl',obj.result[0]);
                     $('#detail').html(html);
                     // 导入模板__比价购买
                     var html=template('bijiaTpl',obj.result[0]);
                     $('#main .other').html(html);
                     // 导入模板__最低价
                     var html=template('lowJiaTpl',obj.result[0]);
                     $('#main .lowJia').html(html);
                     
                 }
             })
         }
     })
     $.ajax({
         type: 'get',
         url: 'http://localhost:9090/api/getproductcom?productid='+productid,
         // data: {categoryid: obj.result[0].categoryid},
         typeData: 'json',
         success: function(data1){
             // console.log(data1);
             //导入模板__评价
             var html=template('evalTpl',{list: data1.result});
             $('#eval .table').html(html);
         }
     })
}


//主页导航栏点击
function mainNavClick (){
    //遍历添加索引
    $('#main .toggle ul>li').each(function(index,ele){
        ele.index=index;
    })
    $('#main .toggle ul>li').on('click',function(){
        //获取元素的属性,用点语法   元素名.属性名=属性值
        console.log(this.index);
        //把所有的箭头清空,这个索引的添加
        $('#main .arrow ul>li img').attr('src','');
        //给这一个添加
        $('#main .arrow ul>li').eq(this.index).children().attr('src','img/arrow.png');



        //当点击优选评价时,把.other .lowJia .note 隐藏
        if(this.index==2){
            $('#main .other,#main .lowJia,#main .note').hide();
            //图片隐藏
            $('#main .para').hide();
            //评价显示
            $('#eval').show()
        }
        //点击比价购买时
        if(this.index==0){
            $('#main .other,#main .lowJia,#main .note').show();
            //评价显示
            $('#eval').show()
            //图片隐藏
            $('#main .para').hide();
        }
        //点击产品参数
        if(this.index==1){
            $('#main .other,#main .lowJia,#main .note').hide();
            //评价隐藏
            $('#eval').hide();
            //图片隐藏
            $('#main .para').show();
        }
    })
    

}