
//请求菜单栏数据
var xhr = new XMLHttpRequest();
xhr.open('get','http://mmb.ittun.com/api/getmoneyctrl');
xhr.send();
xhr.onload = function(){
    console.log(xhr.responseText);
    
}

// 首页商品请求数据
