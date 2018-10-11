$(function () {
    var brandSub = new BrandSub();
    brandSub.getData(1);
    brandSub.changePage();
    brandSub.rank();
});

function BrandSub() {

}
BrandSub.prototype = {
    bathPath: 'http://localhost:9090/api/',
    data: '',
    firstData:'',
    page: 1,
    allpage: 0,
    //获取商品列表数据
    getData: function (page) {
        // var allpage=0;
        //截取地址
        var categoryId = location.search.slice(4);
        $.ajax({
            type: 'get',
            url: this.bathPath + 'getcategorybyid',
            dataType: 'json',
            data: {
                categoryid: categoryId
            },
            success: function (result) {
                console.log(result);
                $('.contentTitle').text(result.result[0]['category']);
            }
        });
        //获取全部商品数据，方便排序
        var index = 1;
        var data = [];
        var that = this;

        function getAllData() {
            $.ajax({
                type: 'get',
                url: this.bathPath + 'getproductlist',
                dataType: 'json',
                data: {
                    categoryid: categoryId,
                    pageid: index
                },
                success: function (result) {
                    data.push(result.result);
                    //获取总页数
                    var allpage = Math.ceil(result.totalCount / result.pagesize);
                    this.allpage = allpage;
                    if (index >= allpage) {
                        console.log(data);
                        //将data放进公共属性里
                        this.data = JSON.stringify(data);
                        //再存一次数据用于综合排序
                        this.firstData = JSON.stringify(data);                        
                        //如果递归到预定页数，开始渲染
                        //渲染selected页面选择
                        for (var i = 0; i < allpage; i++) {
                            $('#pagebtn select').append($('<option>').text(i + 1));
                        }
                        this.renderPage(data, page); //两个参数，一个是全部数据，第二个是需要渲染的页数
                        return;
                    } else {
                        index++;
                        getAllData.call(this);
                    }
                }.bind(that)
            });
        }
        getAllData.call(this);
    },
    //渲染页面
    renderPage: function (data, page) {
        for (var i = 0; i < data.length; i++) {
            if (page == i + 1) {    
                $('.contentList').html('');
                for (var key in data[i]) {
                    var a = $('<a>').attr('href','./bijia/shangpin.html?productid=' + data[i][key].productId+'&productPrice='+data[i][key].productPrice);
                    a.append($('<div>').addClass('pic').html(data[i][key].productImg));
                    var right = $('<div>').addClass('right');
                    right.append($('<div>').addClass('title').text(data[i][key].productName))
                    right.append($('<div>').addClass('price').text(data[i][key].productPrice))
                    var other = $('<div>').addClass('other');
                    other.append($('<span>').addClass('shop').text(data[i][key].productQuote), $('<span>').addClass('comment').text(data[i][key].productCom))
                    right.append(other);
                    a.append(right);
                    $('.contentList').append(a);
                }
            }
        }
    },
    //切换页面事件
    changePage: function () {
        var that = this;
        var sw=false;
        //上一页
        $('.prePage').on('tap', function () {
            console.log(JSON.parse(this.data));
            var data = JSON.parse(this.data);
            if (this.page == 1) {
                alert('这是第一页！！');
                return;
            }
            this.page = +this.page - 1;//注意this.page的类型是字符串
            //选项页面数字更新
            $('#pagebtn select option').eq(this.page - 1).attr('selected', 'selected')
                .siblings('option').removeAttr('selected');
            this.renderPage(data, this.page);   
        }.bind(that));
        //下一页
        $('.nextPage').on('tap', function () {           
            var data = JSON.parse(this.data);
            if (this.page == this.allpage) {
                alert('这是最后一页！！');
                return;
            }
            this.page =+this.page+ 1;
            //选项页面数字更新            
            $('#pagebtn select option').eq(this.page - 1).attr('selected', 'selected')
                .siblings('option').removeAttr('selected');           
            this.renderPage(data, this.page);                    
        }.bind(that));
        //切换页面
        $('#pagebtn select').on('change', function () {
            var data = JSON.parse(this.data);
            var val = $('#pagebtn select').val();
            this.page=val;
            $('#pagebtn select option').eq(this.page - 1).attr('selected', 'selected')
            .siblings('option').removeAttr('selected');   
            this.renderPage(data, val);
        }.bind(that));
    },
    //点击排序的方法
    rank: function () {
        var that = this;
        //排列的顺序
        var sequence=-1;
        //由于sort方法可以用比较函数作为参数，定义一个返回值为比较函数的函数
        var compare = function (prop) {
            //每次调用的让排序取反
            sequence=-sequence;  
            //返回值为比较函数         
            return function (obj1, obj2) {
                if (prop == 'productCom') {
                    var val1 = Number(obj1[prop].split('(')[1].split(')')[0]); //用Number进行转换，字符串排序为ASCII
                    var val2 = Number(obj2[prop].split('(')[1].split(')')[0]);
                }
                else if(prop=='productPrice'){
                    var val1 = Number(obj1[prop].slice(1)); //用Number进行转换，字符串排序为ASCII
                    var val2 = Number(obj2[prop].slice(1));
                }
                if (val1 > val2) {
                    return -sequence;
                } else if (val1 < val2) {
                    return sequence;
                } else {
                    return 0;
                }
            }
        }
        //销量排序
        $('.salesRank').on('tap', function () {
            //设置矢量图标
            if(sequence==-1){
                $('.salesRank i').addClass('fa-caret-up').removeClass('fa-caret-down');
            }
            else{
                $('.salesRank i').addClass('fa-caret-down').removeClass('fa-caret-up');
            }
            //转换下全部数据的格式
            var newData = [];
            var data = JSON.parse(this.data);
            for (var i = 0; i < data.length; i++) {
                for (var key in data[i]) {
                    newData.push(data[i][key]);
                }
            }
            console.log(newData);
            //重新排序
            newData.sort(compare('productCom'));
            //将其分页
            var newArr = [];
            //用于记录每个对象数组
            var arr = [];
            for (var i = 0; i < newData.length; i++) {
                arr.push(newData[i]);
                if ((i + 1) % 10 == 0) {
                    newArr.push(arr);
                    arr = [];
                }
            }
            console.log(newData);      
            //存放数据
            this.data = JSON.stringify(newArr);
            // console.log(JSON.parse(this.data));
            //重新渲染数据
            console.log(JSON.parse(this.data).length);
            
            this.renderPage(JSON.parse(this.data),this.page);
            $('.salesRank').addClass('active').siblings('a').removeClass('active');

        }.bind(that));
        //价格排序
        $('.priceRank').on('tap', function () {
            //设置矢量图标
            if(sequence==-1){
                $('.priceRank i').addClass('fa-caret-up').removeClass('fa-caret-down');
            }
            else{
                $('.priceRank i').addClass('fa-caret-down').removeClass('fa-caret-up');
            }
            //转换下全部数据的格式
            var newData = [];
            var data = JSON.parse(this.data);
            for (var i = 0; i < data.length; i++) {
                for (var key in data[i]) {
                    newData.push(data[i][key]);
                }
            }
            console.log(newData);
            //重新排序
            newData.sort(compare('productPrice'));
            //将其分页
            var newArr = [];
            //用于记录每个对象数组
            var arr = [];
            for (var i = 0; i < newData.length; i++) {
                arr.push(newData[i]);
                if ((i + 1) % 10 == 0) {
                    newArr.push(arr);
                    arr = [];
                }
            }
            console.log(newData);      
            //存放数据
            this.data = JSON.stringify(newArr);
            //重新渲染数据
            console.log(JSON.parse(this.data).length);
            this.renderPage(JSON.parse(this.data),this.page);
            //修改类名
            $('.priceRank').addClass('active').siblings('a').removeClass('active');
        }.bind(that));
        $('.default').on('tap',function(){
            this.data=this.firstData;            
            this.renderPage(JSON.parse(this.data),this.page);
            $('.default').addClass('active').siblings('a').removeClass('active');
        }.bind(that));
    }

}