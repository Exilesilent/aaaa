//调用首页商品数据


function HOME() {
    
}

HOME.prototype = {

    baseURL:'http://localhost:9090/api/',
    // baseURL:'http://mmb.ittun.com/api/',

    getHomeShop: function () {
        // 首页商品请求数据
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.baseURL +'getmoneyctrl');
        xhr.send();
        xhr.onload = function () {
            var date = JSON.parse(xhr.responseText);
            console.log(date);
            var html = template('tpl', {
                result: date.result
            });
            document.querySelector('#shop').innerHTML = html;

        }
    }
}

var home = new HOME();
home.getHomeShop();


//点击商品跳转请求
var btn = document.querySelector('.input');
console.log(btn);

