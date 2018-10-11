$(function () {
    var brandRank = new BrandRank();
    brandRank.getData();
    brandRank.getSales();
});

function BrandRank() {

};
BrandRank.prototype = {
    bathPath: 'http://localhost:9090/api/',
    brandTitleId:0,
    productId:'',
    getData: function () {
        //截取地址信息
        var arr = location.search.slice(1).split('&');
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            obj[arr[i].split('=')[0]] = decodeURI(arr[i].split('=')[1]);
        }
        console.log(obj);
        //放入导航名
        $('.contentTitle1').text(obj.name + '哪个牌子好');
        $('.contentTitle2').text(obj.name + '产品销量排行榜');
        $('.contentTitle3').text(obj.name + '最有用的用户评论');
        //
        this.brandTitleId=obj.brandTitleId;
        //接收数据
        $.ajax({
            url: this.bathPath + 'getbrand',
            type: 'get',
            data: {
                brandtitleid: obj.brandTitleId
            },
            success: function (result) {
                console.log(result);
                var ul = $('.brandUl');
                for (var i = 0; i < result.result.length; i++) {
                    var a = $('<a>').attr('href', 'brandSub.html?Id=' + obj.categoryId);
                    a.append($('<em>').text(i + 1));
                    a.append($('<div>').text(result.result[i].brandName));
                    a.append($('<p>').text(result.result[i].brandInfo));
                    a.append($('<i>').addClass('fa fa-angle-right'));
                    var li = $('<li>').append(a);
                    ul.append(li);
                }
            }

        });
    },
    getSales: function () {
        var that=this;
        var arr=[];
        $.ajax({
            url: this.bathPath + 'getbrandproductlist',
            type: 'get',
            data: {
                brandtitleid: this.brandTitleId,
                pagesize :4
            },
            success: function (result) {
                console.log(result.result);
                var ul = $('.brandU2');
                for (var i = 0; i < result.result.length; i++) {
                    var a = $('<a>').attr('href', './bijia/shangpin.html?productid=' + result.result[i].productId+'&productPrice='+result.result[i].productPrice);
                    a.append($('<div>').addClass('pic').html(result.result[i]['productImg']));
                    var right=$('<div>').addClass('right');
                    right.append($('<div>').addClass('title').text(result.result[i].productName));
                    right.append($('<em>').text(result.result[i].productPrice));
                    right.append($('<i>').addClass('star'));
                    var other=($('<div>').addClass('other'));
                    other.append($('<em>').text(result.result[i].productQuote),$('<em>').addClass('comment').text(result.result[i].productCom))
                    right.append(other);                    
                    a.append(right);    
                    var li = $('<li>').append(a);
                    ul.append(li);  
                    //将产品id传给数组
                    arr.push(result.result[i]['productId']);
                    //给评论区渲染图片和名字
                    var top=$('<div>').addClass('top');
                    top.append($('<div>').addClass('productPic').html(result.result[i].productImg),$('<p>').text(result.result[i].productName));
                    var a=$('<a>').attr('href','comment.html?id='+result.result[i].productId+'&name='+result.result[i].productName);
                    a.append(top);
                    var li=$('<li>');
                    li.append(a);
                    $('.brandU3').append(li);
                }
              
                
                //遍历调用获取评论数据的函数,并渲染评论
                arr.forEach(function(ele,index,arr){
                    this.getComment(arr[index],index);
                },this);
            }.bind(that)

        });
    },
    getComment:function(productId,index){
        var that=this;
        $.ajax({
            url: this.bathPath + 'getproductcom',
            type: 'get',
            productId:'',
            data: {
                productid : productId,
            },
            success: function (result) {
                console.log(result.result[0]);
                var bottom=$('<div>').addClass('bottom');
                var userInfo=$('<div>').addClass('userInfo clearfix');
                userInfo.append($('<em>').text(result.result[0].comName),
            $('<i>').addClass('star'),$('<span>').addClass('time').text(result.result[0].comTime))
            bottom.append(userInfo,$('<div>').addClass('commentContent').text(result.result[0].comContent))
            $('.brandU3 li').eq(index).find('a').append(bottom);
            }.bind(that)
        });
    }
}