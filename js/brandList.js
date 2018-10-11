$(function () {
    var brandList = new BrandList();
    brandList.getBrandList();
});

function BrandList() {

};
BrandList.prototype = {
    bathPath: 'http://localhost:9090/api/',
    //获取数据
    getBrandList: function () {
        var that=this;
        $.ajax({
            url: this.bathPath + 'getbrandtitle',
            type: 'get',
            success: function (result) {
                console.log(result);
                //截取品牌类型名称
                var cateName = [];
                for (var i = 0; i < result.result.length; i++) {
                    var title = result.result[i].brandTitle;
                    cateName.push(title.slice(0, title.search('十')));
                }
                
                //遍历生成数据
                var html = template('tl1', {
                    result: result.result,
                    cateName:cateName
                });
                $('.brandUl').html(html);

                //搜索
                $('.searchbtn').on('tap', function () {
                    var val = $('#search form input').val();
                    if (val == '') {
                        alert('搜索值不能为空');
                    } else {
                        $('.brandUl li').hide();
                        for (var i = 0; i < cateName.length; i++) {
                            if (cateName[i].indexOf(val)!=-1) {
                                $('.brandUl li').eq(i).show();
                            }
                        }
                        $('#search form input').attr({'disabled':'disabled'});
                        $('#search form i').show();
                    }
                });
                $('#search form i').on('tap',function(){
                    $('.brandUl li').show();
                    $('#search form i').hide();    
                    $('#search form input').val('');                                    
                });  
            }.bind(that)
        });

    }

}