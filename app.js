var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const mechanicRouter = require('./routes/mechanicRoute');
const specRouter = require('./routes/specRoute');
const mechSpecRouter = require('./routes/mechSpecRoute');
const mechApiRouter = require('./routes/api/MechanicApiRoute');
const specApiRouter = require('./routes/api/SpecAPIRoute');
const mechSpecApiRouter = require('./routes/api/MechSpecApiRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/mechanics', mechanicRouter);
app.use('/specs', specRouter);
app.use('/mechSpec', mechSpecRouter);

app.use('/api/mechanics', mechApiRouter);
app.use('/api/specs', specApiRouter);
app.use('/api/mechspecs', mechSpecApiRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
  res.render('error');
});


module.exports = app;
