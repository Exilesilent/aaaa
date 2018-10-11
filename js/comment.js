    $(function () {
        var comment = new Comment();
        comment.getComment();
    });

    function Comment() {

    };
    Comment.prototype = {
        bathPath: 'http://localhost:9090/api/',
        getComment: function () {
            var productId = location.search.slice(4);
            console.log(productId);
            //截取地址信息
            var arr = location.search.slice(1).split('&');
            var obj = {};
            for (var i = 0; i < arr.length; i++) {
                obj[arr[i].split('=')[0]] = decodeURI(arr[i].split('=')[1]);
            }
            var that = this;

            $.ajax({
                url: this.bathPath + 'getproductcom',
                type: 'get',
                productId: '',
                data: {
                    productid: obj.id,
                },
                success: function (result) {
                    console.log(result.result[0]);
                    console.log(obj.name);
                    var userInfo=$('<div>').addClass('userInfo');
                    userInfo.append($('<span>').addClass('name').text(result.result[0].comName));
                    userInfo.append($('<em>').text('的评价'));
                    userInfo.append($('<br>'));  
                    userInfo.append($('<span>').addClass('product').text(obj.name));                   
                    $('.comment').append(userInfo);
                    $('.comment').append($('<div>').addClass('star'));
                    $('.comment').append($('<div>').addClass('inner').text(result.result[0].comContent));
                    $('.comment').append($('<div>').addClass('time').text('发布时间：'+result.result[0].comTime));
                    
                    //     var bottom=$('<div>').addClass('bottom');
                    //     var userInfo=$('<div>').addClass('userInfo clearfix');
                    //     userInfo.append($('<em>').text(result.result[0].comName),
                    // $('<i>').addClass('star'),$('<span>').addClass('time').text(result.result[0].comTime))
                    // bottom.append(userInfo,$('<div>').addClass('commentContent').text(result.result[0].comContent))
                    // $('.brandU3 li').eq(index).find('a').append(bottom);
                }.bind(that)
            });
        }
    }