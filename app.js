var createError = require('http-errors');
var express=require('express');
var path=require('path');
var cookieParser=require('cookie-parser');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const jwt = require('jsonwebtoken')
var logger = require('morgan');
const url='mongodb://0.0.0.0:27017';
const {engine}=require('express-handlebars');
var hbs = require('hbs');
hbs.registerPartials(__dirname+'/views/partials');
const db=require('./db')
/******************middleware and database *******************/
 const auth=require('./middleware/auth')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app=express();
const cors=require('cors')
/*
const mongoose=require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017',{UseNewUrlParser:true}).then(() =>
{
  console.log("connection successfully ")
});*/
require('./config/passport');
// view engine setup
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "layout.hbs"}))
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())
app.use(cookieParser());
app.use(session({
  secret: 'EVENT-MANAGMENT-SYSTEM_?@',
  saveUninitialized: false,
  resave: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



/*************** start video code********************/
var Server=require('http').Server(app)
var io=require('socket.io')(Server);
const{v4:uuidV4}=require('uuid')

io.on('connection', function (socket)
{
  console.log('a user connected');
  
  socket.on('join-room', (roomId,userId) =>
    {

      console.log('user joined to room');

    console.log(roomId);
    console.log(userId)
    socket.join(roomId);
    io.to(roomId).emit('user-connected', (userId));
    socket.on('disconnect', () =>
    {
      io.to(roomId).emit('user-disconnected', userId);
      
    })

  });
})
/********************end video ****************/

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
  res.render('error');
});
Server.listen(3000)
/*process.on('unhandledRejection', err =>
{
  console.log(`ERROR:${err.message}`)
  console.log('shutting down the server due to unhandled promise rejection')
  Server.close(() =>
  {
    process.exit(1)
  })
})*/
module.exports = app;
