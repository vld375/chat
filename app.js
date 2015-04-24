var express = require('express');
var http = require('http');
var path = require('path');


var app = express();
app.set('port', 3000);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Middleware  (добавляем обработчик к app=express)
// На все запросы - отвечае одинаково Hello-1
/*
// На все запросы - отвечае одинаково Hello-1
app.use(function(req, res) {
  res.end("Hello-1");
});
*/
// Использование параметра next позволяет объеденять в цепочки несколько Middleware
app.use(function(req, res, next) {
  if (req.url == '/') {
    res.end("Hello! Это главная страница");
  } else {
    next(); // передать к следующей app.use
  }
});
app.use(function(req, res, next) {
  if (req.url == '/test') {
    res.end("Hello! Это страница test");
  } else {
    next(); // передать к следующей app.use
  }
});
// Middleware c примером для передачи для обработки ошибок
app.use(function(req, res, next) {
  if (req.url == '/forbidden') {
    next(new Error("wops, denied"));
  } else {
    next(); // передать к следующей app.use
  }
});
// Завершающий цепочку Midelware
app.use(function(req, res) {
  res.send(404, "Страница не найдена"); // Вместо end используем send
});
// Middleware как  обработчик ошибок
app.use(function(err, req, res, next) { // четыре аргумента указывают что это обработчик ошибок
  //NODE_ENV  = 'production' или 'development'- данная переменная определяет режим работы: продакшен или разработка
  if (app.get('env') == 'development') {
    var errorHandler = express.errorHandler();  // Стандартный обработчик ошибок Express
    errorHandler(err, req, res, next);
  } else {
    app.send(500); // если production то просто посылаем код 500
  }
});


/*
var routes = require('./routes');
var user = require('./routes/user');




// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

*/
