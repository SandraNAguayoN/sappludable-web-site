'use strict';

var path = require('path');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
///
var routes = require('./routes/routes');


var app = express();


var port = process.env.PORT || 3008;
app.set('port', port);

//Asignación de puerto
app.listen(app.get('port'), () => {
    //console.log("Corriendo en puerto" + app.get('port'));
    console.log("Corriendo en puerto: "+app.get('port'));
});


//Conexión a la base de datos MongoDB
mongoose.connect("mongodb+srv://test:test@cluster0.32ht2.mongodb.net/forappneo?retryWrites=true&w=majority");
var db = mongoose.connection;
db.on('error', function (err) {
  console.log('connection error', err)
});
db.once('open', function () {
  console.log('Connection to DB successful')
});

//Configuración de BodyParser para manejo de datos en cuerpo de la solicitud
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Rutas
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
