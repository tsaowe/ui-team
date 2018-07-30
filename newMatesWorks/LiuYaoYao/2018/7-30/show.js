var salesOffices = {};//定义售楼处
salesOffices.clientList = [];//缓存列表，存放订阅者的回调函数
//增加订阅者
salesOffices.listen = function ( key, fn ){
    if( !this.clientList[ key] ){
        this.clientList[ key ] = [];  //如果还没有订阅过此类消息，给该类消息创建一个缓存列表
    }
    this.clientList[ key ].push( fn ); //订阅的消息存进缓存列表
};
//发布消息
salesOffices.trigger = function (){
    var key = Array.prototype.shift.call( arguments), //取出消息类型
        fns = this.clientList[ key ];

    if( !fns || fns.length === 0){  //如果没有订阅该消息，则返回
        return false;
    }

    for(var i = 0, fn; fn = fns[ i++ ];){
        fn.apply(this,arguments);
    }
};

salesOffices.listen('squareMeter80', function(price){
    console.log('价格=' + price);
});

salesOffices.listen('squareMeter100', function(price){
    console.log('价格=' + price);
});

salesOffices.trigger('squareMeter80',20000);  //发布88平方米房子的价格
salesOffices.trigger('squareMeter100',30000); //发布110平方米房子的价格


var salesOffices = {};
var fn1,fn2;
installEvent(salesOffices);
//A订阅消息
salesOffices.listen('squareMeter88', fn1 = function( price ){
    console.log('价格=' + price);
});
//B订阅消息
salesOffices.listen('squareMeter88', fn2 = function( price ){
    console.log('价格=' + price);
});

salesOffices.remove('squareMeter88', fn1 );//删除A的订阅
salesOffices.trigger('squareMeter88', 20000 );//价格=20000