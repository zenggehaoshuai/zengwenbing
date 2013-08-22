
/**
 * Module dependencies.
 */

var express = require('express')
  ,routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
var partials = require("express-partials");
app.use(partials());

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret:"microblog",maxAge:1000 * 60}))//session过期时间为1分钟
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


routes(app);

//对中间件的处理和引用
//事件循环运行在一个处理事件队列的循环里
//每当有客户端请求的时候，服务器就会发送connect事件，每当读取一整块的数据，文件系统会发射一个data事件，在node中叫事件发射器
//事件发射器允许订阅感兴趣的事件，并将回调函数绑定在相关的事件所订阅的事件，每次事件发射器
//所谓的异步非阻塞就是node异步解析事件，将回调函数解析到队列中，当有个连接的时候，线程做了无线循环去事件队列获取事件处理函数
//事件循环就是循环事件队列的回调函数,node.js只有并发，因为在同一时间只有一个任务处理
//适合于多个i/o操作
//node同一时间只能处理1个事件，事件轮询就是一个事件队列（通过事件轮询，将事件组成一个队列）,只需要在每个事件加上回调函数，会自动添加到事件对象中，当io操作完成后，回调函数自动调用表示io操作完成
//每个事件构成一次事件循环



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
